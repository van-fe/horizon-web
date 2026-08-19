# Divider 分割线

Divider 用于分隔相邻内容或区块，可显示标题并调整视觉强度和线型。

## 基础用法

```tsx
import { Divider } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Divider/basic.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'default' \| 'strong' \| 'primary' \| 'secondary'` | `'default'` | 视觉强度；`primary` 和 `secondary` 是兼容别名 |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 分割线方向 |
| `lineStyle` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | 线型 |
| `titlePlacement` | `'left' \| 'center' \| 'right'` | `'center'` | 标题位置 |
| `verticalMargin` | `string \| number` | 主题变量 | 垂直分割线的左右边距 |
| `horizontalMargin` | `string \| number` | 主题变量 | 水平分割线的上下边距 |
| `children` | `ReactNode` | — | 标题内容 |

组件渲染原生 `separator` 语义，接受适用的 `div` 属性，`ref` 指向根 `HTMLDivElement`。
