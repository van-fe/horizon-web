## 基本用法

标签提供 `small`、`medium`、`large` 三种尺寸，并可通过 `bold` 提升文字强调程度。应根据界面密度选择统一尺寸。

:::demo components/Tag/basic.vue :::

## 语义类型

使用 `type` 表达成功、信息、警告与错误状态。示例将类型放在真实发布流程中，便于比较语义和层级。

:::demo components/Tag/type.vue :::

## 低强调样式

开启 `plain` 可降低背景强调度，适合环境、来源等辅助信息，同时仍保留语义色。

:::demo components/Tag/plain.vue :::

## 形状

`round` 适合分类与筛选，`equally` 适合需要等宽对齐的短状态标签。

:::demo components/Tag/shape.vue :::

## 自定义颜色

通过 `color` 指定基础色后，组件会自动生成默认、悬浮、按下和禁用状态的配色。示例可切换普通、线性与禁用状态，检查不同场景下的辨识度。

:::demo components/Tag/colorful.vue :::

## 图标

使用 `icon` 属性或图标插槽补充状态含义。图标应与文字共同传达信息，不应成为唯一线索。

:::demo components/Tag/icon.vue :::

## 头像

`avatar` 可将人员头像与姓名组合成紧凑的负责人标签，也可通过插槽自定义头像内容。

:::demo components/Tag/avatar.vue :::

## 可激活标签

通过 `v-model:active` 控制激活状态，可构建支持多选的筛选标签，并将当前筛选结果同步展示给用户。

:::demo components/Tag/active.vue :::

## 可关闭标签

开启 `closable` 并监听关闭事件来维护标签列表。示例提供结果反馈和重置入口，便于观察完整交互。

:::demo components/Tag/closable.vue :::

## 禁用

`disabled` 用于展示不可操作但仍需保留的标签。禁用原因应在邻近文案中说明。

:::demo components/Tag/disabled.vue :::

## 加载状态

`loading` 适合标签内容正在同步或等待确认的短暂状态。示例在操作完成后给出明确反馈。

:::demo components/Tag/loading.vue :::

## 创建与编辑

`h-tag-group` 可通过 `use-create`、`editable` 和 `closable` 组合完整的标签管理流程；`before-create`、`before-edit`、`before-close` 可执行异步校验。

:::demo components/Tag/create-update.vue :::

## 折叠标签组

开启 `collapse` 后，标签组会根据可用宽度收起溢出项；配合 `expand`、提示方式和最少展示数量，可适配不同密度的容器。

:::demo components/Tag/collapse.vue :::
