CREATE TYPE "public"."article_status" AS ENUM('draft', 'published', 'suspended', 'archived');--> statement-breakpoint
CREATE TYPE "public"."application_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."audit_event" AS ENUM('user_signed_up', 'user_signed_in', 'user_signed_out', 'user_email_verified', 'user_password_changed', 'user_password_reset_requested', 'user_2fa_enabled', 'user_2fa_disabled', 'user_2fa_verified', 'role_changed', 'contributor_applied', 'contributor_approved', 'contributor_rejected', 'user_suspended', 'user_reactivated', 'user_deleted', 'profile_updated', 'session_revoked', 'all_sessions_revoked');--> statement-breakpoint
CREATE TYPE "public"."contributor_title" AS ENUM('pastor', 'evangelist', 'apologist', 'theologian', 'elder', 'deacon', 'teacher', 'author', 'other');--> statement-breakpoint
CREATE TYPE "public"."email_type" AS ENUM('email_verification', 'password_reset', 'contributor_application_received', 'contributor_approved', 'contributor_rejected', 'daily_office_reminder', 'donation_receipt', 'order_confirmation', 'order_shipped', 'welcome');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('regular', 'contributor', 'admin');--> statement-breakpoint
CREATE TABLE "article_likes" (
	"user_id" uuid NOT NULL,
	"article_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "article_likes_user_id_article_id_pk" PRIMARY KEY("user_id","article_id")
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author_id" uuid NOT NULL,
	"series_id" uuid,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"cover_image_url" text,
	"status" "article_status" DEFAULT 'draft' NOT NULL,
	"tags" text[] DEFAULT '{}',
	"reading_time_minutes" integer,
	"view_count" integer DEFAULT 0,
	"suspended_by" uuid,
	"suspended_at" timestamp with time zone,
	"suspension_reason" text,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"actor_id" uuid,
	"event_type" "audit_event" NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"ip_address" "inet",
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "contributor_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"full_name" text NOT NULL,
	"desired_title" "contributor_title" NOT NULL,
	"custom_title" text,
	"bio" text NOT NULL,
	"church_name" text,
	"ministry_name" text,
	"location" text,
	"theological_statement" text NOT NULL,
	"writing_samples" text[],
	"social_links" jsonb DEFAULT '{}'::jsonb,
	"agrees_to_standards" boolean DEFAULT false NOT NULL,
	"status" "application_status" DEFAULT 'pending' NOT NULL,
	"reviewed_by" uuid,
	"reviewed_at" timestamp with time zone,
	"decision_reason" text,
	"notification_sent" boolean DEFAULT false,
	"notification_sent_at" timestamp with time zone,
	"submitted_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "contributor_profiles" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"title" "contributor_title" NOT NULL,
	"custom_title" text,
	"bio" text,
	"photo_url" text,
	"church_name" text,
	"ministry_name" text,
	"location" text,
	"twitter_url" text,
	"youtube_url" text,
	"website_url" text,
	"instagram_url" text,
	"is_public" boolean DEFAULT true,
	"slug" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "contributor_profiles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "email_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"email_type" "email_type" NOT NULL,
	"recipient_email" text NOT NULL,
	"subject" text NOT NULL,
	"resend_id" text,
	"status" text DEFAULT 'sent',
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"sent_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_devices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"device_type" text NOT NULL,
	"push_token" text,
	"device_name" text,
	"app_version" text,
	"is_active" boolean DEFAULT true,
	"last_used_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_devices_push_token_unique" UNIQUE("push_token")
);
--> statement-breakpoint
CREATE TABLE "user_preferences" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"theme" text DEFAULT 'dark',
	"bible_translation" text DEFAULT 'WEB',
	"daily_office_time" time DEFAULT '06:00',
	"notifications_push" boolean DEFAULT true,
	"notifications_email" boolean DEFAULT true,
	"language" text DEFAULT 'en',
	"timezone" text DEFAULT 'Africa/Nairobi',
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"clerk_session_id" text NOT NULL,
	"device_type" text,
	"ip_address" "inet",
	"user_agent" text,
	"location" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"last_active_at" timestamp with time zone DEFAULT now(),
	"ended_at" timestamp with time zone,
	CONSTRAINT "user_sessions_clerk_session_id_unique" UNIQUE("clerk_session_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false,
	"display_name" text,
	"avatar_url" text,
	"role" "user_role" DEFAULT 'regular' NOT NULL,
	"is_active" boolean DEFAULT true,
	"is_deleted" boolean DEFAULT false,
	"last_seen_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "series" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"verse_reference" text,
	"icon" text,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "series_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "article_likes" ADD CONSTRAINT "article_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_likes" ADD CONSTRAINT "article_likes_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_series_id_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_suspended_by_users_id_fk" FOREIGN KEY ("suspended_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contributor_applications" ADD CONSTRAINT "contributor_applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contributor_applications" ADD CONSTRAINT "contributor_applications_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contributor_profiles" ADD CONSTRAINT "contributor_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_log" ADD CONSTRAINT "email_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_devices" ADD CONSTRAINT "user_devices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_article_likes_article" ON "article_likes" USING btree ("article_id");--> statement-breakpoint
CREATE INDEX "idx_articles_author" ON "articles" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "idx_articles_series" ON "articles" USING btree ("series_id");--> statement-breakpoint
CREATE INDEX "idx_articles_status" ON "articles" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_articles_slug" ON "articles" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_users_clerk_id" ON "users" USING btree ("clerk_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_users_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_users_role" ON "users" USING btree ("role");