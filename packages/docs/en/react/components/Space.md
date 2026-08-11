# Space

Space arranges a group of content with consistent gaps and supports horizontal, vertical, wrapping, and separated layouts.

## Basic Usage

```tsx
import { Space, SpaceItem } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Space/basic.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'small' \| 'medium' \| 'large' \| number \| string \| [number \| string, number \| string]` | `'medium'` | Preset or custom gap |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `align` | `'start' \| 'end' \| 'center' \| 'baseline'` | `'center'` when horizontal | Cross-axis alignment |
| `wrap` | `boolean` | `false` | Allows a horizontal layout to wrap |
| `block` | `boolean` | `false` | Uses block-level width |
| `separator` | `boolean \| ReactNode` | `false` | Uses the default divider or custom separator content |
| `children` | `ReactNode` | — | Arranged content |

Use `SpaceItem` to attach native `div` attributes to one item. Both components forward their refs to the corresponding `HTMLDivElement`.
