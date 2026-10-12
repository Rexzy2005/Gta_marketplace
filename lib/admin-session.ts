import { createHmac, timingSafeEqual } from 'node:crypto';

export const ADMIN_SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

type SessionPayload = {
  username: string;
  expiresAt: number;
};

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createAdminSession(
  username: string,
  secret: string,
  issuedAt = Date.now(),
): string | null {
  if (!username || !secret) return null;

  const payload: SessionPayload = {
    username,
    expiresAt: issuedAt + ADMIN_SESSION_MAX_AGE_SECONDS * 1000,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encodedPayload}.${sign(encodedPayload, secret)}`;
}

export function verifyAdminSession(
  token: string,
  secret: string,
  now = Date.now(),
): string | null {
  if (!token || !secret) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [encodedPayload, encodedSignature] = parts;
    const expectedSignature = Buffer.from(sign(encodedPayload, secret));
    const actualSignature = Buffer.from(encodedSignature);
    if (
      expectedSignature.length !== actualSignature.length ||
      !timingSafeEqual(expectedSignature, actualSignature)
    ) return null;

    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString()) as Partial<SessionPayload>;
    if (
      typeof payload.username !== 'string' ||
      !payload.username ||
      typeof payload.expiresAt !== 'number' ||
      !Number.isFinite(payload.expiresAt) ||
      payload.expiresAt <= now
    ) return null;

    return payload.username;
  } catch {
    return null;
  }
}