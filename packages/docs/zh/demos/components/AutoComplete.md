## 基本用法

通过 `options` 提供候选项，并在 `search` 中按输入内容过滤。若希望聚焦后立即展示推荐项，应在输入前准备好初始数据。示例还可以对比 `size` 与 `input-style`。

:::demo components/AutoComplete/basic.vue :::

## 选项备注

为选项设置 `description`，再通过 `description-position` 选择右侧紧凑布局或底部详细布局。

:::demo components/AutoComplete/description.vue :::

## 远程加载

请求期间设置 `loading`，并可用 `loading-text` 解释当前状态。示例使用两个独立的短延时请求；新搜索会取消同一输入框的旧请求，组件卸载时也会清理计时器。

:::demo components/AutoComplete/loading.vue :::

## 自定义面板

使用 `panelHeaderRender` 与 `panelFooterRender` 为候选面板补充上下文和键盘提示。示例在选中后展示完整成员信息，不挤占输入区域。

:::demo components/AutoComplete/custom-render.vue :::

## Label 与 Value

`label` 用于展示，存在 `value` 时，选中后优先把 `value` 写入模型。示例在下方实时展示实际的 `modelValue`。

:::demo components/AutoComplete/value-label.vue :::
