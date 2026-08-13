# Cascader

Cascader selects one or more paths from hierarchical data. Progressive panels keep deep structures compact, while filtering, staged confirmation, custom rendering, and dynamic loading support richer selection workflows.

## Progressive selection

Organize options with nested `children`. Selecting a leaf commits its complete value path.

:::react-demo react/components/Cascader/basic.tsx :::

## Multiple selection with confirmation

`multiple` returns an array of value paths. Add `needConfirm` when users should review a draft before committing it; `multipleLimit` caps the number of selected paths.

:::react-demo react/components/Cascader/multiple.tsx :::

## Filtering and custom rendering

`filterable` turns the trigger into a search field. Use `stringLabel` for searchable text when an option label is not plain text, and enrich the UI through `renderOption` and `renderValue`.

:::react-demo react/components/Cascader/filter.tsx :::

## Controlled dynamic loading

Mark an unloaded branch with `isLeaf: false`. `loadChildren` runs when that branch is expanded, and `onOptionsChange` reports the updated option tree. The application can control both `value` and `open`.

:::react-demo react/components/Cascader/dynamic.tsx :::

## Value and option models

A single selection is a value path such as `['asia', 'china', 'shanghai']`. Multiple selection is an array of paths such as `[['product', 'releases'], ['operations', 'incidents']]`. Use `null` or `undefined` when no value is selected.

Each `CascaderOption` requires `value` and `label`. It can also define `children`, `stringLabel`, `disabled`, `isLeaf`, `groupLabel`, and `selectable`, plus application-specific fields. `fieldMap` can map those semantic fields to different property names when adapting existing data.

## Props

### Selection and data

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `CascaderModelValue` | — | Controlled selected path or paths |
| `defaultValue` | `CascaderModelValue` | — | Initial uncontrolled selection |
| `options` | `readonly CascaderOption[]` | required | Hierarchical option tree |
| `multiple` | `boolean` | `false` | Enables multiple selection |
| `multipleLimit` | `number` | `Infinity` | Maximum selected paths in multiple mode |
| `checkStrictly` | `boolean` | `false` | Allows branch nodes to be selected independently from descendants |
| `expandStrictly` | `boolean` | `true` | Prevents a strictly selected branch from expanding automatically |
| `showCheckedStrategy` | `'fullPath' \| 'leaf'` | `'fullPath'` | Controls the text shown for a selected path |
| `pathSeparator` | `string` | `'/'` | Separator between displayed path labels |
| `needConfirm` | `boolean` | `false` | Keeps selections staged until confirmation |
| `fieldMap` | `CascaderFieldMap` | — | Maps semantic option fields to source-data keys |

### Interaction and search

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Controlled popup state |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled popup state |
| `trigger` | `'click' \| 'hover' \| 'never'` | `'click'` | Popup trigger mode |
| `expandTrigger` | `'click' \| 'hover'` | `'click'` | Branch expansion interaction |
| `disabled` | `boolean` | `false` | Disables all interaction |
| `clearable` | `boolean` | `false` | Shows the clear action for a non-empty value |
| `filterable` | `boolean` | `false` | Enables built-in text filtering |
| `filter` | `boolean \| CascaderSearchParams` | `false` | Enables filtering or supplies a filter, sort, and limit configuration |
| `filterMethod` | `CascaderFilterFunction` | — | Custom path-matching function |
| `filterMaxResult` | `number` | `50` | Maximum displayed search results |
| `filterResultSort` | `CascaderFilterSortFunction` | — | Sorts filtered normalized options |
| `reserveKeyword` | `boolean \| 'reserve-deselect'` | `true` | Keyword retention policy for filtered multiple selection |
| `loadChildren` | `(option) => CascaderOption[] \| PromiseLike<CascaderOption[]>` | — | Loads children for an expanded, unloaded branch |

### Trigger, popup, and content

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `string` | Provider value | Trigger placeholder |
| `inputStatus` | `'normal' \| 'error' \| 'warning' \| 'success'` | `'normal'` | Trigger validation state |
| `inputStyle` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | Trigger visual style |
| `inputProps` | `Omit<InputHTMLAttributes<HTMLInputElement>, 'value' \| 'onChange' \| 'onClick'>` | — | Native input attributes such as `name`, `aria-label`, and `data-*`; controlled value and internal handlers remain owned by Cascader |
| `size` | `'small' \| 'medium' \| 'large'` | Provider value | Trigger size |
| `placement` | `PopoverPlacement` | `'bottom-start'` | Preferred popup placement |
| `portal` | `boolean` | `true` | Renders the popup through a Portal |
| `portalContainer` | `PortalTarget` | `'body'` | Portal destination |
| `fitInputWidth` | `boolean \| 'fit-content'` | `'fit-content'` | Popup width policy |
| `arrow` | `boolean` | `false` | Shows the popup arrow |
| `distance` | `number` | `4` | Main-axis popup distance |
| `skidding` | `number` | — | Cross-axis popup offset |
| `hoverShowDelay` | `number` | `0` | Delay before a hover-triggered popup opens, in milliseconds |
| `hoverHideDelay` | `number` | `200` | Delay before a hover-triggered popup closes, in milliseconds |
| `renderTrigger` | `(context) => ReactNode` | Default input | Renders a complete custom trigger; spread `context.triggerProps` onto its focusable element |
| `renderOption` | `(context: CascaderRenderContext) => ReactNode` | Option label | Renders each option using normalized state |
| `renderValue` | `(options, labels) => ReactNode` | Joined labels | Renders the current selection in the trigger |
| `panelHeader` | `ReactNode` | — | Popup header content |
| `panelFooter` | `ReactNode` | — | Popup footer content |
| `emptyContent` | `ReactNode` | Provider value | Empty-state content |
| `confirmText` | `string` | Provider value | Confirmation action label |
| `cancelText` | `string` | Provider value | Cancellation action label |
| `confirmButtonProps` | `ButtonProps` | — | Confirmation button properties |
| `cancelButtonProps` | `ButtonProps` | — | Cancellation button properties |
| `panelClassName` | `string` | — | Popup class name |
| `panelStyle` | `CSSProperties` | — | Popup inline styles |
| `className` | `string` | — | Root class name |
| `style` | `CSSProperties` | — | Root inline styles |

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onValueChange` | `(value: CascaderModelValue) => void` | Runs when the committed selection changes |
| `onOpenChange` | `(open, details) => void` | Runs when popup state is requested to change; `details.reason` describes the interaction |
| `onChange` | `(selected, option, result) => void` | Runs after one option changes selection state |
| `onSelect` | `(path, option) => void` | Runs after an option is selected |
| `onDeselect` | `(path, option) => void` | Runs after an option is deselected |
| `onSearch` | `(value: string) => void` | Runs after search text changes |
| `onOptionsChange` | `(options: readonly CascaderOption[]) => void` | Reports the option tree after dynamic children load |
| `onLoadError` | `(error, option) => void` | Reports a rejected dynamic load |
| `onConfirm` | `(value, event?) => void` | Runs after staged selection is confirmed |
| `onCancel` | `(value, event?) => void` | Runs after staged selection is cancelled |
| `onClear` | `() => void` | Runs after clearing the selection |

## Ref

A `CascaderHandle` ref exposes:

| Member | Type | Description |
| --- | --- | --- |
| `input` | `HTMLInputElement \| null` | Current default trigger input |
| `popup` | `HTMLDivElement \| null` | Current popup element |
| `focus()` / `blur()` | `() => void` | Moves focus to or away from the trigger |
| `open()` / `close()` | `() => void` | Requests popup visibility changes |
| `clear()` | `() => void` | Clears the selection |
| `confirm()` / `cancel()` | `() => void` | Commits or discards staged selection |
| `focusOption(path)` | `(path: CascaderValuePath) => void` | Makes a known option the active keyboard item |
| `updatePosition()` | `() => Promise<void>` | Recalculates popup placement |

## Provider

`HorizonWebProvider` accepts `cascaderLabels` with `placeholder`, `empty`, and `level` fields. Confirmation labels come from `pickerLabels`, while the clear action uses `selectLabels.clear`. Component props such as `placeholder`, `emptyContent`, `confirmText`, and `cancelText` override provider defaults for one instance.

## Accessibility

The default trigger is a combobox associated with a hierarchical `tree`. Panels are labelled groups, and options expose level, selected or checked state, expanded state, and disabled state. `ArrowUp` and `ArrowDown` move between siblings, `ArrowRight` enters a branch, `ArrowLeft` returns to its parent, `Home` and `End` move within the current level, `Enter` activates an option, and `Escape` closes the popup and restores trigger focus. If `renderTrigger` is used, spread `triggerProps` onto exactly one focusable element so these relationships and keyboard interactions remain available.
