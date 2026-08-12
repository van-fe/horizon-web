# AutoComplete

AutoComplete provides suggestions for typed text while keeping free-form input available.

## Basic usage

:::demo vue/components/AutoComplete/basic.vue :::

## Option descriptions

Add `description` to an option, then use `description-position` to choose a compact right-aligned layout or a more detailed stacked layout.

:::demo vue/components/AutoComplete/description.vue :::

## Remote loading

Set `loading` while a request is active and use `loading-text` when the state needs explanation. The demo runs two independent short requests, cancels stale work for each field, and clears timers on unmount.

:::demo vue/components/AutoComplete/loading.vue :::

## Custom panel

Use `panelHeaderRender` and `panelFooterRender` to add context and keyboard guidance around the suggestions. The selected teammate is summarized below without crowding the input.

:::demo vue/components/AutoComplete/custom-render.vue :::

## Label and value

`label` is displayed to the user. When `value` is present, the selected `value` is written to the model. The demo shows the actual `modelValue` below the field.

:::demo vue/components/AutoComplete/value-label.vue :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `string \| null` | — | Current input value |
| `options` | `HAutoCompleteOption[]` | `[]` | Suggestions |
| `disabled` | `boolean` | `false` | Disables interaction |
| `clearable` | `boolean` | `false` | Shows a clear button |
| `trigger` | `'click' \| 'hover'` | `'click'` | Popup trigger mode |
| `inputEmitFrequency` | `number` | `200` | Input and search debounce in milliseconds |
| `selectedOptionOrderToTop` | `boolean` | `false` | Moves the selected suggestion to the top while open |
| `loading` | `boolean` | `false` | Shows the loading state |
| `descriptionPosition` | `'right' \| 'bottom'` | `'right'` | Suggestion description layout |
| `toBody` | `boolean` | `true` | Renders the popup under `body` |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `value` | Input value changed |
| `dropdownVisibleChange` | `visible` | Popup visibility changed |
| `search` | `value` | Debounced searchable value changed |
| `change` | `value` | A suggestion changed the value |
| `select` | `value` | A suggestion was selected |
| `clear` | — | The input was cleared |
| `optionListReachBottom` | `Event` | Navigation or scrolling reached the list end |

## Slots and exposes

Slots: `empty`, `loading`, `panelHeaderRender`, `panelFooterRender`, `option`, `prefix`, `suffix`, `picker`, `pickerInner`, and `pickerContainer`.

The component exposes `focus()`, `blur()`, `open()`, `close()`, `clear()`, and `changePanelVisible(visible)`.
