import { describe, expect, it } from 'vitest';
import { listAdminCategories, type AdminCategoryReader } from './admin-category-repository';

describe('admin category repository', () => {
  it('reads all categories in administrator order', async () => {
    const calls: unknown[] = [];
    const database: AdminCategoryReader = {
      category: {
        async findMany(args) {
          calls.push(args);
          return [
            {
              id: 'category-1',
              name: 'Modded accounts',
              slug: 'modded-accounts',
              description: null,
              imageUrl: null,
              sortOrder: 1,
              isActive: true,
            },
          ];
        },
      },
    };

    await expect(listAdminCategories(database)).resolves.toEqual([
      {
        id: 'category-1',
        name: 'Modded accounts',
        slug: 'modded-accounts',
        description: null,
        imageUrl: null,
        sortOrder: 1,
        isActive: true,
      },
    ]);
    expect(calls).toEqual([{ orderBy: { sortOrder: 'asc' } }]);
  });
});