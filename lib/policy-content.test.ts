import { describe, expect, it } from 'vitest';
import { faqs, policyPrinciples } from './policy-content';

describe('policy content', () => {
  it('states the non-checkout and USD-authority rules', () => {
    const content = faqs.map((faq) => faq.answer).join(' ');
    expect(content).toContain('Payment is not collected on this website');
    expect(content).toContain('USD is the authoritative reference currency');
    expect(policyPrinciples.map((principle) => principle.label)).toEqual([
      'NO CHECKOUT',
      'USD SOURCE',
      'EXTERNAL HANDOFF',
    ]);
  });

  it('does not publish sensitive-credential instructions', () => {
    const content = faqs.map((faq) => `${faq.question} ${faq.answer}`).join(' ').toLowerCase();
    expect(content).toContain('do not enter passwords');
    expect(content).not.toContain('send your password');
  });
});