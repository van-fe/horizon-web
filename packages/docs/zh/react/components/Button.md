# Button 按钮

Button 用于触发即时操作。操作区域应保持清晰的主次关系，图标按钮必须提供可访问名称。

## 类型与圆角

`variant` 表达主操作、普通操作和危险操作，`round` 提供椭圆外观。

:::react-demo react/components/Button/basic.tsx :::

## 尺寸

通过 `size` 适配不同信息密度，`autoFit` 可让短标签保持紧凑。

:::react-demo react/components/Button/size.tsx :::

## 简洁与幽灵按钮

`plain` 降低视觉重量；在强色背景上可结合 `ghost` 使用。

:::react-demo react/components/Button/plain.tsx :::

## 文字按钮

`text` 适合低强调、不会离开当前上下文的操作。

:::react-demo react/components/Button/text.tsx :::

## 链接与应用导航

`href` 渲染原生链接，`to` 交给 `HorizonWebProvider` 的 `navigate` adapter。

:::react-demo react/components/Button/link.tsx :::

## 激活态

`active` 表达当前已选择的视图、筛选器或工具。

:::react-demo react/components/Button/active.tsx :::

## 禁用与加载

`disabled` 阻止操作，`loading` 表达进行中的任务。仍应在相邻说明中解释不可用原因。

:::react-demo react/components/Button/disabled.tsx :::

## 图标

`icon` 与 `suffix` 可组合内容；图标按钮没有可见文字时必须设置 `aria-label`。

:::react-demo react/components/Button/icon.tsx :::

## 块级按钮

`block` 使按钮占满容器，适合窄屏表单和明确的确认区域。

:::react-demo react/components/Button/block.tsx :::

## 按钮组

`ButtonGroup` 将相关操作组合为连续控件，并通过 Context 向子按钮提供 `variant` 和 `size`。

:::react-demo react/components/Button/button-group.tsx :::

## 异步防重复提交

`asyncAction` 在 Promise 完成前阻止重复触发，`asyncState` 控制期间的禁用、加载或纯逻辑状态。

:::react-demo react/components/Button/async-action.tsx :::

## 边框样式

`borderStyle` 支持 `solid`、`dotted` 和 `dashed`。

:::react-demo react/components/Button/border-style.tsx :::

## 自定义颜色（BETA）

`color` 支持内置色名和颜色字面量，并生成默认、悬浮、按下和禁用状态。

:::react-demo react/components/Button/custom-color.tsx :::

## Button Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'normal' \| 'danger'` | `'primary'` | 视觉类型 |
| `size` | `'huge' \| 'large' \| 'medium' \| 'small'` | `'medium'` | 按钮尺寸 |
| `round` | `boolean` | `false` | 椭圆外观 |
| `plain` | `boolean` | `false` | 简洁外观 |
| `ghost` | `boolean` | `false` | 幽灵外观 |
| `text` | `boolean` | `false` | 文字按钮外观 |
| `link` | `boolean` | `false` | 链接按钮外观 |
| `block` | `boolean` | `false` | 填满容器宽度 |
| `active` | `boolean` | `false` | 激活状态 |
| `loading` | `boolean` | `false` | 加载状态 |
| `disabled` | `boolean` | `false` | 禁止交互 |
| `autoFit` | `boolean` | `false` | 按内容收缩 |
| `borderStyle` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | 边框样式 |
| `color` | `string` | — | 自定义主题颜色 |
| `icon` | `ReactNode` | — | 前置图标 |
| `suffix` | `ReactNode` | — | 后置内容 |
| `href` | `string` | — | 原生链接地址 |
| `target` | `ButtonTarget` | `'_self'` | 链接目标 |
| `to` | `unknown` | — | 应用导航目标 |
| `replace` | `boolean` | `false` | 替换当前导航记录 |
| `asyncAction` | `() => unknown \| PromiseLike<unknown>` | — | 防重复异步操作 |
| `asyncState` | `'none' \| 'loading' \| 'disabled'` | `'none'` | 异步期间视觉状态 |
| `children` | `ReactNode` | — | 按钮内容 |

组件同时接受适用的原生 `button` 属性，`ref` 返回实际的 `HTMLButtonElement` 或 `HTMLAnchorElement`。

## Button Callbacks

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onClick` | `(event: MouseEvent<HTMLElement>) => void` | 普通按钮操作 |
| `onActionFinished` | `() => void` | 异步操作成功完成 |
| `onActionError` | `(error: unknown) => void` | 异步操作失败 |

## ButtonGroup Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `ButtonVariant` | — | 组内按钮视觉类型 |
| `size` | `ButtonSize` | — | 组内按钮尺寸 |
| `children` | `ReactNode` | — | 组内按钮 |

`ButtonGroup` 同时接受原生 `div` 属性，默认设置 `role="group"`，并通过 `ref` 返回实际的 `HTMLDivElement`。
