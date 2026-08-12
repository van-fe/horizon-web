## Basic Usage
:::demo vue/components/Hover/hover.vue :::

## Disabled
:::demo vue/components/Hover/disabled.vue :::

## Delayed Appearance and Delayed Hide
You can set the value of hoverShowDelay to adjust the delay time for the element to appear after the mouse enters the container
You can set the value of hoverHideDelay to adjust the delay time for the element to hide after the mouse leaves the container
:::demo vue/components/Hover/delay.vue :::

## API summary

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Disables mouse-driven state changes |
| `hoverShowDelay` | `number` | `0` | Show delay after entry, in milliseconds |
| `hoverHideDelay` | `number` | `0` | Hide delay after leave, in milliseconds |

### Events

`mouseEnter`, `mouseMove`, and `mouseLeave` provide native mouse events. `visibleChange` provides the boolean hover state after an actual change.

### Slot and exposes

The default slot receives `{ hover: boolean }`. The component instance exposes `show()` and `hide()`.
