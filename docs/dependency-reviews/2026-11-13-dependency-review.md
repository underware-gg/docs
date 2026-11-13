# Dependency Review November 2026

## Summary

Review date: 2026-11-13. Reviewer: Codex for Underware maintainers.
After fetching origin, local `dev`, local `main`, `origin/dev`, and
`origin/main` all pointed to `c5863336bb0d70aacae7af8eb583564f36ce5882`.
The working tree was clean before this review.

The current lockfile has **38 advisories: 1 critical, 13 high, 20 moderate,
and 4 low**. The adopted graph has **zero advisories**, passes
the seven-day age policy, installs with the existing build permissions,
passes `verify`, and serves HTML successfully for all 18 authored routes on Node 24.22.3.
The critical React Server Components update should take priority.

The maintainer authorized implementation after review, including a scoped
Node security age exception. The manifest, root lockfile, Node/pnpm pins and
scoped overrides now adopt the reviewed graph. The exact graph is retained in
[the root lockfile](../../pnpm-lock.yaml), with the selected manifest, workspace
policy, per-package verification and advisory details in
[the evidence JSON](2026-11-13-dependency-review-evidence.json). The separate
[Node baseline review](2026-11-13-node-security-baseline.md) records its
authorization, authentic signatures, archive checks and dated re-review.

## Classification

Elevated risk: executable framework and build-tool updates, a Waku release
candidate transition, a TOML major override, native binary updates and a
complete transitive refresh. Resolution, source inspection, supply-chain
verification, installation and acceptance checks used an isolated repository
copy. The only new exception is the explicitly authorized Node 24.22.3 security
release age exemption. No npm age, peer, provenance, advisory or build-script
exception was added.

## Targets

| Dependency | Current | Selected | Decision |
| --- | --- | --- | --- |
| react | 19.3.0 | 19.3.1 | Update with React DOM and RSC. |
| react-dom | 19.3.0 | 19.3.1 | Coordinated React patch. |
| react-server-dom-webpack | 19.3.0 | 19.3.1 | Fix critical RSC advisory. |
| @types/react | 19.3.0 | 19.3.0 | Retain; current stable release. |
| typescript | 6.0.3 | 6.0.3 | Retain; Twoslash excludes TypeScript 7. |
| vite | 8.3.1 | 8.3.6 | Latest aged 8.x; clears six current findings. |
| vocs | 2.10.0 | 2.12.0 | Update together with Waku. |
| waku | 1.0.0-rc.1 | 1.0.0-rc.4 | Latest aged RC; strict peers and build pass. |
| pnpm | 10.34.6 | 10.34.9 | Reviewed and used for candidate acceptance. |
| vocs>image-size override | 2.0.4 | 2.0.4 | Retain; 2.1.0 is under seven days old at review cutoff. |
| remark-mdx-frontmatter>toml override | 4.2.0 | 5.0.1 | Required security major; 4.3.0 remains vulnerable. |
| @scalar/json-magic>undici override | 7.29.1 | 7.30.2 | Clears eight current findings. |
| source-map-js override | 1.2.2 | 1.2.2 | Retain version; remove redundant age exclusion. |
| Node.js | 24.21.0 | 24.22.3 | Maintainer-authorized exact security age exemption; verified official binary and application acceptance. |

The update also refreshes vulnerable transitives to
`@modelcontextprotocol/sdk@1.32.2`, `zod@4.6.7`, `body-parser@2.4.0`,
`ip-address@10.7.6`, `fast-uri@3.1.9`, `qs@6.17.1`, `hono@4.13.16`, and
`@hono/node-server@2.1.6`. Their exact ages and integrity evidence are recorded
in the JSON.

The graph changes from 793 to 783 package identities: 573 retained, 210
added or changed, and 220 removed. Optional platform packages are included.

## Inheritance

The adopted configuration retains exact pins, frozen ordinary installs, strict peers,
strict dependency builds, registry source restrictions, store/content
verification, fail-closed publish timestamps and `trustPolicy: no-downgrade`.
The existing `semver@6.3.1` trust exclusion is retained without expansion.
No new install-time permission is required.

The exact `source-map-js@1.2.2` age exclusion became redundant on
2026-10-07T14:08:09.382Z and its previous re-review deadline was October 9.
It is removed from the adopted workspace policy. Removing it does not change
the resolved parser or require another exception.

## Release Age

Registry selection cutoff: **2026-11-06T05:28:54.887135Z**, seven days before
the metadata review began. Every one of the 783 resolved package identities
has an exact registry timestamp at or before that cutoff. The separately
reviewed pnpm release also passes. Selected publish times:

| Package | Published UTC |
| --- | --- |
| react 19.3.1 | 2026-10-14T16:47:15.290Z |
| react-dom 19.3.1 | 2026-10-14T16:49:10.081Z |
| react-server-dom-webpack 19.3.1 | 2026-10-14T16:49:15.095Z |
| vite 8.3.6 | 2026-11-05T05:40:52.195Z |
| vocs 2.12.0 | 2026-10-26T23:23:47.769Z |
| waku RC.4 | 2026-10-22T05:44:27.020Z |
| toml 5.0.1 | 2026-10-12T23:01:48.010Z |
| undici 7.30.2 | 2026-11-05T09:06:58.994Z |
| pnpm 10.34.9 | 2026-10-25T17:54:00.645Z |

Hold these newer releases until at least the following UTC times, then
re-review their advisories, sources and compatibility:

| Package | Normal age eligibility UTC |
| --- | --- |
| image-size 2.1.0 | 2026-11-13T11:31:18.555Z |
| vite 8.3.7 | 2026-11-16T10:25:29.212Z |
| vite 8.3.8 | 2026-11-18T02:49:46.387Z |
| waku RC.5 | 2026-11-18T08:24:55.816Z |

Node's download index dates precede its GitHub release publication dates;
the later exact GitHub timestamp avoids admitting the security release early.
Node 24.22.3 was adopted early under the separately documented, maintainer-
authorized security exemption. Normal eligibility is November 18, 16:44:08 UTC;
owner: Underware maintainers, re-review by November 19, 00:00 UTC.

## Advisory Review

Full baseline audit: 38 findings across 794 root-inclusive audit records.
Production baseline: zero across four records. Candidate full audit: zero
across 784 records; candidate production: zero across four. The repository's
governed `deps:audit` command also passes in the updated repository; final
full and production audits both remain at zero advisories.

- **Critical RSC:** [GHSA-xqc2-xf4c-x3h3](https://github.com/advisories/GHSA-xqc2-xf4c-x3h3)
  affects `react-server-dom-webpack@19.3.0`; 19.3.1 is fixed. Waku/Vocs
  support RSC, so the production-only audit's exclusion of development
  dependencies cannot establish that the deployed framework is unaffected.
  The upstream exploit requires specific response/payload conditions;
  exposure of the actual deployed artifact was not assessed. Update the
  coordinated stack. Plugin-rsc 0.5.39's vendored RSC manifest also declares
  19.3.1, rather than relying only on the direct package audit.
- **TOML:** four high findings cover prototype pollution and CPU exhaustion
  from integers, dotted paths and arrays of tables. Their affected range
  extends through 5.0.0; 4.3.0 is not a security fix. Use the scoped 5.0.1
  override. MDX frontmatter parsing is the applicable build path; installed
  YAML/TOML compilation, depth and prototype regression checks pass.
- **Vite:** six findings concern editor command handling and development
  middleware/file serving. Some require Windows, but the other development
  paths still merit remediation. 8.3.6 is outside the reported affected
  ranges; do not expose the development server publicly.
- **Undici:** eight findings include TLS validation, cross-origin cache
  disclosure, decompression errors, unbounded buffers and integrity parsing.
  The Scalar build/client path resolves to 7.30.2. The site does not configure
  an OpenAPI client, which narrows current feature exposure without excusing
  vulnerable executable dependencies.
- **Other transitives:** MCP session/authentication/redirect and validation
  issues, Zod memory exhaustion, compressed-body parsing, IP parsing, URI
  normalization, query serialization and Hono middleware/server handling
  clear in the refreshed graph. These are primarily build/development/server
  tooling paths; an npm development classification is not a mitigation.
  Every advisory's affected range and dependency paths are retained in JSON.
- **Node:** the previous 24.21.0 baseline predates the
  [October security release](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases).
  Aged 24.22.2 includes those fixes but still predates the additional HTTP/2,
  TLS and other fixes in
  [24.22.3](https://nodejs.org/en/blog/release/v24.22.3).
  The maintainer authorized direct adoption of 24.22.3 after its supply-chain
  review passed. Its signatures, official archive hashes, macOS code signature
  and source changes are assessed in the linked Node baseline review.
- **pnpm:** all 32 published upstream security advisories were inspected.
  Neither pnpm 10.34.6 nor 10.34.9 falls in an affected `pnpm` range.
  The new eMudhra advisory targets standalone `@pnpm/exe` before 10.34.8;
  Corepack uses the npm `pnpm` package with the separately pinned Node.
  Updating pnpm alone does not fix the host Node certificate/runtime issues.

No advisory allowance, backport or suppression is proposed.

## Source / Upstream Review

[Vocs releases](https://github.com/wevm/vocs/releases) add development memory
improvements, an MCP page-path containment fix, sidebar anchor corrections,
base-path fixes and smaller browser configuration. The published 2.12.0
integration supplies `virtual:vite-rsc-waku/html-transform`, missing from the
previously rejected RC.2 pairing. Its direct peers continue to accept Vite 8
and React 19.3. [Waku RC.4](https://github.com/wakujs/waku/releases/tag/v1.0.0-rc.4)
requires the React 19.3.1 patch and changes unstable request/router APIs;
the actual site passes type-checking, production compilation and route checks.

[Vite 8.3.6](https://github.com/vitejs/vite/releases/tag/v8.3.6) includes
development-server escaping and optimizer/build fixes. Plugin-rsc advances
to 0.5.39, with the corrected React patch and server-reference rejection
support. Native Rolldown, Rollup and Tailwind packages advance as described
below. TypeScript remains 6.0.3 because Twoslash 0.3.9 declares
`^5.5.0 || ^6.0.0`; installing the available 7.0.2 would violate strict peers.

TOML 5.0.1's published parser and compiler retain `parse()`, null-prototype
tables and depth limits. Source inspection confirms guarded table-container
traversal and bounded integer conversion. The major changes integer handling:
unsafe or out-of-range integer values can now throw; authored frontmatter and
the installed MDX fixtures pass with the new parser.

[pnpm 10.34.7](https://github.com/pnpm/pnpm/releases/tag/v10.34.7),
[10.34.8](https://github.com/pnpm/pnpm/releases/tag/v10.34.8) and
[10.34.9](https://github.com/pnpm/pnpm/releases/tag/v10.34.9) cover verified
registry-mirror bootstrap, removal/hoisting fixes and package-manager lock
recording. The adopted setup uses Corepack and the verified JavaScript package.

The only deprecated graph entry remains inherited
`intersection-observer@0.10.0`. No added/changed identity is deprecated or
missing licence metadata; their declared licences are MIT, ISC, Apache-2.0,
BSD, 0BSD, CC0 or CC-BY-4.0. Repository URL differences among retained package
names normalize to the same upstream owners/repositories. Inherited
`@codesandbox/nodebox@0.1.8` Sustainable Use License restrictions still require
attention before adding embedded playground features.

CI inventory shows newer major releases: checkout 7.0.1, setup-node 7.1.0
and pnpm/action-setup 6.1.1. These pass age by their official publication
dates, but their runner/runtime, cache and bootstrap migrations require a
separate executable-action review. The update retains all three existing
immutable action SHAs and does not approve those major migrations.

## Install and Execution Surfaces

The clean frozen installation ran only the inherited `esbuild@0.28.2`
postinstall. Existing denials for es5-ext and vue-demi remain. No newly
introduced package has a preinstall/install/postinstall hook, and
`pnpm ignored-builds` reports none. Registry `prepare` scripts are recorded
separately; registry tarball installation does not run Git preparation hooks.
The inherited fsevents metadata discrepancy remains as reviewed in October.

Native executable families include Rolldown/bindings 1.2.16, Rollup/platform
packages 4.67.5 and Tailwind/Oxide 4.3.4. Existing esbuild, lightningcss,
fsevents and Takumi/WASM surfaces remain. Every platform package's age,
signature and integrity metadata was checked; execution tests ran on Darwin
arm64. No new binary-download lifecycle allowance is needed.

## Integrity and Provenance

All 783 lockfile integrity values match registry metadata. All 783 identities
have cryptographically verified npm signatures. All 281 identities declaring
provenance have verified Sigstore/SLSA attestations, including package/version
and tarball subject matching. The separately verified pnpm package adds one
more signature/provenance identity. There are zero verification failures.

Reviewed provenance identities include React's
`runtime_release_from_ci.yml`, Vite/plugin-rsc `publish.yml`, Vocs `main.yml`,
Waku `cd.yml` and pnpm `release.yml`, at their expected upstream repositories.
The exact workflows, source commits and subjects are recorded in JSON.
No provenance downgrade exception was introduced.

Selected tarballs were independently downloaded and SHA-512 checked before
source inspection. Candidate installation verified downloaded packages against
the frozen lockfile. pnpm 10.34.9's verified tarball SHA-224 is
`28a6a8bd9f3143368c728cda2d45fe935bd867f24c3b3de34ea98af2`, matching the
adopted Corepack/devEngines pin. The Node baseline review records the verified
24.22.3 source tag, signed archive checksums and macOS code signature.

## Commands Run

```sh
git fetch --prune origin
git rev-parse dev main origin/dev origin/main
git rev-list --left-right --count origin/main...origin/dev
node scripts/check-dependency-policy.mjs
corepack pnpm audit --json
corepack pnpm audit --prod --json

# Initial isolated package review on Node 24.21.0:
corepack pnpm install --lockfile-only --no-frozen-lockfile --ignore-scripts
corepack pnpm install --frozen-lockfile --ignore-scripts
corepack pnpm run verify
# Fresh node_modules, reviewed pnpm 10.34.9, existing build permissions:
corepack pnpm install --frozen-lockfile
corepack pnpm ignored-builds
corepack pnpm run deps:audit
corepack pnpm run verify
# Final repository, verified Node 24.22.3 and pnpm 10.34.9:
CI=true corepack pnpm install --frozen-lockfile
corepack pnpm ignored-builds
corepack pnpm run deps:audit
corepack pnpm audit --json
corepack pnpm audit --prod --json
corepack pnpm run verify
# Isolated copy with the same manifest/lockfile and Node 24.22.3:
VERCEL=1 corepack pnpm run build
```

Additional checks: exact npm timestamps and lockfile hashes for every package;
npm/pacote signature and Sigstore/TUF attestation verification; selected
tarball hashes and source inspection; official toolchain release/advisory
metadata; loopback HTTP smoke checks for all 18 authored routes. Network
checks and the temporary loopback server required sandbox escalation. The
server was stopped after validation. Browser hydration/navigation could not be exercised because the browser
automation host was unavailable. Linux CI and Vercel deployment were not run.

## Outcome

The coordinated graph and pnpm 10.34.9 are adopted with verified Node
24.22.3. The package graph passes the seven-day age and supply-chain checks;
the exact Node age exemption is explicitly authorized and recorded separately.
Application acceptance covers installation, advisory, parser, type-check,
production-build and HTTP route checks. An isolated Vercel build of the same
manifest/lockfile also passes, emitting Build Output v3 with seven routes and
an RSC function whose handler exists; that function still selects `nodejs22.x`. All 18 authored routes return HTTP
200 HTML. The selected package graph clears all 38 baseline npm advisories.

## Follow-ups

- Include these review records and verification evidence with the coordinated
  dependency change when committing.
- Owner: Underware maintainers. Re-review the Node baseline by
  2026-11-19T00:00:00Z; normal age eligibility is 2026-11-18T16:44:08Z.
- Run browser hydration, navigation, search and mobile acceptance before
  merging the Waku/Vocs update, then Linux CI and the deployment adapter checks.
- Re-review the held image-size/Vite/Waku releases after their listed
  eligibility times. Do not update Waku independently of Vocs.
- Review CI action major migrations separately, preserving full commit pins.
- Revisit TypeScript 7 when Twoslash supports it, and retain the inherited
  Sandpack deprecation/licensing follow-ups.
