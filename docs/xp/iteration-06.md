# XP Iteration 06: Migration and Seed Workflow

This iteration follows the Extreme Programming workflow and acceptance criteria in [`gta-legend-lane-xp-roadmap.md`](../../gta-legend-lane-xp-roadmap.md).

## Selected scope

This is the next persistence slice for **GL-001**, **GL-003**, **GL-024**, and **GL-025**. It establishes repeatable database commands without adding admin mutations or authentication.

## Small release

The project now exposes commands for Prisma Client generation, local development migrations, production migration deployment, and deterministic seeding. The seed creates only the four configurable categories named in the roadmap: modded accounts, money drops, boosting, and other GTA services.

## Acceptance checks

- `npm run db:generate` creates the Prisma Client from the checked-in schema.
- `npm run db:migrate` is available for a configured development PostgreSQL database.
- `npm run db:deploy` is available for controlled deployment migrations.
- `npm run db:seed` uses an idempotent category upsert.
- No listings, prices, testimonials, availability claims, or contact destinations are seeded.
- `DATABASE_URL` remains environment-only.

## XP notes

This is one small, reviewable release built on the Iteration 05 schema boundary. The next increment should connect the public read adapter to Prisma behind a server-only client, with tests against a controlled database or approved test double, before introducing admin writes.