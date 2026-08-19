# Segmented 分段控制器

Segmented 用于在少量互斥视图之间切换。每个选项应提供明确且唯一的值，标签在窄屏下也应保持简洁。

```tsx
import { Segmented, SegmentedItem } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Segmented/basic.tsx :::

## Segmented 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `string \| number` | — | 受控值和非受控初始值 |
| `size` | `'mini' \| 'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | 控件尺寸 |
| `scrollable` | `boolean` | `false` | 允许水平溢出滚动 |
| `focusable` | `boolean` | `false` | 将选中项滚动到可视区域 |
| `arrow` | `boolean` | `false` | 启用滚动时显示滚动按钮 |
| `block` | `boolean` | `false` | 撑满父容器宽度 |
| `onChange` | `(value: string \| number) => void` | — | 选中值变化回调 |

ref 提供 `focus()`。

## SegmentedItem 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number` | 必填 | 唯一选项值 |
| `label` | `string \| number` | — | 备用选项文本 |
| `disabled` | `boolean` | `false` | 禁用当前选项 |
| `icon` | `ReactNode` | — | 图标内容 |
| `children` | `ReactNode \| ({ selected, value }) => ReactNode` | — | 选项内容 |
| `onClick` | `(value) => void` | — | 选项点击回调 |
