# GTA Legend Lane

GTA Legend Lane is a Next.js storefront foundation for a configurable GTA Online services catalogue. It is intentionally an order-intent handoff: the site presents catalogue information and indicative pricing, then prepares a brief for an external Discord or Telegram conversation. It does not process payments.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run typecheck
npm test
npm run build
```

## Current implementation

The public homepage currently uses clearly marked, non-production catalogue templates so no real products, prices, availability, testimonials, or seller destinations are invented. The interactive slice includes:

- responsive GTA-inspired catalogue and navigation
- category tabs and listing search
- USD reference pricing with EUR and GBP display conversion
- listing brief modal with copy-to-clipboard behavior
- mobile navigation and responsive layout

The next implementation boundary is the admin-managed data layer: authentication, categories, listings, packages, exchange-rate source, and configured contact destinations should replace the local sample records before launch.

## Extreme Programming workflow

The implementation follows the acceptance criteria, iteration plan, and Definition of Done in [gta-legend-lane-xp-roadmap.md](gta-legend-lane-xp-roadmap.md). Each increment should select a small story slice, add focused tests, validate locally, and record the result under [docs/xp](docs/xp). The current increment is documented in [docs/xp/iteration-04.md](docs/xp/iteration-04.md), with previous increments recorded in [docs/xp/iteration-03.md](docs/xp/iteration-03.md) and [docs/xp/iteration-02.md](docs/xp/iteration-02.md).
