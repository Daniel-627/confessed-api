// db/src/schema/donations.ts
import {
  pgTable, pgEnum, uuid, text, numeric, boolean, timestamp, index,
} from 'drizzle-orm/pg-core'
import { users } from './auth.js'

export const donationStatusEnum = pgEnum('donation_status', [
  'pending',
  'successful',
  'failed',
])

export const donations = pgTable(
  'donations',
  {
    id:                uuid('id').primaryKey().defaultRandom(),
    // Our own reference, sent to the payment provider. Unguessable (uuid).
    txRef:             text('tx_ref').unique().notNull(),
    provider:          text('provider').notNull().default('paystack'),
    userId:            uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    donorName:         text('donor_name'),
    donorEmail:        text('donor_email').notNull(),
    isAnonymous:       boolean('is_anonymous').default(false).notNull(),
    amount:            numeric('amount', { precision: 12, scale: 2 }).notNull(),
    currency:          text('currency').notNull().default('KES'),
    purpose:           text('purpose').notNull().default('general'),
    message:           text('message'),
    status:            donationStatusEnum('status').notNull().default('pending'),
    providerTransactionId: text('provider_transaction_id'),
    channel:           text('channel'), // card, mobile_money, ...
    createdAt:         timestamp('created_at',  { withTimezone: true }).defaultNow().notNull(),
    paidAt:            timestamp('paid_at',     { withTimezone: true }),
    receiptSentAt:     timestamp('receipt_sent_at', { withTimezone: true }),
  },
  (t) => ({
    statusIdx: index('idx_donations_status').on(t.status),
    userIdx:   index('idx_donations_user').on(t.userId),
    emailIdx:  index('idx_donations_email').on(t.donorEmail),
  })
)
