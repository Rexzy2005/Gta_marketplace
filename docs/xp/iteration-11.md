# XP Iteration 11: Create Admin Categories

This iteration follows the Extreme Programming workflow and acceptance criteria in [`gta-legend-lane-xp-roadmap.md`](../../gta-legend-lane-xp-roadmap.md).

## Selected scope

This increment advances **GL-025** with one validated, authorized category mutation.

## Small release

Authenticated administrators can now create a category through `POST /api/admin/categories`. Input is normalized and validated before persistence, new categories are active by default, and duplicate slugs return a safe conflict response. The public catalogue and listing mutations remain unchanged.

## Acceptance checks

- Unauthenticated requests receive `401 Authentication required`.
- Names, lowercase slugs, descriptions, and sort order are validated with bounded lengths and values.
- Valid input is normalized before the Prisma create operation.
- New categories persist with `isActive: true`.
- Duplicate slugs can be reported as a `409` conflict without exposing database details.
- Repository, validator, and route behavior are covered by focused tests.

## XP notes

Tests were written first and confirmed red because the mutation and validator were absent. The implementation then passed focused tests followed by the full suite, typecheck, lint, and production build. The next slice should add category update or deactivation behavior before listing management begins.