// confessed-api/src/routes/webhooks/paystack.ts
//
// Paystack dashboard → Settings → API Keys & Webhooks:
//   Live/Test Webhook URL: https://api.confessed.faith/webhooks/paystack
// Paystack signs the raw body with HMAC-SHA512 using your secret key and sends
// the hex digest in the `x-paystack-signature` header.

import { createHmac, timingSafeEqual } from 'node:crypto'
import type { Context } from 'hono'
import { settleDonation } from '../../lib/donations.js'

function validSignature(raw: string, signature: string | undefined, secret: string | undefined) {
  if (!signature || !secret) return false
  const expected = createHmac('sha512', secret).update(raw).digest('hex')
  const a = Buffer.from(expected)
  const b = Buffer.from(signature)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function handlePaystackWebhook(c: Context) {
  const raw = await c.req.text() // must be the untouched body for the signature to match
  if (!validSignature(raw, c.req.header('x-paystack-signature'), process.env.PAYSTACK_SECRET_KEY)) {
    return c.json({ error: 'Invalid signature' }, 401)
  }

  let event: any = null
  try { event = JSON.parse(raw) } catch { /* ignore */ }

  const reference = event?.data?.reference
  // The payload is only a hint — settleDonation re-verifies with Paystack.
  if (event?.event === 'charge.success' && typeof reference === 'string' && reference.startsWith('cf-')) {
    try { await settleDonation(reference) } catch (e) { console.error('[webhook:paystack]', e) }
  }

  // Always 200 once authenticated, otherwise Paystack keeps retrying.
  return c.json({ received: true })
}
