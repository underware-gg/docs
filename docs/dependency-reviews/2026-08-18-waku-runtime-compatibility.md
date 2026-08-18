# Dependency Review: Waku runtime compatibility

## Summary

Downgrade the exact Waku pin from `1.0.0-beta.9` to `1.0.0-beta.8` after
observing a browser-breaking incompatibility between Vocs 2.8.5 and Waku
beta.9. Also move static assets to Vocs' root `public/` directory and ignore
Waku's generated `docs/pages.gen.ts` route types.

## Classification

Elevated compatibility correction. Waku is executable framework and build
tooling, and the change alters both the development server and production
build graph.

## Targets

- `waku`: `1.0.0-beta.9` -> `1.0.0-beta.8` (exact pin)
- `docs/public/` -> `public/` (no asset content changes)
- Ignore generated `docs/pages.gen.ts`

Waku beta.8 is the newest inspected release that retains the
`unstable_events` router surface consumed by Vocs 2.8.5.

## Inheritance

Vocs declares Waku `^1.0.0-beta.6` as an optional peer. Waku beta.6, beta.7,
and beta.8 expose `unstable_events`; beta.9 does not. Because Vocs 2.8.5 still
unconditionally calls `events.on(...)`, beta.9 throws during hydration and
leaves the site blank.

The application retains React 19.2.8, which satisfies beta.8's `~19.2.4` React
peer range.

## Release Age

Waku 1.0.0-beta.8 was published on 2026-07-24, more than the repository's
seven-day minimum release age before this 2026-08-18 review. It is also the
latest GitHub release listed by the upstream Waku project at review time.

## Advisory Review

The candidate and final lockfiles were checked through the governed audit
gate. The production graph remains clear. The full graph retains only the two
previously reviewed, locally patched image-size advisories with exact
allowlist entries and dated re-review deadlines.

## Source / Upstream Review

- Vocs 2.8.5's `ScrollRestoration` implementation destructures
  `unstable_events` from `useRouter()` and subscribes with `events.on(...)`.
- The signed npm tarballs for Waku beta.6, beta.7, and beta.8 were inspected;
  all return `unstable_events: router.routeChangeEvents` from `useRouter()`.
- The installed beta.9 source omits that return field, reproducing the exact
  `Cannot read properties of undefined (reading 'on')` failure.
- Waku's beta.8 release notes describe router fixes and refactors and identify
  upstream commit `fac7ef4`.

References:

- https://github.com/wakujs/waku/releases/tag/v1.0.0-beta.8
- https://github.com/wevm/vocs/blob/main/src/react/ScrollRestoration.tsx
- https://registry.npmjs.org/waku/1.0.0-beta.8

## Install and Execution Surfaces

Waku remains an existing direct development dependency and executable build
framework; no new install script or executable package is introduced. The
beta.8 dependency set uses the same framework families as beta.9. Lockfile
changes are limited to the Waku downgrade and compatible transitive
resolutions.

## Integrity and Provenance

The Waku beta.8 npm tarball has:

- SHA-512 integrity:
  `sha512-+Ek51aw/L0KwjCqlS8ZYB37t3H1BKbJIMd2rP7BsL0C/3FQvS9lH13SheowZqEe1rop01jkQr4bZzXAjt6cn5w==`
- SHA-1 registry checksum: `61a6bd4e1162d1a9fc607045dfb9b93cc980e6f3`
- npm registry signature using key
  `SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U`
- SLSA provenance attestation published by GitHub Actions through npm trusted
  publishing

The downloaded tarball's SHA-1 matched the registry checksum before use.

## Commands Run

```text
curl -sS https://registry.npmjs.org/waku/1.0.0-beta.8
curl -L https://registry.npmjs.org/waku/-/waku-1.0.0-beta.8.tgz
shasum /private/tmp/waku-1.0.0-beta.8.tgz
rg -n "unstable_events|events:" <inspected Waku beta.6-beta.8 sources>
corepack pnpm install --no-frozen-lockfile
corepack pnpm run deps:audit
corepack pnpm ignored-builds
corepack pnpm run verify
corepack pnpm run dev
curl <local development-server pages and assets>
git diff --check
```

Commands used the repository's exact Node.js 24.19.0 and pnpm 10.34.3 pins.

## Outcome

Accepted Waku 1.0.0-beta.8 as the newest Vocs-compatible release. The missing
router event field that caused hydration to throw is restored, root-relative
assets resolve successfully, and the generated route-type file no longer
dirties the working tree.

## Follow-ups

Re-test the newest Waku release when Vocs removes its dependency on
`unstable_events` or declares compatibility with the replacement router API.
Do not advance the Waku pin based on build success alone; exercise browser
hydration as part of that review.
