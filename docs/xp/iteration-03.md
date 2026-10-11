# XP Iteration 03: Pricing Models

This iteration follows the Extreme Programming workflow and acceptance criteria in [`gta-legend-lane-xp-roadmap.md`](../../gta-legend-lane-xp-roadmap.md).

## Selected stories

- **GL-016:** Support fixed-price packages.
- **GL-017:** Support variable-price services.

## Small release

Catalogue records now support active fixed-price package options, starting prices, configured ranges, and quote-required listings. The order brief lets a visitor select an active package and shows the selected indicative amount without implying checkout or fulfilment.

## Acceptance checks

- Fixed package amounts remain stored in USD and convert through the shared pricing module.
- Inactive packages are excluded from the customer selection list.
- Range listings show a derived indicative range.
- Quote-required listings show `QUOTE` and never fabricate a numeric amount.
- The brief clearly states that the conversation continues outside the website.

## XP notes

The change stays within one vertical slice: shared domain types, focused acceptance tests, and the existing brief interaction. Sample options remain administrator-configured templates, as required by the roadmap. The next increment should introduce the approved persistence and authorization boundary before adding admin mutations.