# Popconfirm 气泡确认框

Popconfirm 在操作触发元素附近请求用户明确确认，适合难以撤销、但无需使用完整模态对话框的操作。

```tsx
import { Popconfirm } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

## 基础确认

使用 `title` 提供简明问题；只有用户选择对应操作后，确认或取消回调才会执行。

:::react-demo react/components/Popconfirm/basic.tsx :::

## 受控状态与异步守卫

由应用状态管理显隐时，配合使用 `open` 与 `onOpenChange`。`beforeConfirm` 可以返回布尔值或 Promise；返回 `false` 时浮层保持打开，守卫拒绝时则通过 `onConfirmError` 返回错误。

:::react-demo react/components/Popconfirm/controlled.tsx :::

## 自定义内容、图标与文案

`content` 和 `icon` 接受 React 节点。`HorizonWebProvider` 可通过 `popconfirmLabels` 提供默认操作文案，实例上的 `confirmText`、`cancelText` 优先级更高。

:::react-demo react/components/Popconfirm/custom.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `children` | `ReactElement` | — | 唯一触发元素 |
| `title` | `string` | — | 简明确认标题 |
| `content` | `ReactNode` | — | 富确认内容，优先于 `title` |
| `icon` | `ReactNode` | 警告图标 | 内容旁的状态图标 |
| `open` | `boolean` | — | 受控打开状态 |
| `defaultOpen` | `boolean` | `false` | 非受控初始打开状态 |
| `disabled` | `boolean` | `false` | 禁止打开，并关闭当前确认浮层 |
| `placement` | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'right' \| 'left'` | `'top'` | 浮层位置 |
| `confirmText` | `string` | Provider 文案 | 确认操作文案 |
| `cancelText` | `string` | Provider 文案 | 取消操作文案 |
| `confirmButtonProps` | `Partial<ButtonProps>` | `{}` | 确认按钮参数 |
| `cancelButtonProps` | `Partial<ButtonProps>` | `{}` | 取消按钮参数 |
| `beforeConfirm` | `() => boolean \| PromiseLike<boolean>` | — | 确认完成前执行的守卫 |
| `portal` | `boolean` | `true` | 通过 Portal 渲染确认浮层 |
| `portalContainer` | `PortalTarget` | `'body'` | Portal 目标 |
| `zIndex` | `number` | `1000` | 浮层层级 |
| `className` / `style` | 原生 `div` 属性 | — | 自定义浮层表面 |

其余受支持的原生 `div` 属性会透传至浮层表面。

## 回调

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onOpenChange` | `(open: boolean, details: PopconfirmChangeDetails) => void` | 返回请求的显隐状态及变化原因 |
| `onConfirm` | `(event: MouseEvent<HTMLElement>) => void` | 守卫允许确认后执行 |
| `onCancel` | `(event: MouseEvent<HTMLElement>) => void` | 用户选择取消时执行 |
| `onConfirmError` | `(error: unknown) => void` | 返回被拒绝的守卫错误，确认浮层保持打开 |

按钮参数中的 `onClick` 会先于组件操作执行；在该处理器内调用 `event.preventDefault()`，可以阻止对应的确认或取消操作。

## Ref

`PopconfirmHandle` ref 提供以下成员：

| 成员 | 类型 | 说明 |
| --- | --- | --- |
| `open()` | `() => void` | 请求打开确认浮层 |
| `close()` | `() => void` | 请求关闭确认浮层 |
| `trigger` | `HTMLElement \| null` | 只读触发元素 |
| `dialog` | `HTMLDivElement \| null` | 只读确认内容元素 |

## 无障碍

浮层使用 `alertdialog` 语义，将确认内容关联为无障碍名称；打开后聚焦第一个可用操作，支持通过 `Escape` 或外部交互关闭，并在关闭后将焦点返回触发元素。
