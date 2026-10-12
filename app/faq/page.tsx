import type { Metadata } from 'next';
import { faqs, policyPrinciples } from '@/lib/policy-content';

export const metadata: Metadata = {
  title: 'Policies & FAQ | Legend Lane',
  description: 'How Legend Lane pricing, order briefs, and external contact handoff work.',
};

export default function FaqPage() {
  return (
    <main className="info-page">
      <header className="info-header">
        <a href="/" className="wordmark" aria-label="Legend Lane home">
          <span className="wordmark-mark">LL</span>
          <span>Legend<br />Lane</span>
        </a>
        <a className="text-link" href="/">Return to catalogue <span aria-hidden="true">↗</span></a>
      </header>
      <section className="info-hero">
        <p className="eyebrow">03 / The fine print</p>
        <h1>KNOW THE<br /><em>LANE.</em></h1>
        <p>Clear expectations for browsing, pricing, and continuing a conversation outside the website.</p>
      </section>
      <section className="policy-band">
        {policyPrinciples.map((principle) => <div key={principle.label}><strong>{principle.label}</strong><span>{principle.description}</span></div>)}
      </section>
      <section className="faq-content">
        <div><p className="eyebrow">FAQ / 05 answers</p><h2>THE<br /><span>BRIEF.</span></h2></div>
        <div className="faq-list">{faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span>{faq.question}<b>+</b></summary><p>{faq.answer}</p></details>)}</div>
      </section>
      <footer className="info-footer"><span>© 2026 Legend Lane</span><a href="/">Back to the catalogue ↗</a><span>Prices are indicative. USD is the reference.</span></footer>
    </main>
  );
}