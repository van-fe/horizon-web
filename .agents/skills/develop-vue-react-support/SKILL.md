---
name: develop-vue-react-support
description: Continue the Aurora Core/Horizon/Skyline Vue and React architecture migration only on feature/vue-react-support, including package migration, capability extraction, headless hooks, native renderers, shared Theme, isolated docs, Demo parity, tests, and integration fixes.
---

# Develop Vue and React Support

This is a temporary integration-branch Skill. Use it only while the active branch is exactly `feature/vue-react-support`.

## Branch gate

1. Run `git branch --show-current` before task actions.
2. Continue only if it returns `feature/vue-react-support`.
3. On another branch, do not apply this Skill and do not move, stash or overwrite unrelated work to force the branch change.
4. Retire this Skill when the integration branch is merged or decommissioned.

## Load the shared component Skill

Read [`../develop-horizon-components/SKILL.md`](../develop-horizon-components/SKILL.md) completely, then read the normative [`../../../COMPONENT_DECOUPLING_EXECUTION_GUIDE.md`](../../../COMPONENT_DECOUPLING_EXECUTION_GUIDE.md) completely before implementation.

All architecture, Headless Hook, renderer, Theme, documentation, Demo, test, coverage, package-breaking and Definition of Done rules in those sources apply.

## Integration-branch invariants

- Use `feature/vue-react-support` as the only integration line for this migration.
- Preserve completed package foundations and already integrated component fixes.
- Keep dependency direction `renderer -> product Core -> @aurora/core`.
- Enforce each migrated component's Core contract/schema and derived manifest as the active source for renderer runtime APIs and generated metadata. Type-only reuse followed by hand-written duplicate renderer declarations is not an acceptable split.
- Treat package renames as breaking migrations. Do not restore compatibility packages, aliases, re-exports, resolver fallbacks, publish entries or docs for `@aurora/horizon-web*` component packages.
- Introduce Skyline packages/directories only when real mobile capabilities exist.
- Keep React and Vue docs, demos, sidebars, compilation and API analysis isolated.
- Require React runnable Demo count and user-scenario coverage to meet or exceed Vue for every migrated component.
- Do not mark a renderer package migration complete until the shared component Skill's renderer file-structure gate passes; separate packages containing monolithic entry implementations are still incomplete.
- Inspect branch history and changed paths before integrating another branch; do not absorb unrelated work.
- Stage only the task, preserve `.codex/config.toml`, commit, run the relevant pre-push gates and push this branch.
