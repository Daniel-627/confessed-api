// scripts/seed-series.ts
// Run once after the series migration: tsx scripts/seed-series.ts
import { db, series } from '../../db/src/index.js'

const SERIES = [
  {
    name: 'Articles of Faith',
    slug: 'articles-of-faith',
    description: 'The flagship systematic theology series — a structured walk through every major Christian doctrine from a Reformed confessional standpoint.',
    verseReference: 'Ephesians 4:13',
    icon: '✝',
    sortOrder: 1,
  },
  {
    name: 'The 1689 Project',
    slug: 'the-1689-project',
    description: 'Article by article through the Second London Baptist Confession of Faith — exegetical grounding, historical context, and practical application.',
    verseReference: '2 Timothy 1:13',
    icon: '📜',
    sortOrder: 2,
  },
  {
    name: 'Iron & Ink',
    slug: 'iron-and-ink',
    description: 'Apologetics in practice — equipping believers to defend the faith against every competing worldview.',
    verseReference: '1 Peter 3:15',
    icon: '⚔',
    sortOrder: 3,
  },
  {
    name: 'Other Paths',
    slug: 'other-paths',
    description: 'Careful, irenic engagement with other Christian traditions — always steel-manning the opposing view before responding.',
    verseReference: 'Jude 1:3',
    icon: '🛤',
    sortOrder: 4,
  },
  {
    name: 'Reasoned Grace',
    slug: 'reasoned-grace',
    description: 'The front door of Confessed — intellectually rigorous, gospel-centred content for the honest non-believer.',
    verseReference: 'Isaiah 1:18',
    icon: '🕊',
    sortOrder: 5,
  },
  {
    name: 'The Particular Path',
    slug: 'the-particular-path',
    description: 'The story of Reformed Baptist Christianity — from the English Particular Baptists to today.',
    verseReference: 'Jeremiah 6:16',
    icon: '🏛',
    sortOrder: 6,
  },
  {
    name: 'Daily Office',
    slug: 'daily-office',
    description: 'Short daily devotionals tied to a structured Bible reading plan.',
    verseReference: 'Psalm 119:105',
    icon: '🕯',
    sortOrder: 7,
  },
  {
    name: 'Consistent Truth',
    slug: 'consistent-truth',
    description: 'Cultural commentary from a Reformed worldview — examining current events, philosophy, and ethics through Scripture.',
    verseReference: '2 Corinthians 10:5',
    icon: '🔍',
    sortOrder: 8,
  },
]

async function seed() {
  for (const s of SERIES) {
    await db.insert(series).values(s).onConflictDoNothing()
    console.log(`✓ ${s.name}`)
  }
  console.log('Done seeding series.')
}

seed().then(() => process.exit(0)).catch((err) => {
  console.error(err)
  process.exit(1)
})
