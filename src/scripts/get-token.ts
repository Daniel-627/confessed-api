import { config } from 'dotenv'
config({ path: './.env' })

async function getToken() {
  const res = await fetch('https://api.clerk.com/v1/sign_in_tokens', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: 'user_3CXO32k1wxwCTEmJT0lCw88pSBy',
    }),
  })

  const data = await res.json()
  console.log(JSON.stringify(data, null, 2))
}

getToken()