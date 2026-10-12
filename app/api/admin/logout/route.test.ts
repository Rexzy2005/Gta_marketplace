import { describe, expect, it } from 'vitest';
import { POST } from './route';

describe('admin logout route', () => {
  it('clears the admin session cookie', async () => {
    const response = await POST();

    expect(response.status).toBe(200);
    expect(response.headers.get('set-cookie')).toContain('admin_session=;');
    expect(response.headers.get('set-cookie')).toContain('Max-Age=0');
    expect(await response.json()).toEqual({ authenticated: false });
  });
});