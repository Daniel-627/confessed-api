// Seeds article drafts from src/scripts/content/<file>.ts
// Usage:  npx tsx src/scripts/seed-articles.ts <file-without-extension>
// A content file exports EITHER { SERIES_SLUG, articles } (one series)
// OR { batches: [{ series, articles }] } (several series at once).
// Optional env: SEED_AUTHOR_EMAIL (defaults to the first admin user)
import 'dotenv/config'
import { eq } from 'drizzle-orm'
import { db, articles, series, users } from '../../db/src/index.js'

type Item = { order: number; title: string; slug: string; excerpt: string; tags: string[]; content: string }
type Batch = { series: string; articles: Item[] }

const fileArg = process.argv[2] ?? 'reasoned-grace'

async function main() {
  const mod: any = await import(`./content/${fileArg}.js`)
  const batches: Batch[] = mod.batches ?? [{ series: mod.SERIES_SLUG, articles: mod.articles }]

  const email = process.env.SEED_AUTHOR_EMAIL
  const [author] = email
    ? await db.select().from(users).where(eq(users.email, email)).limit(1)
    : await db.select().from(users).where(eq(users.role, 'admin')).limit(1)
  if (!author) throw new Error('No author found. Set SEED_AUTHOR_EMAIL to an existing user.')

  let created = 0
  let skipped = 0
  for (const b of batches) {
    const [s] = await db.select().from(series).where(eq(series.slug, b.series)).limit(1)
    if (!s) { console.log(`!! series "${b.series}" not found — run seed-series first`); continue }

    for (const a of [...b.articles].sort((x, y) => x.order - y.order)) {
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
      console.log(`create [${b.series}] ${a.slug}`)
    }
  }
  console.log(`Done. ${created} created, ${skipped} skipped.`)
  process.exit(0)
}

main().catch((e) => { console.error(e); process.exit(1) })
