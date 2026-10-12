# XP Iteration 10: Protected Admin Category Read

This iteration follows the Extreme Programming workflow and acceptance criteria in [`gta-legend-lane-xp-roadmap.md`](../../gta-legend-lane-xp-roadmap.md).

## Selected scope

This increment starts the database-backed administration work for **GL-024** and **GL-025** with one read-only vertical slice.

## Small release

The application now has a reusable Prisma singleton, an injectable admin category reader, and `GET /api/admin/categories`. The route verifies the existing signed admin session before reading categories and returns administrator ordering and publication state. The public sample catalogue and all admin write paths remain unchanged.

## Acceptance checks

- A request without a valid admin session receives `401 Authentication required`.
- An authenticated administrator can read categories from the Prisma-backed repository.
- Categories are requested in ascending `sortOrder`.
- The repository contract is independently testable with a controlled database-shaped test double.
- No database connection is required for the unit and route acceptance tests.

## XP notes

Tests were written first and confirmed red because the repository and route were absent. The implementation then passed focused tests followed by the full suite, typecheck, lint, and production build. The next slice should add one validated category mutation with authorization and persistence tests.