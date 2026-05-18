import { Hono } from 'hono'
import { requireAuth, requireRole } from '../middleware/auth.js'
import {
  db,
  users,
  contributorProfiles,
  contributorApplications,
} from '../../db/src/index.js'
import { eq, and } from 'drizzle-orm'
import type { AppVariables } from '../types/index.js'

const contributors = new Hono<{ Variables: AppVariables }>()

// POST /contributors/apply
contributors.post('/apply', requireAuth, async (c) => {
  const user = c.get('user')
  const body = await c.req.json()

  // Check if user already has a pending application
  const existing = await db.query.contributorApplications.findFirst({
    where: and(
      eq(contributorApplications.userId, user.id),
      eq(contributorApplications.status, 'pending')
    ),
  })

  if (existing) {
    return c.json({ error: 'You already have a pending application' }, 400)
  }

  const [application] = await db
    .insert(contributorApplications)
    .values({
      userId: user.id,
      fullName: body.fullName,
      desiredTitle: body.desiredTitle,
      customTitle: body.customTitle,
      bio: body.bio,
      churchName: body.churchName,
      ministryName: body.ministryName,
      location: body.location,
      theologicalStatement: body.theologicalStatement,
      writingSamples: body.writingSamples,
      socialLinks: body.socialLinks,
      agreesToStandards: body.agreesToStandards,
      status: 'pending',
    })
    .returning()

  return c.json({ application }, 201)
})

// GET /contributors/:slug — public
contributors.get('/:slug', async (c) => {
  const slug = c.req.param('slug')

  const profile = await db.query.contributorProfiles.findFirst({
    where: and(
      eq(contributorProfiles.slug, slug),
      eq(contributorProfiles.isPublic, true)
    ),
  })

  if (!profile) {
    return c.json({ error: 'Contributor not found' }, 404)
  }

  return c.json({ profile })
})

// PUT /contributors/profile — contributor only
contributors.put(
  '/profile',
  requireAuth,
  requireRole('contributor', 'admin'),
  async (c) => {
    const user = c.get('user')
    const body = await c.req.json()

    const [updated] = await db
      .update(contributorProfiles)
      .set({
        fullName: body.fullName,
        bio: body.bio,
        photoUrl: body.photoUrl,
        churchName: body.churchName,
        ministryName: body.ministryName,
        location: body.location,
        twitterUrl: body.twitterUrl,
        youtubeUrl: body.youtubeUrl,
        websiteUrl: body.websiteUrl,
        instagramUrl: body.instagramUrl,
        isPublic: body.isPublic,
        updatedAt: new Date(),
      })
      .where(eq(contributorProfiles.userId, user.id))
      .returning()

    return c.json({ profile: updated })
  }
)

export default contributors