#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const pnpmEntry = process.env.npm_execpath;
if (!pnpmEntry) {
  console.error("dependency audit: run this check through the pinned pnpm script");
  process.exit(1);
}

const result = spawnSync(process.execPath, [pnpmEntry, "audit", "--json"], {
  encoding: "utf8",
  maxBuffer: 16 * 1024 * 1024,
  timeout: 60_000,
});

let report;
try {
  report = JSON.parse(result.stdout);
} catch {
  process.stderr.write(result.stderr);
  console.error("dependency audit: pnpm did not return a JSON advisory report");
  process.exit(1);
}

if (!report.advisories || typeof report.advisories !== "object" || !report.metadata?.vulnerabilities) {
  console.error("dependency audit: pnpm returned an incomplete advisory report");
  process.exit(1);
}

const failures = [];
for (const advisory of Object.values(report.advisories)) {
  failures.push(
    `${advisory.github_advisory_id ?? advisory.id}: ${advisory.module_name} (${advisory.severity})`,
  );
}

if (result.error) failures.push(result.error.message);
if (result.status !== 0) {
  failures.push(`pnpm audit exited ${result.status}`);
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`dependency audit: ${failure}`);
  process.exit(1);
}

console.log("dependency audit: PASS (zero advisories)");
