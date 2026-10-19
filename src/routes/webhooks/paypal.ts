// confessed-api/src/routes/webhooks/paypal.ts
//
// PayPal developer dashboard → your app → Webhooks:
//   URL:    https://api.confessed.faith/webhooks/paypal
//   Events: Checkout order approved, Payment capture completed
// Put the webhook's ID in PAYPAL_WEBHOOK_ID.

import type { Context } from 'hono'
import { settleDonation } from '../../lib/donations.js'
import { verifyPayPalWebhook } from '../../lib/paypal.js'

export async function handlePayPalWebhook(c: Context) {
  const event: any = await c.req.json().catch(() => null)
  if (!event) return c.json({ error: 'Bad request' }, 400)

  if (!(await verifyPayPalWebhook((n) => c.req.header(n), event))) {
    return c.json({ error: 'Invalid signature' }, 401)
  }

  if (event.event_type === 'CHECKOUT.ORDER.APPROVED' || event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
    const r = event.resource
    // Order events carry custom_id on the purchase unit; capture events carry it on the capture.
    const reference = r?.purchase_units?.[0]?.custom_id ?? r?.custom_id
    // The payload is only a hint — settleDonation re-reads the order from PayPal.
    if (typeof reference === 'string' && reference.startsWith('cf-')) {
      try { await settleDonation(reference) } catch (e) { console.error('[webhook:paypal]', e) }
    }
  }
  return c.json({ received: true })
}
