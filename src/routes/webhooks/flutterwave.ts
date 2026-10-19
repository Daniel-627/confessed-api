// confessed-api/src/routes/webhooks/flutterwave.ts
//
// Flutterwave dashboard → Settings → Webhooks:
//   URL:         https://api.confessed.faith/webhooks/flutterwave
//   Secret hash: same value as FLW_SECRET_HASH in the API env

import { timingSafeEqual } from 'node:crypto'
import type { Context } from 'hono'
import { settleDonation } from '../../lib/donations.js'

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && timingSafeEqual(ab, bb)
}

export async function handleFlutterwaveWebhook(c: Context) {
  const secret = process.env.FLW_SECRET_HASH
  const sent = c.req.header('verif-hash')
  if (!secret || !sent || !safeEqual(sent, secret)) {
    return c.json({ error: 'Invalid signature' }, 401)
  }

  const event = await c.req.json().catch(() => null)
  const txRef = event?.data?.tx_ref

  // The payload is only a hint — settleDonation re-verifies with Flutterwave.
  if (typeof txRef === 'string' && txRef.startsWith('cf_')) {
    try { await settleDonation(txRef) } catch (e) { console.error('[webhook:flw]', e) }
  }

  // Always 200 once authenticated, otherwise Flutterwave keeps retrying.
  return c.json({ received: true })
}
