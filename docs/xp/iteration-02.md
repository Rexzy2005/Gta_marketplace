
# XP Iteration 02: Pricing Domain Boundary

This iteration follows the Extreme Programming workflow and acceptance criteria in [`gta-legend-lane-xp-roadmap.md`](../../gta-legend-lane-xp-roadmap.md).

## Selected stories

- **GL-012:** Store USD as the authoritative base price.
- **GL-014:** Convert USD prices for display.
- **GL-015:** Allow manual currency selection.

## Small release

The homepage now consumes catalogue records and conversion rules from `lib/catalogue.ts` instead of owning them inside the page component. This makes the pricing boundary independently testable and leaves one clear replacement point for the future admin/database repository.

## Acceptance checks

- USD remains the source amount and converts to EUR/GBP only for display.
- Conversion rounds the derived amount and does not mutate the listing record.
- Quote-required listings display `QUOTE` rather than an invented amount.
- The homepage currency selector continues to override the default USD view for the active session.

## XP notes

The change was kept deliberately small: one domain module, one focused test file, and one presentation import update. The next story-sized increment is to replace the local records with a server-backed repository after the approved persistence and authentication choices are confirmed.