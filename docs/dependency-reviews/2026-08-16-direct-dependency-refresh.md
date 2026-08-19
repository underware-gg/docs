# Dependency Review: direct dependency refresh

## Summary

- Date: 2026-08-16
- Reviewer: Codex, for maintainer review
- Scope: refresh every direct npm dependency to the newest reviewed compatible
  release, regenerate the transitive graph, and migrate the site to Vocs 2.
- Result: the production graph has no known advisories. The full development
  graph has two high-severity `image-size` findings that have no upstream
  release; both are mitigated by a checked-in patch and regression probes.

## Classification

- Elevated-risk, reviewed.
- This changes the React and Vocs major versions, introduces Waku as Vocs'
  required runtime peer, refreshes the full transitive graph, and carries a
  local security patch for an archived transitive package.

## Targets

| Package | Previous | Selected | Use |
| --- | ---: | ---: | --- |
| `react` | 18.3.1 | 19.2.8 | runtime |
| `react-dom` | 18.3.1 | 19.2.8 | runtime |
| `@types/react` | 18.3.2 | 19.2.18 | development |
| `typescript` | 5.4.5 | 6.0.3 | development |
| `vite` | transitive 5.2.11 | 8.2.1 | development; explicit Vocs peer |
| `vocs` | 1.0.0-alpha.52 | 2.8.5 | development |
| `waku` | absent | 1.0.0-beta.9 | development; required Vocs peer |

All manifest selectors are exact. The lockfile was regenerated from a clean
candidate rather than retaining stale, no-longer-reachable packages.

TypeScript 7.0.2 was reviewed but rejected. Vocs' Twoslash path currently
accepts TypeScript `^5.5.0 || ^6.0.0`, and TypeScript's own 7.0 release notes
warn that MDX and other programmatic-API consumers may need TypeScript 6.
Version 6.0.3 is therefore the newest compatible release, not an unreviewed
stale pin.

## Inheritance

- Uses the policy established in
  `2026-08-16-supply-chain-policy-baseline.md`.
- The isolated candidate was resolved under exact-save, seven-day release-age,
  registry-only transitive, strict peer, provenance non-downgrade, and explicit
  lifecycle-script policy before changes were copied into the repository.
- The Vocs 2 migration preserves the custom footer, sponsor presentation,
  landing page, accent colour, dark scheme, and custom CSS through its current
  config, root-style, and slot interfaces.

## Release Age

All selected releases passed the strict seven-day gate on 2026-08-16:

- React and React DOM 19.2.8: published 2026-07-21.
- `@types/react` 19.2.18: published 2026-07-30.
- TypeScript 6.0.3: published 2026-04-16.
- Vocs 2.8.5: published 2026-08-05.
- Vite 8.2.1: published 2026-08-06.
- Waku 1.0.0-beta.9: published 2026-08-08.

## Advisory Review

- Candidate and final full-graph audit: two high, zero critical, zero moderate,
  and zero low findings across 783 packages.
- Production-only audit: zero findings across four packages.
- Both full-graph findings are development-only paths through
  `vocs > image-size@2.0.2`:
  - `GHSA-5p2g-fcmc-qvqq` / `CVE-2025-71329`: zero-length JXL/HEIF boxes can
    prevent parser offsets from advancing.
  - `GHSA-w3rx-r6r6-pgpr` / `CVE-2025-71330`: a zero-length ICNS entry can
    prevent the parser offset from advancing.
- No patched `image-size` release exists. Version 2.0.2 is latest and its
  repository was archived on 2026-06-03. The checked-in pnpm patch applies the
  researcher's proposed JXL/HEIF guard and the equivalent ICNS guard to every
  shipped CJS/ESM bundle. `scripts/check-image-size-patch.mjs` runs both public
  proof-of-concept classes under a hard timeout.
- CI does not hide these findings. `scripts/check-dependency-audit.mjs`
  recognizes only these exact advisory/package/version tuples when the exact
  patch is configured, and rejects every other reported advisory.
- Exception owner: Underware maintainers. Re-review deadline: 2026-09-16, or
  immediately when Vocs removes or updates `image-size`.

## Source / Upstream Review

- React 19.2 release and React 19 migration guidance were reviewed; the site
  contains no incompatible legacy rendering API.
- TypeScript 6 and 7 release notes and the resolved Twoslash peer constraint
  were reviewed before selecting 6.0.3.
- Vocs 2's published exports and current source were used to migrate config,
  styles, slots, HomePage imports, and the removed Sponsors component.
- The `image-size` disclosure, published proof-of-concept buffers, archived
  source, and unmerged upstream fix commit
  `bdbe560bfd98af6feab93b46aed67f2f0a77e4d5` were reviewed before translating
  the fix to the package's published bundles.
- The sole deprecated transitive is `intersection-observer@0.10.0`, reached via
  `vocs > @codesandbox/sandpack-react > @react-hook/intersection-observer`.
  It has no lifecycle script or reported advisory. Removal depends on Vocs or
  Sandpack upstream and is tracked as follow-up rather than overridden.

## Install and Execution Surfaces

- None of the selected direct packages declares an install lifecycle hook.
- `esbuild` remains the only allowed lifecycle script. Its postinstall selects
  and verifies the platform binary required by the Vite toolchain.
- A clean strict install also surfaced `es5-ext@0.10.64` and
  `vue-demi@0.14.10`:
  - `es5-ext` only prints a location-dependent message and is explicitly
    blocked as unnecessary execution.
  - `vue-demi` rewrites its package files to select Vue 2 or 3. The published
    package already defaults to Vue 3, matching this graph, so the hook is
    explicitly blocked.
- Waku has build and development scripts in its repository metadata but no
  `preinstall`, `install`, or `postinstall` hook in the published package.
- A clean frozen install reports no unidentified ignored builds.

## Integrity and Provenance

- `react@19.2.8`:
  `sha512-PWaYA1L/q9u2u7xYQi+Y3L3Yfnie7XyLeaJICV1MGD6LprsBxcAqGjYyr0eY3p+QdsA+x/Irkt4Qif8D63+Sbw==`
- `react-dom@19.2.8`:
  `sha512-rVprimfGBG3DR+Tq0IQG2DT5PxKth1WIGDmj5yPmlzr4YBe7uyE+Du4oVqTDXZSHGGGXRtTJEGSSePyQCMBglQ==`
- `@types/react@19.2.18`:
  `sha512-AnzbBERsrLKtk2XSfTbYRLjQPdy116Sty4q+T+Bp3IC4l6jNBvreVPAHmpq9qhXQM7CXZPjLVmGMw9sy+hxQ3w==`
- `typescript@6.0.3`:
  `sha512-y2TvuxSZPDyQakkFRPZHKFm+KKVqIisdg9/CZwm9ftvKXLP8NRWj38/ODjNbr43SsoXqNuAisEf1GdCxqWcdBw==`
- `vite@8.2.1`:
  `sha512-EU/eS7BH3XROHh2YnBefjM6DBKA6ZeMZEYQbj7NLWg5wHYlhB8B/Mayd5XsgWq+NFYccDOTemRpdETWR6Ka/lw==`
- `vocs@2.8.5`:
  `sha512-Jme9HKxFGHBc0qXedjxjgyYlo+dvexOVd2fqgsB7Z7KT8hIsMgLd6r8+nEPIOnpKsY1VqxS08QHNdA9A54tB+w==`
- `waku@1.0.0-beta.9`:
  `sha512-XSFP07L2u5XoZf2Qt3k6AGv9q4Iogzdt9be6imJjpld/VUVZhTA5KzL3aBEdjuplYJNlNZLMZPdM9j1Kw62ZUA==`
- All selected packages carry npm registry signatures. React, React DOM, Vite,
  Vocs, and Waku also publish SLSA provenance attestations.
- `semver@6.3.1` predates the registry's current attestation model and caused a
  provenance-history downgrade check in the Vocs Babel/SVGR path. It is
  narrowly excluded by exact version after review: ISC licence, official
  `npm/node-semver` source, no dependencies, no lifecycle scripts, signed
  tarball, and no reported advisory. The global provenance gate remains on.

## Commands Run

```bash
pnpm view <package> version time license repository engines scripts dist --json
pnpm install --lockfile-only --ignore-scripts # isolated candidate
pnpm install --frozen-lockfile --ignore-scripts # isolated candidate
pnpm install --frozen-lockfile # clean isolated candidate
pnpm ignored-builds
pnpm why es5-ext vue-demi intersection-observer
pnpm audit --json
pnpm audit --prod --json
pnpm outdated --long
pnpm run deps:audit
pnpm run verify
```

## Outcome

- Every direct dependency is at the latest reviewed release except TypeScript,
  which is at the newest version compatible with Vocs' current Twoslash path.
- Direct and transitive versions are locked with integrity hashes.
- Production advisories fell from zero to zero; full-graph advisories fell from
  99 to two, and both remaining findings are locally patched and regression
  tested.
- React 19 and Vocs 2 type-check and build successfully on the pinned Node.js
  and pnpm toolchain.

## Follow-ups

- Re-review the `image-size` exception by 2026-09-16. Prefer removing the local
  patch as soon as Vocs moves to a maintained, fixed parser.
- Ask Vocs/Sandpack upstream to remove the deprecated
  `intersection-observer@0.10.0` polyfill path.
- Revisit TypeScript 7 when Twoslash declares compatibility and Vocs' MDX build
  passes with the new native TypeScript implementation.
