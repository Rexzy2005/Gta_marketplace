import { describe, expect, it } from 'vitest';
import { parseCategoryStatusInput, parseCreateCategoryInput } from './admin-category-input';

describe('admin category input', () => {
  it('normalises a valid category payload', () => {
    expect(parseCreateCategoryInput({
      name: '  Money drops ',
      slug: 'money-drops',
      description: '  Configurable category  ',
      sortOrder: 2,
    })).toEqual({
      data: {
        name: 'Money drops',
        slug: 'money-drops',
        description: 'Configurable category',
        sortOrder: 2,
      },
    });
  });

  it('rejects missing, malformed, and oversized fields', () => {
    expect(parseCreateCategoryInput({ name: '', slug: 'Money Drops' })).toEqual({
      error: 'Name is required',
    });
    expect(parseCreateCategoryInput({ name: 'Money drops', slug: 'Money Drops' })).toEqual({
      error: 'Slug must use lowercase letters, numbers, and hyphens',
    });
    expect(parseCreateCategoryInput({
      name: 'Money drops',
      slug: 'money-drops',
      description: 'x'.repeat(301),
    })).toEqual({ error: 'Description is too long' });
  });

  it('accepts only an explicit active status for category updates', () => {
    expect(parseCategoryStatusInput({ isActive: false })).toEqual({ data: { isActive: false } });
    expect(parseCategoryStatusInput({ isActive: true })).toEqual({ data: { isActive: true } });
    expect(parseCategoryStatusInput({ isActive: 'false' })).toEqual({
      error: 'isActive must be boolean',
    });
  });
});