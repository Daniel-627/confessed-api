import { Hono } from 'hono'
import { requireAuth, requireRole } from '../middleware/auth.js'
import {
  db,
  articles,
  series,
  users,
  auditLog,
} from '../../db/src/index.js'
import { eq, and, desc, sql } from 'drizzle-orm'
import type { AppVariables } from '../types/index.js'

const articlesRouter = new Hono<{ Variables: AppVariables }>()

// ──────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200)) // ~200 wpm
}

// ──────────────────────────────────────────────────────────
// GET /articles — public, published only
// Query params: ?series=slug  ?tag=word  ?limit=20  ?offset=0
// ──────────────────────────────────────────────────────────
articlesRouter.get('/', async (c) => {
  const seriesSlug = c.req.query('series')
  const limit = Math.min(Number(c.req.query('limit')) || 20, 50)
  const offset = Number(c.req.query('offset')) || 0

  let seriesId: string | undefined

  if (seriesSlug) {
    const matchedSeries = await db.query.series.findFirst({
      where: eq(series.slug, seriesSlug),
    })
    if (!matchedSeries) return c.json({ articles: [], total: 0 })
    seriesId = matchedSeries.id
  }

  const whereClause = seriesId
    ? and(eq(articles.status, 'published'), eq(articles.seriesId, seriesId))
    : eq(articles.status, 'published')

  const results = await db.query.articles.findMany({
    where: whereClause,
    orderBy: [desc(articles.publishedAt)],
    limit,
    offset,
    with: {
      // if you've defined relations; otherwise we fetch author/series separately below
    },
  })

  // Attach author display name + series info (simple manual join since relations may not be configured)
  const enriched = await Promise.all(
    results.map(async (article) => {
      const author = await db.query.users.findFirst({
        where: eq(users.id, article.authorId),
        columns: { id: true, displayName: true, avatarUrl: true },
      })
      const seriesInfo = article.seriesId
        ? await db.query.series.findFirst({ where: eq(series.id, article.seriesId) })
        : null

      return { ...article, author, series: seriesInfo }
    })
  )

  return c.json({ articles: enriched })
})

// ──────────────────────────────────────────────────────────
// GET /articles/mine — contributor's own articles, all statuses
// IMPORTANT: must be defined BEFORE /:slug
// ──────────────────────────────────────────────────────────
articlesRouter.get('/mine', requireAuth, requireRole('contributor', 'admin'), async (c) => {
  const user = c.get('user')

  const results = await db.query.articles.findMany({
    where: eq(articles.authorId, user.id),
    orderBy: [desc(articles.updatedAt)],
  })

  return c.json({ articles: results })
})

// ──────────────────────────────────────────────────────────
// GET /articles/:slug — public detail, increments view count
// ──────────────────────────────────────────────────────────
articlesRouter.get('/:slug', async (c) => {
  const slug = c.req.param('slug')

  const article = await db.query.articles.findFirst({
    where: eq(articles.slug, slug),
  })

  if (!article) return c.json({ error: 'Article not found' }, 404)

  // Only show published articles publicly. Authors/admins can preview drafts
  // via a separate authenticated check if needed later.
  if (article.status !== 'published') {
    return c.json({ error: 'Article not found' }, 404)
  }

  // Increment view count (fire and forget — don't block response)
  db.update(articles)
    .set({ viewCount: sql`${articles.viewCount} + 1` })
    .where(eq(articles.id, article.id))
    .catch(() => {})

  const author = await db.query.users.findFirst({
    where: eq(users.id, article.authorId),
    columns: { id: true, displayName: true, avatarUrl: true },
  })

  const seriesInfo = article.seriesId
    ? await db.query.series.findFirst({ where: eq(series.id, article.seriesId) })
    : null

  return c.json({ article: { ...article, author, series: seriesInfo } })
})

// ──────────────────────────────────────────────────────────
// POST /articles — create (contributor/admin)
// ──────────────────────────────────────────────────────────
articlesRouter.post('/', requireAuth, requireRole('contributor', 'admin'), async (c) => {
  const user = c.get('user')
  const body = await c.req.json().catch(() => ({}))

  if (!body.title || !body.content) {
    return c.json({ error: 'Title and content are required' }, 400)
  }

  const baseSlug = slugify(body.title)
  let slug = baseSlug
  let suffix = 1

  // Ensure slug uniqueness
  while (await db.query.articles.findFirst({ where: eq(articles.slug, slug) })) {
    slug = `${baseSlug}-${suffix}`
    suffix++
  }

  const status = body.status === 'published' ? 'published' : 'draft'

  const [article] = await db
    .insert(articles)
    .values({
      authorId: user.id,
      seriesId: body.seriesId ?? null,
      title: body.title,
      slug,
      excerpt: body.excerpt ?? null,
      content: body.content,
      coverImageUrl: body.coverImageUrl ?? null,
      status,
      tags: body.tags ?? [],
      readingTimeMinutes: estimateReadingTime(body.content),
      publishedAt: status === 'published' ? new Date() : null,
    })
    .returning()

  return c.json({ article }, 201)
})

// ──────────────────────────────────────────────────────────
// PUT /articles/:id — edit (author or admin)
// ──────────────────────────────────────────────────────────
articlesRouter.put('/:id', requireAuth, async (c) => {
  const id = c.req.param('id')
  const user = c.get('user')
  const body = await c.req.json().catch(() => ({}))

  const existing = await db.query.articles.findFirst({
    where: eq(articles.id, id),
  })

  if (!existing) return c.json({ error: 'Article not found' }, 404)

  const isOwner = existing.authorId === user.id
  const isAdmin = user.role === 'admin'

  if (!isOwner && !isAdmin) {
    return c.json({ error: 'Forbidden' }, 403)
  }

  // If slug-changing title, regenerate slug
  let slug = existing.slug
  if (body.title && body.title !== existing.title) {
    const baseSlug = slugify(body.title)
    slug = baseSlug
    let suffix = 1
    while (true) {
      const conflict = await db.query.articles.findFirst({ where: eq(articles.slug, slug) })
      if (!conflict || conflict.id === id) break
      slug = `${baseSlug}-${suffix}`
      suffix++
    }
  }

  const newStatus = body.status ?? existing.status
  const wasPublished = existing.status === 'published'
  const isNowPublished = newStatus === 'published'

  const [updated] = await db
    .update(articles)
    .set({
      title: body.title ?? existing.title,
      slug,
      seriesId: body.seriesId !== undefined ? body.seriesId : existing.seriesId,
      excerpt: body.excerpt !== undefined ? body.excerpt : existing.excerpt,
      content: body.content ?? existing.content,
      coverImageUrl: body.coverImageUrl !== undefined ? body.coverImageUrl : existing.coverImageUrl,
      status: newStatus,
      tags: body.tags ?? existing.tags,
      readingTimeMinutes: body.content ? estimateReadingTime(body.content) : existing.readingTimeMinutes,
      publishedAt: !wasPublished && isNowPublished ? new Date() : existing.publishedAt,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id))
    .returning()

  return c.json({ article: updated })
})

// ──────────────────────────────────────────────────────────
// DELETE /articles/:id — author or admin
// ──────────────────────────────────────────────────────────
articlesRouter.delete('/:id', requireAuth, async (c) => {
  const id = c.req.param('id')
  const user = c.get('user')

  const existing = await db.query.articles.findFirst({
    where: eq(articles.id, id),
  })

  if (!existing) return c.json({ error: 'Article not found' }, 404)

  const isOwner = existing.authorId === user.id
  const isAdmin = user.role === 'admin'

  if (!isOwner && !isAdmin) {
    return c.json({ error: 'Forbidden' }, 403)
  }

  await db.delete(articles).where(eq(articles.id, id))

  return c.json({ success: true })
})

export default articlesRouter