#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const pnpmEntry = process.env.npm_execpath;
if (!pnpmEntry) {
  console.error("dependency audit: run this check through the pinned pnpm script");
  process.exit(1);
}

const result = spawnSync(process.execPath, [pnpmEntry, "audit", "--json"], {
  encoding: "utf8",
  maxBuffer: 16 * 1024 * 1024,
});

let report;
try {
  report = JSON.parse(result.stdout);
} catch {
  process.stderr.write(result.stderr);
  console.error("dependency audit: pnpm did not return a JSON advisory report");
  process.exit(1);
}

const allowed = new Map([
  ["GHSA-5p2g-fcmc-qvqq", { module: "image-size", version: "2.0.2" }],
  ["GHSA-w3rx-r6r6-pgpr", { module: "image-size", version: "2.0.2" }],
]);
const workspace = readFileSync(new URL("../pnpm-workspace.yaml", import.meta.url), "utf8");
const failures = [];

if (!workspace.includes("image-size@2.0.2: patches/image-size@2.0.2.patch")) {
  failures.push("the image-size advisory exception requires its exact pnpm patch");
}

for (const advisory of Object.values(report.advisories ?? {})) {
  const exception = allowed.get(advisory.github_advisory_id);
  const versions = new Set((advisory.findings ?? []).map((finding) => finding.version));
  if (
    !exception ||
    advisory.module_name !== exception.module ||
    versions.size !== 1 ||
    !versions.has(exception.version)
  ) {
    failures.push(
      `${advisory.github_advisory_id ?? advisory.id}: ${advisory.module_name} (${advisory.severity})`,
    );
  }
}

if (result.error) failures.push(result.error.message);
if (result.status !== 0 && Object.keys(report.advisories ?? {}).length === 0) {
  failures.push(`pnpm audit exited ${result.status} without reporting an advisory`);
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`dependency audit: ${failure}`);
  process.exit(1);
}

console.log("dependency audit: PASS (two locally patched image-size advisories remain visible)");
