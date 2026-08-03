## Basic Usage

Use `start-value`, `end-value`, `step`, and `delay` to control the count. `change` fires whenever the displayed value changes, allowing surrounding progress and status to stay synchronized.

:::demo components/Count/demo1.vue :::

## Number Formatting

`separator` and `extent` control grouping, `decimal` sets precision, and `prefix` or `suffix` adds units. Use the corresponding slots for richer content.

Set `auto-play="false"` to render the formatted end value immediately, which is useful for static metric cards.

:::demo components/Count/prop.vue :::
