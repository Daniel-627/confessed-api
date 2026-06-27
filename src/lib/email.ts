// confessed-api/src/lib/email.ts
import { config } from 'dotenv'
config({ path: '../../.env' })

export type EmailType =
  | 'contributor_approved'
  | 'contributor_rejected'
  | 'contributor_application_received'
  | 'welcome'
  | 'contact_received'
  | 'contact_confirmation'
  | 'newsletter_welcome'
  | 'custom'

export type EmailPayload =
  | { to: string; type: 'contributor_approved';             data: { fullName: string; reason?: string | null } }
  | { to: string; type: 'contributor_rejected';             data: { fullName: string; reason: string } }
  | { to: string; type: 'contributor_application_received'; data: { fullName: string } }
  | { to: string; type: 'welcome';                          data: { fullName?: string } }
  | { to: string; type: 'contact_received';                 data: { name: string; email: string; reason: string; message: string } }
  | { to: string; type: 'contact_confirmation';             data: { name: string } }
  | { to: string; type: 'newsletter_welcome';               data: { name?: string } }
  | { to: string; type: 'custom';                           data: { subject: string; body: string; recipientName?: string } }

const APP_URL    = process.env.APP_URL        ?? 'https://confessed.faith'
const CONTRIBUTE = process.env.CONTRIBUTE_URL ?? 'https://contribute.confessed.faith'

function layout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#080f1a;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:0 auto;background:#080f1a;">
    <div style="padding:36px 48px 28px;border-bottom:1px solid rgba(201,169,74,0.15);">
      <span style="color:#C9A94A;font-size:20px;display:block;margin-bottom:10px;">✝</span>
      <span style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:4px;color:#f0ece0;">CONFESSED</span>
    </div>
    <div style="padding:40px 48px;">${content}</div>
    <div style="padding:0 48px 40px;">
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:0 0 24px;" />
      <p style="font-family:Arial,sans-serif;font-size:11px;color:rgba(240,236,224,0.2);line-height:1.7;margin:0;">
        You are receiving this email because of your interaction with
        <a href="${APP_URL}" style="color:rgba(201,169,74,0.5);text-decoration:none;">confessed.faith</a>.
        Reformed · Confessional · Gospel-Centred.
      </p>
    </div>
  </div>
</body>
</html>`
}

const h1    = (text: string) => `<h1 style="font-family:Georgia,serif;font-size:28px;font-weight:400;color:#f0ece0;margin:0 0 18px;line-height:1.3;">${text}</h1>`
const p     = (text: string) => `<p style="font-family:Georgia,serif;font-size:16px;line-height:1.8;color:rgba(240,236,224,0.65);margin:0 0 16px;">${text}</p>`
const em    = (text: string) => `<em style="font-style:italic;color:#C9A94A;">${text}</em>`
const btn   = (label: string, href: string) => `<a href="${href}" style="display:inline-block;background:#C9A94A;color:#080f1a;font-family:Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-decoration:none;padding:13px 28px;border-radius:6px;margin-top:8px;">${label}</a>`
const hr    = () => `<hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:28px 0;" />`
const quote = (text: string) => `<div style="margin:24px 0;padding:0 0 0 20px;border-left:3px solid #C9A94A;"><p style="font-family:Georgia,serif;font-size:16px;font-style:italic;color:rgba(240,236,224,0.4);margin:0;line-height:1.75;">${text}</p></div>`

function getSubjectAndHtml(payload: EmailPayload): { subject: string; html: string } {
  switch (payload.type) {

    case 'contributor_approved':
      return {
        subject: "You've been approved as a Confessed contributor",
        html: layout(`
          ${h1(`Welcome to Confessed, ${em(payload.data.fullName)}.`)}
          ${p("We've reviewed your application and we're glad to have you.")}
          ${payload.data.reason ? quote(payload.data.reason) : p('Your theological statement and writing samples reflect the kind of careful, gospel-centred thinking that Confessed is built on.')}
          ${p('You can now access the contributor portal with your existing login.')}
          ${btn('Open contributor portal', CONTRIBUTE)}
          ${hr()}
          ${quote('"Hold fast the pattern of sound words." — 2 Timothy 1:13')}
        `),
      }

    case 'contributor_rejected':
      return {
        subject: 'Your Confessed contributor application',
        html: layout(`
          ${h1(`Thank you for applying, ${em(payload.data.fullName)}.`)}
          ${p('After careful review, we are not able to approve your application at this time.')}
          ${quote(payload.data.reason)}
          ${p('You are welcome to reapply after 30 days. In the meantime, Confessed exists for you as a reader — the content is there for your growth.')}
          ${btn('Continue reading', `${APP_URL}/articles`)}
        `),
      }

    case 'contributor_application_received':
      return {
        subject: "We've received your contributor application",
        html: layout(`
          ${h1(`Application received, ${em(payload.data.fullName)}.`)}
          ${p('Our team will review your application carefully. This usually takes 3–5 business days.')}
          ${p('We will be in touch either way.')}
          ${hr()}
          ${quote('"The heart of man plans his way, but the Lord establishes his steps." — Proverbs 16:9')}
        `),
      }

    case 'welcome':
      return {
        subject: 'Welcome to Confessed',
        html: layout(`
          ${h1(`Welcome to ${em('Confessed.')}`)}
          ${p('Confessed is a Reformed Baptist theology, apologetics, and discipleship platform built on one conviction: the gospel of Jesus Christ is the power of God for salvation, and we are not ashamed of it.')}
          ${p('Start reading. Start learning. Start contending for the faith.')}
          ${btn('Go to Confessed', APP_URL)}
          ${hr()}
          ${quote('"If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved." — Romans 10:9')}
        `),
      }

    case 'newsletter_welcome':
      return {
        subject: 'You are subscribed to Confessed',
        html: layout(`
          ${h1(payload.data.name ? `Welcome, ${em(payload.data.name)}.` : `Welcome to the ${em('Confessed')} newsletter.`)}
          ${p('You are now subscribed to gospel-centred articles, new series, and theological resources from Confessed.')}
          ${p('Every email we send is worth reading. No noise, no filler — just Reformed Baptist theology for the church.')}
          ${btn('Read the latest articles', `${APP_URL}/articles`)}
          ${hr()}
          ${quote('"Your word is a lamp to my feet and a light to my path." — Psalm 119:105')}
          <p style="font-family:Arial,sans-serif;font-size:11px;color:rgba(240,236,224,0.2);margin:16px 0 0;">
            To unsubscribe, reply to this email with the word "unsubscribe".
          </p>
        `),
      }

    case 'contact_received':
      return {
        subject: `New contact: ${payload.data.reason || 'General enquiry'} — ${payload.data.name}`,
        html: layout(`
          ${h1(`New ${em('contact')} message`)}
          <p style="font-family:Georgia,serif;font-size:15px;line-height:1.8;color:rgba(240,236,224,0.65);margin:0 0 6px;">
            <strong style="color:#f0ece0;">From:</strong> ${payload.data.name} &lt;${payload.data.email}&gt;
          </p>
          ${payload.data.reason ? `<p style="font-family:Georgia,serif;font-size:15px;line-height:1.8;color:rgba(240,236,224,0.65);margin:0 0 6px;"><strong style="color:#f0ece0;">Reason:</strong> ${payload.data.reason}</p>` : ''}
          ${hr()}
          ${quote(payload.data.message.replace(/\n/g, '<br />'))}
          ${hr()}
          <p style="font-family:Georgia,serif;font-size:14px;line-height:1.8;color:rgba(240,236,224,0.4);margin:0;">
            Reply directly to this email to respond to ${payload.data.name}.
          </p>
        `),
      }

    case 'contact_confirmation':
      return {
        subject: 'We received your message — Confessed',
        html: layout(`
          ${h1(`We received your message, ${em(payload.data.name)}.`)}
          ${p('Thank you for reaching out to Confessed. We read every message and will respond as soon as we are able.')}
          ${btn('Read the articles', `${APP_URL}/articles`)}
          ${hr()}
          ${quote('"Iron sharpens iron, and one man sharpens another." — Proverbs 27:17')}
        `),
      }

    case 'custom':
      return {
        subject: payload.data.subject,
        html: layout(`
          ${payload.data.recipientName ? h1(`${em(payload.data.recipientName)},`) : ''}
          <div style="font-family:Georgia,serif;font-size:16px;line-height:1.85;color:rgba(240,236,224,0.65);">
            ${payload.data.body.replace(/\n/g, '<br />')}
          </div>
        `),
      }
  }
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const { subject, html } = getSubjectAndHtml(payload)

  const to = payload.type === 'contact_received'
    ? (process.env.RESEND_FROM_EMAIL ?? 'hello@confessed.faith')
    : payload.to

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${process.env.RESEND_FROM_NAME ?? 'Confessed'} <${process.env.RESEND_FROM_EMAIL ?? 'hello@confessed.faith'}>`,
      to,
      subject,
      html,
      ...(payload.type === 'contact_received' ? { reply_to: payload.data.email } : {}),
    }),
  })

  if (!res.ok) {
    const error = await res.json()
    console.error('[sendEmail] Resend error:', error)
    throw new Error(error?.message ?? 'Email send failed')
  }
}
