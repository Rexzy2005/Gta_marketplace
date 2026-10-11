import { describe, expect, it } from 'vitest';
import { catalogueRepository } from './catalogue-repository';

describe('catalogue repository boundary', () => {
  it('returns the configured storefront records without changing pricing data', async () => {
    const result = await catalogueRepository.listForStorefront();

    expect(result).toHaveLength(3);
    expect(result[0].priceUsd).toBe(45);
    expect(result[1].variablePricing).toEqual({ minimumUsd: 25, maximumUsd: 100 });
  });

  it('returns a fresh collection so callers cannot reorder the source list', async () => {
    const firstRead = await catalogueRepository.listForStorefront();
    const secondRead = await catalogueRepository.listForStorefront();

    expect(firstRead).not.toBe(secondRead);
    expect(firstRead).toEqual(secondRead);
  });
});