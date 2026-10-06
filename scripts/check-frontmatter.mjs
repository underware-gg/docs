#!/usr/bin/env node

import assert from "node:assert/strict";
import { createRequire } from "node:module";
import * as runtime from "react/jsx-runtime";

const fromVocs = createRequire(import.meta.resolve("vocs"));
const { evaluate } = await import(fromVocs.resolve("@mdx-js/mdx"));
const { default: remarkFrontmatter } = await import(fromVocs.resolve("remark-frontmatter"));
const { default: remarkMdxFrontmatter } = await import(fromVocs.resolve("remark-mdx-frontmatter"));
const fromFrontmatter = createRequire(fromVocs.resolve("remark-mdx-frontmatter"));
const { parse } = fromFrontmatter("toml");

for (const fixture of [
  '---\ntitle: Fixture\ncontent:\n  width: full\ntags: [one, two]\n---\n# Fixture',
  '+++\ntitle = "Fixture"\ntags = ["one", "two"]\n[content]\nwidth = "full"\n+++\n# Fixture',
]) {
  const result = await evaluate(fixture, {
    ...runtime,
    remarkPlugins: [[remarkFrontmatter, ["yaml", "toml"]], remarkMdxFrontmatter],
  });
  assert.equal(result.frontmatter.title, "Fixture");
  assert.equal(result.frontmatter.content.width, "full");
  assert.deepEqual(result.frontmatter.tags, ["one", "two"]);
  assert.equal(typeof result.default, "function");
}

assert.throws(() => parse('a=' + '['.repeat(3000) + '1' + ']'.repeat(3000)), /Maximum nesting depth/);
const poisoned = parse('[__proto__]\nunderwarePolluted = true\n[constructor.prototype]\nunderwarePolluted = true');
assert.equal(Object.getPrototypeOf(poisoned), null);
assert.equal(Object.prototype.underwarePolluted, undefined);
assert.equal({}.underwarePolluted, undefined);

console.log("MDX frontmatter: PASS (YAML, TOML, depth and prototype guards)");
