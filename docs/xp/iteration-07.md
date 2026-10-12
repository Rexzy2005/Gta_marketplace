# XP Iteration 07: Order Brief Generation

This iteration follows the Extreme Programming workflow and acceptance criteria in [`gta-legend-lane-xp-roadmap.md`](../../gta-legend-lane-xp-roadmap.md).

## Selected scope

This increment implements **GL-019** and supports the recovery behavior in **GL-022** without requiring the deferred PostgreSQL migration or contact-channel configuration.

## Small release

Order-summary generation now lives in the pure `lib/order-brief.ts` module. The brief includes a stable listing reference, selected package, USD reference price, indicative display amount, bounded customer notes, and an explicit statement that no payment or order has been placed. The modal copies this tested summary instead of assembling an incomplete inline string.

## Acceptance checks

- Fixed-package selections appear in the generated summary.
- Range and quote-required listings never receive fabricated numeric prices.
- Customer notes are normalised and limited to 500 characters.
- USD and indicative local-currency context are both preserved.
- The summary remains copyable even while Discord and Telegram are unconfigured.

## XP notes

This is one small vertical slice with a pure domain function, focused acceptance tests, and one presentation integration. Database-backed reads and contact destinations remain separate decisions, so this phase does not require a real PostgreSQL connection.