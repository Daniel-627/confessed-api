// confessed-api/src/lib/donations.ts
//
// Flutterwave (v3 hosted checkout) helpers. The browser redirect and the
// webhook are both treated as *hints*: money is only recorded after we ask
// Flutterwave's API directly and the reference, amount and currency match.

import { and, eq, ne } from 'drizzle-orm'
import { db, donations } from '../../db/src/index.js'
import { sendEmail } from './email.js'

export const FLW_BASE = 'https://api.flutterwave.com/v3'

export const LIMITS: Record<string, { min: number; max: number }> = {
  KES: { min: 50, max: 500_000 },
  USD: { min: 1,  max: 5_000 },
}

export function flwHeaders() {
  return {
    Authorization:  `Bearer ${process.env.FLW_SECRET_KEY}`,
    'Content-Type': 'application/json',
  }
}

export type DonationRow = typeof donations.$inferSelect

/**
 * Verify a donation with Flutterwave and update our record. Idempotent: safe to
 * call from the return page, the webhook, or both at once.
 */
export async function settleDonation(txRef: string): Promise<DonationRow | null> {
  const [row] = await db.select().from(donations).where(eq(donations.txRef, txRef)).limit(1)
  if (!row) return null
  if (row.status === 'successful') return row

  let json: any
  try {
    const res = await fetch(
      `${FLW_BASE}/transactions/verify_by_reference?tx_ref=${encodeURIComponent(txRef)}`,
      { headers: flwHeaders() },
    )
    json = await res.json()
    if (!res.ok) return row // no transaction yet (customer hasn't paid) — stay pending
  } catch (e) {
    console.error('[donations] verify request failed:', e)
    return row
  }

  const t = json?.data
  if (json?.status !== 'success' || !t || t.tx_ref !== txRef) return row

  const paid =
    t.status === 'successful' &&
    t.currency === row.currency &&
    Number(t.amount) >= Number(row.amount)

  if (paid) {
    // Conditional update = only the first caller flips it, so the receipt is sent once.
    const [updated] = await db
      .update(donations)
      .set({
        status:           'successful',
        paidAt:           new Date(),
        flwTransactionId: String(t.id),
        flwRef:           t.flw_ref ?? null,
        paymentType:      t.payment_type ?? null,
      })
      .where(and(eq(donations.txRef, txRef), ne(donations.status, 'successful')))
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
    const [fresh] = await db.select().from(donations).where(eq(donations.txRef, txRef)).limit(1)
    return fresh ?? row
  }

  if (t.status === 'failed' && row.status === 'pending') {
    const [updated] = await db
      .update(donations)
      .set({ status: 'failed', flwTransactionId: String(t.id), paymentType: t.payment_type ?? null })
      .where(and(eq(donations.txRef, txRef), eq(donations.status, 'pending')))
      .returning()
    return updated ?? row
  }

  return row
}
