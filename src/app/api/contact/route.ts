import type { NextRequest } from 'next/server';

const RESEND_API_URL = 'https://api.resend.com/emails';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatFromHeader(rawFrom: string | undefined): string {
  const fallback = 'Portfolio <onboarding@resend.dev>';
  if (!rawFrom) return fallback;
  const trimmed = rawFrom.trim();
  if (trimmed.includes('<') && trimmed.includes('>')) {
    return trimmed;
  }
  const emailMatch = trimmed.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';
  if (!email) return fallback;
  const name = trimmed.replace(email, '').trim() || 'Portfolio';
  return `${name} <${email}>`;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, honeypot } = await req.json();

    // Honeypot spam trap
    if (honeypot) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500 });
    }

    const toAddress = process.env.CONTACT_TO_EMAIL || 'ofgharad@gmail.com';
    const derivedSubject = `Portfolio contact from ${email}`.slice(0, 160);

    const html = `
      <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin: 0 0 12px;">New portfolio contact</h2>
        <p style="margin: 0 0 8px;"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <div style="padding: 12px 14px; border-left: 3px solid #6366f1; background: #f8fafc; white-space: pre-wrap;">${String(message)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')}</div>
      </div>
    `;

    const resp = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: formatFromHeader(process.env.RESEND_FROM),
        to: [toAddress],
        reply_to: email,
        subject: derivedSubject,
        html,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new Response(JSON.stringify({ error: 'Failed to send email', details: text }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Unexpected error' }), { status: 500 });
  }
}