export type CreateCategoryInput = {
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
};

type ParsedCategoryInput =
  | { data: CreateCategoryInput }
  | { error: string };

type CategoryStatusInput = { isActive: boolean };

type ParsedCategoryStatusInput =
  | { data: CategoryStatusInput }
  | { error: string };

export function parseCreateCategoryInput(value: unknown): ParsedCategoryInput {
  if (typeof value !== 'object' || value === null) return { error: 'Invalid request' };

  const input = value as {
    name?: unknown;
    slug?: unknown;
    description?: unknown;
    sortOrder?: unknown;
  };
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  if (!name) return { error: 'Name is required' };
  if (name.length > 80) return { error: 'Name is too long' };

  const slug = typeof input.slug === 'string' ? input.slug.trim() : '';
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 80) {
    return { error: 'Slug must use lowercase letters, numbers, and hyphens' };
  }

  if (input.description !== undefined && typeof input.description !== 'string') {
    return { error: 'Description must be text' };
  }
  const description = typeof input.description === 'string' ? input.description.trim() : null;
  if (description && description.length > 300) return { error: 'Description is too long' };

  const sortOrder = input.sortOrder === undefined ? 0 : input.sortOrder;
  if (typeof sortOrder !== 'number' || !Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 10000) {
    return { error: 'Sort order must be a non-negative integer' };
  }

  return { data: { name, slug, description, sortOrder } };
}

export function parseCategoryStatusInput(value: unknown): ParsedCategoryStatusInput {
  if (
    typeof value !== 'object' ||
    value === null ||
    typeof (value as { isActive?: unknown }).isActive !== 'boolean'
  ) {
    return { error: 'isActive must be boolean' };
  }

  return { data: { isActive: (value as { isActive: boolean }).isActive } };
}