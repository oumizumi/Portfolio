import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

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

function getSmtpConfig() {
  const host = process.env.SMTP_HOST || 'smtp.office365.com';
  const port = Number(process.env.SMTP_PORT || '587');
  const secure = String(process.env.SMTP_SECURE || 'false') === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  return { host, port, secure, user, pass };
}

async function trySendSmtp(params: { from: string; to: string; subject: string; html: string; replyTo?: string }) {
  const cfg = getSmtpConfig();
  if (!cfg) return { ok: false as const, error: 'SMTP not configured' };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodemailer = (await import('nodemailer')).default as any;
  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
  });
  try {
    await transporter.sendMail({
      from: params.from,
      to: params.to,
      subject: params.subject,
      html: params.html,
      replyTo: params.replyTo,
    });
    return { ok: true as const };
  } catch (err) {
    return { ok: false as const, error: err instanceof Error ? err.message : 'SMTP send failed' };
  }
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

    const toAddress = process.env.CONTACT_TO_EMAIL || 'oghar074@uottawa.ca';
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

    // Try SMTP (Outlook) first if configured
    const smtpFrom = process.env.SMTP_FROM || (process.env.SMTP_USER ? `Portfolio <${process.env.SMTP_USER}>` : formatFromHeader(process.env.RESEND_FROM));
    const smtpAttempt = await trySendSmtp({ from: smtpFrom, to: toAddress, subject: derivedSubject, html, replyTo: email });
    if (smtpAttempt.ok) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }


    // Fallback to Resend if available
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Email service not configured', smtpError: smtpAttempt.error }), { status: 500 });
    }

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