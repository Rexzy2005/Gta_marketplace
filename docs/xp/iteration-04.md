# XP Iteration 04: Storefront Read Boundary

This iteration follows the Extreme Programming workflow and acceptance criteria in [`gta-legend-lane-xp-roadmap.md`](../../gta-legend-lane-xp-roadmap.md).

## Selected scope

This is a preparatory slice for **GL-024** and **GL-031**. It establishes the public read boundary before admin mutations are introduced.

## Small release

The catalogue now has a `CatalogueRepository` contract, a temporary sample-data adapter, and a public `GET /api/catalogue` route. The adapter returns a fresh collection per read so presentation code cannot reorder the source records by accident.

## Acceptance checks

- Public reads are isolated behind `lib/catalogue-repository.ts`.
- `GET /api/catalogue` returns catalogue records as JSON.
- Pricing fields remain USD-authoritative and variable-price metadata is preserved.
- Repository reads are covered by focused tests.
- No admin write, authentication, or persistence claim is made before those choices are approved.

## XP notes

This increment deliberately stops at a read-only boundary. The roadmap recommends PostgreSQL with Prisma or Drizzle, but the project has not confirmed the provider, deployment target, or authentication approach. The next implementation step should make that decision explicit, then replace the temporary adapter with a server-backed implementation before adding mutations.