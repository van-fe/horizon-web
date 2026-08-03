## 基本用法

使用 `v-model` 绑定数值。示例在滑动过程中同步展示业务结果。

:::demo components/Slider/index.vue :::

## 尺寸

通过 `size` 选择 `small`、`medium` 或 `large`。

:::demo components/Slider/size.vue :::

## 禁用状态

`disabled` 会保留当前值和视觉上下文，但禁止指针与键盘修改。

:::demo components/Slider/disable.vue :::

## 语义类型

`type` 提供 `primary`、`info`、`success`、`warning` 和 `danger` 五种语义颜色。

:::demo components/Slider/types.vue :::

## 自定义颜色

`color` 可接收自定义颜色。优先传入 Horizon 语义 token，以便自动适配明暗主题。

:::demo components/Slider/color.vue :::

## 范围选择

启用 `range` 后，模型值为包含起止位置的二元数组。

:::demo components/Slider/range.vue :::

## 步长与刻度

`step` 支持整数和小数；当步长大于 1 时，可用 `show-separator` 展示离散刻度。

:::demo components/Slider/step.vue :::

## 自定义提示

通过 `tooltip-formatter` 补充业务单位，并用 `tooltip-enable`、`tooltip-placement` 控制显示方式。

:::demo components/Slider/custom-tooltip.vue :::

## 配合数字输入框

设置 `input-enable` 后，滑块与 `HInputNumber` 双向同步。范围选择模式不会显示输入框。

:::demo components/Slider/with-input.vue :::
