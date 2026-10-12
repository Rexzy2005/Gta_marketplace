export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type AdminCategoryReader = {
  category: {
    findMany(args: { orderBy: { sortOrder: 'asc' } }): Promise<readonly AdminCategory[]>;
  };
};

export type AdminCategoryCreator = {
  category: {
    create(args: {
      data: Pick<AdminCategory, 'name' | 'slug' | 'description' | 'sortOrder'> & { isActive: boolean };
    }): Promise<AdminCategory>;
  };
};

export type AdminCategoryUpdater = {
  category: {
    update(args: {
      where: { id: string };
      data: { isActive: boolean };
    }): Promise<AdminCategory>;
  };
};

export function listAdminCategories(database: AdminCategoryReader): Promise<readonly AdminCategory[]> {
  return database.category.findMany({ orderBy: { sortOrder: 'asc' } });
}

export function createAdminCategory(
  database: AdminCategoryCreator,
  data: Pick<AdminCategory, 'name' | 'slug' | 'description' | 'sortOrder'>,
): Promise<AdminCategory> {
  return database.category.create({ data: { ...data, isActive: true } });
}

export function setAdminCategoryActive(
  database: AdminCategoryUpdater,
  id: string,
  isActive: boolean,
): Promise<AdminCategory> {
  return database.category.update({ where: { id }, data: { isActive } });
}