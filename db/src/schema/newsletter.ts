// db/src/schema/newsletter.ts
import {
  pgTable, uuid, text, boolean, timestamp, uniqueIndex, index,
} from 'drizzle-orm/pg-core'

export const newsletterSubscribers = pgTable(
  'newsletter_subscribers',
  {
    id:             uuid('id').primaryKey().defaultRandom(),
    email:          text('email').unique().notNull(),
    name:           text('name'),
    isActive:       boolean('is_active').default(true),
    source:         text('source').default('website'),
    subscribedAt:   timestamp('subscribed_at',   { withTimezone: true }).defaultNow(),
    unsubscribedAt: timestamp('unsubscribed_at', { withTimezone: true }),
  },
  (t) => ({
    emailIdx:  uniqueIndex('idx_newsletter_email').on(t.email),
    activeIdx: index('idx_newsletter_active').on(t.isActive),
  })
)
