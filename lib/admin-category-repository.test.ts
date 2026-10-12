import { describe, expect, it } from 'vitest';
import {
  createAdminCategory,
  listAdminCategories,
  type AdminCategoryCreator,
  type AdminCategoryReader,
} from './admin-category-repository';

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

  it('creates a category as active', async () => {
    let receivedData: unknown;
    const database: AdminCategoryCreator = {
      category: {
        async create(args) {
          receivedData = args.data;
          return {
            id: 'category-2',
            ...args.data,
            imageUrl: null,
          };
        },
      },
    };

    await createAdminCategory(database, {
      name: 'Money drops',
      slug: 'money-drops',
      description: null,
      sortOrder: 2,
    });

    expect(receivedData).toEqual({
      name: 'Money drops',
      slug: 'money-drops',
      description: null,
      sortOrder: 2,
      isActive: true,
    });
  });
});