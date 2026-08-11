# Badge 徽标

Badge 为目标内容补充状态、数量或图标标记。徽标不应替代目标本身的可读标签。

## 基础用法

```tsx
import { Badge } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Badge/basic.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `'dot' \| 'num' \| 'icon'` | `'dot'` | 徽标类型 |
| `content` | `string \| number` | `''` | 数量或图标的后备内容 |
| `hidden` | `boolean` | `false` | 隐藏徽标内容 |
| `numMax` | `number` | `Infinity` | 数量显示上限，超出后显示加号 |
| `bottom` | `boolean` | `false` | 定位到目标右下角 |
| `align` | `'center-point' \| 'inner' \| 'outer' \| 'fix-left'` | `'center-point'` | 徽标与目标的对齐方式 |
| `offset` | `{ left?; right?; top?; bottom? }` | `null` | 自定义定位偏移 |
| `color` | `string` | 错误背景色变量 | 徽标背景色 |
| `iconColor` | `string` | — | 图标颜色 |
| `iconSize` | `number \| string` | `16` | 图标字号 |
| `badgeLabel` | `string` | — | 徽标的可访问名称 |
| `icon` | `ReactNode` | — | 图标内容 |
| `children` | `ReactNode` | — | 被标记的目标内容 |

组件接受适用的原生 `div` 属性，`ref` 指向根 `HTMLDivElement`。
