## 基本用法

使用 `title` 与 `description` 组织一条完整提示；重要但不需要立即打断用户的消息适合使用 `info`。

:::demo components/Alert/basic.vue :::

## 尺寸

`small` 适合紧凑区域，`medium` 适合包含标题、说明或操作的标准场景。

:::demo components/Alert/size.vue :::

## 语义类型

通过 `type` 区分信息、成功、警告和错误。不要只依赖颜色，建议配合明确标题与 `show-icon`。

:::demo components/Alert/demo1.vue :::

## 操作与关闭

设置 `primary-button-text` 或 `default-button-text` 后，使用 `on-primary`、`on-default` 接收关闭方法。示例会把操作结果保留在工具区，并支持重置后再次体验。

:::demo components/Alert/demo2.vue :::

## 内容布局

短消息采用紧凑的水平布局；描述换行后，操作区会自动移动到下方。为长消息提供明确的下一步操作，可避免用户在提示中迷失。

:::demo components/Alert/demo3.vue :::
