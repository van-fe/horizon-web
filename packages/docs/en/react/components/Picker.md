# Picker

Picker is the composable foundation for selection controls. It coordinates a trigger, popup state, value display, loading and empty states, confirmation actions, Portal positioning, and imperative commands while leaving domain-specific choices to its content.

## Basic composition

:::react-demo react/components/Picker/basic.tsx :::

## Controlled confirmation

Use controlled `value` and `open` when an application needs a draft value that is committed only after confirmation.

:::react-demo react/components/Picker/controlled.tsx :::

## Custom trigger and states

:::react-demo react/components/Picker/custom.tsx :::

## Keyboard and accessibility

The default trigger uses `role="combobox"`, reports `aria-expanded`, owns the popup with `aria-controls`, and closes with `Escape`. `ArrowDown` or `Enter` opens a closed popup. A custom trigger receives `triggerProps`; spread them onto one focusable element so the same semantics and commands remain available.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Value` | — | Controlled display value |
| `defaultValue` | `Value` | — | Initial uncontrolled value |
| `open` | `boolean` | — | Controlled popup state |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled popup state |
| `disabled` | `boolean` | `false` | Disables interaction |
| `inputable` | `boolean` | `false` | Allows editing in the default trigger |
| `readonly` | `boolean` | `false` | Prevents editing and opening |
| `clearable` | `boolean` | `false` | Shows a clear action when the value has text |
| `trigger` | `'click' \| 'hover' \| 'never'` | `'click'` | Popup trigger mode |
| `placement` | `PopoverPlacement` | `'bottom-start'` | Preferred popup placement |
| `portal` | `boolean` | `true` | Renders the popup through a Portal |
| `portalContainer` | `PortalTarget` | `'body'` | Portal destination |
| `fitInputWidth` | `boolean \| 'fit-content'` | `true` | Popup width policy |
| `inputStyle` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | Trigger visual variant |
| `inputStatus` | `'normal' \| 'error' \| 'warning' \| 'success'` | `'normal'` | Validation state |
| `panelStatus` | `'normal' \| 'loading' \| 'empty'` | `'normal'` | Popup content state |
| `needConfirm` | `boolean` | `false` | Shows confirmation actions |
| `confirmButtonProps` | `ButtonProps` | — | Properties for the confirm button |
| `cancelButtonProps` | `ButtonProps` | — | Properties for the cancel button |
| `formatValue` | `(value) => ReactNode` | Text conversion | Formats the trigger value |
| `parseInput` | `(text) => Value` | Identity string | Parses editable input |
| `renderTrigger` | `(context) => ReactNode` | Default input | Renders a complete trigger |
| `children` | `ReactNode \| (context) => ReactNode` | — | Popup content |
| `panelHeader` | `ReactNode` | — | Popup header |
| `panelFooter` | `ReactNode` | — | Popup footer |

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onValueChange` | `(value) => void` | Runs when the display value changes |
| `onOpenChange` | `(open, details) => void` | Runs when popup state is requested to change |
| `onConfirm` | `(event?) => void` | Runs before a confirmation closes the popup |
| `onCancel` | `(event?) => void` | Runs before cancellation closes the popup |
| `onClear` | `(event?) => void` | Runs after clearing |
| `onInput` | `(event) => void` | Runs after editable input changes |
| `onFocus` / `onBlur` | `(event) => void` | Runs for default-trigger focus changes |
| `onKeyDown` / `onClick` | `(event) => void` | Runs for default-trigger interaction |

## Ref

The ref exposes `input`, `popup`, `focus()`, `blur()`, `open()`, `close()`, `clear()`, and `updatePosition()`.

## Provider

`HorizonWebProvider.pickerLabels` configures the default confirm and cancel labels. Empty and clear labels use `selectLabels`, and loading content uses `spinLabels`.
