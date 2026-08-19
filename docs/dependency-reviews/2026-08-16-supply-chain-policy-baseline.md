# Dependency Review: supply-chain policy baseline

## Summary

- Date: 2026-08-16
- Reviewer: Codex, for maintainer review
- Scope: establish reproducible npm tooling, exact existing application pins,
  install-time policy, immutable CI action pins, and a dependency-review gate.
- No resolved application dependency version changes in this review.

## Classification

- Elevated-risk, reviewed.
- Reason: pnpm and CI actions execute code at the dependency and CI trust
  boundaries. This change also establishes the policy governing all later
  dependency updates.

## Targets

- Existing application resolutions retained exactly:
  - `react` 18.3.1
  - `react-dom` 18.3.1
  - `@types/react` 18.3.2
  - `typescript` 5.4.5
  - `vocs` 1.0.0-alpha.52
- Toolchain baseline:
  - Node.js 24.19.0
  - pnpm 10.34.3
- CI actions, pinned to immutable commits:
  - `actions/checkout` v4.4.0 at `11d5960a326750d5838078e36cf38b85af677262`
  - `actions/setup-node` v4.4.0 at `49933ea5288caeca8642d1e84afbd3f7d6820020`
  - `pnpm/action-setup` v4.4.0 at `fc06bc1257f339d1d5d8b3a19a8cae5388b55320`

## Inheritance

- Prior art:
  - `../Discord-Bot-Experimental` for exact pins, seven-day release age,
    exotic-source blocking, strict dependency builds, and frozen CI installs.
  - `../../subcortex` for integrity-qualified pnpm, `devEngines`, strict release
    metadata, engine/peer enforcement, dependency verification, and review
    records.
- Deltas:
  - CI action references are immutable SHAs rather than movable major tags.
  - This npm-only static site does not inherit Docker, database, Rust, release,
    or application-specific secret-scanning controls.
  - Dependency-review records are machine-required when dependency or policy
    surfaces change.

## Release Age

- Minimum policy: seven days (`10080` minutes), strict and fail-closed when
  publish-time metadata is absent.
- Registry provenance may not become weaker than an earlier release of the
  same package (`trustPolicy: no-downgrade`).
- pnpm 10.34.3 was published 2026-06-11 and passes the age gate.
- Node.js 24.19.0 was published 2026-08-03 and passes the age gate.
- Existing application versions are retained from the 2024 lockfile and pass
  the age gate by age; their security posture is recorded separately below.

## Advisory Review

- The existing application lockfile reports 99 vulnerabilities via
  `pnpm audit`: 26 high, 63 moderate, 10 low, and 0 critical. All affected paths
  are transitive through Vocs. These findings are not declared safe or granted
  an exception by this baseline; they require the planned dependency refresh.
- CI blocks critical advisories immediately. Full audit output remains required
  evidence for every dependency review.
- pnpm 10.34.3 is outside the affected ranges of the reviewed 2026 pnpm
  advisories, including the build-approval identity bypass (patched in 10.34.2)
  and unsafe integrity-repair default (patched in 10.34.0). Version 10.34.3 also
  contains the project-config environment-secret disclosure fix.
- The initially considered local Node.js 24.16.0 was rejected because it
  predates the 2026-07-29 Node.js security release. Node.js 24.19.0 includes
  the 24.18.1 security fixes for the published high-, medium-, and low-severity
  issues affecting the 24.x line.

## Source / Upstream Review

- pnpm 10.34.3's official release notes and pnpm's published GitHub security
  advisories were reviewed. Node.js's official 24.19.0 release notes and
  2026-07-29 security release notice were also reviewed.
- Its release tag and commit are GitHub-verified and signed.
- No source review of the unchanged 2024 Vocs dependency tree was attempted in
  this policy-only change; the audit baseline makes that debt explicit.

## Install and Execution Surfaces

- pnpm's npm package declares no `preinstall`, `install`, or `postinstall`
  lifecycle hook and no runtime dependency set in registry metadata.
- Dependency lifecycle scripts are denied unless explicitly allowed.
- `esbuild` is the sole current build-script allowance because it is required by
  the existing Vocs/Vite build toolchain. Any additional build surface must be
  reviewed and added explicitly.
- CI actions execute third-party JavaScript and are therefore pinned to full
  commit SHAs.

## Integrity and Provenance

- pnpm 10.34.3 registry integrity:
  `sha512-8sUxsIgp175/A8kK3cJmYV+cVHdGPkvx0nXLJjzp6lfPDVWZEQ2UZJqbs/7Z8LXvzqdKcBa2FTKiTLmth4YMHQ==`
- Node.js 24.19.0 Darwin arm64 archive SHA-256, matched against the official
  release checksum list:
  `3f1cf157479c1480352083105e13faf9d008ede98e7e157746b6df940d197b94`
- Registry metadata contains an npm signature using key
  `SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U`.
- Corepack resolved the integrity-qualified package-manager identifier recorded
  in `package.json`.
- Existing lockfile integrity values remain unchanged.
- Store integrity and package-content identity checks are explicitly enabled,
  rather than relying on pnpm's defaults.

## Commands Run

```bash
pnpm view pnpm@10.34.3 --json
corepack use pnpm@10.34.3 # isolated temporary directory
git ls-remote --tags https://github.com/actions/checkout.git
git ls-remote --tags https://github.com/actions/setup-node.git
git ls-remote --tags https://github.com/pnpm/action-setup.git
curl -L https://nodejs.org/download/release/v24.19.0/SHASUMS256.txt
curl -L https://nodejs.org/download/release/v24.19.0/node-v24.19.0-darwin-arm64.tar.xz
shasum -a 256 node-v24.19.0-darwin-arm64.tar.xz
pnpm audit --json
pnpm install --frozen-lockfile --ignore-scripts # isolated repository copy
pnpm build # isolated repository copy
pnpm exec tsc --noEmit # isolated repository copy
```

## Outcome

- Application dependency versions: unchanged.
- Direct manifest selectors: converted from `latest` to the existing exact
  lockfile versions.
- Build-only dependencies: classified as development dependencies.
- Package-manager, Node, install, source, peer, build-script, CI, and review
  policy: established.

## Follow-ups

- Review the Vocs/React/TypeScript refresh as a separate dependency change
  before modifying versions or regenerating the lockfile.
- Resolve or explicitly time-bound every remaining advisory; do not weaken the
  audit gate to hide them.
- Consider automated update proposals only after they can be made to satisfy
  the checked-in review-record gate.
