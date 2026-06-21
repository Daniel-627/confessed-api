// confessed-api/src/index.ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handleClerkWebhook } from './routes/webhooks/clerk.js'
import me from './routes/me.js'
import contributors from './routes/contributors.js'
import admin from './routes/admin.js'
import { seriesRoute } from './routes/series.js'
import { articlesRoute } from './routes/articles.js'
import { contactRoute } from './routes/contact.js'
import type { AppVariables } from './types/index.js'

const app = new Hono<{ Variables: AppVariables }>()

app.use('*', cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://confessed.faith',
    'https://www.confessed.faith',
    'https://contribute.confessed.faith',
  ],
  allowHeaders: ['Authorization', 'Content-Type'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.get('/', (c) => c.json({ status: 'ok', service: 'confessed-api' }))

app.post('/webhooks/clerk', handleClerkWebhook)
app.route('/me', me)
app.route('/contributors', contributors)
app.route('/admin', admin)
app.route('/series', seriesRoute)
app.route('/articles', articlesRoute)
app.route('/contact', contactRoute)

export default app
