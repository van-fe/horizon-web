# Statistic

Statistic displays a key value, unit, and business trend.

```tsx
import { Statistic } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Statistic/basic.tsx :::

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Title |
| `value` | `number \| string` | `0` | Statistic value |
| `precision` | `number` | — | 0 through 20 decimal places |
| `useGrouping` | `boolean` | `true` | Digit grouping |
| `locale` | `string` | `'en'` | `Intl.NumberFormat` locale |
| `prefix` / `suffix` | `string` | — | Affixes |
| `formatter` | `(value) => number \| string` | — | Custom formatter |
| `trend` | `'up' \| 'down' \| 'none'` | `'none'` | Trend direction |
| `trendType` | `'success' \| 'danger' \| 'neutral'` | `'neutral'` | Trend semantics |
| `trendValue` | `number \| string` | — | Trend value |
| `loading` | `boolean` | `false` | Loading state |
| `children` and `*Content` | `ReactNode` | — | Custom value, title, affixes, and trend |
