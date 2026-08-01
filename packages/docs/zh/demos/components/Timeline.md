## 何时使用
- 当有一系列信息需按时间排列时，可正序和倒序；
- 需要有一条时间轴进行视觉上的串联时。

## 基本样式
时间轴包含节点、时间线、节点名称、时间日期、描述等基本信息，此外可附加Icon、描述、操作记录、评论等；
:::demo components/Timeline/basic.vue :::

## 可附加属性
:::demo components/Timeline/prop.vue :::

## `format` 值的说明

`format` 直接使用 Day.js 格式字符串。更多可用格式，请查看 [Day.js Format 文档](https://day.js.org/docs/zh-CN/display/format)。
