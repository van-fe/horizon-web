# AutoComplete

AutoComplete provides text suggestions while keeping free-form input available. It supports controlled state, asynchronous options, keyboard navigation, custom option content, and a portal popup.

## Basic usage

:::react-demo react/components/AutoComplete/basic.tsx :::

## Controlled state

Use `value` and `open` when the application owns both input and popup state.

:::react-demo react/components/AutoComplete/controlled.tsx :::

## Custom content

:::react-demo react/components/AutoComplete/custom.tsx :::

## Keyboard and accessibility

The input uses `role="combobox"` and owns a `role="listbox"`. Arrow keys move the active suggestion, `Enter` selects it, and `Escape` closes the popup. The active option is announced through `aria-activedescendant`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string \| null` | — | Controlled input value |
| `defaultValue` | `string` | `''` | Initial uncontrolled value |
| `open` | `boolean` | — | Controlled popup state |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled popup state |
| `options` | `AutoCompleteOptionData[]` | `[]` | Suggestions |
| `disabled` | `boolean` | `false` | Disables interaction |
| `clearable` | `boolean` | `false` | Shows a clear button |
| `trigger` | `'click' \| 'hover'` | `'click'` | Popup trigger mode |
| `inputEmitFrequency` | `number` | `200` | Value and search debounce in milliseconds |
| `selectedOptionOrderToTop` | `boolean` | `false` | Moves the selected suggestion to the top while open |
| `loading` | `boolean` | `false` | Shows the loading state |
| `emptyContent` | `ReactNode` | Provider dictionary | Empty-state content |
| `loadingContent` | `ReactNode` | Provider dictionary | Loading-state content |
| `panelHeader` | `ReactNode` | — | Popup header |
| `panelFooter` | `ReactNode` | — | Popup footer |
| `renderOption` | `(option, state) => ReactNode` | — | Custom suggestion content |
| `portal` | `boolean` | `true` | Renders the popup through a portal |
| `portalContainer` | `PortalTarget` | `'body'` | Portal destination |

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onValueChange` | `(value) => void` | Runs after the debounced value commit |
| `onSearch` | `(value) => void` | Runs after a searchable value commit |
| `onOpenChange` | `(open, details) => void` | Runs when popup state is requested to change |
| `onChange` | `(value, details) => void` | Runs when a suggestion changes the value |
| `onSelect` | `(value, details) => void` | Runs when a suggestion is selected |
| `onClear` | `() => void` | Runs after clearing |

## Ref

The ref exposes `input`, `focus()`, `blur()`, `open()`, `close()`, `clear()`, and `updatePosition()`.
