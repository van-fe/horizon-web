# Tooltip 文字提示

Tooltip 用于为界面元素提供简短的上下文说明，支持悬停、聚焦、点击、右键和受控打开方式。

## 基础用法

```tsx
import { Tooltip } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

:::react-demo react/components/Tooltip/basic.tsx :::

## 无障碍与交互

打开后，触发元素会通过 `aria-describedby` 关联 `role="tooltip"` 内容。聚焦触发方式支持键盘访问；浮层打开时可按 `Escape` 关闭。点击和右键触发方式还支持点击外部关闭。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `children` | `ReactElement` | — | 唯一触发元素 |
| `content` | `ReactNode` | — | 提示内容 |
| `trigger` | `'hover' \| 'focus' \| 'click' \| 'contextmenu' \| 'manual'` | `'hover'` | 触发方式 |
| `open` | `boolean` | — | 受控打开状态 |
| `defaultOpen` | `boolean` | `false` | 非受控初始状态 |
| `disabled` | `boolean` | `false` | 禁止显示和交互 |
| `enterable` | `boolean` | `false` | 鼠标是否可以进入浮层 |
| `showAfter` | `number` | `200` | 延迟显示毫秒数 |
| `hideAfter` | `number` | `200` | 延迟隐藏毫秒数 |
| `placement` | `WebPlacement` | `'top'` | 首选位置 |
| `distance` | `number` | `12` | 主轴间距 |
| `skidding` | `number` | `0` | 交叉轴偏移 |
| `flip` | `boolean` | `true` | 空间不足时翻转 |
| `fallbackPlacements` | `WebPlacement[]` | 对侧位置 | 备选位置 |
| `shift` | `boolean` | `true` | 将浮层平移到视口内 |
| `arrow` | `boolean` | `true` | 显示箭头 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| `theme` | `'dark' \| 'light'` | `'dark'` | 主题 |
| `portal` | `boolean` | `true` | 是否使用 Portal |
| `portalContainer` | `PortalTarget` | `'body'` | Portal 容器 |
| `className` | `string` | — | 浮层类名 |
| `style` | `CSSProperties` | — | 浮层样式 |
| `zIndex` | `number` | `1000` | CSS 层级 |

## Callbacks

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onOpenChange` | `(open: boolean, details: { reason: TooltipOpenReason }) => void` | 打开状态变化时调用 |

## Ref

`ref` 暴露 `open()`、`close()` 和异步 `update()`，分别用于立即开关浮层和重新计算位置。
