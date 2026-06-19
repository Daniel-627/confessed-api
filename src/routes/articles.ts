// confessed-api/src/routes/articles.ts
import { Hono } from 'hono'
import { eq, and, desc, sql } from 'drizzle-orm'
import { db, articles, series } from '../../db/src/index.js'
import { requireAuth } from '../middleware/auth.js'
import type { AppVariables } from '../types/index.js'

export const articlesRoute = new Hono<{ Variables: AppVariables }>()

// ── helpers ────────────────────────────────────────────────────────────────

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base || 'article'
  let attempt = 1
  while (true) {
    const [existing] = await db
      .select({ id: articles.id })
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1)
    if (!existing) return slug
    attempt += 1
    slug = `${base}-${attempt}`
  }
}

function estimateReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

// ── GET /articles — public, published only ────────────────────────────────

articlesRoute.get('/', async (c) => {
  const seriesSlug = c.req.query('series')
  const tag        = c.req.query('tag')
  const limit      = Math.min(Number(c.req.query('limit')) || 20, 50)
  const offset     = Math.max(Number(c.req.query('offset')) || 0, 0)

  let seriesIdFilter: string | undefined
  if (seriesSlug) {
    const [s] = await db
      .select({ id: series.id })
      .from(series)
      .where(eq(series.slug, seriesSlug))
      .limit(1)
    if (!s) return c.json({ articles: [], limit, offset })
    seriesIdFilter = s.id
  }

  const rows = await db
    .select({
      id:                 articles.id,
      title:              articles.title,
      slug:               articles.slug,
      excerpt:            articles.excerpt,
      coverImageUrl:      articles.coverImageUrl,
      tags:               articles.tags,
      readingTimeMinutes: articles.readingTimeMinutes,
      viewCount:          articles.viewCount,
      publishedAt:        articles.publishedAt,
      authorId:           articles.authorId,
      series: {
        id:   series.id,
        name: series.name,
        slug: series.slug,
        icon: series.icon,
      },
    })
    .from(articles)
    .leftJoin(series, eq(articles.seriesId, series.id))
    .where(
      and(
        eq(articles.status, 'published'),
        seriesIdFilter !== undefined
          ? sql`${articles.seriesId} = ${seriesIdFilter}`
          : undefined,
        tag !== undefined
          ? sql`${tag} = ANY(${articles.tags})`
          : undefined,
      )
    )
    .orderBy(desc(articles.publishedAt))
    .limit(limit)
    .offset(offset)

  return c.json({ articles: rows, limit, offset })
})

// ── GET /articles/mine — auth required ────────────────────────────────────

articlesRoute.get('/mine', requireAuth, async (c) => {
  const user = c.get('user')

  const rows = await db
    .select()
    .from(articles)
    .where(eq(articles.authorId, user.id))
    .orderBy(desc(articles.updatedAt))

  return c.json({ articles: rows })
})

// ── GET /articles/:slug — public, published only ──────────────────────────

articlesRoute.get('/:slug', async (c) => {
  const slug = c.req.param('slug') as string

  const [article] = await db
    .select({
      id:                 articles.id,
      title:              articles.title,
      slug:               articles.slug,
      excerpt:            articles.excerpt,
      content:            articles.content,
      coverImageUrl:      articles.coverImageUrl,
      tags:               articles.tags,
      readingTimeMinutes: articles.readingTimeMinutes,
      viewCount:          articles.viewCount,
      publishedAt:        articles.publishedAt,
      authorId:           articles.authorId,
      series: {
        id:   series.id,
        name: series.name,
        slug: series.slug,
        icon: series.icon,
      },
    })
    .from(articles)
    .leftJoin(series, eq(articles.seriesId, series.id))
    .where(and(
      sql`${articles.slug} = ${slug}`,
      eq(articles.status, 'published'),
    ))
    .limit(1)

  if (!article) return c.json({ error: 'Article not found' }, 404)

  const [{ viewCount }] = await db
    .update(articles)
    .set({ viewCount: sql`${articles.viewCount} + 1` })
    .where(sql`${articles.id} = ${article.id}`)
    .returning({ viewCount: articles.viewCount })

  return c.json({ article: { ...article, viewCount } })
})

// ── POST /articles — contributor or admin ─────────────────────────────────

articlesRoute.post('/', requireAuth, async (c) => {
  const user = c.get('user')

  if (user.role !== 'contributor' && user.role !== 'admin') {
    return c.json({ error: 'Forbidden' }, 403)
  }

  const body = await c.req.json<{
    title:          string
    content:        string
    seriesId?:      string
    excerpt?:       string
    coverImageUrl?: string
    tags?:          string[]
    status?:        'draft' | 'published'
  }>()

  if (!body.title?.trim() || !body.content?.trim()) {
    return c.json({ error: 'title and content are required' }, 400)
  }

  const slug   = await uniqueSlug(slugify(body.title))
  const status = body.status === 'published' ? 'published' : 'draft'

  const [created] = await db
    .insert(articles)
    .values({
      authorId:           user.id,
      seriesId:           body.seriesId ?? null,
      title:              body.title.trim(),
      slug,
      excerpt:            body.excerpt?.trim() ?? null,
      content:            body.content,
      coverImageUrl:      body.coverImageUrl ?? null,
      tags:               body.tags ?? [],
      readingTimeMinutes: estimateReadingTime(body.content),
      status,
      publishedAt:        status === 'published' ? new Date() : null,
    })
    .returning()

  return c.json({ article: created }, 201)
})

// ── PUT /articles/:id — author or admin ───────────────────────────────────

articlesRoute.put('/:id', requireAuth, async (c) => {
  const user = c.get('user')
  const id   = c.req.param('id') as string

  const [existing] = await db
    .select()
    .from(articles)
    .where(sql`${articles.id} = ${id}`)
    .limit(1)

  if (!existing) return c.json({ error: 'Article not found' }, 404)

  const isOwner = existing.authorId === user.id
  const isAdmin = user.role === 'admin'
  if (!isOwner && !isAdmin) return c.json({ error: 'Forbidden' }, 403)

  const body = await c.req.json<Partial<{
    title:         string
    content:       string
    seriesId:      string | null
    excerpt:       string | null
    coverImageUrl: string | null
    tags:          string[]
    status:        'draft' | 'published' | 'archived'
  }>>()

  const updates: Record<string, unknown> = { updatedAt: new Date() }
  if (body.title         !== undefined) updates.title              = body.title.trim()
  if (body.content       !== undefined) {
    updates.content            = body.content
    updates.readingTimeMinutes = estimateReadingTime(body.content)
  }
  if (body.seriesId      !== undefined) updates.seriesId      = body.seriesId
  if (body.excerpt       !== undefined) updates.excerpt       = body.excerpt
  if (body.coverImageUrl !== undefined) updates.coverImageUrl = body.coverImageUrl
  if (body.tags          !== undefined) updates.tags          = body.tags

  if (body.status !== undefined && body.status !== existing.status) {
    if (existing.status === 'suspended' && !isAdmin) {
      return c.json({ error: 'Suspended articles can only be changed by an admin' }, 403)
    }
    updates.status = body.status
    if (body.status === 'published' && !existing.publishedAt) {
      updates.publishedAt = new Date()
    }
  }

  const [updated] = await db
    .update(articles)
    .set(updates)
    .where(sql`${articles.id} = ${id}`)
    .returning()

  return c.json({ article: updated })
})

// ── DELETE /articles/:id — author or admin ────────────────────────────────

articlesRoute.delete('/:id', requireAuth, async (c) => {
  const user = c.get('user')
  const id   = c.req.param('id') as string

  const [existing] = await db
    .select()
    .from(articles)
    .where(sql`${articles.id} = ${id}`)
    .limit(1)

  if (!existing) return c.json({ error: 'Article not found' }, 404)

  const isOwner = existing.authorId === user.id
  const isAdmin = user.role === 'admin'
  if (!isOwner && !isAdmin) return c.json({ error: 'Forbidden' }, 403)

  await db.delete(articles).where(sql`${articles.id} = ${id}`)
  return c.json({ success: true })
})