## 基础使用

Controls 通常与 `h-hover` 和 `h-mask` 组合，在内容悬停层中承载上下文操作。`command` 会返回所选 `h-control` 的 `label`。

:::demo components/Controls/basic.vue :::

## 主题

通过 `theme` 在 `light` 与 `dark` 之间选择。应根据控件所在表面的明暗关系选择，而不是只跟随页面主题。

:::demo components/Controls/theme.vue :::

## Tooltip

`use-tooltip` 控制图标操作是否显示说明。空间紧凑或操作仅有图标时，建议保持 Tooltip 开启。

:::demo components/Controls/tooltip.vue :::

## 禁用

设置 `disabled` 可在加载、导出等处理中锁定整组操作，同时保留操作的视觉上下文。

:::demo components/Controls/disabled.vue :::

## 自动适应

Controls 会根据父元素宽度决定直接显示的操作数量，并将剩余操作收进省略菜单。示例可切换父元素宽度观察变化。

:::demo components/Controls/resize.vue :::

## 权限过滤

通过 `access-list` 传入允许的 `label`，只渲染当前角色可执行的操作。权限判断仍应由业务安全层最终校验。

:::demo components/Controls/access.vue :::
