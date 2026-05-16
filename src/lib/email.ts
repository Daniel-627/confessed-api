import { config } from 'dotenv'
config({ path: '../../.env' })

type EmailType =
  | 'contributor_approved'
  | 'contributor_rejected'
  | 'contributor_application_received'
  | 'welcome'

type EmailPayload = {
  to: string
  type: EmailType
  data: Record<string, any>
}

function getSubjectAndBody(type: EmailType, data: Record<string, any>) {
  switch (type) {
    case 'contributor_approved':
      return {
        subject: "You've been approved as a Confessed contributor",
        html: `
          <h2>Welcome to Confessed, ${data.fullName}.</h2>
          <p>We've reviewed your application and we're glad to have you.</p>
          ${data.reason ? `<p>${data.reason}</p>` : '<p>Your theological statement and writing samples reflect the kind of careful, gospel-centred thinking that Confessed is built on.</p>'}
          <p>You can now access <a href="${process.env.CONTRIBUTE_URL}">${process.env.CONTRIBUTE_URL}</a> with your existing login.</p>
          <p>— Confessed</p>
        `,
      }
    case 'contributor_rejected':
      return {
        subject: 'Your Confessed contributor application',
        html: `
          <h2>Thank you for applying, ${data.fullName}.</h2>
          <p>After review, we're not able to approve your application at this time.</p>
          <p><strong>Reason:</strong> ${data.reason}</p>
          <p>You're welcome to reapply after 30 days.</p>
          <p>— Confessed</p>
        `,
      }
    case 'contributor_application_received':
      return {
        subject: "We've received your contributor application",
        html: `
          <h2>Application received, ${data.fullName}.</h2>
          <p>Our team will review your application carefully. This usually takes 3–5 business days.</p>
          <p>— Confessed</p>
        `,
      }
    case 'welcome':
      return {
        subject: 'Welcome to Confessed',
        html: `
          <h2>Welcome to Confessed.</h2>
          <p>Confessed is a Reformed theology, apologetics, and discipleship platform built on one conviction: the gospel of Jesus Christ is the power of God for salvation, and we are not ashamed of it.</p>
          <p>Start at <a href="${process.env.APP_URL}">${process.env.APP_URL}</a></p>
          <p>— Confessed</p>
        `,
      }
  }
}

export async function sendEmail({ to, type, data }: EmailPayload) {
  const { subject, html } = getSubjectAndBody(type, data)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to,
      subject,
      html,
    }),
  })

  if (!res.ok) {
    const error = await res.json()
    console.error('Email send failed:', error)
  }
}