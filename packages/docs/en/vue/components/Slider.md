## Basic usage


:::demo vue/components/Slider/index.vue :::

## Sizes

Set `size` to `small`, `medium`, or `large`.

:::demo vue/components/Slider/size.vue :::

## Disabled state

`disabled` preserves the current value and visual context while preventing pointer and keyboard changes.

:::demo vue/components/Slider/disable.vue :::

## Semantic types

`type` supports the `primary`, `info`, `success`, `warning`, and `danger` semantic colors.

:::demo vue/components/Slider/types.vue :::

## Custom color

`color` accepts a custom color. Prefer Horizon semantic tokens so the result adapts to light and dark themes.

:::demo vue/components/Slider/color.vue :::

## Range selection

With `range`, the model is a two-value array containing the start and end positions.

:::demo vue/components/Slider/range.vue :::

## Steps and separators

`step` supports integer and decimal increments. Use `show-separator` to visualize discrete values when the step is greater than one.

:::demo vue/components/Slider/step.vue :::

## Custom tooltip

Use `tooltip-formatter` to add a business unit, then control visibility and placement with `tooltip-enable` and `tooltip-placement`.

:::demo vue/components/Slider/custom-tooltip.vue :::

## Number input

Enable `input-enable` to synchronize the slider with `HInputNumber`. The input is not shown in range mode.

:::demo vue/components/Slider/with-input.vue :::
