## 基本用法

`h-select` 支持单选、多选、筛选、禁用状态，以及 `normal`、`emphasize`、`no-border` 三种输入框样式。

:::demo components/Select/basic.vue :::

## 尺寸

通过 `size` 使用 `small`、`medium`、`large` 三种尺寸。示例同时对比单选、多选、输入框样式和禁用状态。

:::demo components/Select/size.vue :::

## 单选标识

设置 `show-selected-icon` 可显示选中标识；通过 `selected-icon` 可替换默认图标。

:::demo components/Select/single.vue :::

## 自定义单选渲染

`tagRender` 可调整选中值的展示，`pickerInner` 则可完整接管输入区。可输入的单选场景更适合使用 `pickerInner`。

:::demo components/Select/single-render.vue :::

## 多选与折叠

设置 `multiple` 开启多选。`collapse-tags` 折叠已选标签，`collapse-tags-tooltip` 在悬停时展示完整结果，`max-collapse-tags` 可保留指定数量的可见标签。

:::demo components/Select/multiple.vue :::

## 自定义多选渲染

多选同样支持 `tagRender` 与 `pickerInner`。创建型选项没有额外属性时，应为自定义标签准备回退内容。

:::demo components/Select/multiple-render.vue :::

## 长标签折叠

标签会依据可用宽度动态折叠；`collapse-tags-fill-up` 会尽量利用剩余空间。选项很多时需留意宽度计算成本。

:::demo components/Select/tag-fold.vue :::

## 自定义下拉图标

通过 `dropdown-icon` 指定下拉图标，传入 `false` 可隐藏图标。

:::demo components/Select/icon-style.vue :::

## 分组

使用 `h-option-group` 组织选项。分组可以具名，也可以与普通选项混合使用。

:::demo components/Select/group.vue :::

## 禁用

`h-select`、`h-option` 和 `h-option-group` 均支持 `disabled`。组禁用会使组内全部选项不可选。

:::demo components/Select/disabled.vue :::

## 隐藏已选候选项

设置 `selected-visible="false"` 后，已选项会从下拉面板隐藏，模型值和输入框中的标签保持不变。

:::demo components/Select/hide-selected.vue :::

## 辅助说明文字

通过 `h-option` 的 `description` 补充上下文，并用 `description-position` 控制说明显示在右侧或下方。

:::demo components/Select/description.vue :::

## 过滤

`filterable` 开启输入过滤，`filter-method` 自定义匹配规则。面板筛选可使用 `panel-filter-option` 配合内置输入框，也可通过 `panelHeaderRender` 自定义。

:::demo components/Select/filter.vue :::

## 过滤关键词保留策略

多选过滤时，`reserve-keyword` 支持四种策略：`true`、`false`、`reserve-deselect` 与 `reserve-special`。

:::demo components/Select/reserve-keyword.vue :::

## 远程搜索

设置 `show-search` 并监听 `search` 事件，可按需更新远程结果和 `loading` 状态。`hide-panel-when-show-search-and-empty-list="false"` 会在无结果时仍保留面板。

:::demo components/Select/remote-search.vue :::

## 允许创建

`allow-create` 允许用户创建新选项；`before-create` 可校验空值、重复值或业务保留名称。

:::demo components/Select/creatable.vue :::

## 确认后提交

设置 `need-confirm` 后，面板内的选择会在确认时提交。按钮文字和 `dropConfirmRender` 操作区都可以自定义。

:::demo components/Select/confirm.vue :::

## 全选

设置 `use-check-all` 开启全选。`check-all-text` 与 `check-all-text-render` 可自定义摘要文案。

:::demo components/Select/check-all.vue :::

## 选项统计

设置 `use-statistic` 在多选面板展示统计信息，并通过 `statistic-text` 定制文案。统计模式优先于全选模式。

:::demo components/Select/statistic.vue :::

## 动态折叠

`collapse-tags` 可动态切换。常见做法是在聚焦时展开全部标签，失焦后恢复折叠。

:::demo components/Select/dynamic-collapse.vue :::

## 已选项置顶

`selected-option-order-to-top` 会在面板关闭后把已选项排到前面；分组场景只调整组内顺序。

:::demo components/Select/selected-option-order-to-top.vue :::

## 值格式化

`value-format` 可将选项信息转换为业务对象。新代码也可以直接使用对象类型的 `h-option.value`，以减少额外转换。

:::demo components/Select/format-value.vue :::

## 自定义 Option

通过 `optionRender` 统一定制选项内容，或使用单个 `h-option` 的插槽覆盖。`external-panel-style` 可调整下拉面板样式。

:::demo components/Select/option.vue :::

## 长选项

长文本默认单行省略；通过 `h-option.max-lines` 可允许指定行数。多选可结合折叠标签保持输入框稳定。

:::demo components/Select/overflow.vue :::

## 面板宽度

`fit-input-width=true` 让面板与输入框同宽，`false` 允许面板自然扩展，`fit-content` 则按内容计算宽度。

:::demo components/Select/fit-width.vue :::

## 初始空值

`initial-value` 决定初始化与清空后的模型值，可明确指定为 `null`、`[]` 等类型。空字符串仍被视为有效值。

:::demo components/Select/initial-value.vue :::

## 事件

示例在页面内记录 `focus`、`blur`、`change`、`clear`、`deselect` 与 `dropdownVisibleChange`，便于比较即时提交和确认提交。

:::demo components/Select/events.vue :::

## 自定义空状态

可通过 `empty-text` 修改默认文字，也可以使用 `empty` 插槽渲染紧凑提示或完整的 `h-empty`。

:::demo components/Select/empty.vue :::

## 触底加载

监听 `option-list-reach-bottom` 可增量加载数据；请求期间应设置 `loading` 并阻止重复加载，没有更多数据时停止请求。

:::demo components/Select/reach-bottom.vue :::

## 虚拟滚动

传入 `options` 启用虚拟列表。设置该属性后，默认插槽中的选项会被忽略，也不能再通过选项插槽定制内容。本例使用 120 条确定性数据。

:::demo components/Select/virtual-scroller.vue :::

## 自定义选择标签

`tagRender` 可按选项状态渲染不同标签，`option.label` 可定制面板内容，`pickerInner` 可进一步组合完整输入区。

:::demo components/Select/custom-tag-render.vue :::

## 抽屉中的异步多选

在抽屉表单中使用 Select 时，可将草稿值与已保存值分开，并在关闭组件时取消尚未完成的异步搜索。

:::demo components/Select/test.vue :::
