# Dependency Review: source-map-js upstream security release

## Summary

- Date: 2026-10-06. Reviewer: Codex for Underware maintainers.
- Replace locally patched source-map-js 1.2.1 with upstream 1.2.2.
- User authorization: “Just do the source map upgrade now. Documented exemption”.
- The exemption is only `source-map-js@1.2.2` in `minimumReleaseAgeExclude`.
  Remove the local patch and advisory allowance; retain parser regressions.
- Full and production candidate audits both report zero vulnerabilities.

## Classification

Elevated risk: an explicitly authorized exception to the seven-day release-age
policy for a reviewed upstream security fix. Review and resolve the candidate
outside the repository before copying the accepted lockfile and policy.

## Targets

| Package | Previous | Selected | Introducing dependencies |
| --- | --- | --- | --- |
| source-map-js | patched 1.2.1 | 1.2.2 | PostCSS 8.5.28, Tailwind node 4.3.3, Vue compiler-core/compiler-sfc 3.5.43 |

An exact `source-map-js: 1.2.2` override updates all four resolved consumers.
Their existing version ranges accept 1.2.2. No other package identity,
integrity, engine, or package metadata changes in the candidate lockfile.

## Inheritance

Inherits the coordinated stack and supply-chain verification from
`2026-10-06-dependency-refresh.md` and its evidence JSON. The candidate retains
793 package identities: 792 unchanged, one replacement. Frozen installs,
strict peers/builds, source restrictions, content integrity, provenance
non-downgrade and the inherited exact semver trust exception remain enabled.
The global seven-day age threshold is unchanged.

## Release Age

Registry publication: **2026-09-30T14:08:09.382Z**. Fresh verification at
2026-10-06T11:25:05.797Z measured 8,476 minutes against the 10,080-minute policy.
Normal eligibility is **2026-10-07T14:08:09.382Z UTC**.

The user explicitly authorized immediate installation with a documented
exemption. Reason: adopt the verified upstream fix for CVE-2026-93749 and
remove the temporary backport, vulnerable-version audit allowance and dated
CI expiry. The exclusion contains the exact package and version; there is no
wildcard, missing-time exemption, reduced global threshold or trust bypass.

Exception owner: Underware maintainers. Re-review/remove the age exemption
by **2026-10-09 UTC**, after normal eligibility. Once aged, the exclusion has
no practical effect for this pinned version; it never exempts later releases.

## Advisory Review

[GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q)
identifies 1.2.2 as fixed for the indexed-source-map offset/event-loop denial
of service. The candidate full audit reports zero findings across 794
root-inclusive dependency records; production reports zero across four.

Remove the former exact advisory allowance, patch requirement and expiry
condition. The audit gate now rejects every advisory, incomplete reports and
nonzero audit exits. No vulnerability exception remains.

## Source / Upstream Review

Reviewed the [upstream release](https://github.com/7rulnik/source-map-js/releases/tag/v1.2.2),
verified 1.2.1/1.2.2 tarball diffs and the already reviewed security commit
`cf7658058ceeaa8619d5ae0ec90be6905209d016`. The three security-related files
are identical to the previous verified local backport. The additional
quick-sort change falls back to a comparator closure when dynamic code
generation is unavailable. Existing regression probes pass both normally
and with Node's `--disallow-code-generation-from-strings` flag.

Renamed the regression script to `check-source-map.mjs` because it now checks
the unpatched upstream parser. It still rejects invalid/large/nested offsets,
exercises deep section sources, valid mapping round trips and bounded
SourceNode/generator processing. The parser command is `deps:parsers:check`.

## Install and Execution Surfaces

BSD-3-Clause licence, same official repository and npm publisher `7rulnik` as
1.2.1, Node >=0.10.0, no dependencies, lifecycle install hooks, native code or
binary downloads. No build-script permission is added. The candidate install
is frozen and uses the existing reviewed lifecycle policy.

## Integrity and Provenance

- Independently hashed downloaded tarball:
  `sha512-KGj/8Y43x35aZVDtt+J4mK1hoLGHULMYfSkODJNQjNDC3oW1PqPoxMwo0pLUsWM/UEGzON/NxeHywEfNXNP3Vw==`.
- Two npm registry signatures verified cryptographically against current
  registry keys. The registry supplies no provenance attestation for either
  1.2.1 or 1.2.2; there is no provenance downgrade or new trust exception.
- Published gitHead: `0a1d334fd1e55a47df97fcd60a7915d46df3b08a`.
- Fresh package evidence and exact final hashes are recorded in
  `2026-10-06-source-map-upgrade-evidence.json`.
- pnpm 10.34.6's version-policy matcher accepts exact versions only for a
  version-qualified exclusion. The isolated resolution verifies the exemption
  works while all unchanged package records preserve their reviewed integrity.

## Commands Run

```sh
# Isolated candidate, pinned Node 24.21.0 / Corepack pnpm 10.34.6:
pnpm install --lockfile-only --ignore-scripts --no-frozen-lockfile
pnpm audit --json
pnpm audit --prod --json
pnpm install --frozen-lockfile
node scripts/check-source-map.mjs
# Final repository checks:
corepack pnpm install
corepack pnpm install --force --frozen-lockfile # refresh install/build metadata
corepack pnpm ignored-builds
corepack pnpm run deps:audit
corepack pnpm run verify
```

Additionally compare all candidate package records to the previous lockfile,
verify registry signatures and independent SHA-512, and exercise audit-gate
fixtures for clean, formerly allowed, unknown and incomplete/error reports.

## Outcome

Upstream source-map-js 1.2.2 replaces the local backport under the user's
exact-version release-age exemption. Both audit scopes are clean. The local
patch and vulnerability exemption are removed; the ordinary verification
pipeline retains the security regressions and checks the actual PostCSS parser.

## Follow-ups

- Remove the age exclusion after 2026-10-07T14:08:09.382Z UTC; re-review by
  2026-10-09 UTC. This is configuration cleanup, with no audit-expiry condition.
- Other dependency follow-ups and Linux CI remain as documented in the full
  refresh review. No additional package upgrade or deployment is part of this
  focused change.
