## Countdown

Pass a duration in seconds to start a countdown, and handle `finished` to update the surrounding workflow when it ends.

:::demo vue/components/Time/demo1.vue :::

## Timing modes

Use `forward` for elapsed time, `end-time` for an absolute deadline, and `calculative` for a static difference between two timestamps.

:::demo vue/components/Time/props.vue :::

## Custom content

The default slot exposes `dd`, `hh`, `mm`, and `ss`, which can be composed into a numeric display or a more readable duration sentence.

:::demo vue/components/Time/slot.vue :::
