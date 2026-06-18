// db/src/schema/series.ts
import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const series = pgTable('series', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  verseReference: text('verse_reference'),
  icon: text('icon'), // emoji or icon identifier
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})
