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

export function listAdminCategories(database: AdminCategoryReader): Promise<readonly AdminCategory[]> {
  return database.category.findMany({ orderBy: { sortOrder: 'asc' } });
}