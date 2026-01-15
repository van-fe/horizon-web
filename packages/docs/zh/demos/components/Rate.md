## 基础用法
使用 `v-model` 绑定当前评分值。
:::demo components/Rate/basic.vue :::

## 允许半星
使用 `half` 设置是否允许半星。
:::demo components/Rate/allowHalf.vue :::

## 自定义图标
通过 `icon` 属性自定义评分图标。
:::demo components/Rate/customIcon.vue :::

## 自定义图标-使用插槽
使用默认插槽，可以定制自己所需的评分图标（仅支持可以用font-size和color更改样式的标签)
:::demo components/Rate/useSlot.vue :::

## 自定义数量
通过 `count` 属性可以设置评分图标数量。
:::demo components/Rate/customCount.vue :::

## 自定义样式
通过 `size` 属性自定义图标大小，参数可以接受字符串`'small' | 'medium' | 'large'`或数字。
:::demo components/Rate/customStyle_size.vue :::

通过 `color` `voidColor` `disabledColor` 属性可以分别设置图标的填充颜色、空状态时的颜色、禁用时的颜色。
:::demo components/Rate/customStyle_color.vue :::

通过 `gutter` 属性可以设置图标左右的间距。
:::demo components/Rate/customStyle_gutter.vue :::

## 提示文字
通过 `showTooltip` 属性设置是否显示提示文字，同时可以通过 `tooltip` 属性自定义提示文字的文本（传入数组的item数要与count值相同，否则显示默认提示文字)。
:::demo components/Rate/tooltip.vue :::

## 只读&禁用
通过 `readonly` `disabled` 属性分别设置只读状态和禁用状态。
:::demo components/Rate/unable.vue :::
