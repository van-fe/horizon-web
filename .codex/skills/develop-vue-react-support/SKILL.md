---
name: develop-vue-react-support
description: Maintain and extend the shared Vue 3 and React component-library architecture only on the feature/vue-react-support branch. Use for renderer separation, shared core or theme extraction, Horizon Vue/React package work, renderer-specific documentation and demos, or integration of related fixes into this dedicated branch. Do not use this skill on any other branch.
---

# Develop Vue React Support

Keep all Vue/React renderer-splitting work integrated on `feature/vue-react-support` without disturbing unrelated user changes.

## Enforce the branch scope first

1. Run `git branch --show-current` before taking task actions.
2. Continue only when the result is exactly `feature/vue-react-support`.
3. If another branch is active, stop applying this skill. Use a clean worktree for `feature/vue-react-support` instead of moving, stashing, or overwriting unrelated user changes.
4. Never copy or commit this temporary Skill to another branch. Retire it when `feature/vue-react-support` is merged or decommissioned.

## Use this branch as the integration line

- Base Vue/React support changes on `feature/vue-react-support` and merge completed renderer work back into it.
- Preserve the existing multi-platform guide, shared package foundations, Button/Switch React pilots, separated documentation, and the integrated Affix/Badge fixes.
- Do not mix unrelated feature or maintenance commits into this branch merely because they are nearby in history.
- Inspect the branch graph and changed paths before cherry-picking or merging. Resolve moved documentation paths against the current renderer-specific layout.

## Preserve the package boundaries

- Put renderer-agnostic behavior and state machines in `@aurora/core`.
- Put shared tokens, styles, namespace utilities, and visual foundations in `@aurora/theme`.
- Keep Vue rendering and Vue-only APIs in `@aurora/horizon-web-vue`.
- Keep React rendering, hooks, providers, React props, callbacks, children, and refs in `@aurora/horizon-web-react`.
- Do not import Vue from shared core/theme or React packages, and do not import React from Vue packages.
- Treat the renderer package rename as a breaking migration. Do not create, publish, alias, re-export, resolve, document, test, or otherwise preserve `@aurora/horizon-web` as a compatibility package. The only Web renderer package names are `@aurora/horizon-web-vue` and `@aurora/horizon-web-react`; the scoped ESLint plugin rule id `@aurora/horizon-web/*` is unrelated and remains unchanged.
- Reuse common behavior through typed contracts and test vectors rather than one renderer wrapping the other.
- Define shared component API semantics once in the matching `@aurora/core/src/components/<Component>` contract: domain types, defaults, validators, event payloads/reasons, render-region semantics, and imperative commands.
- Let Vue adapt that contract into `props`/`emits`/`slots`/`exposes`, and React adapt it into `props`/callbacks/children or renderers/refs. Renderer adapters may rename, omit, or extend fields, but must not duplicate shared enums, defaults, validators, or payload types.
- Keep VNode, ReactNode, framework refs, lifecycle hooks, and framework-only event names out of the shared contract. Do not force false one-to-one API symmetry merely to remove every repeated line.

## Mirror component directories across packages

- For every extracted component, keep the same case-sensitive component directory in all participating packages: `packages/core/src/components/<Component>`, `packages/horizon-web-core/src/components/<Component>`, `packages/horizon-web-vue/src/components/<Component>`, and `packages/horizon-web-react/src/components/<Component>`.
- Put framework-neutral state and algorithms in the matching Core component directory, browser-only primitives in the matching Horizon Web Core component directory, and renderer code in its matching Vue or React directory.
- Keep genuinely cross-component helpers under `src/utils` or an explicit `src/components/_shared` directory. Do not flatten component-owned files into a package-level `src` root.
- Preserve root exports through package-level `src/components/index.ts` and `src/index.ts`; consumers must not need private source paths.

## Keep renderer documentation isolated

- Store Vue pages under `packages/docs/{locale}/vue/` and Vue demos under `packages/docs/demos/vue/`.
- Store React pages under `packages/docs/{locale}/react/` and React demos under `packages/docs/demos/react/`.
- Maintain independent Vue and React navigation, sidebars, API analysis, demo containers, and compilation paths.
- Document each renderer only in its native terms. Do not write Vue-to-React mappings, React-to-Vue mappings, or cross-framework API comparison tables in component docs.
- Keep shared visual rules, tokens, and framework-neutral accessibility guidance in common documentation.
- Redirect legacy `/demos/...` routes to canonical Vue routes instead of duplicating page content.

## Protect integrated Affix and Badge behavior

- Keep Affix positioning, resize/scroll synchronization, target handling, exposes, and responsive updates in its focused composable and tests.
- Keep Badge icons overlaid at the avatar corner and covered by browser positioning tests.
- When moving demos or docs again, carry the Affix and Badge examples forward without reverting their fixes.

## Validate before committing

Run checks in proportion to the change, including the relevant subset of:

```bash
bun run check:boundaries
bun --filter @aurora/core test
bun --filter @aurora/theme test
bun --filter @aurora/horizon-web-react test
bun run vitest:horizon-web
bun run vitest:horizon-web:browser
bun run docs:check-renderers
bun run docs:build
```

For documentation changes, verify both renderer routes in Chinese and English, exercise React demos in the browser, and check dark mode and a 390px viewport.

## Complete work on the integration branch

1. Confirm the active branch again before staging.
2. Stage only the current task and preserve unrelated worktree changes.
3. Review the staged diff and commit with a focused conventional message.
4. Push `feature/vue-react-support` to its configured remote.
