#!/usr/bin/env node

import { execFileSync } from "node:child_process";

// Resolve the parser Vite's PostCSS path actually uses, after dependency resolution.
const probe = String.raw`
  const assert = require("node:assert/strict");
  const { createRequire } = require("node:module");
  const fromVite = createRequire(require.resolve("vite"));
  const fromPostcss = createRequire(fromVite.resolve("postcss"));
  const { SourceMapConsumer, SourceMapGenerator, SourceNode } = fromPostcss("source-map-js");
  const flat = { version: 3, sources: ["input.js"], names: [], sourcesContent: ["hello"], mappings: "AAAA" };
  const indexed = (line, column = 0, map = flat) => ({
    version: 3, sections: [{ offset: { line, column }, map }],
  });

  for (const value of [1e12, -1, 0.5, NaN, Infinity, "10"]) {
    assert.throws(() => new SourceMapConsumer(indexed(value)), /Section offset/);
  }
  for (const value of [-1, 0.5, NaN, Infinity, "10"]) {
    assert.throws(() => new SourceMapConsumer(indexed(0, value)), /Section offset/);
  }
  assert.throws(() => new SourceMapConsumer(indexed(6e6, 0, indexed(6e6))), /nested sections/);

  let nested = flat;
  for (let i = 0; i < 30; i++) nested = indexed(0, 0, nested);
  assert.deepEqual(new SourceMapConsumer(nested).sources, ["input.js"]);

  const consumer = new SourceMapConsumer(indexed(3));
  assert.equal(consumer.originalPositionFor({ line: 4, column: 1 }).source, "input.js");
  const copied = new SourceMapGenerator();
  consumer.eachMapping((mapping) => copied.addMapping({
    generated: { line: mapping.generatedLine, column: mapping.generatedColumn },
    original: { line: mapping.originalLine, column: mapping.originalColumn },
    source: mapping.source,
  }));
  const roundTrip = new SourceMapConsumer(copied.toJSON());
  assert.equal(roundTrip.originalPositionFor({ line: 4, column: 0 }).line, 1);
  assert.equal(SourceNode.fromStringWithSourceMap("hello", new SourceMapConsumer(indexed(1e7))).toString(), "hello");
  const generator = new SourceMapGenerator();
  generator.addMapping({ generated: { line: 1e6, column: 0 }, original: { line: 1, column: 0 }, source: "input.js" });
  assert.equal(generator.toJSON().mappings.length, 1000003);
`;

try {
  for (const options of [[], ["--disallow-code-generation-from-strings"]]) {
    execFileSync(process.execPath, [...options, "-e", probe], { stdio: "pipe", timeout: 2_000 });
  }
} catch (error) {
  if (error.signal) {
    console.error(`source-map: probe timed out (${error.signal})`);
    process.exit(1);
  }
  process.stderr.write(error.stderr ?? "");
  process.exit(1);
}

console.log("source-map: PASS");
