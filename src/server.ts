import { config } from 'dotenv'
config({ path: './.env' })

import { serve } from '@hono/node-server'
import app from './index.js'

serve({ fetch: app.fetch, port: 3001 }, () => {
  console.log('Confessed API running on http://localhost:3001')
})