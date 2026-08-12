# AutoComplete 自动补全

AutoComplete 在保留自由输入能力的同时，根据输入内容提供建议项。

## 基本用法

通过 `options` 提供候选项，并在 `search` 中按输入内容过滤。若希望聚焦后立即展示推荐项，应在输入前准备好初始数据。示例还可以对比 `size` 与 `input-style`。

:::demo vue/components/AutoComplete/basic.vue :::

## 选项备注

为选项设置 `description`，再通过 `description-position` 选择右侧紧凑布局或底部详细布局。

:::demo vue/components/AutoComplete/description.vue :::

## 远程加载

请求期间设置 `loading`，并可用 `loading-text` 解释当前状态。示例使用两个独立的短延时请求；新搜索会取消同一输入框的旧请求，组件卸载时也会清理计时器。

:::demo vue/components/AutoComplete/loading.vue :::

## 自定义面板

使用 `panelHeaderRender` 与 `panelFooterRender` 为候选面板补充上下文和键盘提示。示例在选中后展示完整成员信息，不挤占输入区域。

:::demo vue/components/AutoComplete/custom-render.vue :::

## Label 与 Value

`label` 用于展示，存在 `value` 时，选中后优先把 `value` 写入模型。示例在下方实时展示实际的 `modelValue`。

:::demo vue/components/AutoComplete/value-label.vue :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string \| null` | — | 当前输入值 |
| `options` | `HAutoCompleteOption[]` | `[]` | 建议项 |
| `disabled` | `boolean` | `false` | 禁止交互 |
| `clearable` | `boolean` | `false` | 显示清空按钮 |
| `trigger` | `'click' \| 'hover'` | `'click'` | 面板触发方式 |
| `inputEmitFrequency` | `number` | `200` | 输入值和搜索事件的防抖毫秒数 |
| `selectedOptionOrderToTop` | `boolean` | `false` | 打开时将当前建议置顶 |
| `loading` | `boolean` | `false` | 显示加载状态 |
| `descriptionPosition` | `'right' \| 'bottom'` | `'right'` | 说明文字布局 |
| `toBody` | `boolean` | `true` | 将面板渲染到 `body` |

## Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `value` | 输入值变化 |
| `dropdownVisibleChange` | `visible` | 面板显隐变化 |
| `search` | `value` | 防抖后的可搜索输入值变化 |
| `change` | `value` | 建议项改变输入值 |
| `select` | `value` | 选中建议项 |
| `clear` | — | 清空输入 |
| `optionListReachBottom` | `Event` | 键盘导航或滚动到达列表底部 |

## Slots 与 Exposes

插槽：`empty`、`loading`、`panelHeaderRender`、`panelFooterRender`、`option`、`prefix`、`suffix`、`picker`、`pickerInner` 和 `pickerContainer`。

组件暴露 `focus()`、`blur()`、`open()`、`close()`、`clear()` 和 `changePanelVisible(visible)`。
