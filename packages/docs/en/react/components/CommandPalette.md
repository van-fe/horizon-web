# CommandPalette

CommandPalette provides a searchable, keyboard-first entry point for application actions. It supports controlled and uncontrolled visibility, Command/Ctrl + K, disabled commands, async execution, and custom rendering.

## Basic usage and ref

:::react-demo react/components/CommandPalette/basic.tsx :::

## Async commands

`perform` may return a promise. Repeated activation is ignored while that command is pending; rejection calls `onError` without closing the palette.

:::react-demo react/components/CommandPalette/async.tsx :::

## Filtering and rendering

:::react-demo react/components/CommandPalette/custom.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` / `defaultOpen` | `boolean` | — / `false` | Controlled visibility or initial uncontrolled visibility. |
| `commands` | `readonly CommandPaletteCommand[]` | `[]` | Available commands. |
| `placeholder` | `string` | provider text | Search placeholder. |
| `emptyText` | `string` | provider text | Empty-result text. |
| `hotkey` | `boolean` | `true` | Enables Command/Ctrl + K. |
| `closeOnSelect` | `boolean` | `true` | Requests closing after successful execution. |
| `filter` | `(query, command) => boolean` | label/keyword match | Custom command filter. |
| `renderCommand` | `(command, context) => ReactNode` | — | Custom command item; context contains `active` and `pending`. |
| `renderEmpty` | `ReactNode \| (() => ReactNode)` | — | Custom empty state. |

Native `div` attributes are accepted by the palette content root.

## Callbacks

| Callback | Signature | Description |
| --- | --- | --- |
| `onOpenChange` | `(open, reason) => void` | Reports `hotkey`, `escape`, `outside-pointer`, `select`, or `imperative`. |
| `onSelect` | `(command) => void` | Runs after successful execution. |
| `onSearch` | `(query) => void` | Runs when the query changes. |
| `onError` | `(error, command) => void` | Runs when execution rejects. |

## Ref and provider

`CommandPaletteHandle` exposes `open()`, `close()`, `focus()`, and the current `input` element. `HorizonWebProvider.commandPaletteLabels` customizes the dialog name, placeholder, and empty-result text.
