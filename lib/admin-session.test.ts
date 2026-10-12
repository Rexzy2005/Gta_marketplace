import { describe, expect, it } from 'vitest';
import { createAdminSession, verifyAdminSession } from './admin-session';

describe('admin sessions', () => {
  const secret = 'session-secret-for-tests';
  const issuedAt = 1_700_000_000_000;

  it('creates a session that verifies for its administrator', () => {
    const token = createAdminSession('admin', secret, issuedAt);
    if (!token) throw new Error('expected a session token');

    expect(verifyAdminSession(token, secret, issuedAt + 1_000)).toBe('admin');
  });

  it('rejects tampered, expired, and incorrectly signed sessions', () => {
    const token = createAdminSession('admin', secret, issuedAt);
    if (!token) throw new Error('expected a session token');
    const tamperedToken = `${token.slice(0, -1)}x`;

    expect(verifyAdminSession(tamperedToken, secret, issuedAt + 1_000)).toBeNull();
    expect(verifyAdminSession(token, secret, issuedAt + 8 * 60 * 60 * 1000 + 1)).toBeNull();
    expect(verifyAdminSession(token, 'different-secret', issuedAt + 1_000)).toBeNull();
  });

  it('fails closed for missing or malformed session input', () => {
    expect(verifyAdminSession('', secret, issuedAt)).toBeNull();
    expect(verifyAdminSession('not-a-session', secret, issuedAt)).toBeNull();
    expect(createAdminSession('', secret, issuedAt)).toBeNull();
    expect(createAdminSession('admin', '', issuedAt)).toBeNull();
  });
});