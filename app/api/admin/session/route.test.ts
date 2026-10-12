import { beforeEach, describe, expect, it } from 'vitest';
import { createAdminSession } from '../../../../lib/admin-session';
import { GET } from './route';

describe('admin session route', () => {
  beforeEach(() => {
    process.env.ADMIN_SESSION_SECRET = 'test-session-secret';
  });

  it('returns the authenticated administrator for a valid session cookie', async () => {
    const session = createAdminSession('admin', process.env.ADMIN_SESSION_SECRET!, Date.now());
    if (!session) throw new Error('expected a session token');

    const response = await GET(new Request('http://localhost/api/admin/session', {
      headers: { cookie: `admin_session=${session}` },
    }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ authenticated: true, username: 'admin' });
  });

  it('rejects missing and invalid session cookies', async () => {
    const missingResponse = await GET(new Request('http://localhost/api/admin/session'));
    const invalidResponse = await GET(new Request('http://localhost/api/admin/session', {
      headers: { cookie: 'admin_session=invalid' },
    }));

    expect(missingResponse.status).toBe(401);
    expect(invalidResponse.status).toBe(401);
    expect(await invalidResponse.json()).toEqual({ error: 'Authentication required' });
  });
});