import { Hono } from 'hono'
import { requireAuth, requireRole } from '../middleware/auth.js'
import {
  db,
  users,
  contributorApplications,
  contributorProfiles,
  auditLog,
  articles,
} from '../../db/src/index.js'
import { eq } from 'drizzle-orm'
import type { AppVariables } from '../types/index.js'
import { sendEmail } from '../lib/email.js'

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

// PUT /admin/users/:id/reactivate
admin.put('/users/:id/reactivate', async (c) => {
  const id = c.req.param('id')
  const actor = c.get('user')

  const [updated] = await db
    .update(users)
    .set({ isActive: true, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning()

  if (!updated) return c.json({ error: 'User not found' }, 404)

  await db.insert(auditLog).values({
    userId: id,
    actorId: actor.id,
    eventType: 'user_reactivated',
    metadata: {},
  })

  return c.json({ success: true })
})

// PUT /admin/users/:id/role
admin.put('/users/:id/role', async (c) => {
  const id = c.req.param('id')
  const actor = c.get('user')
  const body = await c.req.json().catch(() => ({}))

  const newRole = body.role as 'regular' | 'contributor' | 'admin' | undefined

  if (!newRole || !['regular', 'contributor', 'admin'].includes(newRole)) {
    return c.json({ error: 'Invalid role. Must be regular, contributor, or admin.' }, 400)
  }

  // Prevent admin from demoting themselves — avoids accidental lockout
  if (id === actor.id && newRole !== 'admin') {
    return c.json({ error: 'You cannot change your own role.' }, 400)
  }

  const targetUser = await db.query.users.findFirst({
    where: eq(users.id, id),
  })

  if (!targetUser) return c.json({ error: 'User not found' }, 404)

  const oldRole = targetUser.role

  if (oldRole === newRole) {
    return c.json({ error: `User already has role: ${newRole}` }, 400)
  }

  // Update the role
  await db
    .update(users)
    .set({ role: newRole, updatedAt: new Date() })
    .where(eq(users.id, id))

  // If promoting to contributor and no profile exists yet, create one
  if (newRole === 'contributor') {
    const existingProfile = await db.query.contributorProfiles.findFirst({
      where: eq(contributorProfiles.userId, id),
    })

    if (!existingProfile) {
      const slug = (targetUser.displayName ?? targetUser.email.split('@')[0])
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

      await db.insert(contributorProfiles).values({
        userId: id,
        fullName: targetUser.displayName ?? targetUser.email,
        title: 'other',
        bio: '',
        isPublic: false, // admin-promoted profiles start private until filled in
        slug,
      })
    }
  }

  // Write audit log — role_changed event from your schema
  await db.insert(auditLog).values({
    userId: id,
    actorId: actor.id,
    eventType: 'role_changed',
    metadata: { from: oldRole, to: newRole, method: 'admin_direct' },
  })

  // Notify the user via email on promotion to contributor
  if (newRole === 'contributor' && oldRole !== 'contributor') {
    await sendEmail({
      to: targetUser.email,
      type: 'contributor_approved',
      data: {
        fullName: targetUser.displayName ?? targetUser.email,
        reason: 'An administrator has granted you contributor access.',
      },
    })
  }

  return c.json({
    success: true,
    user: { id, oldRole, newRole },
  })
})

// GET /admin/articles — list all articles regardless of status (admin oversight)
admin.get('/articles', async (c) => {
  const allArticles = await db.query.articles.findMany({
    orderBy: (a, { desc }) => [desc(a.createdAt)],
  })
  return c.json({ articles: allArticles })
})

// PUT /admin/articles/:id/suspend
admin.put('/articles/:id/suspend', async (c) => {
  const id = c.req.param('id')
  const actor = c.get('user')
  const body = await c.req.json().catch(() => ({}))

  const article = await db.query.articles.findFirst({
    where: eq(articles.id, id),
  })

  if (!article) return c.json({ error: 'Article not found' }, 404)
  if (article.status === 'suspended') {
    return c.json({ error: 'Article is already suspended' }, 400)
  }

  await db
    .update(articles)
    .set({
      status: 'suspended',
      suspendedBy: actor.id,
      suspendedAt: new Date(),
      suspensionReason: body.reason ?? null,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id))

  await db.insert(auditLog).values({
    userId: article.authorId,
    actorId: actor.id,
    eventType: 'article_suspended',
    metadata: { articleId: id, reason: body.reason ?? null },
  })

  return c.json({ success: true })
})

// PUT /admin/articles/:id/reinstate — undo a suspension
admin.put('/articles/:id/reinstate', async (c) => {
  const id = c.req.param('id')
  const actor = c.get('user')

  const article = await db.query.articles.findFirst({
    where: eq(articles.id, id),
  })

  if (!article) return c.json({ error: 'Article not found' }, 404)
  if (article.status !== 'suspended') {
    return c.json({ error: 'Article is not suspended' }, 400)
  }

  await db
    .update(articles)
    .set({
      status: 'published',
      suspendedBy: null,
      suspendedAt: null,
      suspensionReason: null,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id))

  await db.insert(auditLog).values({
    userId: article.authorId,
    actorId: actor.id,
    eventType: 'article_reinstated',
    metadata: { articleId: id },
  })

  return c.json({ success: true })
})

admin.post('/send-email', async (c) => {
  const actor = c.get('user')
  const body  = await c.req.json<{
    userIds:  string[]           // one or more user IDs from the users table
    type:     string             // EmailType
    subject?: string             // required for 'custom'
    body?:    string             // required for 'custom'
  }>().catch(() => null)

  if (!body || !body.userIds?.length || !body.type) {
    return c.json({ error: 'userIds and type are required' }, 400)
  }

  const ALLOWED_TYPES = [
    'welcome',
    'contributor_approved',
    'contributor_rejected',
    'contributor_application_received',
    'custom',
  ]

  if (!ALLOWED_TYPES.includes(body.type)) {
    return c.json({ error: `Invalid type. Allowed: ${ALLOWED_TYPES.join(', ')}` }, 400)
  }

  if (body.type === 'custom' && (!body.subject?.trim() || !body.body?.trim())) {
    return c.json({ error: 'subject and body are required for custom emails' }, 400)
  }

  // Fetch all target users
  const targetUsers = await db
    .select({ id: users.id, email: users.email, displayName: users.displayName })
    .from(users)
    .where(sql`${users.id} = ANY(${body.userIds})`)

  if (!targetUsers.length) {
    return c.json({ error: 'No matching users found' }, 404)
  }

  const results: { email: string; ok: boolean; error?: string }[] = []

  for (const u of targetUsers) {
    try {
      const name = u.displayName ?? u.email

      if (body.type === 'custom') {
        await sendEmail({
          to:   u.email,
          type: 'custom',
          data: {
            subject:       body.subject!,
            body:          body.body!,
            recipientName: name,
          },
        })
      } else if (body.type === 'welcome') {
        await sendEmail({ to: u.email, type: 'welcome', data: { fullName: name } })
      } else if (body.type === 'contributor_application_received') {
        await sendEmail({ to: u.email, type: 'contributor_application_received', data: { fullName: name } })
      } else if (body.type === 'contributor_approved') {
        await sendEmail({ to: u.email, type: 'contributor_approved', data: { fullName: name, reason: null } })
      } else if (body.type === 'contributor_rejected') {
        await sendEmail({ to: u.email, type: 'contributor_rejected', data: { fullName: name, reason: 'See previous correspondence.' } })
      }

      results.push({ email: u.email, ok: true })

      // Write audit log
      await db.insert(auditLog).values({
        userId:    u.id,
        actorId:   actor.id,
        eventType: 'email_sent',
        metadata:  { type: body.type, subject: body.subject ?? body.type },
      })
    } catch (e: any) {
      results.push({ email: u.email, ok: false, error: e.message })
    }
  }

  const failed = results.filter(r => !r.ok)
  return c.json({
    sent:   results.filter(r => r.ok).length,
    failed: failed.length,
    results,
  })
})


export default admin