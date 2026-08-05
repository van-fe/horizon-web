## 何时使用

时间轴适合呈现按时间发生的一组里程碑、状态变更或操作记录，也可通过正序与倒序适应不同阅读方向。

## 基本样式

时间轴由节点、连接线、时间、名称和描述组成。示例并排比较三种尺寸，便于根据内容密度选择。

:::demo components/Timeline/basic.vue :::

## 状态与排序

节点可配置类型、颜色、图标、虚线和折叠内容，也可用插槽自定义名称与描述。示例提供排序控制以展示完整阅读路径。

:::demo components/Timeline/prop.vue :::

## `format` 值

`format` 直接接受 Day.js 格式字符串。更多可用格式请查看 [Day.js Format 文档](https://day.js.org/docs/zh-CN/display/format)。
