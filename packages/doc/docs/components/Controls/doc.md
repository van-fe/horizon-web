### 基础使用
和 `h-hover`、`h-mask` 联合使用，可以做到蒙层 `hover` 后显示控制器
:::demo ./demos/basic.vue :::

### 主题
通过 `theme` 控制选择主题，可以是 `'light'(默认)` `'dark'`
:::demo ./demos/theme.vue :::

### 是否使用 `tooltip`
通过 `use-tooltip` 控制是否显示 `tooltip`
:::demo ./demos/tooltip.vue :::

### 禁用
控制 `disabled` 是否禁止点击
:::demo ./demos/disabled.vue :::

### 自动适应
根据父元素的宽度，自动适配显示多少个控制器，剩余的会被省略为 `dropdown` 显示
:::demo ./demos/resize.vue :::

### 权限检验
传入 `access-list` 来控制哪些按钮可以显示
:::demo ./demos/access.vue :::
