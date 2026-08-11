---
name: track-microfrontend-support
description: Track and execute the Horizon Web microfrontend-support roadmap. Use whenever implementing, reviewing, testing, or documenting microfrontend isolation, app-scoped configuration, overlays, themes, lifecycle cleanup, dependency sharing, or related tasks recorded in MICROFRONTEND_SUPPORT_TODO.md.
---

# Track Microfrontend Support

Use `MICROFRONTEND_SUPPORT_TODO.md` in the repository root as the authoritative task list.

## Workflow

1. Verify work is on `codex/microfrontend-support`, unless the user explicitly chooses another branch.
2. Read the complete checklist before changing code and select the smallest coherent unfinished item.
3. Load other applicable project skills before editing their areas. In particular, use `develop-horizon-components` for component behavior, demos, docs, or browser tests.
4. Implement the item without absorbing unrelated working-tree changes.
5. Run the item's relevant focused validation. A code edit without successful proportionate validation is not complete.
6. Immediately change that item's checkbox from `[ ]` to `[x]` in the same work cycle.
7. Report the completed checkbox and any validation limitations in the handoff.

## Checklist Rules

- Never mark an item complete before implementation and validation finish.
- Keep partially completed or blocked items unchecked; add a short indented note explaining the remaining work when useful.
- Do not silently delete, merge, or weaken acceptance criteria. Update the checklist explicitly when scope changes.
- Mark only the smallest independently verified item. Do not mark an entire section because one child item passed.
- Preserve already checked bootstrap items and user-authored notes.
- Treat the final full-suite item as complete only after every required repository check passes or the user explicitly revises its acceptance criteria.

## Handoff Check

Before handing off, inspect both the diff and the checklist. Confirm every newly checked item is supported by code, tests, or another concrete artifact in the same branch.
