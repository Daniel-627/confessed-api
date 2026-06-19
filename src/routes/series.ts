// confessed-api/src/routes/series.ts
//
// Public endpoint — no auth required.
// Mount in your main app file with:
//   import { seriesRoute } from './routes/series.js'
//   app.route('/series', seriesRoute)

import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { db, series } from '../../db/src/index.js'
import type { AppVariables } from '../types/index.js'

export const seriesRoute = new Hono<{ Variables: AppVariables }>()

// GET /series — all series ordered by sortOrder
seriesRoute.get('/', async (c) => {
  const rows = await db
    .select()
    .from(series)
    .orderBy(series.sortOrder)

  return c.json({ series: rows })
})

// GET /series/:slug — single series by slug
seriesRoute.get('/:slug', async (c) => {
  const slug = c.req.param('slug')

  const [row] = await db
    .select()
    .from(series)
    .where(eq(series.slug, slug))
    .limit(1)

  if (!row) return c.json({ error: 'Series not found' }, 404)

  return c.json({ series: row })
})