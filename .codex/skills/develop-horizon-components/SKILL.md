---
name: develop-horizon-components
description: Develop or document Horizon and Skyline Vue/React components using the layered @aurora/core, product Core, and renderer architecture, with framework-free headless hooks, renderer-native APIs, styling, localization, separated documentation, demo parity, JSDoc, and real-browser tests. Use for Core capability extraction, product component work, renderer packages, demos/docs, or behavior reviews and fixes.
---

# Develop Horizon and Skyline Components

Build components as native members of the Horizon desktop or Skyline mobile product family rather than isolated widgets. Preserve unrelated work in the dirty worktree.

## Follow the platform dependency hierarchy

Use this target architecture:

```text
@aurora/core
├── @aurora/horizon-core -> @aurora/horizon-vue, @aurora/horizon-react
└── @aurora/skyline-core -> @aurora/skyline-vue, @aurora/skyline-react
```

- Put platform-neutral capabilities shared by Horizon and Skyline in `@aurora/core`.
- Put desktop/browser capabilities shared by Horizon Vue and React in `@aurora/horizon-core`.
- Put mobile capabilities shared by Skyline Vue and React in `@aurora/skyline-core`.
- Keep renderer packages responsible for native public APIs, framework lifecycle, rendering, and thin bindings only.
- Keep dependencies directed from renderer to product Core to Core. Do not create cross-product or cross-renderer imports.
- Keep shared visuals in `@aurora/theme` while the products follow one visual specification.
- Create package/component directories only for real capabilities. Do not mirror directories or split files for cosmetic symmetry.

## Follow the repository first

1. Read applicable project instructions.
2. Inspect the closest existing components, their composables, styles, tests, docs, and demos before designing an API.
3. Search the component library and `@aurora/icon` before creating controls, icons, utilities, or interaction patterns.
4. Follow the existing `ComponentClassBlock`, `useNamespace`, `declarePropType`, `withInstall`, design-token, and generated-index conventions.
5. Edit generated or ignored indexes only when needed for local verification; ensure the normal build generator can discover the component from its public index and metadata.

## Reuse Horizon Web controls

- Prefer existing Horizon Web components over raw HTML whenever the library already provides the interaction. Examples include `HButton`, `HSlider`, `HSelect`, `HOption`, `HTooltip`, and `HScrollbar`.
- Keep native elements when they provide the underlying semantic capability and no library abstraction exists, such as `audio`, `video`, canvas, or a purpose-built waveform surface.
- Do not reproduce an existing component's disabled, focus, keyboard, loading, sizing, or theme behavior with local CSS and event handlers.
- Add a test that verifies important reused controls remain library components when regression to native controls would be harmful.

## Split capabilities into hooks

- Implement reusable behavior first as framework-free headless hooks in the correct Core layer, without Vue refs/computed/watch, React state/effects, VNode, ReactNode, or framework lifecycle APIs.
- Use pure functions for calculations, reducers for explicit transitions, and subscribable `createXxx` capabilities for stateful or resource-owning behavior.
- Give stateful capabilities `getState`, `subscribe`, `update`, focused commands, and idempotent `destroy` when those lifecycle operations apply.
- Put DOM, focus, pointer, keyboard, observer, scrolling, and measurement hooks in Horizon Core; put touch, gesture, safe-area, and mobile-device hooks in Skyline Core; keep both out of `@aurora/core`.
- Bind `createXxx` capabilities through thin renderer-local Vue `useXxx` composables or React `useXxx` hooks. Renderer bindings may translate events and state shapes but must not become a second behavior authority.
- Keep component files responsible primarily for rendering, layout, renderer-native public API wiring, and composing hooks.
- Give each hook one cohesive user capability. Avoid pass-through hooks, one-function files, and abstractions that add traversal without reuse or isolation.
- Start behavior in the renderer when only one renderer needs it. Promote it to product Core when both renderers share it, and to `@aurora/core` only when both Horizon and Skyline share it.
- Add focused tests at the layer that owns the behavior, then cover the renderer binding with integration tests.

### Use component APIs flexibly

- Read the reused component's props, emits, slots, exposes, docs, and implementation before configuring it.
- Compose the component's public APIs to solve layout and interaction requirements. Prefer an intended API over local CSS overrides, DOM mutation, duplicated state, or replacing the component.
- Distinguish related APIs by behavior instead of guessing from their names. For example, Select popup sizing, Teleport placement, line clamping, panel styling, and option rendering are separate concerns; choose the API that controls the actual constraint.
- Exercise the real edge case in a focused test or demo, including narrow containers, long labels, empty data, disabled state, loading, and popup placement when relevant.

## Optimize interaction thoroughly

- Design pointer, keyboard, touch, and assistive-technology paths together. Preserve visible focus, meaningful ARIA names, correct roles, and logical tab order.
- Handle loading, empty, error, retry, disabled, read-only, partial-data, and completed states when applicable.
- Make compact and responsive layouts usable with long localized text, zoom, narrow containers, and popup content.
- Prevent duplicate actions and stale async results. Cancel obsolete requests or ignore their results, clean up listeners and observers, and keep fallbacks from breaking the primary interaction.
- Keep controlled props, internal state, exposed methods, and emitted events synchronized across source changes and lifecycle transitions.
- Prefer progressive enhancement: failure of an optional visualization or convenience feature must not disable the core task.
- Add regression tests for interaction details that required non-obvious API configuration.

## Define complete public APIs

- Split public metadata into the repository's `useProps.ts`, `useEmits.ts`, `useSlots.ts`, and `useExposes.ts` pattern when applicable.
- Add Chinese JSDoc and an `@en` description to every public prop, event, slot, and expose.
- For every documented parameter, add both `@param name ...` and `@paramEn name ...`; keep names identical to the function signature.
- Add `descLocales.en` beside the component's Chinese `desc`.
- Validate props and emitted payloads proportionately instead of using unconditional validators when useful checks are available.

## Use tokens and localization

- Build styles from existing mixins and CSS variables. Add component variables to the global theme pipeline; avoid unexplained literal product colors.
- Preserve keyboard operation, focus visibility, disabled behavior, and ARIA names.
- Put user-facing control labels, errors, and status text in Horizon Web locale dictionaries. Do not hardcode Chinese or English UI text.
- Update every concrete supported locale dictionary. Account for locale aliases that inherit another dictionary.
- Add a test that ensures all supported dictionaries expose the component's required locale keys.

## Deliver docs and demos with the component

- Add both Chinese and English component pages and register the navigation entry.
- Document each renderer in its own native API terms. Do not describe Vue APIs as mapping to React APIs, React APIs as mapping to Vue APIs, or include cross-framework API comparison tables in component docs. Keep cross-framework mappings only in architecture or migration guides.
- Provide runnable demos for the normal path and the important modes or edge cases. Avoid demos that require unavailable private services.
- Explain non-obvious browser constraints and fallback behavior, such as CORS, media decoding, Teleport, or deterministic mock data.
- Document Props, Events, Slots, and Exposes. Source JSDoc remains required even when API tables are written manually.

### Match demo depth across supported renderers

- When both Vue and React renderers exist, use the renderer with the larger established demo inventory as the minimum scenario baseline; during the current Vue-to-React rollout, this is normally the Vue page.
- Require the React page to contain at least the same number of runnable demos as the corresponding Vue page and to cover every demonstrated user scenario independently.
- Do not replace several focused scenarios with one omnibus demo just to reduce file count. Prefer one readable demo per behavior, mode, composition pattern, or important edge case.
- Use renderer-native implementation and terminology in every demo. Keep scenario-parity notes in task plans or validation output only; never publish cross-renderer mappings or comparisons in component documentation.
- Keep Chinese and English pages for the same renderer aligned to the same runnable demo inventory.
- Validate counts mechanically where possible, then inspect scenario coverage manually so duplicate or trivial demos cannot satisfy the rule.

### Keep renderer documentation separate

- Put Vue pages under `packages/docs/{locale}/vue/` and React pages under `packages/docs/{locale}/react/`. Use `/vue/...` and `/react/...` as canonical routes.
- Put Vue SFC demos under `packages/docs/demos/vue/` and React TSX demos under `packages/docs/demos/react/`. Do not load one renderer's demo through the other renderer's compiler or preview component.
- Give Vue and React independent navigation and sidebars. List only components implemented by that renderer.
- Keep each component page renderer-native: Vue pages document props, emits, slots, exposes, and Vue demos; React pages document props, callbacks, children, refs, and TSX demos.
- Keep shared visual rules, tokens, accessibility principles, and framework-neutral design guidance in common documentation sections. Do not duplicate them into renderer pages unless the component needs renderer-specific usage guidance.
- Redirect legacy component URLs to the canonical Vue route during migration. Do not retain duplicate full-page content at old routes.
- Make API injection renderer-aware. Never inject Vue analysis into React pages or React analysis into Vue pages.
- Add documentation checks that reject cross-renderer demo references and mixed component-page content.

### Make demos polished and readable

- Present realistic, meaningful content instead of raw option objects, placeholder text, or empty fixed-size blocks. Make the demonstrated state and outcome understandable at a glance.
- Give complex demos a clear hierarchy: introduce the scenario briefly, separate the preview from its controls, label configuration fields with user-facing text and API names, and summarize the active state compactly when helpful.
- Choose controls by interaction semantics. Prefer `HSegmented` with its public `small` and `block` APIs for compact mutually exclusive configuration choices; reserve `HRadioButton` for demos that specifically teach radio-button behavior. Inspect actual size mappings instead of assuming every named size has a distinct visual variant.
- Build responsive layouts with Grid, cards, scoped kebab-case or BEM-style classes, and Horizon Web tokens. Avoid hardcoded product colors, brittle sibling margins, and widths that overflow narrow documentation viewports.
- Keep loading demos observable and controllable: place controls outside the loading target, use realistic content beneath the mask, keep delays short enough to compare behavior, and clean up timers on unmount.
- Verify the rendered documentation page in light and dark themes and at a narrow viewport such as 390px. Exercise every control, check text wrapping and horizontal overflow, and inspect console errors before handoff.

## Test behavior, not only mounting

Cover the component's core state transitions and public contract, including:

- every public prop through an observable rendering, state, style, child configuration, or interaction assertion;
- every emit through its real trigger path, invocation count, and payload, and every slot through its rendered position and scoped slot props;
- native pointer, keyboard, input, focus, blur, drag, scroll, and media events in Chromium whenever they are part of the public contract;
- normal interaction and disabled behavior;
- keyboard and accessibility behavior;
- controlled inputs and emitted payloads;
- deterministic or fallback logic;
- localization coverage;
- integration assumptions involving reused Horizon Web components;
- the actual bug scenario for every regression fix.

### Run DOM tests in a real browser

- Run every component, directive, interaction, accessibility, layout, and other DOM-dependent test in Vitest Browser Mode with the Playwright provider and headless Chromium.
- Load the Horizon Web production style entry (`src/styles/index.scss`) in the Browser Mode global setup. Visibility, geometry, overflow, placement, animation, responsive, and computed-style assertions must execute with the real component-library CSS applied.
- Do not add or retain `happy-dom` or `jsdom` environments for DOM tests. Do not treat DOM emulation results as component-test validation.
- Vue Test Utils may be used for component wrappers and emitted-event inspection only when the test itself executes inside the real-browser runner. Prefer `vitest/browser` locators and `userEvent` for pointer, keyboard, focus, visibility, accessibility, and layout behavior.
- Use native browser geometry, computed styles, events, observers, media APIs, focus behavior, and animation behavior wherever they form part of the contract. Mock only unavailable external boundaries such as network services or deterministic media data.
- Keep pure source-analysis, build-tool, and runtime smoke tests in a separate Node or Bun project only when they do not touch DOM APIs. Never route component tests through that project as a fallback.
- Run focused browser tests during development, then the complete headless-browser suite before handoff. If the browser runner needs a local port that the sandbox blocks, request the required execution approval rather than falling back to a DOM emulator.
- Before handoff, collect component-source coverage with coverage-v8 and require Statements, Branches, Functions, and Lines to each reach at least 95%. Do not raise the result by excluding production hooks, exposes, metadata modules, or difficult branches, and do not add coverage-ignore directives for reachable production behavior.

Run focused real-browser tests, TypeScript checks, lint/format checks, and style compilation in proportion to the change. Compile new Vue demos independently when a full documentation build is blocked by unrelated repository errors. Report unrelated blockers precisely without changing them.

## Completion checklist

Before handing off, confirm:

- feature capabilities and non-trivial behavior are split into cohesive, independently testable hooks, with components kept focused on presentation and composition;
- existing components were reused wherever appropriate;
- reused components are configured through the APIs that control the actual layout and behavior;
- pointer, keyboard, focus, responsive, async, loading, empty, error, and disabled interactions are optimized as applicable;
- all public API JSDoc contains Chinese plus `@en`, with paired parameter tags;
- styles use Horizon Web tokens and conventions;
- localization covers every supported dictionary;
- Chinese and English docs, demos, navigation, and API descriptions are present;
- React runnable-demo count and scenario coverage meet or exceed the corresponding Vue component page when both renderers are supported;
- focused headless Chromium tests cover behavior and the regression scenario;
- formatting, linting, style compilation, and available type/build checks pass or have clearly identified unrelated blockers.

## Commit and push every completed task

After validation and before handoff:

1. Inspect the worktree and separate the current task from pre-existing or concurrent user changes.
2. Stage only files and hunks owned by the current task. Never absorb unrelated modifications into the commit.
3. Review the staged diff and create a concise conventional commit describing the completed outcome.
4. Push the current branch to its configured remote.
5. Report the commit and push result. If credentials, network access, a missing remote, or branch policy blocks the push, keep the verified commit and report the exact blocker.
