#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const exactVersion = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const packageManager = /^pnpm@(\d+\.\d+\.\d+)\+sha(?:224|512)\.[a-f0-9]+$/;
const requiredReviewSections = [
  "Summary",
  "Classification",
  "Targets",
  "Inheritance",
  "Release Age",
  "Advisory Review",
  "Source / Upstream Review",
  "Install and Execution Surfaces",
  "Integrity and Provenance",
  "Commands Run",
  "Outcome",
  "Follow-ups",
];
const dependencySurface = new Set([
  ".node-version",
  ".nvmrc",
  ".npmrc",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "scripts/check-dependency-policy.mjs",
]);
const failures = [];
const workspacePolicy = readFileSync(new URL("../pnpm-workspace.yaml", import.meta.url), "utf8");

if (manifest.private !== true) failures.push("package.json must set private: true");

const packageManagerMatch = packageManager.exec(manifest.packageManager ?? "");
if (!packageManagerMatch) {
  failures.push("packageManager must pin an exact integrity-qualified pnpm release");
} else {
  const pnpmVersion = packageManagerMatch[1];
  if (manifest.engines?.pnpm !== pnpmVersion) {
    failures.push("engines.pnpm must match the packageManager version");
  }
  if (manifest.devEngines?.packageManager?.version !== manifest.packageManager.slice("pnpm@".length)) {
    failures.push("devEngines.packageManager.version must match packageManager");
  }
  if (manifest.devEngines?.packageManager?.onFail !== "error") {
    failures.push("devEngines.packageManager.onFail must be error");
  }
}

const nodeVersion = readFileSync(new URL("../.node-version", import.meta.url), "utf8").trim();
const nvmVersion = readFileSync(new URL("../.nvmrc", import.meta.url), "utf8").trim();
if (!exactVersion.test(nodeVersion)) failures.push(".node-version must contain an exact version");
if (nvmVersion !== nodeVersion) failures.push(".nvmrc must match .node-version exactly");
if (!manifest.engines?.node?.includes(nodeVersion)) {
  failures.push("engines.node must include the exact .node-version baseline");
}
if (!/^frozenLockfile:\s*true\s*$/m.test(workspacePolicy)) {
  failures.push("pnpm-workspace.yaml must make frozen lockfile installs the local default");
}

for (const group of ["dependencies", "devDependencies", "optionalDependencies"]) {
  for (const [name, version] of Object.entries(manifest[group] ?? {})) {
    if (!exactVersion.test(version)) {
      failures.push(`${group}.${name} must use an exact registry version, found ${version}`);
    }
  }
}

function validateReview(path) {
  const body = readFileSync(`${repoRoot}/${path}`, "utf8");
  if (/REVIEW-PENDING/.test(body)) failures.push(`${path} is still marked REVIEW-PENDING`);
  for (const section of requiredReviewSections) {
    if (!body.includes(`## ${section}`)) failures.push(`${path} is missing the '${section}' section`);
  }
}

const reviewDirectory = "docs/dependency-reviews";
for (const name of readdirSync(`${repoRoot}/${reviewDirectory}`).filter(
  (entry) => entry.endsWith(".md") && entry !== "README.md",
)) {
  validateReview(`${reviewDirectory}/${name}`);
}

const baseIndex = process.argv.indexOf("--base");
const base = baseIndex === -1 ? null : process.argv[baseIndex + 1];
if (baseIndex !== -1 && !base) failures.push("--base requires a Git revision");

if (base) {
  const changed = execFileSync(
    "git",
    ["diff", "--name-only", "--diff-filter=ACMRT", `${base}...HEAD`],
    { cwd: repoRoot, encoding: "utf8" },
  )
    .trim()
    .split("\n")
    .filter(Boolean);
  const policyChanged = changed.some(
    (path) =>
      dependencySurface.has(path) ||
      path.startsWith("scripts/check-dependency-") ||
      path.startsWith("patches/") ||
      path.startsWith(".github/workflows/") ||
      path === ".github/dependabot.yml" ||
      /^renovate\.json/.test(path),
  );
  const reviewChanged = changed.some(
    (path) => path.startsWith(`${reviewDirectory}/`) && path.endsWith(".md") && path !== `${reviewDirectory}/README.md`,
  );
  if (policyChanged && !reviewChanged) {
    failures.push("dependency or supply-chain policy changed without a dependency-review record");
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`dependency policy: ${failure}`);
  process.exit(1);
}

console.log("dependency policy: PASS");
