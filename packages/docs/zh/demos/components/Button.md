Button 触发即时操作。一个操作区域应保持清晰的主次关系，并为图标按钮提供可访问名称。

## 类型与圆角

`type` 表达主操作、普通操作和危险操作；`round` 提供椭圆外观。

:::demo components/Button/basic.vue :::

## 尺寸

通过 `size` 适配不同信息密度，`auto-fit` 可让短标签保持紧凑。

:::demo components/Button/size.vue :::

## 简洁与幽灵按钮

`plain` 降低视觉重量；在强色背景上可结合 `ghost` 使用。

:::demo components/Button/plain.vue :::

## 文字按钮

`text` 适合低强调、不会离开当前上下文的操作。

:::demo components/Button/text.vue :::

## 链接按钮

`link` 提供链接视觉，`href` 使用原生跳转，`to` 使用 Vue Router。

:::demo components/Button/link.vue :::

## 激活态

`active` 表达当前已选择的视图、筛选器或工具。

:::demo components/Button/active.vue :::

## 禁用态

`disabled` 阻止交互。仍应在相邻说明中解释不可用原因。

:::demo components/Button/disabled.vue :::

## 图标与加载

`icon` 可与文字组合或单独使用；无文字时请设置 `aria-label`。`loading` 用于进行中的异步操作。

:::demo components/Button/icon.vue :::

## 块级按钮

`block` 使按钮占满容器，适合窄屏表单和需要明确落点的确认操作。

:::demo components/Button/block.vue :::

## 按钮组

`h-button-group` 将强相关操作组合为连续控件，也可组合下拉菜单形成拆分按钮。

:::demo components/Button/button-group.vue :::

## 异步防重复提交

`debounce-fn` 在 Promise 完成前阻止重复执行，`debounce-type` 控制期间的 `disabled`、`loading` 或纯逻辑状态。

:::demo components/Button/debounce-fn.vue :::

## 边框样式

`border-style` 支持 `solid`、`dotted` 和 `dashed`，适合区分语义相近的次级操作。

:::demo components/Button/border-style.vue :::

## 自定义颜色（BETA）

`color` 支持内置色名和颜色字面量，并自动生成交互状态。业务场景优先使用内置色名；示例中的十六进制仅用于演示自定义能力。

:::demo components/Button/custom-color.vue :::
