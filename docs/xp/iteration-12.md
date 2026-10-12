# XP Iteration 12: Category Availability Status

This iteration follows the Extreme Programming workflow and acceptance criteria in [`gta-legend-lane-xp-roadmap.md`](../../gta-legend-lane-xp-roadmap.md).

## Selected scope

This increment advances **GL-025** and **GL-026** with a focused activation/deactivation mutation.

## Small release

Authenticated administrators can set a category's `isActive` status through `PATCH /api/admin/categories/[id]`. The endpoint accepts only an explicit boolean, persists only the status field, and returns safe errors for missing categories or unauthorized requests.

## Acceptance checks

- Unauthenticated requests receive `401 Authentication required`.
- Status updates accept only boolean `isActive` values.
- The repository updates only the requested category status.
- Missing database records return `404 Category not found` without exposing database details.
- Both activation and deactivation use the same tested route contract.

## XP notes

Tests were written first and confirmed red because the status parser, repository updater, and dynamic route were absent. The implementation passed focused tests followed by the full suite, typecheck, lint, and production build. The next slice should make public category/listing availability reflect persisted status before broader listing administration.