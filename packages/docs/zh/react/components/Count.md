# Count 计数

Count 展示静态或递增计数，并支持小数和自定义分组。

```tsx
import { Count } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Count/basic.tsx :::

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `startValue` / `endValue` | `number` | `0` / 必填 | 开始值和结束值 |
| `decimal` | `number` | `0` | 小数位数 |
| `step` | `number` | `0` | 递增步长的 10 次幂指数 |
| `autoPlay` | `boolean` | `true` | 自动递增；减少动态效果时直接展示终值 |
| `delay` | `number` | `300` | 每次递增延迟，至少 4ms |
| `separator` / `extent` | `string` / `number` | `','` / `3` | 分隔符和分组长度 |
| `prefix` / `suffix` | `string` | — | 前后缀 |
| `prefixContent` / `suffixContent` | `ReactNode` | — | 自定义前后缀 |
| `onChange` | `(value: number) => void` | — | 当前值变化回调 |
