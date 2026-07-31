## 固定时间选择

通过 `start`、`end` 和 `step` 生成固定间隔的时间选项。绑定值始终使用 `HH:mm` 格式。

:::demo components/TimeSelect/basic.vue :::

## 展示格式

使用 Day.js 格式字符串配置 `format`。`format` 只影响展示文本；设置 `include-end-time` 可确保结束时间也出现在选项中。

:::demo components/TimeSelect/format.vue :::

## 时间范围联动

组合两个时间选择组件，并分别设置 `max-time` 与 `min-time`，可以禁用范围外的选项。

:::demo components/TimeSelect/range.vue :::
