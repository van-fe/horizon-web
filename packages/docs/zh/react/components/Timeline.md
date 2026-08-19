# Timeline 时间轴

时间轴用于清晰展示里程碑、状态变化或操作记录的时间流。

```tsx
import { Timeline, TimelineItem } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## 里程碑

组合 `TimelineItem` 子节点来配置时间、名称、描述、节点尺寸和连接线。根节点使用有序列表语义，可通过原生属性提供可访问名称。

:::react-demo react/components/Timeline/basic.tsx :::

## 排序与首尾节点

使用 `order` 或 `reverse` 按时间排序；`sort` 为空时保留源顺序。`first` 和 `last` 在排序后覆盖首尾节点展示。

:::react-demo react/components/Timeline/ordering.tsx :::

## 折叠活动记录

`foldConfig.number` 指定需要折叠的后续记录数。折叠节点使用原生按钮并提供 `aria-expanded`；当折叠内容不是可描述文本时，请设置 `foldConfig.label`。

:::react-demo react/components/Timeline/folding.tsx :::

## 时间格式

`format` 接受 Day.js 格式字符串。在 `Timeline` 上设置 `locale` 可统一子节点的格式化语言。

## Timeline props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | 组合的 `TimelineItem` 记录 |
| `sort` | `'' \| 'order' \| 'reverse'` | `''` | 时间排序策略 |
| `first` | `TimelineDotProps` | — | 首节点展示覆盖 |
| `last` | `TimelineDotProps` | — | 尾节点展示覆盖 |
| `locale` | `string` | `'en'` | Day.js 格式化语言 |

组件接受原生 `ol` 属性，转发的 ref 指向 `HTMLOListElement`。

## TimelineItem props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `timestamp` | `string \| number \| Date` | `''` | 展示时间及排序值 |
| `format` | `string` | `'YYYY-MM-DD'` | Day.js 格式字符串 |
| `placement` | `'top' \| 'bottom' \| 'right'` | `'bottom'` | 时间位置 |
| `offset` | `string \| number` | `4` | 连接线留白；数字使用像素 |
| `type` | `'disc' \| 'circle'` | `'disc'` | 节点形状 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 节点尺寸 |
| `color` | `string` | — | 节点前景色或填充色 |
| `borderColor` | `string` | — | 节点边框颜色 |
| `tailColor` | `string` | — | 连接线颜色 |
| `icon` | `ReactNode` | — | 节点图标内容 |
| `name` | `ReactNode` | — | 记录名称 |
| `description` | `ReactNode` | — | 记录描述 |
| `children` | `ReactNode` | — | 优先级更高的描述内容 |
| `dashed` | `boolean` | `false` | 使用虚线连接 |
| `tail` | `boolean` | `true` | 显示连接线 |
| `foldConfig` | `TimelineFoldConfig` | — | 后续记录折叠配置 |
| `dot` | `ReactNode` | — | 自定义展开节点 |
| `hiddenDot` | `ReactNode` | — | 自定义折叠节点 |

`TimelineItem` 接受原生 `li` 属性，转发的 ref 指向 `HTMLLIElement`。

`TimelineFoldConfig` 包含 `number`、`content`、可选的 `label` 和折叠状态 `dot` 展示。
