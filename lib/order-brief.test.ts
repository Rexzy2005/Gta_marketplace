import { describe, expect, it } from 'vitest';
import { listings } from './catalogue';
import { buildOrderSummary, MAX_ORDER_NOTE_LENGTH } from './order-brief';

describe('order brief summaries', () => {
  it('includes the selected package and both price contexts', () => {
    const summary = buildOrderSummary({ listing: listings[0], currency: 'EUR', selectedPackageId: 'll-001-expanded' });

    expect(summary).toContain('Package: Expanded package');
    expect(summary).toContain('USD reference: $75');
    expect(summary).toContain('Indicative display: €69 EUR');
    expect(summary).toContain('no payment or order has been placed');
  });

  it('keeps quote-required summaries free of fabricated numeric prices', () => {
    const summary = buildOrderSummary({ listing: listings[2], currency: 'GBP' });

    expect(summary).toContain('USD reference: QUOTE');
    expect(summary).toContain('Indicative display: QUOTE GBP');
  });

  it('normalises and limits customer notes', () => {
    const notes = `  platform   details\n${'x'.repeat(MAX_ORDER_NOTE_LENGTH + 50)}  `;
    const summary = buildOrderSummary({ listing: listings[0], currency: 'USD', notes });

    expect(summary).toContain('Notes: platform details');
    expect(summary.length).toBeLessThan(1200);
    expect(summary).not.toContain('\n\n');
  });
});