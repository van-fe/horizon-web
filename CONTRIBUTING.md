# Contributing to Horizon Web

Thanks for your interest in and contribution to `Horizon Web`! This guide covers issue guidelines, local development, component development conventions (feature design, `useProps`, styles, documentation), Commit conventions, the PR workflow, and the release process. Additions are welcome.

**English** | [简体中文](./CONTRIBUTING.zh-CN.md)

## Issue Guidelines

Before filing an issue, please search the [existing issues](https://github.com/van-fe/horizon-web/issues) (including closed ones) to avoid duplicates.

### Bug Reports

Please include as much of the following as possible to help us locate the problem quickly:

- Environment info: browser and version, Node / bun version, `@aurora/horizon-web` version
- Reproduction steps: a minimal reproduction repository or an online demo is preferred
- Expected behavior and actual behavior
- Error messages, console logs, and screenshots

### Feature Suggestions

Describe the use case, the expected component API, and the interaction you want. The more specific, the better.

## Feature Design

Before developing a component, think about what features it needs, which props and emits it should define, and how it maps to the design mockups. Besides Element and Ant Design, it is also worth looking at popular component libraries abroad, such as [Vuetify](https://vuetifyjs.com/en/components/alerts/) and [Quasar](https://quasar.dev/vue-components/), for different inspirations.

For example, the `Link` component: Element only provides an `href` navigation, while Vuetify also offers props like `to` and `replace` for route navigation with `vue-router`, which is clearly more practical.

Also, do not copy-paste code or documentation from Element and other open-source libraries. Documentation wording can be integrated with reference to the descriptions in the design mockups.

## Local Development

### Requirements

- [Node.js](https://nodejs.org/) >= 20 (managing versions with [nvm](https://github.com/nvm-sh/nvm) is recommended)
- [bun](https://bun.sh) >= 1.0 (the repository uses bun as its package manager and script runtime)
- Branch: create your own development branch based on the `feature` branch

### Development Steps

```bash
# 1. Fork the repository and clone it locally
git clone git@github.com:<your-username>/horizon-web.git
cd horizon-web

# 2. Install dependencies
bun install

# 3. Build the artifacts before your first development session
bun run build

# 4. Start the docs site (includes component demos and API docs)
bun run dev
```

Example development branch:

```bash
git checkout -b feat/your-feature
```

### Generating Templates

The repository ships template-generation scripts for quickly scaffolding components / directives / methods (source, docs, and demos):

```bash
# Generate a component (use PascalCase)
bun run new component PanelItem

# Generate a directive (must start with v-)
bun run new directive v-focus

# Generate a method
bun run new method your-method
```

Generated docs are registered automatically in `packages/docs/.vitepress/config/demos-sidebar.json` (new components go into the "Basic Components" category by default; adjust manually if the category is not appropriate).

### Project Structure

The repository is a monorepo managed with bun workspaces:

```
├── node_modules  # modules shared by all projects in packages
└── packages  # bun workspaces containing multiple projects
    ├── horizon-web      # horizon-web UI project
    │   ├── dist    # compiled browser artifacts (IIFE / UMD)
    │   ├── es      # compiled ESM files (with type declarations)
    │   ├── lib     # compiled CJS files
    │   ├── json    # editor support files such as vetur / web-types
    │   └── src
    │       ├── components      # component directory
    │       ├── directives      # directive directory
    │       ├── composables     # shared hook-like files
    │       └── styles          # styles directory
    ├── docs     # docs site project (VitePress)
    │   ├── demos       # all .vue demo files
    │   │   ├── components      # component demo directory
    │   │   │   └── Button      # demos for a specific component
    │   │   ├── directives      # directive demo directory
    │   │   └── methods         # method demo directory
    │   ├── zh                # Chinese docs (root locale)
    │   │   ├── guide           # quick start, on-demand import, and other guide docs
    │   │   ├── demos           # markdown docs for components / directives / methods
    │   │   │   ├── components  # component docs (Button.md)
    │   │   │   ├── directives  # directive docs
    │   │   │   └── methods     # method docs
    │   │   ├── features        # feature docs: theme, locale, tokens, etc.
    │   │   └── ...             # other doc directories
    │   └── en                # English docs (same structure as zh)
    ├── icon                # icon library
    ├── locale              # localization library (pure JS, no framework code)
    ├── locale-vue          # localization library with Vue support
    ├── colors              # colors / Design Token package
    ├── utils               # utility library
    ├── unplugin-resolver   # resolver for tree-shaking with unplugin-vue-components
    ├── upload-adapters     # upload adapters
    ├── api-generator       # component API documentation generator
    └── eslint-plugin-horizon-web  # custom ESLint rules
```

## Code Conventions

### useProps

Component props must be defined in `./src/composables/useProps.ts` so that documentation can be generated correctly. Follow these rules:

- Component prop comments map to the parameter descriptions in the docs
  ```ts
  export const useXXXProps = {
    /** Custom status text when switch is off */
    statusOffText: {
      type: String,
      default: 'Off',
    },
  };
  ```
- Comments support Markdown syntax, but for readability and layout, please limit yourself to a small set of syntax such as bold, italics, and links
  ```ts
  export const useXXXProps = {
    /**
     * **Bound** value
     */
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  };
  ```
- Do not write `enum`; use `UnionType` instead
  ```ts
  export const useXXXProps = {
    /** switch size */
    size: {
      type: String as PropType<'normal' | 'small'>,
      default: 'normal',
    },
  };
  ```
- Prefer setting `required` whenever possible; it takes the highest priority for the "required" column in the docs
- The `PropType` generic currently supports only primitive types, `UnionType`, and `Interface`

### Styles

- Style files may only use scss
- Path aliases are not supported in scss and similar files
  ```scss
  // not support
  @use '~/styles/name.scss';
  @use '@/styles/name.scss';
  ```

### Exporting Related Components

A component may contain related components, such as `Checkbox` embedding `CheckboxGroup`. Because the compiled artifacts contain only `Checkbox.js` and not `CheckboxGroup.js`, automatic on-demand loading will fail. Please manually update the config in `packages/unplugin-resolver/src/index.mts`.

### Local Checks

Make sure all of the following checks pass before committing:

```bash
bun run lint        # oxlint + eslint
bun run vitest:all  # all unit and browser tests
bun run ts:check    # TypeScript type checking
```

`husky` automatically runs commitlint, lint-staged, unit tests, and type checks on commit.

## Documentation Conventions

The docs site source lives in `packages/docs` (VitePress): Chinese docs in `packages/docs/zh` and English docs in `packages/docs/en`, with identical structures.

Component, directive, and method markdown docs live in `packages/docs/[zh|en]/demos/[components|directives|methods]/[ComponentName].md`, and the corresponding `.vue` demo files go under `packages/docs/demos/[components|directives|methods]/[ComponentName]/`.

Docs follow a standard structure; the right-side menu, demos, and other content are generated automatically from it:

```
### Feature 1

Description of feature 1

::: demo1 :::

### Feature 2

Description of feature 2

::: demo2 :::
```

Demos in component / directive / method docs use the syntax below, with paths relative to the `packages/docs/demos` directory:

```
:::demo components/Button/basic.vue :::
```

In some cases you may want to show only the demo effect without the source (for example a color palette). Append `--no-code` to the file name:

```
:::demo ./demos/colors--no-code.vue :::
```

> Note: in docs such as `features`, demo paths are relative to the directory of the current markdown file, e.g. `./demos/colors--no-code.vue`.

Component / directive / method docs do not need any info beyond the demos; everything else is parsed automatically.

## Dependencies

The component library depends on the following third-party libraries, whose capabilities can be used when needed:

- [@vueuse/core](https://vueuse.org/): Composition API utilities such as `useEventListener`, `useMouse`, `useLocalStorage`
- [async-validator](https://github.com/yiminghe/async-validator): async form validation library

## Commit Conventions

The repository uses commitlint to enforce commit messages in the format `<type>(<scope>): <subject>`:

- Allowed `type` values: `feat`, `update`, `fix`, `refactor`, `optimize`, `style`, `docs`, `chore`, `release`
- `scope` must be PascalCase, usually the component or package name

Examples:

```text
feat(Table): support column filter
fix(Button): fix loading state flicker
docs(README): rewrite project introduction
```

Keep commits small and semantically clear; one commit should do one thing.

## Pull Request Workflow

1. Create a development branch from the latest `feature` branch (or `main`)
2. Keep PRs small and single-purpose, and link the related issue in the description
3. Pass lint, unit tests, and type checks locally
4. Describe the changes, impact scope, and verification approach in the PR description
5. Wait for maintainer review, address feedback, and merge after revision

## Release Process

Version releases are executed by maintainers:

1. Update the version number in `./versions.json`
2. Run `bun run modify:version` to sync all package versions
3. Run `bun install`
4. Run `bun run build`
5. Publish:
   - latest: `bun run pub -- --confirm`
   - alpha: `bun run pub -- --confirm --tag alpha`
   - beta: `bun run pub -- --confirm --tag beta`
   - v2-x: `bun run pub -- --confirm --tag v2-x`
   - v2-x alpha: `bun run pub -- --confirm --tag v2-x-alpha`
   - v2-x beta: `bun run pub -- --confirm --tag v2-x-beta`

## Related Links

- [Docs site source](packages/docs)
- [Changelog](https://github.com/van-fe/horizon-web/releases)
- [Issue list](https://github.com/van-fe/horizon-web/issues)
