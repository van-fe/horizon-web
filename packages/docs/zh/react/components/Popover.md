# Popover 气泡卡片

Popover 在单个触发元素旁展示可交互的上下文内容，支持延迟悬停、聚焦、点击、受控状态、自动定位、Portal、遮罩与命令式控制。

```tsx
import { PopContent, Popover } from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## 基础用法

:::react-demo react/components/Popover/basic.tsx :::

## 触发方式

悬停、聚焦和点击触发方式使用一致的无障碍对话框关联。点击触发的浮层可通过指定的外部事件或 `Escape` 关闭。

:::react-demo react/components/Popover/triggers.tsx :::

## 受控状态与遮罩

应用状态负责显隐时，使用 `open` 与 `onOpenChange`。`manual` 不响应自动触发，但仍可通过 ref 命令立即开关。

:::react-demo react/components/Popover/controlled.tsx :::

## Popover Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `children` | `ReactElement` | — | 唯一触发元素 |
| `content` | `ReactNode` | — | 浮层内容 |
| `trigger` | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | 触发方式 |
| `open` | `boolean` | — | 受控打开状态 |
| `defaultOpen` | `boolean` | `false` | 非受控初始状态 |
| `placement` | `PopoverPlacement` | `'top'` | 首选或自动位置 |
| `distance` / `skidding` | `number` | `8` / `0` | 主轴间距与交叉轴偏移 |
| `flip` | `boolean` | `true` | 尝试备选位置 |
| `fallbackPlacements` | `PopoverPlacement[]` | — | 备选位置 |
| `arrow` | `boolean` | `true` | 显示箭头 |
| `arrowOptions` | `{ size?: number }` | `{ size: 8 }` | 箭头尺寸 |
| `destroyOnHide` | `boolean` | `true` | 关闭后卸载内容 |
| `portal` | `boolean` | `true` | 使用 Portal |
| `portalContainer` | `PortalTarget` | `'body'` | Portal 目标 |
| `sameWidth` / `sameHeight` | `boolean` | `false` | 匹配触发元素尺寸 |
| `setMinWidth` | `boolean` | `false` | 使用最小宽度而非固定宽度 |
| `showDelay` / `hideDelay` | `number` | `0` / `100` | 指针打开与关闭延迟 |
| `hideEvent` | `'click' \| 'mousedown' \| 'mouseup'` | `'click'` | 外部关闭事件 |
| `disabled` | `boolean` | `false` | 禁止打开 |
| `mask` | `PopoverMaskOptions` | — | 可选遮罩 |
| `theme` | `'light' \| 'dark'` | `'light'` | 由 `PopContent` 继承的主题 |
| `strategy` | `'fixed' \| 'absolute'` | `'fixed'` | 定位策略 |
| `className` / `style` | 原生 `div` 属性 | — | 自定义浮层表面 |

## 回调与 Ref

`onOpenChange(open, details)` 返回请求状态及原因；`onShow()`、`onHide()` 返回已提交的显隐状态；`onEnterReference`、`onLeaveReference`、`onClick` 接收原生 React 鼠标事件。

`PopoverHandle` 提供 `open()`、`close()`、`updatePosition()`，以及只读的 `reference`、`floating` DOM 元素。

## PopContent

`PopContent` 接受原生 `div` 属性、`children` 与可选 `theme`；放在 Popover 内时会继承父级主题。
