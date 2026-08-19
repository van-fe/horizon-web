# Statistic 统计数值

Statistic 展示关键数值、单位和业务趋势。

```tsx
import { Statistic } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Statistic/basic.tsx :::

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | — | 标题 |
| `value` | `number \| string` | `0` | 统计值 |
| `precision` | `number` | — | 0 到 20 位小数 |
| `useGrouping` | `boolean` | `true` | 千位分组 |
| `locale` | `string` | `'en'` | `Intl.NumberFormat` 语言标识 |
| `prefix` / `suffix` | `string` | — | 前后缀 |
| `formatter` | `(value) => number \| string` | — | 自定义格式化 |
| `trend` | `'up' \| 'down' \| 'none'` | `'none'` | 趋势方向 |
| `trendType` | `'success' \| 'danger' \| 'neutral'` | `'neutral'` | 趋势语义 |
| `trendValue` | `number \| string` | — | 趋势值 |
| `loading` | `boolean` | `false` | 加载状态 |
| `children` 及 `*Content` | `ReactNode` | — | 自定义值、标题、前后缀和趋势 |
