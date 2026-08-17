# /docs

Underware Games Docs

## Dev Notes

* This is a [Vocs](https://vocs.dev) project bootstrapped with the Vocs CLI.
* Read the **MDX** [specification](https://mdxjs.com/docs/)
* Get the **MDX** [extension](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx) for Visual Studio Code
* Get the **MDX Preview** [extension](https://marketplace.visualstudio.com/items?itemName=xyc.vscode-mdx-preview) for Visual Studio Code
* Enable **MDX preview** on VS Code by clicking the `🔎` on the top right corner.
* Enable [Markdown preview](https://code.visualstudio.com/docs/languages/markdown#_markdown-preview) on VS Code by clicking the `🔎` or pressing `⌘K+V`

## Toolchain and verification

The reviewed local toolchain is pinned in `.node-version` and the integrity-
qualified `packageManager` field in `package.json`. Use Corepack so an unrelated
global pnpm installation cannot bypass that pin:

```bash
nvm install
nvm use
corepack pnpm install
corepack pnpm run deps:audit
corepack pnpm run verify
corepack pnpm ignored-builds
```

`pnpm install` is frozen by repository policy and therefore cannot rewrite the
reviewed lockfile. Use `--no-frozen-lockfile` only while preparing an explicitly
reviewed dependency change; commit its dependency-review record with the
resulting manifest and lockfile changes.

Dependency versions, the lockfile, Node.js, pnpm, install-script allowances,
and executable CI actions may change only with a completed record in
`docs/dependency-reviews/`. See that directory's README for the required
candidate review, advisory assessment, provenance checks, and verification.

Run the governed advisory gate with `corepack pnpm run deps:audit`. CI rejects
every unreviewed finding; the two visible `image-size` advisories are accepted
only for the exact locally patched version and are covered by timeout-based
regression probes. See the current dependency-review record for the owner and
re-review deadline.

## Styling

* About Vocs [styling](https://vocs.dev/docs/guides/styling), [theming](https://vocs.dev/docs/guides/theming)
* Make use of [Tailwind CSS](https://tailwindcss.com/docs/font-size) styling, ex: [font size](https://tailwindcss.com/docs/font-size)
