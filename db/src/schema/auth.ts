import {
  pgTable,
  pgEnum,
  uuid,
  text,
  boolean,
  timestamp,
  time,
  inet,
  jsonb,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core'

// Enums
export const userRoleEnum = pgEnum('user_role', [
  'regular',
  'contributor',
  'admin',
])

export const contributorTitleEnum = pgEnum('contributor_title', [
  'pastor',
  'evangelist',
  'apologist',
  'theologian',
  'elder',
  'deacon',
  'teacher',
  'author',
  'other',
])

export const applicationStatusEnum = pgEnum('application_status', [
  'pending',
  'approved',
  'rejected',
])

export const auditEventEnum = pgEnum('audit_event', [
  'user_signed_up',
  'user_signed_in',
  'user_signed_out',
  'user_email_verified',
  'user_password_changed',
  'user_password_reset_requested',
  'user_2fa_enabled',
  'user_2fa_disabled',
  'user_2fa_verified',
  'role_changed',
  'contributor_applied',
  'contributor_approved',
  'contributor_rejected',
  'user_suspended',
  'user_reactivated',
  'user_deleted',
  'profile_updated',
  'session_revoked',
  'all_sessions_revoked',
])

export const emailTypeEnum = pgEnum('email_type', [
  'email_verification',
  'password_reset',
  'contributor_application_received',
  'contributor_approved',
  'contributor_rejected',
  'daily_office_reminder',
  'donation_receipt',
  'order_confirmation',
  'order_shipped',
  'welcome',
])

// Tables
export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    clerkId: text('clerk_id').unique().notNull(),
    email: text('email').unique().notNull(),
    emailVerified: boolean('email_verified').default(false),
    displayName: text('display_name'),
    avatarUrl: text('avatar_url'),
    role: userRoleEnum('role').notNull().default('regular'),
    isActive: boolean('is_active').default(true),
    isDeleted: boolean('is_deleted').default(false),
    lastSeenAt: timestamp('last_seen_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (t) => ({
    clerkIdIdx: uniqueIndex('idx_users_clerk_id').on(t.clerkId),
    emailIdx: uniqueIndex('idx_users_email').on(t.email),
    roleIdx: index('idx_users_role').on(t.role),
  })
)

export const userPreferences = pgTable('user_preferences', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  theme: text('theme').default('dark'),
  bibleTranslation: text('bible_translation').default('WEB'),
  dailyOfficeTime: time('daily_office_time').default('06:00'),
  notificationsPush: boolean('notifications_push').default(true),
  notificationsEmail: boolean('notifications_email').default(true),
  language: text('language').default('en'),
  timezone: text('timezone').default('Africa/Nairobi'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const userDevices = pgTable('user_devices', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  deviceType: text('device_type').notNull(),
  pushToken: text('push_token').unique(),
  deviceName: text('device_name'),
  appVersion: text('app_version'),
  isActive: boolean('is_active').default(true),
  lastUsedAt: timestamp('last_used_at', { withTimezone: true }).defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const contributorProfiles = pgTable('contributor_profiles', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  fullName: text('full_name').notNull(),
  title: contributorTitleEnum('title').notNull(),
  customTitle: text('custom_title'),
  bio: text('bio'),
  photoUrl: text('photo_url'),
  churchName: text('church_name'),
  ministryName: text('ministry_name'),
  location: text('location'),
  twitterUrl: text('twitter_url'),
  youtubeUrl: text('youtube_url'),
  websiteUrl: text('website_url'),
  instagramUrl: text('instagram_url'),
  isPublic: boolean('is_public').default(true),
  slug: text('slug').unique().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const contributorApplications = pgTable('contributor_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  fullName: text('full_name').notNull(),
  desiredTitle: contributorTitleEnum('desired_title').notNull(),
  customTitle: text('custom_title'),
  bio: text('bio').notNull(),
  churchName: text('church_name'),
  ministryName: text('ministry_name'),
  location: text('location'),
  theologicalStatement: text('theological_statement').notNull(),
  writingSamples: text('writing_samples').array(),
  socialLinks: jsonb('social_links').default({}),
  agreesToStandards: boolean('agrees_to_standards').notNull().default(false),
  status: applicationStatusEnum('status').notNull().default('pending'),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  decisionReason: text('decision_reason'),
  notificationSent: boolean('notification_sent').default(false),
  notificationSentAt: timestamp('notification_sent_at', { withTimezone: true }),
  submittedAt: timestamp('submitted_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const userSessions = pgTable('user_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  clerkSessionId: text('clerk_session_id').unique().notNull(),
  deviceType: text('device_type'),
  ipAddress: inet('ip_address'),
  userAgent: text('user_agent'),
  location: text('location'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  lastActiveAt: timestamp('last_active_at', { withTimezone: true }).defaultNow(),
  endedAt: timestamp('ended_at', { withTimezone: true }),
})

export const auditLog = pgTable('audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  actorId: uuid('actor_id').references(() => users.id, { onDelete: 'set null' }),
  eventType: auditEventEnum('event_type').notNull(),
  metadata: jsonb('metadata').default({}),
  ipAddress: inet('ip_address'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const emailLog = pgTable('email_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  emailType: emailTypeEnum('email_type').notNull(),
  recipientEmail: text('recipient_email').notNull(),
  subject: text('subject').notNull(),
  resendId: text('resend_id'),
  status: text('status').default('sent'),
  metadata: jsonb('metadata').default({}),
  sentAt: timestamp('sent_at', { withTimezone: true }).defaultNow(),
})