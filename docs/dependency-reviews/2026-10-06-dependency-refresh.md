# Dependency Review: October dependency refresh

> Source-map follow-on: the user subsequently authorized immediate 1.2.2
> installation with an exact release-age exemption. The patch, advisory
> allowance and CI expiry below describe the initial review decision and are
> now superseded by [the source-map upgrade review](2026-10-06-source-map-upgrade.md).
> Current full and production audits have zero advisories.

## Summary

- Date: 2026-10-06. Reviewer: Codex for Underware maintainers.
- Baseline: `eeb0f5f3d09ea091727320817ed45e51304f2082`.
- Refresh the coordinated React/Vocs/Waku stack and pinned Node/pnpm toolchain.
  Retire the image-size patch, fix TOML and Undici through scoped overrides,
  and backport the source-map security fix while its release ages.
- The final full audit reports one high advisory against the locally patched
  source-map version; production-only audit reports zero findings.
- Machine-readable package evidence is in
  `2026-10-06-dependency-refresh-evidence.json` beside this record.

## Classification

Elevated risk: executable build tooling, a Waku prerelease transition, a full
transitive refresh, a TOML major override, and a temporary security backport.
Candidate resolution, source inspection, signature/provenance verification,
installation and acceptance tests happened outside the repository first.

## Targets

| Package | Previous | Selected | Reason |
| --- | --- | --- | --- |
| Node.js | 24.19.0 | 24.21.0 | Retain Node 24 LTS; signed official archive verified. |
| pnpm | 10.34.3 | 10.34.6 | Latest aged 10.x; includes reviewed security fixes. |
| react | 19.2.8 | 19.3.0 | Required by Vocs and Waku. |
| react-dom | 19.2.8 | 19.3.0 | Match React. |
| react-server-dom-webpack | transitive 19.2.8 | direct development 19.3.0 | Align Waku's required executable peer. |
| @types/react | 19.2.18 | 19.3.0 | Match React API definitions. |
| typescript | 6.0.3 | 6.0.3 | Twoslash still requires `^5.5.0 || ^6.0.0`. |
| vite | 8.2.1 | 8.3.1 | Latest aged 8.x. |
| vocs | 2.8.5 | 2.10.0 | Latest aged Vocs; updated Waku router integration. |
| waku | 1.0.0-beta.8 | 1.0.0-rc.1 | Compatible with Vocs 2.10.0 and React 19.3.0. |
| image-size | patched 2.0.2 | 2.0.4 | Upstream fixes; scoped `vocs>image-size` override. |
| toml | 3.0.0 | 4.2.0 | Security fixes; scoped `remark-mdx-frontmatter>toml` override. |
| undici | 7.29.0 | 7.29.1 | Security fixes; scoped `@scalar/json-magic>undici` override. |
| source-map-js | 1.2.1 | patched 1.2.1 | Verified upstream security backport; fixed 1.2.2 is too young. |

Waku RC.2 was reviewed and rejected after its build failed: it imports
`virtual:vite-rsc-waku/html-transform`, which Vocs 2.10.0 does not provide.
RC.1 satisfies Vocs' declared minimum and passes the production build and
hydration tests. Do not update Waku independently of Vocs.

Vocs 2.10.1/2.10.2 (5 October) and Vite 8.3.2/8.3.3 (1/6 October) are held
by the release-age policy. TypeScript 7.0.2 remains outside Twoslash's peer
range. None was silently admitted by an age or peer exception.

## Inheritance

The exact pins, frozen installs, strict peers/builds, registry-only transitive
sources, seven-day age requirement, content integrity controls and provenance
non-downgrade policy remain enabled. The only inherited trust exception is
`semver@6.3.1`: official npm/node-semver source, ISC, no dependencies or hooks,
registry signature verified, no reported advisory. No new trust exception or
install-script allowance was added.

The graph contains 793 package identities: 604 retained, 189 added/changed,
and 178 removed from the 782-entry baseline. Platform-specific packages are
included in the review even when they are not installed on Darwin arm64.

## Release Age

Every one of the 793 resolved packages had an exact registry publish timestamp
and passed the 10,080-minute gate. Selected publish times (UTC):

| Package | Published |
| --- | --- |
| react 19.3.0 | 2026-09-09T17:21:30.071Z |
| react-dom 19.3.0 | 2026-09-09T17:17:39.744Z |
| react-server-dom-webpack 19.3.0 | 2026-09-09T17:16:56.253Z |
| @types/react 19.3.0 | 2026-09-09T18:08:49.750Z |
| typescript 6.0.3 | 2026-04-16T23:38:27.905Z |
| vite 8.3.1 | 2026-09-24T12:26:19.940Z |
| vocs 2.10.0 | 2026-09-20T05:10:59.058Z |
| waku RC.1 | 2026-09-18T09:39:37.805Z |
| image-size 2.0.4 | 2026-09-14T16:38:44.378Z |
| toml 4.2.0 | 2026-07-13T22:05:59.042Z |
| undici 7.29.1 | 2026-09-04T14:25:11.648Z |
| pnpm 10.34.6 | 2026-09-28T19:46:40.367Z |

The exact npm timestamp makes pnpm 10.34.6 eligible despite the newer GitHub
release timestamp used in the preliminary plan. Source-map-js 1.2.2 was
published 2026-09-30T14:08:09.382Z and becomes eligible at
**2026-10-07T14:08:09.382Z UTC**. Its tarball was verified for source inspection
only; it is not in the installed graph.

## Advisory Review

- Initial candidate: 13 findings (5 high, 5 moderate, 3 low) across TOML,
  Undici and source-map-js. Revised/final candidate: one high, zero other
  severities across 794 audit-counted dependencies. Production: zero across
  four audit-counted dependencies. Audit counts include the root package.
- TOML's prototype-pollution
  [GHSA-v5mp-jgw5-2x6j](https://github.com/advisories/GHSA-v5mp-jgw5-2x6j)
  and recursion
  [GHSA-82x6-q7mm-w9cf](https://github.com/advisories/GHSA-82x6-q7mm-w9cf)
  affect the MDX frontmatter build path. Version 4.2.0 contains both fixes.
  The forced major version was tested through the actual MDX plugins, plus
  excessive-depth and prototype-pollution regression inputs.
- Undici 7.29.1 clears ten findings in the Scalar JSON-magic path:
  `GHSA-3wwx-pv8p-q78v`, `GHSA-pmjh-fq2x-6v4x`, `GHSA-r53p-7pc4-xj5r`,
  `GHSA-rfgv-xxqx-mfg5`, `GHSA-3xpg-4rpp-hhhm`, `GHSA-2jfj-6hjv-fm6j`,
  `GHSA-2gqq-gqf2-x968`, `GHSA-w293-vg96-wgc3`, `GHSA-8436-99hf-9mmv`,
  `GHSA-rx4f-c7p8-82vq`. These cover HTTP/WebSocket connection and resource
  handling. The upgraded parser/client executes as development tooling even
  though this site configures no OpenAPI request client.
- Image-size 2.0.4 clears `GHSA-5p2g-fcmc-qvqq` and
  `GHSA-w3rx-r6r6-pgpr`. Its upstream parser rejects/non-stalls on the original
  HEIF, ICNS and JXL probes. Remove the old patch and overdue exception.
- [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q)
  / CVE-2026-93749 remains visible for source-map-js 1.2.1 in Vite/PostCSS.
  A malicious indexed map can block the build/development event loop. The
  checked-in patch copies the security changes from signed 1.2.2: validate
  offsets and nested totals, cache section sources, flatten generator gaps,
  and stop SourceNode traversal once generated code ends. The unrelated
  quick-sort change is excluded.
- The exception matches only the exact advisory/package/version, requires
  the exact patch configuration and passing installed-parser regressions,
  and **expires 2026-10-09T00:00:00Z**. Owner: Underware maintainers. Replace
  with reviewed 1.2.2 when eligible and delete the exception/backport.
- Separate pnpm advisory review: 10.34.6 includes fixes for
  `GHSA-vq4v-j7r6-jq4m`, `GHSA-c59q-g84q-2gj5`, `GHSA-vx52-2968-3vc6`,
  `GHSA-qrv3-253h-g69c`, and `GHSA-fr4h-3cph-29xv`. Ordinary dependency
  audits do not assess the package-manager binary itself.

## Source / Upstream Review

- Published Vocs/Waku manifests and source establish the coordinated React
  19.3.0 peers. Vocs scroll restoration uses browser events instead of the
  obsolete `unstable_events` interface that previously broke hydration.
- Waku RC.1 keeps dotenv 17.4.2; the RC.2 dotenv 18 transition is not adopted.
  Other reviewed execution changes include plugin-rsc 0.5.35,
  magic-string 1.4.2, rsc-html-stream 0.0.8 and @hono/node-server 2.1.3.
- Reviewed Vite 8.3.3's filesystem/HTML-serving changes while holding it for
  age. The 19 published Vite advisories inspected did not include 8.3.1 in
  their affected ranges; the final registry audit reports no Vite advisory.
  Keep local development on loopback and re-review the new patch when aged.
- Image-size's repository moved to Codeberg; 2.0.2 and 2.0.4 retain the same
  npm publisher/sole maintainer, netroy. Both published CJS/ESM fix paths were
  inspected and the actual Vocs dependency passed all three original probes.
- Source-map-js upstream security commit:
  [cf7658058ceeaa8619d5ae0ec90be6905209d016](https://github.com/7rulnik/source-map-js/commit/cf7658058ceeaa8619d5ae0ec90be6905209d016).
  Local patched files are byte-identical to the three security-relevant
  files in the verified 1.2.2 tarball.
- TOML 4.2.0 retains the `parse()` API. Its null-prototype tables and nesting
  guard were inspected and tested through remark-mdx-frontmatter 5.2.0.
- The inherited deprecated intersection-observer 0.10.0 remains in Sandpack.
  No added package is deprecated. No newly introduced licence exception was
  found. `format@0.2.2` declares MIT in legacy `licenses` metadata; unchanged
  `@codesandbox/nodebox@0.1.8` ships the Sustainable Use License, with use and
  distribution restrictions. This refresh does not introduce or reinterpret
  that licence; review it before embedding/distributing a Sandpack Nodebox app.

## Install and Execution Surfaces

- Selected direct/tooling tarballs have no install lifecycle hook.
- Only esbuild 0.28.2's inherited platform-binary selection/validation hook
  executes. es5-ext 0.10.64 and vue-demi 0.14.10 remain explicitly denied.
- Registry metadata reports an implicit fsevents 2.3.3 node-gyp install, but
  its verified tarball manifest has no install hook or binding.gyp and ships
  the prebuilt native binary. No additional build permission is needed.
- Native Rolldown bindings advance to 1.2.11 and Rollup platform packages to
  4.63.5. Existing esbuild, Tailwind Oxide, lightningcss, Takumi/WASM and
  fsevents families remain reviewed inherited surfaces. Darwin arm64 and
  Linux x64 package metadata/integrities were checked; runtime tests ran on
  Darwin arm64, not a Linux machine.
- The Vercel adapter emits valid Build Output v3 routes and an RSC function.
  Its upstream function configuration still specifies nodejs22.x; Waku RC.1
  supports Node 22.15+, while local/CI build tooling is pinned to Node 24.21.
  Deployment itself was not performed.

## Integrity and Provenance

- All 793 lockfile integrity strings match registry metadata. All 793 package
  identities had cryptographically verified npm signatures; 270 had verified
  Sigstore/SLSA provenance and package/tarball subjects. Zero failures or
  unsigned packages. Frozen installation verifies downloaded content against
  the reviewed lockfile. Exact evidence for each package is in the JSON file.
- Direct tarballs and pnpm were downloaded without lifecycle execution and
  independently SHA-512 hashed. React, React DOM, React Server DOM, Vite,
  Vocs, Waku and pnpm have verified provenance. React types, TypeScript and
  image-size do not publish provenance; no provenance gate was disabled.
- Expected provenance repositories/workflows were reviewed: React
  `runtime_release_from_ci.yml`, Vite `publish.yml`, Vocs `main.yml`, Waku
  `cd.yml` at RC.1 commit `4fd3fcb2ff4ec9212c3fb518857bf473ee9da6b1`, and
  pnpm `release.yml` at the pinned release tag.
- pnpm's independently computed SHA-224 is
  `b38497a8673a91646bec4f6dc864036e58208b3029b66f8d082aa7d0`, matching both
  manifest/Corepack pins.
- Official Node 24.21.0 Darwin arm64 archive SHA-256:
  `6239d4cf92d864487ec8cd3615038f7b67e7f58b77b21cd2f09ea9fbd68065fe`.
  Signed SHASUMS verified with the official release-key fingerprint
  `5BE8A3F6C8A5C01D106C0AD820B1A390B168D356` (Antoine du Hamel).

## Commands Run

```sh
# Isolated candidate under verified Node 24.21.0 and pnpm 10.34.6:
pnpm install --lockfile-only --ignore-scripts --no-frozen-lockfile
pnpm install --frozen-lockfile --ignore-scripts
pnpm install --frozen-lockfile # fresh node_modules; only approved hook runs
pnpm ignored-builds
pnpm audit --json
pnpm audit --prod --json
pnpm run deps:audit
pnpm run verify
VERCEL=1 pnpm run build
```

Additional checks: npm pacote signature/attestation verification for every
locked identity; Sigstore verification with TUF trust material; independent
tarball hashes; official Node GPG/checksum verification; source/tarball diffs;
audit-gate rejection fixtures; headless Chromium navigation, hydration,
search, anchors, prefetch, scroll and mobile tests; MDX hot-edit and restoration verification without full reload. Native file
watching required an unsandboxed test server; the sandboxed server did not
deliver filesystem-change events.
Final repository verification uses the integrity-qualified Corepack pin and
frozen installation with an isolated temporary cache/store.

## Outcome

The accepted stack type-checks and builds with the reviewed toolchain; all
18 authored routes return HTTP 200, and browser acceptance has no console or
page errors. The existing fixed dark scheme, head metadata, footer, sponsors,
public assets and mobile navigation are preserved. Unknown audit findings,
incorrect affected versions, incomplete audit reports, missing patches and
expired exceptions are rejected. The production graph remains clear of known registry advisories;
the single visible development finding is locally mitigated and time bounded.

## Follow-ups

- **By 2026-10-09 UTC:** replace patched source-map-js 1.2.1 with reviewed
  1.2.2 after 2026-10-07T14:08:09.382Z UTC; remove its patch, audit allowance
  and expiry, while retaining useful parser regressions. The gate deliberately
  fails after the deadline.
- Re-review Vite 8.3.3 after its seven-day window and Vocs 2.10.2 after
  2026-10-12T03:56:41.046Z UTC; test Vocs/Waku updates together.
- Revisit TypeScript 7 when Twoslash declares compatibility.
- Track Sandpack's inherited IntersectionObserver deprecation and Nodebox
  licence restrictions before adding embedded interactive playgrounds.
- CI will exercise Linux x64 and the existing pinned executable actions;
  Vercel runtime/deployment checks remain separate from the local build.
