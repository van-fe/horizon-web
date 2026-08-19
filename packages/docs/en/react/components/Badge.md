# Badge

Badge supplements a target with a compact status, count, or icon. It should not replace the target's readable label.

## Basic Usage

```tsx
import { Badge } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Badge/basic.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'dot' \| 'num' \| 'icon'` | `'dot'` | Badge treatment |
| `content` | `string \| number` | `''` | Count or fallback icon content |
| `hidden` | `boolean` | `false` | Hides the badge content |
| `numMax` | `number` | `Infinity` | Maximum count before a plus sign is shown |
| `bottom` | `boolean` | `false` | Positions the badge at the lower-right corner |
| `align` | `'center-point' \| 'inner' \| 'outer' \| 'fix-left'` | `'center-point'` | Alignment relative to the target |
| `offset` | `{ left?; right?; top?; bottom? }` | `null` | Custom position offsets |
| `color` | `string` | Error background token | Badge background color |
| `iconColor` | `string` | — | Icon color |
| `iconSize` | `number \| string` | `16` | Icon font size |
| `badgeLabel` | `string` | — | Accessible badge label |
| `icon` | `ReactNode` | — | Icon content |
| `children` | `ReactNode` | — | Target content |

The component accepts applicable native `div` attributes. Its `ref` resolves to the root `HTMLDivElement`.
