# Picker

Picker provides the shared trigger and popup foundation used by selection controls. It can also compose custom selection experiences with editable values, loading and empty states, confirmation actions, and Portal positioning.

## Basic usage

:::demo vue/components/Picker/basic.vue :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `string \| null` | — | Display value |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Shows loading state |
| `clearable` | `boolean` | `false` | Shows a clear action |
| `trigger` | `'click' \| 'hover' \| 'never'` | `'click'` | Popup trigger mode |
| `placement` | `PopoverPlacement` | `'bottom-start'` | Preferred popup placement |
| `toBody` | `boolean` | `true` | Teleports the popup to `body` |
| `inputable` | `boolean` | `false` | Allows text input |
| `readonly` | `boolean` | `false` | Prevents editing and opening |
| `inputStyle` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | Trigger visual variant |
| `inputStatus` | `'normal' \| 'error' \| 'warning' \| 'success'` | `'normal'` | Input validation state |
| `panelStatus` | `'normal' \| 'loading' \| 'empty'` | `'normal'` | Popup content state |
| `fitInputWidth` | `boolean \| 'fit-content'` | `true` | Popup width policy |
| `needConfirm` | `boolean` | `false` | Shows the confirmation area |
| `destroyOnHide` | `boolean` | `false` | Destroys popup content after hiding |
| `popoverOptions` | `Partial<PopoverProps>` | — | Additional Popover configuration |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `value` | Editable value changed |
| `show` / `hide` | — | Popup visibility changed |
| `focus` / `blur` | — | Picker focus state changed |
| `input` | `Event` | Text input changed |
| `click` | `MouseEvent` | Trigger clicked |
| `confirm` / `cancel` | `MouseEvent?` | Confirmation action used |
| `clear` | `MouseEvent` | Clear action used |
| `keydown` | `KeyboardEvent` | Keyboard interaction |
| `inputFocus` / `inputBlur` | `FocusEvent` | Inner input focus changed |

## Slots

`default` renders popup content. Trigger regions include `pickerOuter`, `picker`, `pickerContainer`, `pickerInner`, `pickerPrefix`, `pickerSuffix`, and `pickerIcon`. Popup regions include `panelOuter`, `panel`, `panelPrefix`, `panelSuffix`, `panelEmpty`, `panelLoading`, `panelConfirm`, `panelConfirmLeft`, `panelLeftSide`, and `panelRightSide`.

## Exposes

The component exposes `showPopover()`, `hidePopover()`, `focus()`, `blur()`, `forceBlur()`, `wrapperDom()`, `popoverDom()`, `handleInputFocus(event)`, and `handleInputBlur(event)`.
