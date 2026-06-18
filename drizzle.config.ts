import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import path from 'path'

config({ path: path.resolve(__dirname, '.env') })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Check .env file at project root.')
}

export default defineConfig({
  schema: './db/src/schema/*.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})