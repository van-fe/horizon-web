## Basic usage

Provide suggestions through `options` and filter them in the `search` handler. Supply initial options before input if suggestions should appear on focus. The demo also compares `size` and `input-style`.

:::demo components/AutoComplete/basic.vue :::

## Option descriptions

Add `description` to an option, then use `description-position` to choose a compact right-aligned layout or a more detailed stacked layout.

:::demo components/AutoComplete/description.vue :::

## Remote loading

Set `loading` while a request is active and use `loading-text` when the state needs explanation. The demo runs two independent short requests, cancels stale work for each field, and clears timers on unmount.

:::demo components/AutoComplete/loading.vue :::

## Custom panel

Use `panelHeaderRender` and `panelFooterRender` to add context and keyboard guidance around the suggestions. The selected teammate is summarized below without crowding the input.

:::demo components/AutoComplete/custom-render.vue :::

## Label and value

`label` is displayed to the user. When `value` is present, the selected `value` is written to the model. The demo shows the actual `modelValue` below the field.

:::demo components/AutoComplete/value-label.vue :::
