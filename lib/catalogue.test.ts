import { describe, expect, it } from 'vitest';
import { currencies, displayAmount, displayPrice, listings } from './catalogue';

describe('catalogue pricing rules', () => {
  it('keeps USD as the authoritative display amount', () => {
    expect(displayPrice(listings[0], 'USD')).toBe('$45');
    expect(currencies.USD.rate).toBe(1);
    expect(displayAmount(listings[0].packages[1].priceUsd, 'USD')).toBe('$75');
  });

  it('converts from USD and rounds indicative local amounts', () => {
    expect(displayPrice(listings[0], 'EUR')).toBe('€41');
    expect(displayPrice(listings[0], 'GBP')).toBe('£35');
  });

  it('does not fabricate a price for quote-required listings', () => {
    expect(displayPrice(listings[2], 'EUR')).toBe('QUOTE');
  });

  it('renders a configured USD range as an indicative converted range', () => {
    expect(displayPrice(listings[1], 'EUR')).toBe('€23-€92');
  });

  it('only exposes active fixed packages for selection', () => {
    expect(listings[0].packages.filter((option) => option.isActive)).toHaveLength(2);
    expect(listings[1].packages).toHaveLength(0);
  });
});