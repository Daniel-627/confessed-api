// db/src/schema/articles.ts
import {
  pgTable, pgEnum, uuid, text, integer,
  timestamp, index, uniqueIndex, primaryKey
} from 'drizzle-orm/pg-core'
import { users } from './auth.js'
import { series } from './series.js'

// ── Enum ───────────────────────────────────────────────────
export const articleStatusEnum = pgEnum('article_status', [
  'draft', 'published', 'suspended', 'archived'
])

// ── Tables ─────────────────────────────────────────────────
export const articles = pgTable('articles', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  seriesId: uuid('series_id')
    .references(() => series.id),

  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(), // markdown

  coverImageUrl: text('cover_image_url'), // Cloudinary, nullable

  status: articleStatusEnum('status').notNull().default('draft'),
  tags: text('tags').array().default([]),

  readingTimeMinutes: integer('reading_time_minutes'),
  viewCount: integer('view_count').default(0),

  suspendedBy: uuid('suspended_by').references(() => users.id),
  suspendedAt: timestamp('suspended_at', { withTimezone: true }),
  suspensionReason: text('suspension_reason'),

  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (t) => ({
  authorIdx: index('idx_articles_author').on(t.authorId),
  seriesIdx: index('idx_articles_series').on(t.seriesId),
  statusIdx: index('idx_articles_status').on(t.status),
  slugIdx: uniqueIndex('idx_articles_slug').on(t.slug),
}))

export const articleLikes = pgTable('article_likes', {
  userId: uuid('user_id').notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  articleId: uuid('article_id').notNull()
    .references(() => articles.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.articleId] }),
  articleIdx: index('idx_article_likes_article').on(t.articleId),
}))
