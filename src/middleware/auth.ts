import { verifyToken } from '@clerk/backend'
import type { Context, Next } from 'hono'
import { db, users } from '../../db/src'
import { eq } from 'drizzle-orm'
import type { AppVariables } from '../types'

export async function requireAuth(
  c: Context<{ Variables: AppVariables }>,
  next: Next
) {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return c.json({ error: 'Unauthorized' }, 401)

  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    })
    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, payload.sub),
    })
    if (!user || !user.isActive) return c.json({ error: 'Unauthorized' }, 401)
    c.set('user', user)
    await next()
  } catch {
    return c.json({ error: 'Invalid token' }, 401)
  }
}

export function requireRole(...roles: ('regular' | 'contributor' | 'admin')[]) {
  return async (c: Context<{ Variables: AppVariables }>, next: Next) => {
    const user = c.get('user')
    if (!roles.includes(user.role)) {
      return c.json({ error: 'Forbidden' }, 403)
    }
    await next()
  }
}