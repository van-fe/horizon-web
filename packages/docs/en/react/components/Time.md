# Time

Time displays countdowns, elapsed time, and static durations.

## Countdown

Pass seconds through `time`. `onFinished` runs when the countdown reaches zero.

:::react-demo react/components/Time/basic.tsx :::

## Timing Modes

`forward` counts upwards from zero, while `calculative` displays the static difference between two time values.

:::react-demo react/components/Time/modes.tsx :::

## Custom Content

Function children receive `dd`, `hh`, `mm`, and `ss` for natural-language or dashboard presentations.

:::react-demo react/components/Time/custom.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `time` | `Date \| number \| string` | `10` | Seconds, a seconds timestamp, or a milliseconds timestamp |
| `endTime` | `Date \| number \| string` | `0` | Absolute end time |
| `forward` | `boolean` | `false` | Counts upwards from zero |
| `calculative` | `boolean` | `false` | Shows the static difference between two values |
| `children` | `ReactNode \| ((parts: TimeParts) => ReactNode)` | — | Custom display content |
| `onFinished` | `() => void` | — | Runs when a countdown reaches zero |

The forwarded ref points to the root `HTMLDivElement`.
