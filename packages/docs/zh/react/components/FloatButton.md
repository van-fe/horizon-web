# FloatButton 悬浮按钮

FloatButton 在页面内容上方提供紧凑的常驻操作，支持原生按钮与链接语义、提示、徽标、自动堆叠、指针拖拽、边缘吸附和可展开操作组。

```tsx
import {
  FloatButton,
  FloatButtonGroup,
  type FloatButtonHandle,
  type FloatButtonGroupHandle,
} from '@aurora/horizon-react';
import '@aurora/horizon-react/style.css';
```

## 基础用法

未提供 `href` 时，操作渲染为原生按钮。通过 ref 可以显示、隐藏、聚焦按钮，或读取当前操作元素。

:::react-demo react/components/FloatButton/basic.tsx :::

## 内容、徽标与导航

使用 `icon` 和 `description` 提供 React 内容区域。字符串提示会采用默认设置，对象形式可以传入 Tooltip 参数；提供 `href` 后会渲染为原生链接。

:::react-demo react/components/FloatButton/content.tsx :::

## 可展开操作组

FloatButtonGroup 向内部操作共享外观和显隐状态。启用 `useCollapse` 后，既可以由组件维护展开状态，也可以通过 `expanded` 和 `onExpandedChange` 受控管理。

:::react-demo react/components/FloatButton/group.tsx :::

## 指针拖拽

拖拽会触发生命周期回调，并使按钮退出自动堆叠。默认吸附到右侧；开启 `adsorbBottom` 后，也可以吸附到底部。

:::react-demo react/components/FloatButton/draggable.tsx :::

## FloatButton 属性 {#float-button-api}

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | — | 图标区域 |
| `description` | `ReactNode` | — | 描述区域 |
| `ariaLabel` | `string` | Provider 文案 | 没有描述时的可访问名称 |
| `tooltip` | `string \| FloatButtonTooltipOptions` | — | 提示文字或 Tooltip 参数 |
| `variant` | `'normal' \| 'primary'` | `'normal'` | 视觉类型 |
| `shape` | `'circle' \| 'square'` | `'circle'` | 按钮形状 |
| `href` | `string` | — | 导航地址；提供后切换为链接元素 |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | `'_self'` | 链接打开位置 |
| `badge` | `boolean \| FloatButtonBadgeOptions` | `false` | 点徽标或 Badge 参数 |
| `draggable` | `boolean` | `false` | 启用指针拖拽 |
| `adsorbBottom` | `boolean` | `false` | 允许吸附到底部 |
| `visible` | `boolean` | — | 受控显隐状态 |
| `defaultVisible` | `boolean` | `true` | 非受控初始显隐状态 |
| `disabled` | `boolean` | `false` | 禁用按钮激活与拖拽 |
| `className` / `style` | 原生 button 值 | — | 自定义操作元素 |

其余兼容的原生 button 属性会继续透传。提供 `href` 时，共享的 ARIA、class、style 和事件属性会应用到链接元素。

## FloatButton 回调

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onClick` | `(event: ReactMouseEvent<HTMLButtonElement \| HTMLAnchorElement>) => void` | 操作被激活 |
| `onVisibleChange` | `(visible: boolean) => void` | 命令请求改变显隐状态 |
| `onDragStart` | `() => void` | 开始拖拽 |
| `onDragging` | `() => void` | 拖拽中的指针移动 |
| `onDragEnd` | `() => void` | 拖拽结束并完成吸附 |

## FloatButton ref

| 成员 | 类型 | 说明 |
| --- | --- | --- |
| `show()` | `() => void` | 显示非受控按钮，或请求改变受控状态 |
| `hide()` | `() => void` | 隐藏非受控按钮，或请求改变受控状态 |
| `focus()` | `() => void` | 聚焦操作元素 |
| `element` | `HTMLButtonElement \| HTMLAnchorElement \| null` | 只读操作元素 |

## FloatButtonGroup 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | 组内操作 |
| `variant` | `'normal' \| 'primary'` | — | 共享给内部操作的视觉类型 |
| `shape` | `'circle' \| 'square'` | — | 共享给内部操作的形状 |
| `useCollapse` | `boolean` | `false` | 启用折叠操作与浮层 |
| `trigger` | `'click' \| 'hover'` | `'click'` | 展开交互方式 |
| `expandIcon` / `foldIcon` | `ReactNode` | 内置图标 | 折叠操作图标 |
| `expandTooltip` / `foldTooltip` | `string \| FloatButtonTooltipOptions` | — | 折叠操作提示 |
| `badge` | `FloatButtonBadgeOptions` | — | 折叠操作徽标 |
| `draggable` | `boolean` | `false` | 允许拖拽折叠操作 |
| `adsorbBottom` | `boolean` | `false` | 允许折叠操作吸附到底部 |
| `visible` | `boolean` | — | 受控按钮组显隐状态 |
| `defaultVisible` | `boolean` | `true` | 非受控初始显隐状态 |
| `expanded` | `boolean` | — | 受控展开状态 |
| `defaultExpanded` | `boolean` | `false` | 非受控初始展开状态 |

## FloatButtonGroup 回调与 ref

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onVisibleChange` | `(visible: boolean) => void` | 按钮组显隐请求 |
| `onExpandedChange` | `(expanded: boolean, details: FloatButtonGroupExpansionDetails) => void` | 展开请求及原因 |
| `onExpand` / `onFold` | `() => void` | 请求展开或收起 |
| `onClick` | `() => void` | 点击折叠操作 |

`FloatButtonGroupHandle` 提供 `show()`、`hide()`、`expand()`、`fold()` 和 `toggle()`。

## 全局文案与可访问性

`HorizonWebProvider` 接受包含 `button`、`expand` 和 `fold` 的 `floatButtonLabels`。独立操作的 `ariaLabel` 或可见描述优先于全局文案。

操作使用原生按钮或链接语义并支持键盘聚焦，Tooltip 归属同一个语义元素。折叠操作会暴露展开状态，并使用 Provider 提供的本地化可访问名称。
