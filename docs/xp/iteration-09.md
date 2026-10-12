# XP Iteration 09: Admin Credential Boundary

This iteration follows the Extreme Programming workflow and acceptance criteria in [`gta-legend-lane-xp-roadmap.md`](../../gta-legend-lane-xp-roadmap.md).

## Selected scope

This increment starts **GL-023** with the smallest independently testable security boundary: server-side verification of one configured administrator credential.

## Small release

The new `lib/admin-auth.ts` module creates salted scrypt password hashes, loads an administrator username and hash from environment configuration, and verifies credentials with constant-time key comparison. The new `lib/admin-session.ts` module adds an eight-hour HMAC-signed session token with expiry and tamper detection. Server-only login, logout, and session routes issue, clear, and verify an `HttpOnly` cookie without exposing credentials to client code.

## Acceptance checks

- Correct credentials verify against a stored scrypt hash.
- Incorrect usernames and passwords are rejected without revealing which part failed.
- Missing or malformed configuration fails closed without throwing.
- The original password is never included in the stored hash.
- Session tokens reject tampering, incorrect signing secrets, and expired payloads.
- Valid credentials issue an `HttpOnly`, `SameSite=Strict` session cookie.
- Invalid credentials, malformed requests, missing cookies, and invalid cookies fail without credential or session detail.
- Logout clears the session cookie.
- The environment example documents the required server-only variables.

## XP notes

Tests were written first and confirmed red before each implementation was added, then passed as focused suites. The next slice should use this boundary to protect the first database-backed admin read or mutation, with authorization tests at that route boundary.