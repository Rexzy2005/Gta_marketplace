import { describe, expect, it } from 'vitest';
import { createPasswordHash, verifyAdminCredentials } from './admin-auth';

describe('admin credential verification', () => {
  it('verifies a password hash without exposing the original password', () => {
    const passwordHash = createPasswordHash('correct horse battery staple');

    expect(verifyAdminCredentials('admin', 'correct horse battery staple', {
      username: 'admin',
      passwordHash,
    })).toBe(true);
    expect(passwordHash).not.toContain('correct horse battery staple');
  });

  it('rejects incorrect credentials and incomplete configuration', () => {
    const passwordHash = createPasswordHash('correct horse battery staple');

    expect(verifyAdminCredentials('admin', 'wrong password', {
      username: 'admin',
      passwordHash,
    })).toBe(false);
    expect(verifyAdminCredentials('other-admin', 'correct horse battery staple', {
      username: 'admin',
      passwordHash,
    })).toBe(false);
    expect(verifyAdminCredentials('admin', 'correct horse battery staple', undefined)).toBe(false);
  });

  it('rejects malformed hashes instead of throwing', () => {
    expect(verifyAdminCredentials('admin', 'password', {
      username: 'admin',
      passwordHash: 'not-a-hash',
    })).toBe(false);
  });
});