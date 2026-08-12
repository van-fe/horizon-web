## Basic usage
Use Spin for short asynchronous operations with optional sizing and tip text.
:::demo vue/components/Spin/basic.vue :::

## Nested content and delay
Nested content receives a regional mask. Use `delay` to avoid flicker for very short requests.
:::demo vue/components/Spin/nested.vue :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `spinning` | `boolean` | `true` | Whether loading is active |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Indicator size |
| `delay` | `number` | `0` | Delay before showing, in milliseconds |
| `tip` | `string` | — | Loading text |
| `mask` | `boolean` | `true` | Shows a translucent mask over nested content |
| `fullscreen` | `boolean` | `false` | Covers the viewport |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Content covered by the regional state |
| `indicator` | Custom loading indicator |
| `tip` | Custom visible tip content |
