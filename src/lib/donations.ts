// confessed-api/src/lib/donations.ts
//
// Paystack helpers. The browser redirect and the webhook are both treated as
// *hints*: money is only recorded after we ask Paystack's API directly and the
// reference, amount and currency match.

import { and, eq, ne } from 'drizzle-orm'
import { db, donations } from '../../db/src/index.js'
import { sendEmail } from './email.js'

export const PAYSTACK_BASE = 'https://api.paystack.co'

export const LIMITS: Record<string, { min: number; max: number }> = {
  KES: { min: 50, max: 500_000 },
  USD: { min: 1,  max: 5_000 },
}

export function paystackHeaders() {
  return {
    Authorization:  `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  }
}

/** Paystack amounts are in the currency's subunit (KES → cents, USD → cents). */
export const toSubunit = (amount: number | string) => Math.round(Number(amount) * 100)

export type DonationRow = typeof donations.$inferSelect

/**
 * Verify a donation with Paystack and update our record. Idempotent: safe to
 * call from the return page, the webhook, or both at once.
 */
export async function settleDonation(reference: string): Promise<DonationRow | null> {
  const [row] = await db.select().from(donations).where(eq(donations.txRef, reference)).limit(1)
  if (!row) return null
  if (row.status === 'successful') return row

  let json: any
  try {
    const res = await fetch(
      `${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: paystackHeaders() },
    )
    json = await res.json()
    if (!res.ok) return row // not found yet — stay pending
  } catch (e) {
    console.error('[donations] verify request failed:', e)
    return row
  }

  const t = json?.data
  if (!json?.status || !t || t.reference !== reference) return row

  const paid =
    t.status === 'success' &&
    t.currency === row.currency &&
    Number(t.amount) >= toSubunit(row.amount)

  if (paid) {
    // Conditional update = only the first caller flips it, so the receipt is sent once.
    const [updated] = await db
      .update(donations)
      .set({
        status:                'successful',
        paidAt:                t.paid_at ? new Date(t.paid_at) : new Date(),
        providerTransactionId: t.id != null ? String(t.id) : null,
        channel:               t.channel ?? null,
      })
      .where(and(eq(donations.txRef, reference), ne(donations.status, 'successful')))
      .returning()

    if (updated) {
      try {
        await sendEmail({
          to:   updated.donorEmail,
          type: 'donation_receipt',
          data: {
            name:      updated.donorName ?? undefined,
            amount:    updated.amount,
            currency:  updated.currency,
            reference: updated.txRef,
            paidAt:    (updated.paidAt ?? new Date()).toISOString(),
          },
        })
        await db.update(donations).set({ receiptSentAt: new Date() }).where(eq(donations.id, updated.id))
      } catch (e) {
        console.error('[donations] receipt email failed:', e)
      }
      return updated
    }
    const [fresh] = await db.select().from(donations).where(eq(donations.txRef, reference)).limit(1)
    return fresh ?? row
  }

  // Paystack uses 'failed' for declined payments; 'abandoned'/'pending'/'ongoing' stay pending.
  if (t.status === 'failed' && row.status === 'pending') {
    const [updated] = await db
      .update(donations)
      .set({ status: 'failed', providerTransactionId: t.id != null ? String(t.id) : null, channel: t.channel ?? null })
      .where(and(eq(donations.txRef, reference), eq(donations.status, 'pending')))
      .returning()
    return updated ?? row
  }

  return row
}
