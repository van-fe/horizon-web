# Divider

Divider separates adjacent content or sections and can carry a title with configurable strength and line style.

## Basic Usage

```tsx
import { Divider } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Divider/basic.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'default' \| 'strong' \| 'primary' \| 'secondary'` | `'default'` | Visual strength; `primary` and `secondary` are compatibility aliases |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Separator direction |
| `lineStyle` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Line style |
| `titlePlacement` | `'left' \| 'center' \| 'right'` | `'center'` | Title placement |
| `verticalMargin` | `string \| number` | Theme token | Horizontal margin around a vertical divider |
| `horizontalMargin` | `string \| number` | Theme token | Vertical margin around a horizontal divider |
| `children` | `ReactNode` | — | Title content |

The component renders native `separator` semantics, accepts applicable `div` attributes, and forwards its `ref` to the root `HTMLDivElement`.
