## Fixed time options

Use `start`, `end`, and `step` to generate time options at fixed intervals. The binding value always uses the `HH:mm` format.

:::demo components/TimeSelect/basic.vue :::

## Display format

Set `format` with a Day.js format string. It only changes the displayed label. Use `include-end-time` to ensure the end time is also available.

:::demo components/TimeSelect/format.vue :::

## Linked time range

Combine two time selects and set `max-time` and `min-time` to disable options outside the selected range.

:::demo components/TimeSelect/range.vue :::
