// confessed-api/src/routes/newsletter.ts
//
// Mount in index.ts:
//   import { newsletterRoute } from './routes/newsletter.js'
//   app.route('/newsletter', newsletterRoute)

import { Hono } from 'hono'
import { eq, desc, sql } from 'drizzle-orm'
import { db, newsletterSubscribers } from '../../db/src/index.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { sendEmail } from '../lib/email.js'
import type { AppVariables } from '../types/index.js'

const RESEND_API_KEY   = process.env.RESEND_API_KEY!
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!

// ── Resend audience helpers ───────────────────────────────────────────────

async function resendAddContact(email: string, name?: string) {
  if (!RESEND_AUDIENCE_ID) return
  const [firstName, ...rest] = (name ?? '').trim().split(' ')
  await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      first_name:   firstName || undefined,
      last_name:    rest.join(' ') || undefined,
      unsubscribed: false,
    }),
  })
}

async function resendUnsubscribeContact(email: string) {
  if (!RESEND_AUDIENCE_ID) return
  await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, unsubscribed: true }),
  })
}

// ─────────────────────────────────────────────────────────────────────────

export const newsletterRoute = new Hono<{ Variables: AppVariables }>()

// ── POST /newsletter — public subscribe ───────────────────────────────────

newsletterRoute.post('/', async (c) => {
  const body = await c.req.json<{ email: string; name?: string; source?: string }>().catch(() => null)

  if (!body?.email?.trim()) {
    return c.json({ error: 'Email is required' }, 400)
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    return c.json({ error: 'Invalid email address' }, 400)
  }

  const email = body.email.trim().toLowerCase()

  // Check for existing subscriber
  const [existing] = await db
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.email, email))
    .limit(1)

  if (existing) {
    if (existing.isActive) {
      // Already subscribed — silently succeed (no double welcome email)
      return c.json({ success: true, alreadySubscribed: true })
    }
    // Previously unsubscribed — reactivate
    await db
      .update(newsletterSubscribers)
      .set({ isActive: true, unsubscribedAt: null })
      .where(eq(newsletterSubscribers.email, email))

    await Promise.all([
      resendAddContact(email, body.name?.trim()),
      sendEmail({
        to:   email,
        type: 'newsletter_welcome',
        data: { name: body.name?.trim() },
      }),
    ])

    return c.json({ success: true, resubscribed: true })
  }

  // New subscriber
  await db.insert(newsletterSubscribers).values({
    email,
    name:   body.name?.trim() ?? null,
    source: body.source ?? 'website',
  })

  await Promise.all([
    resendAddContact(email, body.name?.trim()),
    sendEmail({
      to:   email,
      type: 'newsletter_welcome',
      data: { name: body.name?.trim() },
    }),
  ])

  return c.json({ success: true })
})

// ── POST /newsletter/unsubscribe — public ─────────────────────────────────

newsletterRoute.post('/unsubscribe', async (c) => {
  const body = await c.req.json<{ email: string }>().catch(() => null)
  if (!body?.email?.trim()) return c.json({ error: 'Email is required' }, 400)

  const email = body.email.trim().toLowerCase()

  await Promise.all([
    db
      .update(newsletterSubscribers)
      .set({ isActive: false, unsubscribedAt: new Date() })
      .where(eq(newsletterSubscribers.email, email)),
    resendUnsubscribeContact(email),
  ])

  return c.json({ success: true })
})

// ── GET /newsletter/admin — admin only ────────────────────────────────────

newsletterRoute.get('/admin', requireAuth, requireRole('admin'), async (c) => {
  const activeOnly = c.req.query('active') !== 'false'

  const rows = await db
    .select()
    .from(newsletterSubscribers)
    .where(activeOnly ? eq(newsletterSubscribers.isActive, true) : undefined)
    .orderBy(desc(newsletterSubscribers.subscribedAt))

  const [{ total }] = await db
    .select({ total: sql<number>`count(*)` })
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.isActive, true))

  return c.json({ subscribers: rows, total: Number(total) })
})

// ── DELETE /newsletter/admin/:id — admin remove ───────────────────────────

newsletterRoute.delete('/admin/:id', requireAuth, requireRole('admin'), async (c) => {
  const id = c.req.param('id') as string

  // Get email first so we can sync to Resend
  const [row] = await db
    .select({ email: newsletterSubscribers.email })
    .from(newsletterSubscribers)
    .where(sql`${newsletterSubscribers.id} = ${id}`)
    .limit(1)

  await Promise.all([
    db
      .update(newsletterSubscribers)
      .set({ isActive: false, unsubscribedAt: new Date() })
      .where(sql`${newsletterSubscribers.id} = ${id}`),
    row ? resendUnsubscribeContact(row.email) : Promise.resolve(),
  ])

  return c.json({ success: true })
})