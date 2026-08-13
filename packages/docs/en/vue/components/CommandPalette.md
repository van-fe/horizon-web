# CommandPalette

CommandPalette provides a keyboard-first entry point for global actions. Open it from a trigger or with Command/Ctrl + K, type to filter, move through enabled commands with the arrow keys, and press Enter to execute.

:::demo vue/components/CommandPalette/basic.vue :::

Async `perform` handlers are deduplicated while pending. A rejected handler emits `error` and keeps the palette open so the user can retry. The search input owns the listbox relationship through `aria-controls` and `aria-activedescendant`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | Visible state used by `v-model:visible`. |
| `commands` | `CommandPaletteItem[]` | `[]` | Commands with `id`, `label`, optional description, keywords, shortcut, disabled state, and `perform`. |
| `placeholder` | `string` | locale text | Search placeholder. |
| `emptyText` | `string` | locale text | Empty-result text. |
| `hotkey` | `boolean` | `true` | Enables Command/Ctrl + K. |
| `closeOnSelect` | `boolean` | `true` | Requests closing after successful execution. |
| `filter` | `(query, command) => boolean` | label/keyword match | Custom command filter. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:visible` | `boolean` | Requests a visible-state update. |
| `select` | `CommandPaletteItem` | Emitted after successful execution. |
| `search` | `string` | Emitted when the query changes. |
| `error` | `error, command` | Emitted when execution rejects. |

## Slots

| Slot | Scope | Description |
| --- | --- | --- |
| `command` | `{ command, active, pending }` | Custom command item. |
| `empty` | — | Custom empty state. |

## Exposes

| Method | Description |
| --- | --- |
| `open()` | Requests opening. |
| `close()` | Requests closing. |
| `focus()` | Focuses the search input. |
