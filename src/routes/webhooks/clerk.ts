import { Webhook } from 'svix'
import type { Context } from 'hono'
import { db, users, userPreferences } from '../../../db/src/index.js'
import { eq } from 'drizzle-orm'

export async function handleClerkWebhook(c: Context) {
  const body = await c.req.text()
  const headers = {
    'svix-id': c.req.header('svix-id')!,
    'svix-timestamp': c.req.header('svix-timestamp')!,
    'svix-signature': c.req.header('svix-signature')!,
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)

  let event: any

  try {
    event = wh.verify(body, headers)
  } catch {
    return c.json({ error: 'Invalid webhook signature' }, 400)
  }

  if (event.type === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = event.data
    const email = email_addresses[0]?.email_address

    const [user] = await db
      .insert(users)
      .values({
        clerkId: id,
        email,
        emailVerified:
          email_addresses[0]?.verification?.status === 'verified',
        displayName:
          [first_name, last_name].filter(Boolean).join(' ') || null,
        avatarUrl: image_url,
        role: 'regular',
      })
      .returning()

    await db.insert(userPreferences).values({ userId: user.id })
  }

  if (event.type === 'session.created') {
    const { user_id } = event.data

    await db
      .update(users)
      .set({ lastSeenAt: new Date() })
      .where(eq(users.clerkId, user_id))
  }

  return c.json({ received: true })
}