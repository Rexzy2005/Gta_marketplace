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

Validate the persistence schema with a local or managed PostgreSQL URL:

```bash
cp .env.example .env
npm run db:validate
```

`DATABASE_URL` is required for Prisma commands and must remain environment-only.

Database workflow commands:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
npm run db:deploy
```

Use `db:migrate` for local development and `db:deploy` in a controlled deployment environment. The seed only creates the four approved initial categories; it does not create catalogue listings or prices.

## Current implementation

The public homepage currently uses clearly marked, non-production catalogue templates so no real products, prices, availability, testimonials, or seller destinations are invented. The interactive slice includes:

- responsive GTA-inspired catalogue and navigation
- category tabs and listing search
- USD reference pricing with EUR and GBP display conversion
- listing brief modal with copy-to-clipboard behavior
- mobile navigation and responsive layout

The next implementation boundary is the admin-managed data layer: credential verification, signed sessions, login/logout, and a protected session route are covered in [docs/xp/iteration-09.md](docs/xp/iteration-09.md), while protected category/listing reads and mutations, packages, exchange-rate source, and configured contact destinations still need to replace the local sample records before launch.

## Extreme Programming workflow

The implementation follows the acceptance criteria, iteration plan, and Definition of Done in [gta-legend-lane-xp-roadmap.md](gta-legend-lane-xp-roadmap.md). Each increment should select a small story slice, add focused tests, validate locally, and record the result under [docs/xp](docs/xp). The current increment is documented in [docs/xp/iteration-08.md](docs/xp/iteration-08.md), with previous increments recorded in [docs/xp/iteration-07.md](docs/xp/iteration-07.md), [docs/xp/iteration-06.md](docs/xp/iteration-06.md), [docs/xp/iteration-05.md](docs/xp/iteration-05.md), [docs/xp/iteration-04.md](docs/xp/iteration-04.md), [docs/xp/iteration-03.md](docs/xp/iteration-03.md), and [docs/xp/iteration-02.md](docs/xp/iteration-02.md).
