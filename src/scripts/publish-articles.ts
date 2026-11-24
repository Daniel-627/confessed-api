// Publishes the seeded drafts (matched by slug) from one or more content files.
// Usage: npx tsx src/scripts/publish-articles.ts reasoned-grace the-1689-project the-1689-project-2 ...
import 'dotenv/config'
import { and, eq, inArray } from 'drizzle-orm'
import { db, articles } from '../../db/src/index.js'

const files = process.argv.slice(2)
if (!files.length) { console.error('Pass at least one content file name.'); process.exit(1) }

async function main() {
  const slugs: string[] = []
  for (const f of files) {
    const mod: any = await import(`./content/${f}.js`)
    const batches = mod.batches ?? [{ articles: mod.articles }]
    for (const b of batches) for (const a of b.articles) slugs.push(a.slug)
  }

  const updated = await db
    .update(articles)
    .set({ status: 'published', publishedAt: new Date(), updatedAt: new Date() })
    .where(and(inArray(articles.slug, slugs), eq(articles.status, 'draft')))
    .returning({ slug: articles.slug })

  updated.forEach((r) => console.log(`published ${r.slug}`))
  console.log(`Done. ${updated.length} published (of ${slugs.length} in the files; others were already live or not seeded).`)
  process.exit(0)
}

main().catch((e) => { console.error(e); process.exit(1) })
