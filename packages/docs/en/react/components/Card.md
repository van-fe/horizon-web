# Card

Card contains a related group of content and actions with optional headers, footers, dividers, borders, and radii.

## Basic Usage

```tsx
import { Card } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Card/basic.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `''` | Default header title; takes precedence when present |
| `topDivider` | `boolean` | `false` | Shows a divider below the header |
| `bottomDivider` | `boolean` | `false` | Shows a divider above the footer |
| `radius` | `'small' \| 'medium' \| 'large' \| 'none'` | `'medium'` | Radius size |
| `border` | `boolean` | `true` | Shows the border |
| `header` | `ReactNode` | — | Custom header content |
| `footer` | `ReactNode` | — | Footer content |
| `children` | `ReactNode` | — | Card body content |

The component accepts applicable native `section` attributes and forwards its ref to the root `HTMLElement`.
