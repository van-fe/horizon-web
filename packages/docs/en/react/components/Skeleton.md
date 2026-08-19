# Skeleton

Skeleton presents structural placeholders while content loads, then replaces them with loaded content.

## Basic Usage

```tsx
import { Skeleton, SkeletonItem } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Skeleton/basic.tsx :::

The root communicates loading through `aria-busy`; placeholder items are decorative.

## Skeleton Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `loading` | `boolean` | `true` | Shows placeholder content |
| `animated` | `boolean` | `true` | Enables the loading animation |
| `placeholder` | `ReactNode` | three text rows | Custom placeholder content |
| `children` | `ReactNode` | — | Loaded content |

## SkeletonItem Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `shape` | `'avatar' \| 'text' \| 'operate' \| 'image' \| 'picture'` | `'text'` | Placeholder shape |

Both components accept applicable native `div` attributes and forward refs to their root `HTMLDivElement`.
