# Dependency refresh plan — accepted 2026-10-06

The network restriction was resolved in the restarted session. Exact package
selection, isolated resolution, supply-chain review and acceptance tests are
complete. The implementation and full evidence are recorded in
[the dependency review](../dependency-reviews/2026-10-06-dependency-refresh.md).

## Selected versions and cross dependencies

| Group | Exact target | Relationship |
| --- | --- | --- |
| Toolchain | Node 24.21.0; pnpm 10.34.6 | Match both Node files, engines and integrity-qualified Corepack/devEngines pins. |
| React | react, react-dom, react-server-dom-webpack 19.3.0; @types/react 19.3.0 | Update together for Vocs/Waku peers; make the RSC peer explicit. |
| Docs stack | Vocs 2.10.0; Waku 1.0.0-rc.1; Vite 8.3.1 | RC.2 failed the Vocs 2.10.0 build; RC.1 passes build and browser acceptance. |
| TypeScript | 6.0.3 retained | Twoslash still excludes TypeScript 7. |
| Image parser | image-size 2.0.4 | Scoped Vocs override replaces the old patch and exceptions; retain probes. |
| Frontmatter | toml 4.2.0 | Scoped remark-mdx-frontmatter override; verify YAML/TOML MDX compilation and security guards. |
| HTTP client | undici 7.29.1 | Scoped Scalar JSON-magic override clears ten findings. |
| Source maps | source-map-js 1.2.2 | User-authorized exact release-age exemption; remove local backport and advisory allowance. |

The original pnpm 10.34.5 proposal was superseded by 10.34.6 after its exact
npm publish timestamp proved it was old enough. All 793 resolved identities
passed signature checks; 792 passed the normal strict age gate and
source-map-js 1.2.2 has an explicitly authorized exact-version exemption.
270 had verified provenance. Policy protections and existing lifecycle allowances remain.

## Acceptance

Clean frozen installation, audit rejection fixtures, parser probes, MDX
frontmatter fixtures, type-check, production and Vercel builds passed.
Headless browser checks passed hydration, prefetch, internal links, anchors,
search, back/forward scroll, mobile navigation, all 18 authored routes, and
MDX hot reload. Native file watching required running the test server outside
the macOS sandbox. The fixed dark scheme, sponsors and footer are preserved.

## Release-age exemption cleanup

The user authorized immediate source-map-js 1.2.2 installation with a
[documented exact-version exemption](../dependency-reviews/2026-10-06-source-map-upgrade.md).
The local backport and advisory allowance are removed. Full and production
audits now report zero findings, with no dated audit-expiry condition.

Normal eligibility is 2026-10-07T14:08:09.382Z UTC. Remove the redundant age
exclusion after that point; re-review by 2026-10-09 UTC. Hold newer Vite/Vocs
releases until seven days old and re-test Vocs/Waku together. Linux CI and an
actual Vercel deployment have not been run locally.
