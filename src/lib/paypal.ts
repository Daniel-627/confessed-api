// confessed-api/src/lib/paypal.ts
//
// PayPal Orders v2 (REST). Env:
//   PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET
//   PAYPAL_ENV        = 'sandbox' | 'live'   (default sandbox)
//   PAYPAL_WEBHOOK_ID = id of the webhook created in the PayPal developer dashboard

export const PAYPAL_BASE =
  process.env.PAYPAL_ENV === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com'

let cached: { token: string; expiresAt: number } | null = null

export async function paypalToken(): Promise<string> {
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token
  const basic = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  })
  const json: any = await res.json()
  if (!res.ok || !json.access_token) throw new Error(`PayPal auth failed: ${JSON.stringify(json)}`)
  cached = { token: json.access_token, expiresAt: Date.now() + (json.expires_in ?? 300) * 1000 }
  return cached.token
}

export async function paypalFetch(path: string, init: RequestInit & { requestId?: string } = {}) {
  const { requestId, headers, ...rest } = init
  const res = await fetch(`${PAYPAL_BASE}${path}`, {
    ...rest,
    headers: {
      Authorization: `Bearer ${await paypalToken()}`,
      'Content-Type': 'application/json',
      ...(requestId ? { 'PayPal-Request-Id': requestId } : {}), // idempotency
      ...headers,
    },
  })
  const json: any = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, json }
}

/** Create an order and return { orderId, approveUrl }. */
export async function createPayPalOrder(opts: {
  reference: string; amount: number; currency: string; returnUrl: string; cancelUrl: string
}) {
  const { ok, json } = await paypalFetch('/v2/checkout/orders', {
    method: 'POST',
    requestId: opts.reference,
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        custom_id:   opts.reference,
        description: 'Donation to Confessed',
        amount:      { currency_code: opts.currency, value: opts.amount.toFixed(2) },
      }],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name:          'Confessed',
            user_action:         'PAY_NOW',
            shipping_preference: 'NO_SHIPPING',
            return_url:          opts.returnUrl,
            cancel_url:          opts.cancelUrl,
          },
        },
      },
    }),
  })
  const link = (json.links as any[] | undefined)?.find((l) => l.rel === 'payer-action' || l.rel === 'approve')?.href
  if (!ok || !json.id || !link) throw new Error(`PayPal order failed: ${JSON.stringify(json)}`)
  return { orderId: json.id as string, approveUrl: link as string }
}

/** Confirm a PayPal webhook really came from PayPal. */
export async function verifyPayPalWebhook(headers: (name: string) => string | undefined, event: unknown) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID
  if (!webhookId) return false
  const { ok, json } = await paypalFetch('/v1/notifications/verify-webhook-signature', {
    method: 'POST',
    body: JSON.stringify({
      auth_algo:         headers('paypal-auth-algo'),
      cert_url:          headers('paypal-cert-url'),
      transmission_id:   headers('paypal-transmission-id'),
      transmission_sig:  headers('paypal-transmission-sig'),
      transmission_time: headers('paypal-transmission-time'),
      webhook_id:        webhookId,
      webhook_event:     event,
    }),
  })
  return ok && json.verification_status === 'SUCCESS'
}
