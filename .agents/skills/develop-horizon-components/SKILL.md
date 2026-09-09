---
name: develop-horizon-components
description: Develop, migrate, review, test, or document Aurora Horizon/Skyline Vue and React components using framework-free Core capabilities, product Core hooks, thin native renderers, shared Theme, renderer-isolated docs, demo parity, and real-browser quality gates.
---

# Develop Horizon and Skyline Components

Use this Skill for component implementation, capability extraction, architecture review, API work, Theme/locale work, Vue/React documentation, demos, tests, or fixes in the Aurora component repository.

## Read the normative execution guide

Before changing component code, read [`../../../COMPONENT_DECOUPLING_EXECUTION_GUIDE.md`](../../../COMPONENT_DECOUPLING_EXECUTION_GUIDE.md) completely. It is the normative source for:

- package hierarchy and dependency direction;
- capability placement and directory rules;
- framework-free `createXxx` Hook/Controller design;
- Core, Horizon Core, Skyline Core, Vue, React and Theme boundaries;
- controlled state, async ownership and resource cleanup;
- renderer-native APIs, JSDoc, docs and Demo parity;
- Chromium tests, coverage, build and release gates;
- breaking package migration and forbidden compatibility entries;
- the per-component task card and Definition of Done.

Do not begin implementation after reading only this entrypoint.

## Essential decisions

Use this dependency hierarchy:

```text
@aurora/core
├── @aurora/horizon-core -> @aurora/horizon-vue, @aurora/horizon-react
└── @aurora/skyline-core -> @aurora/skyline-vue, @aurora/skyline-react
```

- Put cross-product domain behavior in `@aurora/core`.
- Put desktop/browser behavior shared by Horizon renderers in `@aurora/horizon-core`.
- Put mobile/device behavior shared by Skyline renderers in `@aurora/skyline-core`.
- Keep framework APIs, lifecycle, VNode/ReactNode and rendering in their renderer.
- Keep shared visual rules in `@aurora/theme` while the products share one specification.
- Create a component directory in a layer only when that layer owns a real capability.
- Use pure functions for stateless logic and `createXxx` for framework-free state/resource-owning capabilities.
- Bind shared capabilities through thin Vue composables or React hooks without introducing a second state authority.

## API single-source invariant

For every migrated component, make its Core contract/schema the active single source of truth for shared API semantics and metadata:

- Define shared prop, event, slot/region and expose/command names, types, runtime kinds, defaults, validators and descriptions once in Core. Derive the public manifest from that same contract/schema; do not maintain a second hand-written field list.
- Derive or adapt Vue runtime `props`, `emits`, `slots` and `exposes` from the Core contract/manifest. Derive or adapt the corresponding React props, callbacks, children/regions and ref commands from it as well.
- Keep only explicit framework-specific renames, omissions, default overrides and extensions in a renderer. Those differences must remain native to that framework and must not become a duplicate declaration of the shared API.
- Importing Core types/defaults/validators, using `satisfies`, or copying contract fields into a renderer-owned object does **not** satisfy this invariant when the renderer still hand-declares the shared API field by field.
- Feed renderer manifests, API documentation, Web Types/Vetur metadata and other IDE outputs from the same contract-driven source. If an analyzer cannot understand generated runtime declarations, extend the analyzer or provide a contract-driven adapter; do not restore duplicate literal declarations merely for static analysis.
- Add parity tests that compare the Core schema/manifest with renderer runtime declarations and generated documentation/IDE metadata, including field presence and renderer-specific mapping rules.

## Required component workflow

1. Audit the current public API, event order, DOM/ARIA/focus, styles, docs, demos, async work and cleanup.
2. Write the component task card from the normative guide and classify each capability by owner layer.
3. Implement and test the Core contract/schema and derive its manifest before renderer duplication can occur.
4. Add product Core only for genuine platform behavior.
5. Reconnect Vue to shared capabilities and contract-derived runtime API declarations while preserving its established public behavior.
6. Implement React with native React APIs, contract-derived shared API declarations and StrictMode-safe lifecycle.
7. Move common visuals to canonical Theme styles and leave renderer styles as thin proxies.
8. Keep Vue/React docs separate; make React runnable Demo count and scenario depth meet or exceed Vue.
9. Run focused and package validation, including real Chromium and four component-source coverage metrics at or above 95%.
10. Review the current diff for duplicate authorities, leaks, stale async results, API drift and legacy package compatibility before committing.

## Repository safety

- Preserve unrelated dirty-worktree changes.
- Never modify or commit `.codex/config.toml` unless the user explicitly requests it.
- Do not lower thresholds, exclude production code, delete tests, or use a DOM emulator to make validation pass.
- Do not restore aliases, re-exports, resolvers or packages for the removed `@aurora/horizon-web*` component packages.
- Keep the unrelated ESLint rule ID `@aurora/horizon-web/*` unchanged.
- Stage and commit only the completed task, then push the active task branch when validation succeeds.
