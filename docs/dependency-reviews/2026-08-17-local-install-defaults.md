# Dependency Review: local install defaults

## Summary

Make the repository's reviewed Node.js and lockfile state the default for local
development. This change adds NVM discovery for the existing Node.js baseline
and makes ordinary pnpm installs fail instead of mutating the lockfile.

No package version, resolved dependency, or lockfile entry changes.

## Classification

Policy hardening. The change affects developer tooling behavior but introduces
no new package or executable dependency.

## Targets

- Add `.nvmrc` at `24.19.0`, matching `.node-version` and `engines.node`.
- Set `frozenLockfile: true` in `pnpm-workspace.yaml`.
- Enforce both invariants in `scripts/check-dependency-policy.mjs`.
- Document the normal and dependency-maintenance install paths.

## Inheritance

This tightens the existing supply-chain baseline. Developers no longer need to
remember `--frozen-lockfile`; lockfile mutation requires the conspicuous
`--no-frozen-lockfile` opt-out during an approved dependency review.

## Release Age

Not applicable. No package or tool version changes. Node.js remains pinned to
the previously reviewed `24.19.0` baseline and pnpm remains pinned by the
`packageManager` field.

## Advisory Review

The dependency graph and lockfile are unchanged. The existing advisory review
and narrowly scoped patched-package exceptions therefore remain applicable;
the production dependency audit remains clear.

## Source / Upstream Review

The pnpm 10.x install documentation confirms that frozen lockfile behavior is
normally enabled automatically only in CI, and that a frozen install fails
when the manifest and lockfile are out of sync. pnpm project settings may be
stored in `pnpm-workspace.yaml`.

References:

- https://pnpm.io/10.x/cli/install
- https://pnpm.io/10.x/settings

## Install and Execution Surfaces

No install script, downloaded binary, executable package, or CI action is
added. `.nvmrc` is declarative input for developers who already use NVM. The
pnpm setting prevents ordinary installs from creating or rewriting the
lockfile.

## Integrity and Provenance

The exact direct pins, package-manager pin, package integrities, and lockfile
resolution graph are unchanged. The policy checker now prevents the NVM and
`.node-version` baselines from drifting apart and prevents removal of the
fail-closed install default.

## Commands Run

```text
corepack pnpm config get frozen-lockfile
corepack pnpm install
corepack pnpm run deps:policy:check
corepack pnpm run verify
git diff --check
```

Commands were run with the repository's exact Node.js `24.19.0` baseline.

## Outcome

Routine local setup is now `nvm install`, `nvm use`, and
`corepack pnpm install`. That install is frozen without relying on a remembered
command-line flag. Dependency maintenance must opt out explicitly after its
candidate review.

## Follow-ups

None. Future Node.js baseline changes must update `.node-version`, `.nvmrc`,
`engines.node`, and their dependency-review record together.
