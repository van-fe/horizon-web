## Countdown

Pass a duration in seconds to start a countdown, and handle `finished` to update the surrounding workflow when it ends.

:::demo vue/components/Time/demo1.vue :::

## Timing modes

Use `forward` for elapsed time, `end-time` for an absolute deadline, and `calculative` for a static difference between two timestamps.

:::demo vue/components/Time/props.vue :::

## Custom content

The default slot exposes `dd`, `hh`, `mm`, and `ss`, which can be composed into a numeric display or a more readable duration sentence.

:::demo vue/components/Time/slot.vue :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `time` | `Date \| number \| string` | `10` | Duration or start time |
| `end-time` | `Date \| number \| string` | `0` | Absolute end time |
| `forward` | `boolean` | `false` | Counts upwards from zero |
| `calculative` | `boolean` | `false` | Shows the static difference between two values |

## Events

| Event | Description |
| --- | --- |
| `finished` | Emitted when a countdown reaches zero |

## Slots

| Slot | Scope | Description |
| --- | --- | --- |
| `default` | `{ dd?, hh?, mm?, ss }` | Custom time content |
