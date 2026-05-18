import { Hono } from 'hono'
import { requireAuth } from '../middleware/auth.js'
import { db, users, userPreferences } from '../../db/src/index.js'
import { eq } from 'drizzle-orm'
import type { AppVariables } from '../types/index.js'

const me = new Hono<{ Variables: AppVariables }>()

me.get('/', requireAuth, async (c) => {
  const user = c.get('user')
  const preferences = await db.query.userPreferences.findFirst({
    where: eq(userPreferences.userId, user.id),
  })
  return c.json({ user, preferences })
})

me.put('/', requireAuth, async (c) => {
  const user = c.get('user')
  const body = await c.req.json()

  const [updated] = await db
    .update(users)
    .set({
      displayName: body.displayName,
      avatarUrl: body.avatarUrl,
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id))
    .returning()

  return c.json({ user: updated })
})

me.get('/preferences', requireAuth, async (c) => {
  const user = c.get('user')
  const preferences = await db.query.userPreferences.findFirst({
    where: eq(userPreferences.userId, user.id),
  })
  return c.json({ preferences })
})

me.put('/preferences', requireAuth, async (c) => {
  const user = c.get('user')
  const body = await c.req.json()

  const [updated] = await db
    .update(userPreferences)
    .set({
      theme: body.theme,
      bibleTranslation: body.bibleTranslation,
      dailyOfficeTime: body.dailyOfficeTime,
      notificationsPush: body.notificationsPush,
      notificationsEmail: body.notificationsEmail,
      language: body.language,
      timezone: body.timezone,
      updatedAt: new Date(),
    })
    .where(eq(userPreferences.userId, user.id))
    .returning()

  return c.json({ preferences: updated })
})

export default me