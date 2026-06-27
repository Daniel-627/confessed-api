import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as authSchema from './schema/auth.js'
import * as seriesSchema from './schema/series.js'
import * as articlesSchema from './schema/articles.js'
import { newsletterSubscribers } from './schema/newsletter.js'

config({ path: '../.env' })

const schema = { ...authSchema, ...seriesSchema, ...articlesSchema }

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })

export * from './schema/auth.js'
export * from './schema/series.js'
export * from './schema/articles.js'
export * from './schema/newsletter.js'