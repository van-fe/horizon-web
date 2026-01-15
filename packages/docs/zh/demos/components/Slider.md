## 基础用法

:::demo components/Slider/index.vue :::

## 设置大小
可以设置 `small` `medium` `large`
:::demo components/Slider/size.vue :::

## 禁用状态
通过设置 `disabled` 来禁用
:::demo components/Slider/disable.vue :::

## 不同类型
可以设置 `type` 字段来控制不同类型
:::demo components/Slider/types.vue :::

## 自定义颜色
如果不同类型的颜色无法满足需求，可以通过设置 `color` 来控制进度条颜色

:::demo components/Slider/color.vue :::

## 指定选择范围
可以使用 `range` 来配置范围选择
:::demo components/Slider/range.vue :::

## 指定步长
可以设置 `step` 指定步长
:::demo components/Slider/step.vue :::

## 自定义提示
可以配置 `tooltip-formatter` 来控制显示的文字

也可以配置 `tooltip-enable = false` 来控制不显示 `tooltip`

:::demo components/Slider/custom-tooltip.vue :::

## 配合输入框
可以设置 `input-enable` 开启输入框

但需要注意的是，如果开启了 `range`，则不会启用输入框
:::demo components/Slider/with-input.vue :::


