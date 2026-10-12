import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createAdminSession } from '../../../../../lib/admin-session';

vi.mock('../../../../../lib/prisma', () => ({
  prisma: {
    category: {
      update: vi.fn().mockResolvedValue({
        id: 'category-1',
        name: 'Modded accounts',
        slug: 'modded-accounts',
        description: null,
        imageUrl: null,
        sortOrder: 1,
        isActive: false,
      }),
    },
  },
}));

import { PATCH } from './route';

describe('admin category status route', () => {
  beforeEach(() => {
    process.env.ADMIN_SESSION_SECRET = 'test-session-secret';
  });

  it('rejects unauthenticated status changes', async () => {
    const response = await PATCH(
      new Request('http://localhost/api/admin/categories/category-1', {
        method: 'PATCH',
        body: JSON.stringify({ isActive: false }),
      }),
      { params: Promise.resolve({ id: 'category-1' }) },
    );

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: 'Authentication required' });
  });

  it('deactivates a category for an authenticated administrator', async () => {
    const session = createAdminSession('admin', process.env.ADMIN_SESSION_SECRET!);
    if (!session) throw new Error('expected a session token');

    const response = await PATCH(
      new Request('http://localhost/api/admin/categories/category-1', {
        method: 'PATCH',
        body: JSON.stringify({ isActive: false }),
        headers: { cookie: `admin_session=${session}` },
      }),
      { params: Promise.resolve({ id: 'category-1' }) },
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      category: {
        id: 'category-1',
        name: 'Modded accounts',
        slug: 'modded-accounts',
        description: null,
        imageUrl: null,
        sortOrder: 1,
        isActive: false,
      },
    });
  });
});