# QRCode

QRCode renders configurable SVG codes and provides loading, center-icon, expired, and refresh states.

## Basic usage

:::demo vue/components/QRCode/basic.vue :::

Use `aria-label` when the encoded value is sensitive or unsuitable as an accessible name. The `refresh` event only reports the action; update `expired` in application state to show a new code.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Encoded content |
| `size` | `number` | `160` | Side length in pixels |
| `level` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` | Error-correction level |
| `color` | `string` | `'#000000'` | Foreground color |
| `background` | `string` | `'#ffffff'` | Background color |
| `margin` | `number` | `1` | Quiet-zone modules |
| `icon` | `string` | — | Center-icon URL |
| `iconSize` | `number` | `32` | Center-icon size |
| `expired` | `boolean` | `false` | Shows the expired overlay |
| `expiredText` | `string` | locale text | Expired message |
| `ariaLabel` | `string` | encoded value | Accessible name |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `refresh` | `MouseEvent` | Refresh action requested |
| `error` | `unknown` | SVG generation failed |

## Slots

| Slot | Description |
| --- | --- |
| `expired` | Custom expired overlay |
