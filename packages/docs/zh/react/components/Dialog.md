# Dialog 对话框

Dialog 在模态层中承载需要用户集中关注的信息或操作，并负责焦点约束、背景滚动锁定、堆叠关闭、Portal 渲染与关闭守卫。

```tsx
import { Dialog, type DialogHandle } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

## 基础用法

命令式流程可以使用 ref；由应用状态管理显隐时，则使用 `open` 与 `onOpenChange`。内置确认操作不会自动关闭对话框，业务可以在操作成功后自行决定关闭时机。

:::react-demo react/components/Dialog/basic.tsx :::

## 受控关闭守卫

`beforeClose(close)` 会拦截所有关闭请求。在校验、保存或其他异步任务允许关闭后，调用传入的 `close`；等待授权期间，重复关闭请求会被忽略。

:::react-demo react/components/Dialog/guarded.tsx :::

## 尺寸与自定义内容

标题、图标、正文和底部操作区都接受 React 节点。组件提供四种尺寸，自定义 footer 可以组合符合业务流程的操作布局。

:::react-demo react/components/Dialog/custom.tsx :::

## 关闭后销毁

正文组件的局部状态应在关闭后丢弃时，启用 `destroyOnClose`。未启用时，关闭的内容仍会保留挂载并隐藏。

:::react-demo react/components/Dialog/destroy.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | 对话框正文 |
| `title` | `ReactNode` | — | 可见标题内容 |
| `icon` | `ReactNode` | — | 显示在标题和正文前的图标 |
| `footer` | `ReactNode` | — | 自定义底部操作区，会替换内置操作 |
| `ariaLabel` | `string` | Provider 文案 | 没有可见标题时的无障碍名称 |
| `open` | `boolean` | — | 受控打开状态 |
| `defaultOpen` | `boolean` | `false` | 非受控初始打开状态 |
| `top` | `string \| number` | — | 顶部偏移，数字按像素处理 |
| `size` | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | 对话框尺寸 |
| `mask` | `boolean` | `true` | 显示背景遮罩 |
| `maskClose` | `boolean` | `true` | 允许通过遮罩区域的外部指针操作关闭 |
| `escClose` | `boolean` | `true` | 允许最上层对话框响应 `Escape` 关闭 |
| `closeButton` | `boolean` | `true` | 存在标题时显示标题栏关闭按钮 |
| `okButtonProps` | `boolean \| Partial<ButtonProps>` | `{}` | 显示并配置内置确认按钮，`false` 时隐藏 |
| `okText` | `string` | Provider 文案 | 确认按钮文案 |
| `cancelButtonProps` | `boolean \| Partial<ButtonProps>` | `{}` | 显示并配置内置取消按钮，`false` 时隐藏 |
| `cancelText` | `string` | Provider 文案 | 取消按钮文案 |
| `beforeClose` | `(close: () => void) => void` | — | 显式授权关闭请求的守卫 |
| `destroyOnClose` | `boolean` | `false` | 关闭后卸载对话框 |
| `zIndex` | `number` | 自动管理 | 覆盖自动管理的浮层层级 |
| `lockScroll` | `boolean` | `true` | 打开时锁定背景滚动 |
| `draggable` | `boolean` | `false` | 允许通过内置标题栏使用主指针拖拽 |
| `portal` | `boolean` | `true` | 通过 Portal 渲染 |
| `portalContainer` | `PortalTarget` | `'body'` | Portal 目标 |
| `classNames` | `DialogClassNames` | — | `header`、`body`、`footer`、`mask`、`wrapper` 区域 class |
| `className` / `style` | 原生 `div` 属性 | — | 自定义根浮层 |

其余受支持的原生 `div` 属性会透传到根浮层。

## 回调

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onOpenChange` | `(open: boolean, details: DialogOpenChangeDetails) => void` | 返回请求的显隐状态及变化原因 |
| `onOk` | `() => void` | 内置确认操作后执行，不会自动关闭 |
| `onCancel` | `() => void` | 内置取消操作请求关闭前执行 |
| `onOpen` / `onOpened` | `() => void` | 返回开始打开和完全打开 |
| `onClose` / `onClosed` | `() => void` | 返回开始关闭和完全关闭 |
| `onCloseIconClick` | `() => void` | 返回标题栏关闭操作 |
| `onMaskClick` | `() => void` | 返回已启用的遮罩关闭操作 |
| `onClosePendingChange` | `(pending: boolean) => void` | 返回回调式关闭守卫是否正在等待授权 |

通过按钮参数传入的 `onClick` 会先执行；在该处理器中调用 `event.preventDefault()`，可以阻止对应的内置操作。

## Ref

`DialogHandle` ref 提供以下成员：

| 成员 | 类型 | 说明 |
| --- | --- | --- |
| `open()` | `() => void` | 请求打开对话框 |
| `close()` | `() => void` | 通过 `beforeClose` 请求关闭 |
| `focus()` | `() => void` | 聚焦对话框元素 |
| `dialog` | `HTMLDivElement \| null` | 只读对话框元素 |

## 全局文案

`HorizonWebProvider` 接受包含 `ok`、`cancel`、`close`、`dialog` 字符串的 `dialogLabels`。实例级 `okText`、`cancelText`、可见标题和 `ariaLabel` 会在对应位置优先使用。

## 无障碍与堆叠

Dialog 使用 `role="dialog"` 与模态 ARIA 语义，打开期间约束焦点，关闭后恢复焦点，并默认锁定背景滚动。多个对话框堆叠时，只有最上层响应 `Escape` 或外部交互。
