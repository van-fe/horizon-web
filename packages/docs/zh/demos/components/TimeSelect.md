## 固定时间选项

通过 `start`、`end` 和 `step` 生成固定间隔选项。示例还可比较尺寸、输入框样式和禁用状态。

:::demo components/TimeSelect/basic.vue :::

## 展示格式

`format` 使用 Day.js 格式字符串，只改变展示文本；绑定值仍为 `HH:mm`。`include-end-time` 可确保结束时间出现在选项中。

:::demo components/TimeSelect/format.vue :::

## 时间范围联动

组合两个选择器，并分别设置 `max-time` 与 `min-time`，即可禁用当前范围之外的开始或结束时间。

:::demo components/TimeSelect/range.vue :::
