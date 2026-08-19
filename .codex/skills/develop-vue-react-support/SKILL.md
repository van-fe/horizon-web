---
name: develop-vue-react-support
description: Maintain and migrate the Core/Horizon/Skyline Vue and React component-library architecture only on the feature/vue-react-support branch. Use for target package renames, platform capability extraction, framework-free headless hooks, renderer separation, shared theme work, renderer-specific documentation and demos, or integration of related fixes. Do not use this skill on any other branch.
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

## Migrate to the target package hierarchy

Treat the following names and dependency graph as the required end state:

```text
@aurora/core
├── @aurora/horizon-core
│   ├── @aurora/horizon-vue
│   └── @aurora/horizon-react
└── @aurora/skyline-core
    ├── @aurora/skyline-vue
    └── @aurora/skyline-react
```

- Rename `@aurora/horizon-web-core` to `@aurora/horizon-core`, `@aurora/horizon-web-vue` to `@aurora/horizon-vue`, and `@aurora/horizon-web-react` to `@aurora/horizon-react`, including package directories, workspace metadata, lockfiles, build/release scripts, aliases, resolvers, consumers, CI, tests, documentation tooling, and published package lists.
- Introduce `@aurora/skyline-core`, `@aurora/skyline-vue`, and `@aurora/skyline-react` only when real mobile capabilities or renderers are implemented; do not create empty placeholder packages merely for symmetry.
- Perform every rename as a breaking migration. Do not retain compatibility packages, aliases, re-exports, resolver fallbacks, publish entries, or documentation for `@aurora/horizon-web`, `@aurora/horizon-web-core`, `@aurora/horizon-web-vue`, or `@aurora/horizon-web-react` after migration. Keep the unrelated scoped ESLint rule id `@aurora/horizon-web/*` unchanged.
- Keep `@aurora/theme` as the shared visual foundation while Horizon and Skyline use the same visual specification. Add product-specific theme layers only when an actual visual divergence appears.

Enforce dependencies in one direction only:

```text
horizon-vue/react  -> horizon-core  -> core
skyline-vue/react  -> skyline-core  -> core
```

- Never import a renderer from Core or product Core, import Vue from React, import React from Vue, or import Horizon from Skyline (and vice versa).
- Permit a renderer to consume both its product Core and `@aurora/core` when direct shared types or pure capabilities are needed, but never bypass product Core for platform-specific behavior.

## Extract capabilities instead of mirroring files

- Put only cross-product, platform-neutral domain behavior in `@aurora/core`: pure algorithms, reducers, state machines, async coordination, shared domain types, and framework-free headless hooks.
- Put desktop/browser behavior in `@aurora/horizon-core`: DOM measurement, focus, keyboard, mouse/pointer interaction, Portal, floating layers, browser scrolling, and other Horizon platform capabilities.
- Put mobile behavior in `@aurora/skyline-core`: touch gestures, long press, safe-area behavior, mobile scrolling, device adaptation, and other Skyline platform capabilities.
- Keep Vue/React packages focused on rendering, renderer-native public APIs, framework lifecycle binding, VNode/ReactNode content, providers, and thin hook adapters.
- Do not create a component directory in every package just to keep trees visually symmetric. Create a Core or product-Core directory only when that layer owns a real reusable capability.
- Start renderer-specific behavior locally. Promote it to Horizon/Skyline Core only when both renderers need the same platform behavior; promote it to `@aurora/core` only when both products can share it.
- Do not move complete Vue props/emits/slots/exposes or React props/callbacks/renderers/refs into Core. Define only semantic inputs, state, events, and commands required by the shared capability. Keep renderer API surfaces native and local.
- Keep VNode, ReactNode, framework refs, framework lifecycle primitives, and framework-only event names out of Core and product Core.

## Implement framework-free headless hooks

- Treat a headless hook as a cohesive capability, not as a renamed five-line helper. Examples include selection, async loading, confirmation workflow, calendar scheduling, focus management, and pointer dragging.
- Use ordinary pure functions for stateless calculations and reducers for explicit state transitions. Use a subscribable capability only when it owns state or resources.
- Prefer `getState()`, `subscribe(listener)`, `update(options)`, focused commands, and idempotent `destroy()` for stateful framework-free capabilities when applicable.
- Name framework-free factories `createXxx` to avoid implying React hook rules. Bind them locally through Vue `useXxx` composables or React `useXxx` hooks that only synchronize framework state and lifecycle.
- Keep listener ownership, pending async work, generation invalidation, and cleanup inside the capability that creates them. Test disposal, repeated updates, stale results, and controlled-state rollback at the owning layer.
- Avoid duplicate state authorities. A renderer may project Core state into framework state, but it must not independently reimplement or optimistically diverge from the shared state machine.
- Prefer direct composition over pass-through adapters. Remove an abstraction when understanding one interaction requires crossing layers without gaining reuse, isolation, or testability.
- Share behavior through headless hooks and test vectors, never by wrapping one renderer with the other.

Use this extraction decision for every capability:

1. Keep pure presentation or single-renderer behavior in the renderer.
2. Move shared Horizon Vue/React browser behavior to `@aurora/horizon-core`.
3. Move shared Skyline Vue/React mobile behavior to `@aurora/skyline-core`.
4. Move behavior shared by Horizon and Skyline to `@aurora/core`.
5. Reassess existing abstractions during migration; do not preserve a strange split solely because it already exists.

## Keep renderer documentation isolated

- Store Vue pages under `packages/docs/{locale}/vue/` and Vue demos under `packages/docs/demos/vue/`.
- Store React pages under `packages/docs/{locale}/react/` and React demos under `packages/docs/demos/react/`.
- Maintain independent Vue and React navigation, sidebars, API analysis, demo containers, and compilation paths.
- Document each renderer only in its native terms. Do not write Vue-to-React mappings, React-to-Vue mappings, or cross-framework API comparison tables in component docs.
- Keep shared visual rules, tokens, and framework-neutral accessibility guidance in common documentation.
- Redirect legacy `/demos/...` routes to canonical Vue routes instead of duplicating page content.

### Enforce React demo scenario parity

- Treat the existing Vue component page as the minimum demo-scenario inventory while completing the React renderer.
- Provide at least as many runnable React demos as the corresponding Vue page provides. React may add renderer-specific demos, but it must not have fewer demos.
- Cover every user-facing scenario demonstrated by Vue with a dedicated React demo. Do not collapse several Vue scenarios into one oversized React demo merely to claim coverage.
- Implement each React demo with React-native props, callbacks, children, refs, state, and event handling. Never load, wrap, translate, or embed a Vue demo in React documentation.
- Keep this parity rule internal to planning and validation. Do not write Vue-to-React mappings, comparison tables, “equivalent to Vue”, or other cross-renderer wording in component pages or demo UI.
- Register the complete React demo set on both Chinese and English React pages, and keep both locale pages aligned.
- Before completing a component batch, count runnable demo references on the Vue and React pages and fail the batch when `react_demo_count < vue_demo_count` or when a Vue scenario has no independent React demo.
- Review scenario quality in addition to counts: demos must remain runnable, realistic, responsive, dark-mode compatible, and understandable without reading source code.

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
bun --filter @aurora/horizon-react test
bun run vitest:horizon-web
bun run vitest:horizon-web:browser
bun run docs:check-renderers
bun run docs:build
```

For documentation changes, verify both renderer routes in Chinese and English, exercise React demos in the browser, and check dark mode and a 390px viewport.
Also report the Vue and React runnable-demo counts for every component touched and confirm React scenario parity explicitly.

## Complete work on the integration branch

1. Confirm the active branch again before staging.
2. Stage only the current task and preserve unrelated worktree changes.
3. Review the staged diff and commit with a focused conventional message.
4. Push `feature/vue-react-support` to its configured remote.
