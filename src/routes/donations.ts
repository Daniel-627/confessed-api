// confessed-api/src/routes/donations.ts
//
// Mount in index.ts:
//   import { donationsRoute } from './routes/donations.js'
//   app.route('/donations', donationsRoute)

import { Hono } from 'hono'
import { desc, eq, sql } from 'drizzle-orm'
import { verifyToken } from '@clerk/backend'
import { db, donations, users } from '../../db/src/index.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { FLW_BASE, LIMITS, flwHeaders, settleDonation } from '../lib/donations.js'
import type { AppVariables } from '../types/index.js'

const SITE = process.env.APP_URL ?? 'https://confessed.faith'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PURPOSES = ['general'] as const

export const donationsRoute = new Hono<{ Variables: AppVariables }>()

/** Link the donation to an account if the donor is signed in; never required. */
async function optionalUserId(authHeader: string | undefined): Promise<string | null> {
  const token = authHeader?.replace('Bearer ', '')
  if (!token) return null
  try {
    const payload = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY! })
    const [u] = await db.select({ id: users.id }).from(users).where(eq(users.clerkId, payload.sub)).limit(1)
    return u?.id ?? null
  } catch {
    return null
  }
}

// ── POST /donations/checkout — public ─────────────────────────────────────
// Creates a pending record, asks Flutterwave for a hosted checkout link.

donationsRoute.post('/checkout', async (c) => {
  const body = await c.req.json<{
    amount: number; currency?: string; name?: string; email: string
    message?: string; anonymous?: boolean; purpose?: string
  }>().catch(() => null)

  if (!body) return c.json({ error: 'Invalid request' }, 400)

  const currency = (body.currency ?? 'KES').toUpperCase()
  const limits = LIMITS[currency]
  if (!limits) return c.json({ error: 'Unsupported currency' }, 400)

  const amount = Number(body.amount)
  if (!Number.isFinite(amount) || amount < limits.min || amount > limits.max) {
    return c.json({ error: `Amount must be between ${limits.min} and ${limits.max} ${currency}` }, 400)
  }

  const email = body.email?.trim().toLowerCase()
  if (!email || !EMAIL_RE.test(email)) return c.json({ error: 'A valid email is required for your receipt' }, 400)

  const name = body.name?.trim().slice(0, 120) || null
  const message = body.message?.trim().slice(0, 1000) || null
  const purpose = (PURPOSES as readonly string[]).includes(body.purpose ?? '') ? body.purpose! : 'general'
  const userId = await optionalUserId(c.req.header('Authorization'))
  const txRef = `cf_${crypto.randomUUID()}`

  const [row] = await db.insert(donations).values({
    txRef, userId, donorName: name, donorEmail: email,
    isAnonymous: !!body.anonymous, amount: amount.toFixed(2), currency, purpose, message,
  }).returning()

  try {
    const res = await fetch(`${FLW_BASE}/payments`, {
      method: 'POST',
      headers: flwHeaders(),
      body: JSON.stringify({
        tx_ref:       txRef,
        amount,
        currency,
        redirect_url: `${SITE}/give/thank-you`,
        customer:     { email, ...(name ? { name } : {}) },
        customizations: {
          title:       'Confessed',
          description: 'Support the work of Confessed',
          logo:        `${SITE}/icon.png`,
        },
        meta: { donation_id: row.id, purpose },
      }),
    })
    const json: any = await res.json()
    const link = json?.data?.link
    if (!res.ok || json?.status !== 'success' || !link) {
      console.error('[donations] Flutterwave init failed:', json)
      await db.update(donations).set({ status: 'failed' }).where(eq(donations.id, row.id))
      return c.json({ error: 'Could not start the payment. Please try again.' }, 502)
    }
    return c.json({ link, txRef })
  } catch (e) {
    console.error('[donations] Flutterwave init error:', e)
    await db.update(donations).set({ status: 'failed' }).where(eq(donations.id, row.id))
    return c.json({ error: 'Could not reach the payment provider. Please try again.' }, 502)
  }
})

// ── GET /donations/me — signed-in donor's own history ─────────────────────

donationsRoute.get('/me', requireAuth, async (c) => {
  const user = c.get('user')
  const rows = await db
    .select({
      id: donations.id, amount: donations.amount, currency: donations.currency,
      purpose: donations.purpose, paidAt: donations.paidAt, txRef: donations.txRef,
    })
    .from(donations)
    .where(sql`${donations.userId} = ${user.id} and ${donations.status} = 'successful'`)
    .orderBy(desc(donations.paidAt))
  return c.json({ donations: rows })
})

// ── GET /donations/admin — admin ledger ───────────────────────────────────

donationsRoute.get('/admin', requireAuth, requireRole('admin'), async (c) => {
  const rows = await db.select().from(donations).orderBy(desc(donations.createdAt)).limit(200)

  const totals = await db
    .select({
      currency: donations.currency,
      total:    sql<string>`coalesce(sum(${donations.amount}), 0)`,
      count:    sql<number>`count(*)`,
    })
    .from(donations)
    .where(eq(donations.status, 'successful'))
    .groupBy(donations.currency)

  return c.json({
    donations: rows,
    totals: totals.map((t) => ({ currency: t.currency, total: Number(t.total), count: Number(t.count) })),
  })
})

// ── GET /donations/verify/:txRef — public, used by the thank-you page ─────
// Re-checks with Flutterwave, so a forged redirect can't mark anything paid.

donationsRoute.get('/verify/:txRef', async (c) => {
  const txRef = c.req.param('txRef') as string
  const row = await settleDonation(txRef)
  if (!row) return c.json({ error: 'Donation not found' }, 404)
  return c.json({
    status:   row.status,
    amount:   Number(row.amount),
    currency: row.currency,
    name:     row.isAnonymous ? null : (row.donorName?.split(' ')[0] ?? null),
  })
})
