## Fixed time options

Use `start`, `end`, and `step` to generate fixed-interval options. The example also compares sizes, input styles, and the disabled state.

:::demo components/TimeSelect/basic.vue :::

## Display format

`format` accepts a Day.js format string and only changes the displayed label; the bound value remains `HH:mm`. Use `include-end-time` to keep the final option available.

:::demo components/TimeSelect/format.vue :::

## Linked time range

Combine two selects and set `max-time` and `min-time` to disable start or end values outside the current range.

:::demo components/TimeSelect/range.vue :::
