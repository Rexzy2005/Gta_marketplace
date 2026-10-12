import { beforeEach, describe, expect, it } from 'vitest';
import { createPasswordHash } from '../../../../lib/admin-auth';
import { POST } from './route';

describe('admin login route', () => {
  beforeEach(() => {
    process.env.ADMIN_USERNAME = 'admin';
    process.env.ADMIN_PASSWORD_HASH = createPasswordHash('correct password');
    process.env.ADMIN_SESSION_SECRET = 'test-session-secret';
  });

  it('issues an http-only session cookie for valid credentials', async () => {
    const response = await POST(new Request('http://localhost/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'admin', password: 'correct password' }),
      headers: { 'content-type': 'application/json' },
    }));

    expect(response.status).toBe(200);
    expect(response.headers.get('set-cookie')).toContain('admin_session=');
    expect(response.headers.get('set-cookie')).toContain('HttpOnly');
    expect(await response.json()).toEqual({ authenticated: true });
  });

  it('returns the same generic error for invalid credentials', async () => {
    const response = await POST(new Request('http://localhost/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'wrong', password: 'wrong' }),
      headers: { 'content-type': 'application/json' },
    }));

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: 'Invalid credentials' });
    expect(response.headers.get('set-cookie')).toBeNull();
  });

  it('rejects malformed request bodies without throwing', async () => {
    const response = await POST(new Request('http://localhost/api/admin/login', {
      method: 'POST',
      body: '{malformed',
      headers: { 'content-type': 'application/json' },
    }));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Invalid request' });
  });
});