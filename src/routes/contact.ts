// confessed-api/src/routes/contact.ts
//
// Public endpoint — no auth required.
// Mount in index.ts with:
//   import { contactRoute } from './routes/contact.js'
//   app.route('/contact', contactRoute)

import { Hono } from 'hono'
import { sendEmail } from '../lib/email.js'
import type { AppVariables } from '../types/index.js'

export const contactRoute = new Hono<{ Variables: AppVariables }>()

// POST /contact
contactRoute.post('/', async (c) => {
  const body = await c.req.json<{
    name:    string
    email:   string
    reason?: string
    message: string
  }>().catch(() => null)

  if (!body || !body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return c.json({ error: 'name, email, and message are required' }, 400)
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    return c.json({ error: 'Invalid email address' }, 400)
  }

  // Fire both emails — notify inbox + confirm to sender
  await Promise.all([
    sendEmail({
      type: 'contact_received',
      to:   'hello@confessed.faith',
      data: {
        name:    body.name.trim(),
        email:   body.email.trim(),
        reason:  body.reason ?? '',
        message: body.message.trim(),
      },
    }),
    sendEmail({
      type: 'contact_confirmation',
      to:   body.email.trim(),
      data: { name: body.name.trim() },
    }),
  ])

  return c.json({ success: true })
})
