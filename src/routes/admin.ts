import { Hono } from 'hono'
import { requireAuth, requireRole } from '../middleware/auth'
import {
  db,
  users,
  contributorApplications,
  contributorProfiles,
  auditLog,
} from '../../db/src'
import { eq } from 'drizzle-orm'
import type { AppVariables } from '../types'
import { sendEmail } from '../lib/email'

const admin = new Hono<{ Variables: AppVariables }>()

// All admin routes require auth + admin role
admin.use('*', requireAuth, requireRole('admin'))

// GET /admin/applications
admin.get('/applications', async (c) => {
  const applications = await db.query.contributorApplications.findMany({
    where: eq(contributorApplications.status, 'pending'),
  })
  return c.json({ applications })
})

// GET /admin/applications/:id
admin.get('/applications/:id', async (c) => {
  const id = c.req.param('id')
  const application = await db.query.contributorApplications.findFirst({
    where: eq(contributorApplications.id, id),
  })
  if (!application) return c.json({ error: 'Application not found' }, 404)
  return c.json({ application })
})

// POST /admin/applications/:id/approve
admin.post('/applications/:id/approve', async (c) => {
  const id = c.req.param('id')
  const actor = c.get('user')
  const body = await c.req.json().catch(() => ({}))

  const application = await db.query.contributorApplications.findFirst({
    where: eq(contributorApplications.id, id),
  })

  if (!application) return c.json({ error: 'Application not found' }, 404)
  if (application.status !== 'pending') {
    return c.json({ error: 'Application is not pending' }, 400)
  }

  // Update role to contributor
  await db
    .update(users)
    .set({ role: 'contributor', updatedAt: new Date() })
    .where(eq(users.id, application.userId))

  // Create contributor profile
  const slug = application.fullName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  await db.insert(contributorProfiles).values({
    userId: application.userId,
    fullName: application.fullName,
    title: application.desiredTitle,
    customTitle: application.customTitle,
    bio: application.bio,
    churchName: application.churchName ?? undefined,
    ministryName: application.ministryName ?? undefined,
    location: application.location ?? undefined,
    slug,
    isPublic: true,
  })

  // Update application status
  await db
    .update(contributorApplications)
    .set({
      status: 'approved',
      reviewedBy: actor.id,
      reviewedAt: new Date(),
      decisionReason: body.reason ?? null,
      updatedAt: new Date(),
    })
    .where(eq(contributorApplications.id, id))

  // Write audit log
  await db.insert(auditLog).values({
    userId: application.userId,
    actorId: actor.id,
    eventType: 'contributor_approved',
    metadata: { reason: body.reason ?? null },
  })

  // Send approval email
  const user = await db.query.users.findFirst({
    where: eq(users.id, application.userId),
  })

  if (user) {
    await sendEmail({
      to: user.email,
      type: 'contributor_approved',
      data: {
        fullName: application.fullName,
        reason: body.reason ?? null,
      },
    })
  }

  return c.json({ success: true })
})

// POST /admin/applications/:id/reject
admin.post('/applications/:id/reject', async (c) => {
  const id = c.req.param('id')
  const actor = c.get('user')
  const body = await c.req.json()

  if (!body.reason) {
    return c.json({ error: 'Reason is required for rejection' }, 400)
  }

  const application = await db.query.contributorApplications.findFirst({
    where: eq(contributorApplications.id, id),
  })

  if (!application) return c.json({ error: 'Application not found' }, 404)
  if (application.status !== 'pending') {
    return c.json({ error: 'Application is not pending' }, 400)
  }

  // Update application status
  await db
    .update(contributorApplications)
    .set({
      status: 'rejected',
      reviewedBy: actor.id,
      reviewedAt: new Date(),
      decisionReason: body.reason,
      updatedAt: new Date(),
    })
    .where(eq(contributorApplications.id, id))

  // Write audit log
  await db.insert(auditLog).values({
    userId: application.userId,
    actorId: actor.id,
    eventType: 'contributor_rejected',
    metadata: { reason: body.reason },
  })

  // Send rejection email
  const user = await db.query.users.findFirst({
    where: eq(users.id, application.userId),
  })

  if (user) {
    await sendEmail({
      to: user.email,
      type: 'contributor_rejected',
      data: {
        fullName: application.fullName,
        reason: body.reason,
      },
    })
  }

  return c.json({ success: true })
})

// GET /admin/users
admin.get('/users', async (c) => {
  const allUsers = await db.query.users.findMany()
  return c.json({ users: allUsers })
})

// PUT /admin/users/:id/suspend
admin.put('/users/:id/suspend', async (c) => {
  const id = c.req.param('id')
  const actor = c.get('user')

  const [updated] = await db
    .update(users)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning()

  if (!updated) return c.json({ error: 'User not found' }, 404)

  await db.insert(auditLog).values({
    userId: id,
    actorId: actor.id,
    eventType: 'user_suspended',
    metadata: {},
  })

  return c.json({ success: true })
})

export default admin