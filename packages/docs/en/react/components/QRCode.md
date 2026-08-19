# QRCode

QRCode renders configurable SVG codes with loading, center-icon, expired, and refresh states.

```tsx
import { QRCode } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## Basic usage

:::react-demo react/components/QRCode/basic.tsx :::

## Visual options

:::react-demo react/components/QRCode/custom.tsx :::

## Expired state

:::react-demo react/components/QRCode/expired.tsx :::

Use `ariaLabel` when the encoded value is sensitive or unsuitable for an accessible name. `onRefresh` reports the action; update `expired` in application state to reveal a new code.

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
| `expiredText` | `string` | provider text | Expired message |
| `ariaLabel` | `string` | provider text | Accessible name |
| `expiredContent` | `ReactNode` | — | Custom expired overlay |

## Callbacks

| Callback | Signature | Description |
| --- | --- | --- |
| `onRefresh` | `(event: MouseEvent<HTMLElement>) => void` | Refresh action requested |
| `onError` | `(error: unknown) => void` | SVG generation failed |

The forwarded ref points to the root `HTMLDivElement`.

`HorizonWebProvider.qrCodeLabels` customizes the accessible code name and default expired/refresh text.
