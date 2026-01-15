## Basic Usage
Use `modelValue` to set the bound value
:::demo components/Radio/basic.vue :::

## Enable Border
Use `border = true` to enable border style, border mode supports `props.size`
:::demo components/Radio/border.vue :::

## Button Style
Just replace the `n-radio` element with the `n-radio-button` element, and provide the `size` attribute to control the size
:::demo components/Radio/button.vue :::

## Radio Group
Combine `n-radio-group` with `n-radio` or `n-radio-button` to implement radio groups for multiple mutually exclusive options
:::demo components/Radio/group.vue :::

## Disabled State
Set `disabled = true` to enable disabled state
:::demo components/Radio/disabled.vue :::

## 2.0.0 Version Changes
Since `2.0.0`, `small` is no longer part of the specification:

① The original `size='small'` will automatically be treated as `size='medium'`

② The original `small` size is consistent with the current `medium` size

③ The original `medium` size is consistent with the current `large` size

④ The original `large` size has been removed
