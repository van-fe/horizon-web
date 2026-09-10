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

## Renderer file-structure gate

A renderer package split is not complete merely because Vue and React live in separate packages. Review the internal structure of every changed renderer before declaring the component complete.

- Keep `index.ts` / `index.tsx` as a public barrel. Do not leave substantial component implementation, controller wiring, context definitions, public contracts and helpers together in the entry file.
- Default to one independently exported component per implementation file. Split sibling exports such as `Xxx` and `XxxGroup` when they have independent props, rendering or lifecycle responsibilities.
- Move public renderer types used across files to `types.ts`; provider or group state to `context.ts`; pure transformations to focused utility modules; and Core/product-Core lifecycle adaptation to Vue composables or React hooks.
- Keep hooks and composables thin: they may bind shared controllers to framework lifecycle and state, but must not recreate domain rules or become a second state authority.
- Split by responsibility and reason to change, not by an arbitrary line count. A file that simultaneously owns public contracts, multiple exported components, resource-owning effects/controllers and unrelated helpers must be decomposed even when it still builds and passes tests.
- Do not mechanically fragment cohesive rendering into pass-through components with large prop surfaces. Small private render fragments may stay with their owning component when extracting them would obscure rather than clarify ownership.
- After the split, inspect the file inventory and largest implementation files. Record which file owns rendering, framework lifecycle/controller adaptation, context, types and utilities; explain any intentional multi-responsibility file during handoff.
- Ensure coverage includes every new production file, and verify public barrels, declaration output, SSR and consumer tree-shaking after moving exports.

### Responsibility and Hook/Composable gate

Before implementation, inventory the changed renderer by responsibility: public entry, native rendering, framework state/event adaptation, async mutation flow, resource-owning lifecycle, provider/context wiring, public types and pure transformations. Use that inventory to identify extraction candidates before adding more setup or render-body code.

- The top-level component should read primarily as orchestration: create refs, compose focused hooks/composables, provide or expose the returned contract, bind native events and render native markup. Do not leave a long setup body that directly owns several unrelated state machines, watchers, async guards and browser resources merely because they are private to one component.
- Extract a renderer-specific hook/composable when a cohesive capability owns meaningful state, effects, async sequencing or cleanup and has a clear input/output boundary. Cross-component reuse is not required; independent ownership, readability and testability are sufficient reasons to extract it.
- Prefer focused names and contracts such as editing, interaction, overflow/tooltip, group mutation, registration or collapse measurement. Do not replace one monolith with a catch-all `useXxxRuntime` that still owns unrelated responsibilities, and do not split trivial one-line projections into noise.
- Keep native markup and framework-native node composition in the component. Extract render fragments only when they are independently meaningful components; do not use pass-through render components to hide line count.
- Pass reactive renderer inputs across the boundary as Vue `Ref`/`ComputedRef`/getters or through reactive objects, and as current React values/callbacks with correct dependency or latest-ref handling. Never snapshot a parent prop, injected option or callback during setup/render when later updates must remain observable.
- A hook/composable that creates a controller, timer, subscription, observer or document/window listener owns its exact cleanup. It must also preserve stale-async protection and the renderer's established event/promise ordering.
- Keep the shared Core or product-Core controller as the single state authority. Hooks/composables may project controller state into Vue refs or React state, but must not duplicate its transition rules.
- Cover extracted capabilities through focused hook/composable tests when their branches, async order or cleanup are not fully exercised through renderer behavior tests. The component coverage report must enumerate every new production file, all four component-scope metrics must remain at least 95%, and no extracted file may be unexecuted or excluded to satisfy the gate.
- Re-run consumer tests for components that render or coordinate the changed component, not only its direct test directory. For resource or export movement, also verify declarations, SSR and tree-shaking.
- After both renderer gates pass, update [`../../../COMPONENT_RENDERER_DECOMPOSITION_LEDGER.md`](../../../COMPONENT_RENDERER_DECOMPOSITION_LEDGER.md) in the same task. Mark only evidence-backed renderer states; record responsibility ownership, largest production files and rationale, four component coverage metrics, consumer/SSR/tree-shaking verification and commit evidence. A historical migration or `split` commit is not sufficient. Downgrade an existing entry when later work invalidates its evidence.

There is no universal line-count limit. Line count is a review signal: after decomposition, report the largest implementation files and explain why each remaining responsibility is cohesive. A shorter component that only delegates to one oversized catch-all hook is still incomplete.

A typical complex renderer may use this shape when those responsibilities exist; do not create empty placeholders:

```text
Xxx/
├── index.ts
├── Xxx.tsx
├── XxxGroup.tsx
├── types.ts
├── context.ts
├── hooks/ or composables/
│   ├── useXxxRuntime.ts
│   └── useXxxGroupRuntime.ts
└── utils.ts
```

## Required component workflow

1. Audit the current public API, event order, DOM/ARIA/focus, styles, docs, demos, async work and cleanup; inventory each renderer file's current responsibilities.
2. Write the component task card from the normative guide, classify each capability by owner layer, and record the renderer hook/composable extraction candidates and their reactive input/output boundaries.
3. Implement and test the Core contract/schema and derive its manifest before renderer duplication can occur.
4. Add product Core only for genuine platform behavior.
5. Reconnect Vue to shared capabilities and contract-derived runtime API declarations while preserving its established public behavior.
6. Implement React with native React APIs, contract-derived shared API declarations and StrictMode-safe lifecycle.
7. Move common visuals to canonical Theme styles and leave renderer styles as thin proxies.
8. Keep Vue/React docs separate; make React runnable Demo count and scenario depth meet or exceed Vue.
9. Run focused and package validation, including real Chromium and four component-source coverage metrics at or above 95%.
10. Apply both renderer structure gates, inspect the largest implementation and hook/composable files, and review the current diff for monolithic containers or catch-all hooks, reactive snapshots, duplicate authorities, leaks, stale async results, API drift and legacy package compatibility before committing.

## Repository safety

- Preserve unrelated dirty-worktree changes.
- Never modify or commit `.codex/config.toml` unless the user explicitly requests it.
- Do not lower thresholds, exclude production code, delete tests, or use a DOM emulator to make validation pass.
- Do not restore aliases, re-exports, resolvers or packages for the removed `@aurora/horizon-web*` component packages.
- Keep the unrelated ESLint rule ID `@aurora/horizon-web/*` unchanged.
- Stage and commit only the completed task, then push the active task branch when validation succeeds.
