---
name: develop-horizon-components
description: Develop or update Vue components in the horizon-web repository while following its component APIs, styling, localization, documentation, demo, JSDoc, and test conventions. Use for any work under packages/horizon-web/src/components, related component demos or docs, or reviews and fixes that affect Horizon Web component behavior.
---

# Develop Horizon Components

Build components as native members of Horizon Web rather than isolated widgets. Preserve unrelated work in the dirty worktree.

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

- During feature development, extract behavior and reusable capabilities into focused hooks/composables instead of accumulating them in Vue component files.
- Keep component files responsible primarily for rendering, layout, prop/emit wiring, and composing hooks. Move state machines, async workflows, event coordination, derived state, observers, and reusable interaction logic into hooks.
- Give each hook one cohesive responsibility with an explicit typed input and return contract. Compose small hooks when a feature spans multiple concerns so implementation details remain decoupled.
- Avoid creating pass-through hooks that only relocate trivial code. Keep truly view-local, one-off presentation logic in the component when extraction would add indirection without improving separation.
- Add focused tests for non-trivial hook behavior independently from component rendering, then cover the component-to-hook integration where it forms part of the public contract.

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
- Provide runnable demos for the normal path and the important modes or edge cases. Avoid demos that require unavailable private services.
- Explain non-obvious browser constraints and fallback behavior, such as CORS, media decoding, Teleport, or deterministic mock data.
- Document Props, Events, Slots, and Exposes. Source JSDoc remains required even when API tables are written manually.

### Make demos polished and readable

- Present realistic, meaningful content instead of raw option objects, placeholder text, or empty fixed-size blocks. Make the demonstrated state and outcome understandable at a glance.
- Give complex demos a clear hierarchy: introduce the scenario briefly, separate the preview from its controls, label configuration fields with user-facing text and API names, and summarize the active state compactly when helpful.
- Choose controls by interaction semantics. Prefer `HSegmented` with its public `small` and `block` APIs for compact mutually exclusive configuration choices; reserve `HRadioButton` for demos that specifically teach radio-button behavior. Inspect actual size mappings instead of assuming every named size has a distinct visual variant.
- Build responsive layouts with Grid, cards, scoped kebab-case or BEM-style classes, and Horizon Web tokens. Avoid hardcoded product colors, brittle sibling margins, and widths that overflow narrow documentation viewports.
- Keep loading demos observable and controllable: place controls outside the loading target, use realistic content beneath the mask, keep delays short enough to compare behavior, and clean up timers on unmount.
- Verify the rendered documentation page in light and dark themes and at a narrow viewport such as 390px. Exercise every control, check text wrapping and horizontal overflow, and inspect console errors before handoff.

## Test behavior, not only mounting

Cover the component's core state transitions and public contract, including:

- normal interaction and disabled behavior;
- keyboard and accessibility behavior;
- controlled inputs and emitted payloads;
- deterministic or fallback logic;
- localization coverage;
- integration assumptions involving reused Horizon Web components;
- the actual bug scenario for every regression fix.

Run focused unit tests, TypeScript checks, lint/format checks, and style compilation in proportion to the change. Compile new Vue demos independently when a full documentation build is blocked by unrelated repository errors. Report unrelated blockers precisely without changing them.

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
- focused tests cover behavior and the regression scenario;
- formatting, linting, style compilation, and available type/build checks pass or have clearly identified unrelated blockers.

## Commit and push every completed task

After validation and before handoff:

1. Inspect the worktree and separate the current task from pre-existing or concurrent user changes.
2. Stage only files and hunks owned by the current task. Never absorb unrelated modifications into the commit.
3. Review the staged diff and create a concise conventional commit describing the completed outcome.
4. Push the current branch to its configured remote.
5. Report the commit and push result. If credentials, network access, a missing remote, or branch policy blocks the push, keep the verified commit and report the exact blocker.
