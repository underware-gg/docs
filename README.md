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
corepack pnpm install --frozen-lockfile
corepack pnpm run verify
corepack pnpm ignored-builds
```

Dependency versions, the lockfile, Node.js, pnpm, install-script allowances,
and executable CI actions may change only with a completed record in
`docs/dependency-reviews/`. See that directory's README for the required
candidate review, advisory assessment, provenance checks, and verification.

Run a full advisory report with `corepack pnpm audit`. CI blocks critical
advisories; lower-severity findings still require applicability analysis during
dependency review and must not be silently ignored.

## Styling

* About Vocs [styling](https://vocs.dev/docs/guides/styling), [theming](https://vocs.dev/docs/guides/theming)
* Make use of [Tailwind CSS](https://tailwindcss.com/docs/font-size) styling, ex: [font size](https://tailwindcss.com/docs/font-size)
