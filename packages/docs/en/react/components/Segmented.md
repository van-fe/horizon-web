# Segmented

Segmented switches between a compact set of mutually exclusive views. Use explicit, unique item values and keep labels short enough for narrow layouts.

```tsx
import { Segmented, SegmentedItem } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Segmented/basic.tsx :::

## Segmented props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `string \| number` | — | Controlled value and initial uncontrolled value |
| `size` | `'mini' \| 'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | Control size |
| `scrollable` | `boolean` | `false` | Enables horizontal overflow scrolling |
| `focusable` | `boolean` | `false` | Scrolls the selected item into view |
| `arrow` | `boolean` | `false` | Shows overflow scroll controls when scrolling is enabled |
| `block` | `boolean` | `false` | Fills the parent width |
| `onChange` | `(value: string \| number) => void` | — | Selection callback |

The ref exposes `focus()`.

## SegmentedItem props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string \| number` | required | Unique item value |
| `label` | `string \| number` | — | Fallback item label |
| `disabled` | `boolean` | `false` | Disables the item |
| `icon` | `ReactNode` | — | Icon content |
| `children` | `ReactNode \| ({ selected, value }) => ReactNode` | — | Item content |
| `onClick` | `(value) => void` | — | Item click callback |
