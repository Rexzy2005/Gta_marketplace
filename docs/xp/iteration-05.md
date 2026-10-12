# XP Iteration 05: Catalogue Persistence Foundation

This iteration follows the Extreme Programming workflow and acceptance criteria in [`gta-legend-lane-xp-roadmap.md`](../../gta-legend-lane-xp-roadmap.md).

## Selected scope

This is a persistence foundation for **GL-024** and **GL-025**. It deliberately does not add admin mutations or authentication.

## Technical decision

The project adopts PostgreSQL with Prisma, matching the recommended architecture in the roadmap. `DATABASE_URL` is environment-only and the schema is migration-ready. Authentication remains a separate decision and is not represented by a guessed credential model.

## Small release

The Prisma schema models categories, listings, and packages with USD-authoritative decimal prices, fixed/range/quote pricing modes, availability, publication state, featured state, ordering, and safe category/listing relationships.

## Acceptance checks

- Category slugs and listing slugs are unique.
- Listing prices are nullable where quote/range rules require it and use decimal precision for USD amounts.
- Packages belong to listings and carry independent USD prices and active/order state.
- Deleting a category with listings is restricted; deleting a listing cascades its packages.
- The existing public read adapter remains unchanged until a database connection and migration workflow are configured.

## XP notes

This is one small, reviewable schema slice. Prisma 6.12.0 is pinned because it is the audited release selected for this increment. Validation succeeds with `DATABASE_URL` supplied through the environment; no database connection or secret is committed. The next increment should establish migration and seed commands, then replace the temporary read adapter only after a PostgreSQL environment is available.