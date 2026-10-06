# Dependency Review Records

This directory records the evidence and decision for every direct dependency
change, dependency-tool change, or material supply-chain policy change.

Dependency and lockfile changes must not be merged first and justified later.
Review the proposed exact versions in an isolated lockfile, add the completed
record to the same pull request, and then run the repository verification gate.

## Required workflow

1. Classify the change as routine or elevated-risk.
2. Select exact candidate versions without modifying the repository lockfile.
3. Confirm each candidate's exact publish timestamp and seven-day age. An
   explicitly maintainer-authorized security update may use an exact
   package/version age exemption only when the same review records the
   authorization, verified timestamp, reason, owner, and dated re-review.
   Do not bypass missing publish-time metadata.
4. Review registry integrity, signatures, deprecation state, licences,
   lifecycle scripts, native code, binary downloads, dependency sources, and
   relevant upstream release notes or source changes.
5. Check current advisories for both the candidate lockfile and final lockfile.
   Record applicability and mitigations; an audit count alone is not analysis.
6. Update the manifest and lockfile only after the candidate review passes.
7. Run `corepack pnpm install` (frozen by repository policy),
   `corepack pnpm ignored-builds`, and
   `corepack pnpm run verify`.
8. Commit the completed review record with the dependency change.

Do not use `pnpm audit --fix`, `pnpm update --latest`, or an unrestricted
install as a substitute for review. Never accept an advisory exception without
a reason, an owner, and a dated re-review deadline.

The repository sets `frozenLockfile: true`, so ordinary installs fail rather
than creating or changing `pnpm-lock.yaml`. An approved dependency-change
workflow must opt out explicitly with `--no-frozen-lockfile` only after its
candidate review is complete.

## When a record is required

- adding, removing, or changing a direct dependency
- changing `pnpm-lock.yaml`
- changing Node.js or pnpm
- changing install-script approvals or dependency-source policy
- adding or changing CI actions that execute third-party code
- accepting or renewing an advisory exception

Name records `YYYY-MM-DD-short-subject.md` and include these sections:

1. `Summary`
2. `Classification`
3. `Targets`
4. `Inheritance`
5. `Release Age`
6. `Advisory Review`
7. `Source / Upstream Review`
8. `Install and Execution Surfaces`
9. `Integrity and Provenance`
10. `Commands Run`
11. `Outcome`
12. `Follow-ups`
