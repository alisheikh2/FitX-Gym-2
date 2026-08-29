// Sends a plain email via the Resend API (https://resend.com) using the
// built-in fetch — no extra npm package required (Node 18+).
//
// Required env vars (see .env.example):
//   RESEND_API_KEY   - from https://resend.com/api-keys
//   LEAD_NOTIFY_EMAIL - where new lead notifications should land
//   RESEND_FROM_EMAIL - the "from" address (defaults to Resend's shared
//                        test sender, which only works while your domain
//                        isn't verified — see README/setup notes)
//
// If RESEND_API_KEY is missing, this silently no-ops so local dev / the
// existing POS flow never breaks because email isn't configured yet.

const RESEND_API_URL = 'https://api.resend.com/emails';

export async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY not set — skipping email send');
    return { skipped: true };
  }

  const from = process.env.RESEND_FROM_EMAIL || 'FITX Website <onboarding@resend.dev>';

  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ from, to, subject, html })
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('[email] Resend API error:', res.status, body);
      return { error: true, status: res.status, body };
    }

    return await res.json();
  } catch (err) {
    console.error('[email] failed to send:', err.message);
    return { error: true, message: err.message };
  }
}

export async function leadNotificationEmail(lead) {
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!to) {
    console.warn('[email] LEAD_NOTIFY_EMAIL not set — skipping lead notification');
    return null;
  }

  const rows = [
    ['Name', lead.name],
    ['Phone', lead.phone],
    ['Email', lead.email || '—'],
    ['Goal', lead.goal || '—'],
    ['Preferred training', lead.preferredTraining || '—'],
    ['Preferred time', lead.preferredTime || '—'],
    ['Preferred date', lead.preferredDate || '—'],
    ['Message', lead.message || '—'],
    ['Source', lead.source || '—']
  ]
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#888;">${k}</td><td style="padding:4px 0;">${v}</td></tr>`)
    .join('');

  return sendEmail({
    to,
    subject: `New consultation request — ${lead.name}`,
    html: `<div style="font-family:sans-serif;font-size:14px;color:#111;">
      <h2 style="margin:0 0 12px;">New consultation request</h2>
      <table>${rows}</table>
    </div>`
  });
}
