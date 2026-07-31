## Basic Usage
Use `modelValue` to set the bound value
:::demo components/Checkbox/basic.vue :::

## Enable Border
Use `border = true` to enable border style, border mode supports `props.size`
:::demo components/Checkbox/border.vue :::

## Button Style
Just replace the `h-checkbox` element with the `h-checkbox-button` element, and provide the `size` attribute to control the size
:::demo components/Checkbox/button.vue :::

## Indeterminate Mode
Set `props.indeterminate` to enable indeterminate mode
:::demo components/Checkbox/indeterminate.vue :::

## Checkbox Group
Combine `h-checkbox-group` with `h-checkbox` or `h-checkbox-button` to implement checkbox groups
:::demo components/Checkbox/group.vue :::

## Disabled State
Set `disabled = true` to enable disabled state
:::demo components/Checkbox/disabled.vue :::

## One-Click Inverse Selection
Use the exposed `toggle()` method to implement one-click inverse selection
:::demo components/Checkbox/inverse.vue :::

## v2 Version Changes
Since `2.0.0`, `small` is no longer part of the specification:

① The original `size='small'` will automatically be treated as `size='medium'`

② The original `small` size is consistent with the current `medium` size

③ The original `medium` size is consistent with the current `large` size

④ The original `large` size has been removed
