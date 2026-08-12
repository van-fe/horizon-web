## Basic Usage

:::demo vue/components/Mask/demo1.vue :::

## Absolute Positioning

Note: You need to set relative positioning for the parent element to expand the box.
:::demo vue/components/Mask/demo2.vue :::

## Opacity

Use `opacity` to adjust the mask transparency with a value between 0 and 1.
:::demo vue/components/Mask/demo3.vue :::

## Z-index

Set the stacking weight of the mask layer
:::demo vue/components/Mask/demo4.vue :::

## Gaussian Blur

Set specific blur level, transparency, and mask layer color 
:::demo vue/components/Mask/demo5.vue :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'default' \| 'weak' \| 'strong' \| 'inverse' \| 'transparent' \| 'customize'` | `'default'` | Scrim visual type |
| `value` | `boolean` | `true` | Shows the mask |
| `absolute` | `boolean` | `false` | Covers the nearest positioned container |
| `opacity` | `number \| string` | `1` | Scrim opacity |
| `color` | `string` | — | Custom scrim color |
| `zIndex` | `number` | `1` | Root stacking level |
| `scrimClass` | `string` | — | Class applied to the scrim |
| `scrimStyle` | `CSSProperties` | — | Style applied to the scrim |
| `isFuzzification` | `boolean` | `false` | Uses the translucent blur treatment |
| `contentFullSize` | `boolean` | `false` | Makes the content region fill the mask |

## Events

| Event | Description |
| --- | --- |
| `clickMask` | Emitted only when the scrim is pressed |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Content rendered above the scrim |
