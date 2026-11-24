import 'dotenv/config'
// Seeds article drafts for a series from src/scripts/content/<file>.
// Usage:  npx tsx src/scripts/seed-articles.ts reasoned-grace
// Optional env: SEED_AUTHOR_EMAIL (defaults to the first admin user)
import { eq } from 'drizzle-orm'
import { db, articles, series, users } from '../../db/src/index.js'

const slugArg = process.argv[2] ?? 'reasoned-grace'

async function main() {
  const mod = await import(`./content/${slugArg}.js`)
  const { SERIES_SLUG, articles: items } = mod as {
    SERIES_SLUG: string
    articles: { order: number; title: string; slug: string; excerpt: string; tags: string[]; content: string }[]
  }

  const [s] = await db.select().from(series).where(eq(series.slug, SERIES_SLUG)).limit(1)
  if (!s) throw new Error(`Series "${SERIES_SLUG}" not found. Run seed-series first.`)

  const email = process.env.SEED_AUTHOR_EMAIL
  const [author] = email
    ? await db.select().from(users).where(eq(users.email, email)).limit(1)
    : await db.select().from(users).where(eq(users.role, 'admin')).limit(1)
  if (!author) throw new Error('No author found. Set SEED_AUTHOR_EMAIL to an existing user.')

  let created = 0
  let skipped = 0
  for (const a of items.sort((x, y) => x.order - y.order)) {
    const [exists] = await db.select({ id: articles.id }).from(articles).where(eq(articles.slug, a.slug)).limit(1)
    if (exists) { skipped++; console.log(`skip   ${a.slug}`); continue }
    const words = a.content.trim().split(/\s+/).length
    await db.insert(articles).values({
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      content: a.content,
      tags: a.tags,
      seriesId: s.id,
      authorId: author.id,
      status: 'draft',
      readingTimeMinutes: Math.max(1, Math.round(words / 200)),
      publishedAt: null,
    } as any)
    created++
    console.log(`create ${a.order}. ${a.slug}`)
  }
  console.log(`Done. ${created} created, ${skipped} skipped.`)
  process.exit(0)
}

main().catch((e) => { console.error(e); process.exit(1) })

