# XP Iteration 08: Contact Handoff Channels

This iteration follows the Extreme Programming workflow and acceptance criteria in [`gta-legend-lane-xp-roadmap.md`](../../gta-legend-lane-xp-roadmap.md).

## Selected scope

This increment implements **GL-018**, **GL-020**, and **GL-021**, with the recovery behavior in **GL-022**. It does not require PostgreSQL or payment processing.

## Small release

Discord and Telegram destinations can now be supplied through `NEXT_PUBLIC_DISCORD_URL` and `NEXT_PUBLIC_TELEGRAM_URL`. Only HTTPS URLs on the approved channel hosts render as actions. Missing or invalid destinations remain hidden, while the tested copyable order brief remains available as the fallback.

## Acceptance checks

- Discord and Telegram URLs are validated independently.
- Insecure, malformed, and unrelated-host URLs are rejected.
- Configured actions open externally and clearly state that the conversation continues off-site.
- No bot credentials or private tokens are accepted by the client configuration.
- The footer and order brief show a neutral unconfigured state when no destinations are supplied.

## XP notes

This is one small vertical slice: a pure URL-validation boundary, focused tests, and two presentation touchpoints. Real contact destinations remain environment configuration, and the database migration remains intentionally deferred.