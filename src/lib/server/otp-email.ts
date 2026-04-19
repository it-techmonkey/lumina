import { JWT } from 'google-auth-library';

const GMAIL_SEND_SCOPE = 'https://www.googleapis.com/auth/gmail.send';

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function formatFromHeader(): string {
  const fromEmail = process.env.OTP_FROM_EMAIL?.trim() || process.env.GMAIL_API_IMPERSONATED_USER?.trim() || '';
  const fromName = process.env.OTP_FROM_NAME?.trim();

  if (!fromEmail) {
    throw new Error('Missing required env var: OTP_FROM_EMAIL (or GMAIL_API_IMPERSONATED_USER)');
  }

  return fromName ? `${fromName} <${fromEmail}>` : fromEmail;
}

function getOtpExpiryMinutes(): number {
  const raw = process.env.OTP_CODE_TTL_MINUTES?.trim();
  if (!raw) return 10;

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) return 10;
  return Math.floor(parsed);
}

function buildOtpEmail(toEmail: string, otpCode: string): { subject: string; html: string; text: string } {
  const appName = process.env.OTP_APP_NAME?.trim() || 'Your account';
  const ttlMinutes = getOtpExpiryMinutes();

  return {
    subject: `Your ${appName} verification code`,
    text: `Your one-time code is ${otpCode}. It expires in ${ttlMinutes} minutes.`,
    html: [
      `<p>Your one-time code is:</p>`,
      `<p style=\"font-size:24px;font-weight:700;letter-spacing:2px;\">${otpCode}</p>`,
      `<p>This code expires in ${ttlMinutes} minutes.</p>`,
      `<p>If you did not request this, you can ignore this email.</p>`,
    ].join(''),
  };
}

async function getGmailAccessToken(): Promise<string> {
  const clientEmail = getRequiredEnv('GMAIL_API_CLIENT_EMAIL');
  const privateKey = getRequiredEnv('GMAIL_API_PRIVATE_KEY').replace(/\\n/g, '\n');
  const delegatedUser = getRequiredEnv('GMAIL_API_IMPERSONATED_USER');

  const client = new JWT({
    email: clientEmail,
    key: privateKey,
    subject: delegatedUser,
    scopes: [GMAIL_SEND_SCOPE],
  });

  const tokenResponse = await client.authorize();
  const accessToken = tokenResponse.access_token;

  if (!accessToken) {
    throw new Error('Could not obtain Gmail API access token');
  }

  return accessToken;
}

export async function sendOtpEmail(toEmail: string, otpCode: string): Promise<void> {
  const provider = (process.env.OTP_EMAIL_PROVIDER || 'gmail-api').trim().toLowerCase();
  if (provider !== 'gmail-api') {
    return;
  }

  const { subject, html, text } = buildOtpEmail(toEmail, otpCode);
  const fromHeader = formatFromHeader();
  const boundary = 'otp_boundary_7f8c3c5f';
  const rawMessage = [
    `From: ${fromHeader}`,
    `To: ${toEmail}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    '',
    text,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    '',
    html,
    '',
    `--${boundary}--`,
  ].join('\r\n');

  const accessToken = await getGmailAccessToken();
  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: base64UrlEncode(rawMessage) }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Gmail API send failed [${response.status}]: ${body}`);
  }
}
