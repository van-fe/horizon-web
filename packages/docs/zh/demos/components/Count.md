## 基础用法

通过 `start-value`、`end-value`、`step` 和 `delay` 控制计数过程。`change` 会在显示值变化时触发，可用于同步进度和辅助状态。

:::demo components/Count/demo1.vue :::

## 数字格式

`separator` 和 `extent` 控制分组，`decimal` 控制小数位数，`prefix` 与 `suffix` 添加单位。需要更丰富的内容时，可使用同名插槽。

设置 `auto-play="false"` 会直接显示格式化后的结束值，适合静态指标卡。

:::demo components/Count/prop.vue :::
