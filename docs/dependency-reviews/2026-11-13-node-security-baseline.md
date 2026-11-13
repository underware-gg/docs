# Dependency Review Node 24.22.3 Security Baseline

## Summary

Date: 2026-11-13. Reviewer: Codex for Underware maintainers.
Update the local/CI build baseline from Node 24.21.0 directly to 24.22.3,
alongside the [November package refresh](2026-11-13-dependency-review.md).
The security release passes the release-authenticity and supply-chain checks
below and both the isolated and updated repository application verification gates.

The maintainer explicitly authorized the exact security age exception:
“do an appropriate review of the exemption version … and assuming it passes
let's move to that baseline. Please proceed with the package updates.”
This authorization applies only to Node 24.22.3. Owner: Underware maintainers.
Normal age eligibility is **2026-11-18T16:44:08Z**; re-review by
**2026-11-19T00:00:00Z**. Evidence is retained in
[the Node verification JSON](2026-11-13-node-security-baseline-evidence.json).

## Classification

Elevated risk: a native executable security update before the usual seven-day
age threshold. The exception admits one reviewed Node release. It does not
change npm's seven-day resolver policy, registry trust rules, install-script
permissions, advisory gate or CI action pins.

## Targets

| Surface | Previous | Selected |
| --- | --- | --- |
| .node-version | 24.21.0 | 24.22.3 |
| .nvmrc | 24.21.0 | 24.22.3 |
| engines.node | >=24.21.0 <25 | >=24.22.3 <25 |
| Local acceptance binary | Node 24.21.0 Darwin arm64 | Verified official 24.22.3 Darwin arm64 archive |
| CI selection | .node-version | Same selector, now 24.22.3 |

## Inheritance

The existing Node 24 LTS line and module ABI 137 are retained. Package-manager
pins and npm package verification are covered by the coordinated refresh.
The obsolete source-map age exclusion is removed; no npm release-age
exclusions remain. Node is selected outside npm's package resolver, so this
exception is recorded here rather than adding a misleading npm exclusion.

## Release Age

Official GitHub release publication: **2026-11-11T16:44:08Z**. The source tag
was signed on November 11 at 16:27:23 UTC; the checksum list was signed at
16:40:02 UTC. The download index gives an earlier calendar date. Using the
later exact publication timestamp conservatively places normal seven-day
eligibility at November 18, 16:44:08 UTC.

The exception is justified by the published high-severity security fixes and
the ability to authenticate the release independently, then exercise the
actual application. It becomes unnecessary once normal eligibility is reached.

## Advisory Review

The [official security release notes](https://nodejs.org/en/blog/release/v24.22.3)
describe fixes for HTTP/2 object/buffer lifetimes and resource accounting,
TLS session/SNI isolation, TLS/HTTP parser re-entry, a remotely reachable TLS
server crash, HTTPS Agent policy separation, proxy credential redaction and
permission checks. The release also updates Brotli, llhttp, SQLite and Undici.
Node 24.22.2 predates these fixes, so skipping that interim baseline avoids
two toolchain transitions while addressing the disclosed issues.

An exact-version search in upstream Node issues returned zero matching
issues at review time; targeted public searches found no reported compromise
or release regression. This limited early reporting window is the remaining
reason for the dated re-review. A registry dependency audit does not assess
the Node binary itself.

The local/CI pin controls the build toolchain. Vocs 2.12.0's Vercel adapter
still emits `nodejs22.x` for its function; changing this pin does not patch or
verify the managed deployment runtime. No deployment was performed.

## Source / Upstream Review

The annotated `v24.22.3` source tag resolves to commit
`e63cab040c09d43ceef8cb35508c40044614e906`. Its detached signature was verified
locally using the established Node release key, independently of GitHub's
verified badge. The releaser is Antoine du Hamel (`aduh95`), consistent with
the previously reviewed Node release.

The upstream comparison from 24.22.2 contains 28 commits and 66 changed files.
The file inventory matches the documented security fixes, bundled dependency
updates, release metadata and regression tests. Focused patch inspection
covered TLS/SNI/session handling, HTTPS Agent keys, HTTP parser buffer guards,
proxy credential redaction and the OpenSSL build compatibility changes. No
unexpected installer, workflow, dependency-source or credential-sending
change was found in that delta. This is a targeted release review, not an
exhaustive audit or independently reproduced build of Node.

## Install and Execution Surfaces

The official Darwin arm64 archive was extracted only after its signed checksum
verified, and the extracted executable is byte-identical to the archive member.
It reports `v24.22.3`, module ABI 137, OpenSSL 3.5.9 and Undici 7.30.2.
The temporary binary was used directly for acceptance tests; no unverified
installer script or global package-manager update was executed.

The official Linux x64 archive was downloaded and checked for CI supply-chain
coverage; it was not executed on this macOS host. Dependency installation
retains the existing esbuild-only lifecycle allowance.

## Integrity and Provenance

The trusted primary fingerprint is
`5BE8A3F6C8A5C01D106C0AD820B1A390B168D356`, matching the prior Node review and
the [official release-key inventory](https://github.com/nodejs/release-keys).
The key was fetched from that official repository and its full fingerprint
checked. GPG independently verified both the annotated source tag and
`SHASUMS256.txt.asc` with that exact key. No key rotation or new trust
exception was accepted.

| Official artifact | Verified SHA-256 |
| --- | --- |
| node-v24.22.3-darwin-arm64.tar.xz | 1d64136c8a43d648d1b3bad10797a4c995b1ca032d2bde8799de43b37f058fe5 |
| node-v24.22.3-linux-x64.tar.xz | 4f2b175a6d53a5c617a80dba2676238a0688cef28c6da4eba35c7d844e66fcfb |

Both archive hashes match the authenticated checksum list. The unsigned and
signed lists have identical checksum entries; the signed text has an extra
blank line. The extracted macOS executable's SHA-256 is
`ba7073582822078d8c90bca3facacc46690bc5366fab4b815aeef9148cd6e854`.

macOS `codesign --verify` outside the sandbox reports “valid on disk” and
“satisfies its Designated Requirement”. The certificate chain is Developer ID
Application: Node.js Foundation (`HX7739G8FX`), Developer ID Certification
Authority, Apple Root CA. The sandboxed check could not resolve the authority
and incorrectly reported a modified signature; the outside-sandbox check and
byte-for-byte archive comparison resolved that diagnostic without bypassing
signature verification.

No supply-chain anomaly was identified in these checks. Authentic signatures
establish the publisher and content integrity; they do not prove the absence
of every possible vulnerability or compromise of an authorized signer.

## Commands Run

```sh
# Downloads use the official nodejs.org and nodejs GitHub repositories.
gpg --homedir <isolated-keyring> --batch --import release-key.asc
gpg --homedir <isolated-keyring> --batch --with-colons --fingerprint
gpg --homedir <isolated-keyring> --batch --decrypt SHASUMS256.txt.asc
gpg --homedir <isolated-keyring> --batch --verify tag-signature.asc tag-payload.txt
codesign --verify --verbose=4 <verified-node-binary>
codesign -dv --verbose=2 <verified-node-binary>
<verified-node-binary> --version

# With verified Node 24.22.3 first in PATH and the pinned Corepack pnpm:
corepack pnpm install --frozen-lockfile
corepack pnpm run deps:audit
corepack pnpm run verify
```

Additional checks: independent archive SHA-256 and extracted-binary hashes;
checksum-entry equality; official release and source tag metadata; upstream
commit/file inventory; targeted patch and issue review. The complete package
refresh acceptance results are recorded in the companion dependency review.

## Outcome

The exact Node 24.22.3 release passes the targeted supply-chain review. The
authorized security baseline is adopted with the package refresh. Frozen
installation, policy/parser checks, type-checking, production build, zero-
advisory gates and all 18 HTTP route checks pass in the updated repository
on that verified Node binary. All other age and security gates remain enabled.

## Follow-ups

- Owner: Underware maintainers. Re-review upstream regressions/security reports
  and the adopted baseline by 2026-11-19T00:00:00Z; the age exception is no
  longer needed after 2026-11-18T16:44:08Z.
- Run the existing Linux CI gate before merging. The Linux archive's
  authenticated checksum is verified here, but Linux execution is separate.
- Verify and patch the actual hosting runtime independently; the Vercel
  adapter's `nodejs22.x` selection is outside the local/CI Node pin.
