# Timeline

Timeline presents milestones, state changes, or activity records in a clear chronological flow.

```tsx
import { Timeline, TimelineItem } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

## Milestones

Compose `TimelineItem` children with timestamps, names, descriptions, node sizes, and tail presentation. The root uses ordered-list semantics and accepts an accessible label for the complete flow.

:::react-demo react/components/Timeline/basic.tsx :::

## Ordering and endpoints

Use `order` or `reverse` when records should be sorted chronologically. An empty `sort` value preserves source order. `first` and `last` override node presentation after sorting.

:::react-demo react/components/Timeline/ordering.tsx :::

## Folding activity

`foldConfig.number` controls how many following records are hidden. The node becomes a native button with `aria-expanded`; provide `foldConfig.label` when its content is not a descriptive string.

:::react-demo react/components/Timeline/folding.tsx :::

## Timestamp formatting

`format` accepts Day.js-compatible tokens. Set `locale` on `Timeline` to choose the formatting locale shared by its items.

## Timeline props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Composed `TimelineItem` records |
| `sort` | `'' \| 'order' \| 'reverse'` | `''` | Chronological ordering strategy |
| `first` | `TimelineDotProps` | — | First node presentation override |
| `last` | `TimelineDotProps` | — | Final node presentation override |
| `locale` | `string` | `'en'` | Day.js formatting locale |

The component accepts native `ol` attributes. Its forwarded ref points to the rendered `HTMLOListElement`.

## TimelineItem props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `timestamp` | `string \| number \| Date` | `''` | Displayed timestamp and sort value |
| `format` | `string` | `'YYYY-MM-DD'` | Day.js-compatible format |
| `placement` | `'top' \| 'bottom' \| 'right'` | `'bottom'` | Timestamp placement |
| `offset` | `string \| number` | `4` | Tail spacing; numbers use pixels |
| `type` | `'disc' \| 'circle'` | `'disc'` | Node shape |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Node size |
| `color` | `string` | — | Node foreground or fill color |
| `borderColor` | `string` | — | Node border color |
| `tailColor` | `string` | — | Connecting tail color |
| `icon` | `ReactNode` | — | Node icon content |
| `name` | `ReactNode` | — | Record name |
| `description` | `ReactNode` | — | Record description |
| `children` | `ReactNode` | — | Description content with higher precedence |
| `dashed` | `boolean` | `false` | Uses a dashed connecting tail |
| `tail` | `boolean` | `true` | Renders the connecting tail |
| `foldConfig` | `TimelineFoldConfig` | — | Controls folding of following records |
| `dot` | `ReactNode` | — | Custom expanded node content |
| `hiddenDot` | `ReactNode` | — | Custom folded node content |

`TimelineItem` accepts native `li` attributes. Its forwarded ref points to the rendered `HTMLLIElement`.

`TimelineFoldConfig` contains `number`, `content`, optional `label`, and optional folded `dot` presentation.
