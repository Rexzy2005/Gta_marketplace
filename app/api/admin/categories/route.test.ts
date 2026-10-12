import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createAdminSession } from '../../../../lib/admin-session';

vi.mock('../../../../lib/prisma', () => ({
  prisma: {
    category: {
      findMany: vi.fn().mockResolvedValue([
        {
          id: 'category-1',
          name: 'Modded accounts',
          slug: 'modded-accounts',
          description: null,
          imageUrl: null,
          sortOrder: 1,
          isActive: true,
        },
      ]),
    },
  },
}));

import { GET } from './route';

describe('admin categories route', () => {
  beforeEach(() => {
    process.env.ADMIN_SESSION_SECRET = 'test-session-secret';
  });

  it('rejects unauthenticated category reads', async () => {
    const response = await GET(new Request('http://localhost/api/admin/categories'));

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: 'Authentication required' });
  });

  it('returns categories for an authenticated administrator', async () => {
    const session = createAdminSession('admin', process.env.ADMIN_SESSION_SECRET!);
    if (!session) throw new Error('expected a session token');

    const response = await GET(new Request('http://localhost/api/admin/categories', {
      headers: { cookie: `admin_session=${session}` },
    }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      categories: [{
        id: 'category-1',
        name: 'Modded accounts',
        slug: 'modded-accounts',
        description: null,
        imageUrl: null,
        sortOrder: 1,
        isActive: true,
      }],
    });
  });
});