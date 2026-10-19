// confessed-api/src/lib/donations.ts
//
// Payment helpers (Paystack + PayPal). The browser redirect and the webhook are both treated as
// *hints*: money is only recorded after we ask the provider's API directly and the
// reference, amount and currency match.

import { and, eq, ne } from 'drizzle-orm'
import { db, donations } from '../../db/src/index.js'
import { sendEmail } from './email.js'
import { paypalFetch } from './paypal.js'

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

type Paid = { providerTransactionId: string | null; channel: string | null; paidAt: Date }

/** Flip a donation to successful exactly once and send the receipt. */
async function markSuccessful(row: DonationRow, paid: Paid): Promise<DonationRow> {
  // Conditional update = only the first caller flips it, so the receipt is sent once.
  const [updated] = await db
    .update(donations)
    .set({ status: 'successful', ...paid })
    .where(and(eq(donations.txRef, row.txRef), ne(donations.status, 'successful')))
    .returning()

  if (!updated) {
    const [fresh] = await db.select().from(donations).where(eq(donations.txRef, row.txRef)).limit(1)
    return fresh ?? row
  }

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

async function markFailed(row: DonationRow, extra: Partial<Paid> = {}): Promise<DonationRow> {
  const [updated] = await db
    .update(donations)
    .set({ status: 'failed', ...extra })
    .where(and(eq(donations.txRef, row.txRef), eq(donations.status, 'pending')))
    .returning()
  return updated ?? row
}

// ── Paystack ──────────────────────────────────────────────────────────────

async function settlePaystack(row: DonationRow): Promise<DonationRow> {
  let json: any
  try {
    const res = await fetch(
      `${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(row.txRef)}`,
      { headers: paystackHeaders() },
    )
    json = await res.json()
    if (!res.ok) return row // not found yet — stay pending
  } catch (e) {
    console.error('[donations] paystack verify failed:', e)
    return row
  }

  const t = json?.data
  if (!json?.status || !t || t.reference !== row.txRef) return row

  const paid =
    t.status === 'success' &&
    t.currency === row.currency &&
    Number(t.amount) >= toSubunit(row.amount)

  if (paid) {
    return markSuccessful(row, {
      providerTransactionId: t.id != null ? String(t.id) : null,
      channel:               t.channel ?? null,
      paidAt:                t.paid_at ? new Date(t.paid_at) : new Date(),
    })
  }
  // 'failed' = declined; 'abandoned' / 'pending' / 'ongoing' stay pending.
  if (t.status === 'failed') {
    return markFailed(row, { providerTransactionId: t.id != null ? String(t.id) : null, channel: t.channel ?? null })
  }
  return row
}

// ── PayPal ────────────────────────────────────────────────────────────────

async function settlePayPal(row: DonationRow): Promise<DonationRow> {
  const orderId = row.providerTransactionId // stored when the order was created
  if (!orderId) return row

  try {
    let order = (await paypalFetch(`/v2/checkout/orders/${orderId}`)).json
    if (order?.purchase_units?.[0]?.custom_id !== row.txRef) return row

    // Buyer approved but we haven't captured yet → capture now (idempotent via request id).
    if (order.status === 'APPROVED') {
      const cap = await paypalFetch(`/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST', requestId: `capture-${row.txRef}`, body: '{}',
      })
      order = cap.ok ? cap.json : (await paypalFetch(`/v2/checkout/orders/${orderId}`)).json
    }

    if (order.status !== 'COMPLETED') return row // still waiting on the buyer

    const capture = order.purchase_units?.[0]?.payments?.captures?.[0]
    if (
      capture?.status === 'COMPLETED' &&
      capture.amount?.currency_code === row.currency &&
      Number(capture.amount?.value) >= Number(row.amount)
    ) {
      return markSuccessful(row, {
        providerTransactionId: capture.id ?? orderId,
        channel:               'paypal',
        paidAt:                capture.create_time ? new Date(capture.create_time) : new Date(),
      })
    }
    if (capture?.status === 'DECLINED' || capture?.status === 'FAILED') return markFailed(row)
  } catch (e) {
    console.error('[donations] paypal settle failed:', e)
  }
  return row
}

/**
 * Verify a donation with its provider and update our record. Idempotent: safe to
 * call from the return page, a webhook, or both at once.
 */
export async function settleDonation(reference: string): Promise<DonationRow | null> {
  const [row] = await db.select().from(donations).where(eq(donations.txRef, reference)).limit(1)
  if (!row) return null
  if (row.status === 'successful') return row
  return row.provider === 'paypal' ? settlePayPal(row) : settlePaystack(row)
}
