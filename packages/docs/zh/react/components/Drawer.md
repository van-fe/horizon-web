# Drawer 抽屉

Drawer 从界面边缘滑出聚焦面板，同时保留底层页面的上下文。组件支持四种方向、响应式预设尺寸、关闭守卫、模态交互管理和指针拖拽调整尺寸。

```tsx
import { Drawer, type DrawerHandle } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

## 基础用法

命令式流程可以使用 ref；由应用状态管理显隐时，则使用 `open` 与 `onOpenChange`。内置确认操作不会自动关闭抽屉，因此应用可以在操作成功后再关闭。

:::react-demo react/components/Drawer/basic.tsx :::

## 受控状态与异步守卫

`beforeClose` 返回 `false` 或拒绝的 Promise 时会阻止关闭；返回 `true`、`void` 或已完成的 Promise 时允许关闭。异步守卫等待期间，重复关闭请求会被忽略。

:::react-demo react/components/Drawer/guarded.tsx :::

## 展开方向与尺寸

抽屉可以从任意界面边缘展开。预设尺寸会响应视口区间，数值按像素处理，其他字符串则作为自定义长度直接使用。

:::react-demo react/components/Drawer/placements.tsx :::

## 自定义区域与拖拽尺寸

通过 `header` 和 `footer` 传入的 React 节点会替换完整的内置区域。`sizeDraggable` 会增加与展开方向匹配的指针拖拽手柄，用于调整面板尺寸。

:::react-demo react/components/Drawer/custom.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | 抽屉正文 |
| `title` | `ReactNode` | — | 内置头部中的标题 |
| `header` | `ReactNode \| boolean` | `true` | 自定义完整头部，或控制内置头部显隐 |
| `footer` | `ReactNode \| boolean` | `true` | 自定义完整底部，或控制内置底部显隐 |
| `ariaLabel` | `string` | Provider 文案 | 未提供 `title` 时的无障碍名称 |
| `open` | `boolean` | — | 受控打开状态 |
| `defaultOpen` | `boolean` | `false` | 非受控初始打开状态 |
| `placement` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | 面板展开的界面边缘 |
| `size` | `'small' \| 'medium' \| 'large' \| string \| number` | `'medium'` | 响应式预设或自定义尺寸 |
| `mask` | `boolean` | `true` | 显示背景遮罩并启用模态语义 |
| `maskClosable` | `boolean` | `true` | 允许通过遮罩交互请求关闭 |
| `escClosable` | `boolean` | `true` | 允许最上层抽屉响应 `Escape` 关闭 |
| `closable` | `boolean` | `true` | 在内置头部中显示关闭按钮 |
| `okButton` | `boolean \| Partial<ButtonProps>` | `true` | 显示并配置内置确认按钮 |
| `okButtonText` | `string` | Provider 文案 | 确认按钮文案 |
| `cancelButton` | `boolean \| Partial<ButtonProps>` | `true` | 显示并配置内置取消按钮 |
| `cancelButtonText` | `string` | Provider 文案 | 取消按钮文案 |
| `beforeClose` | `() => void \| boolean \| PromiseLike<boolean \| void>` | — | 返回值式关闭守卫 |
| `lockScroll` | `boolean` | 跟随 `mask` | 覆盖背景滚动锁定策略 |
| `sizeDraggable` | `boolean` | `false` | 允许从面板边缘使用指针调整尺寸 |
| `loading` | `boolean` | `false` | 在内置确认按钮上显示加载状态 |
| `destroyOnClose` | `boolean` | `true` | 关闭后卸载抽屉 |
| `portal` | `boolean` | `true` | 通过 Portal 渲染 |
| `portalContainer` | `PortalTarget` | `'body'` | Portal 目标 |
| `zIndex` | `number` | 自动管理 | 覆盖自动管理的浮层层级 |
| `classNames` | `DrawerClassNames` | — | `mask`、`container`、`header`、`body`、`footer` 区域 class |
| `className` / `style` | 原生 `div` 属性 | — | 自定义根浮层 |

其余受支持的原生 `div` 属性会透传到根浮层。

## 回调

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onOpenChange` | `(open: boolean, details: DrawerOpenChangeDetails) => void` | 返回请求的显隐状态及变化原因 |
| `onOk` | `() => void` | 内置确认操作后执行，不会自动关闭 |
| `onCancel` | `() => void` | 内置取消操作请求关闭前执行 |
| `onOpen` / `onOpened` | `() => void` | 返回开始打开和完全打开 |
| `onClose` / `onClosed` | `() => void` | 返回开始关闭和完全关闭 |
| `onMaskClick` | `() => void` | 返回每次遮罩点击，包括 `maskClosable` 为 `false` 时 |
| `onIconClick` | `() => void` | 返回内置头部关闭操作 |
| `onClosePendingChange` | `(pending: boolean) => void` | 返回异步关闭守卫状态 |

通过按钮对象传入的 `onClick` 会先执行；在该处理器中调用 `event.preventDefault()`，可以阻止对应的内置操作。

## Ref

`DrawerHandle` ref 提供以下成员：

| 成员 | 类型 | 说明 |
| --- | --- | --- |
| `open()` | `() => void` | 请求打开抽屉 |
| `close()` | `() => void` | 通过 `beforeClose` 请求关闭 |
| `focus()` | `() => void` | 聚焦抽屉面板 |
| `drawer` | `HTMLDivElement \| null` | 只读面板元素 |

## 全局文案

`HorizonWebProvider` 接受包含 `ok`、`cancel`、`close`、`drawer` 字符串的 `drawerLabels`。实例按钮文案、可见标题和 `ariaLabel` 会在对应位置优先使用。

## 无障碍与堆叠

Drawer 使用 `role="dialog"`，打开期间约束焦点，关闭后恢复焦点，并按配置锁定背景滚动。存在遮罩时还会提供模态语义。多个抽屉堆叠时，只有最上层响应 `Escape`。
