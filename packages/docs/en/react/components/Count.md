# Count

Count displays a static or incrementing number with decimal and custom grouping support.

```tsx
import { Count } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Count/basic.tsx :::

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `startValue` / `endValue` | `number` | `0` / required | Start and end values |
| `decimal` | `number` | `0` | Decimal places |
| `step` | `number` | `0` | Base-10 step exponent |
| `autoPlay` | `boolean` | `true` | Increments automatically; reduced motion shows the final value |
| `delay` | `number` | `300` | Increment delay, at least 4ms |
| `separator` / `extent` | `string` / `number` | `','` / `3` | Separator and group length |
| `prefix` / `suffix` | `string` | — | Affixes |
| `prefixContent` / `suffixContent` | `ReactNode` | — | Custom affixes |
| `onChange` | `(value: number) => void` | — | Current-value callback |
