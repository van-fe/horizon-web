# Cascader 级联选择器

Cascader 用于在层级选项树中选择一个或多个值。使用 `v-model` 绑定选中值；动态加载选项树时使用 `v-model:options`。

`HCascaderOption` 必须包含 `value: string | number` 与 `label: string | ((option) => VNode)`，还支持 `stringLabel`、`children`、`disabled`、`isLeaf`、`selectable` 与 `groupLabel`。选中值可以是一条路径（`Array<string | number>`）、多条路径、`null` 或 `undefined`。

## Props

### 值、选项与选择

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `ModelValueType` | — | 绑定的选中路径或路径集合 |
| `initialValue` | `Array<string \| number> \| null \| symbol` | `[]` | `modelValue` 为空时使用的初始值 |
| `options` | `HCascaderOption[]` | — | 选项树，必填 |
| `multiple` | `boolean` | `false` | 开启多选 |
| `multipleLimit` | `number` | `Infinity` | 最多可选数量 |
| `disabled` | `boolean` | — | 禁用组件 |
| `clearable` | `boolean` | `false` | 显示清空操作 |
| `checkStrictly` | `boolean` | `false` | 使父子节点可独立选择 |
| `expandStrictly` | `boolean` | `true` | 严格选择时为 `true` 则选择父节点后不自动展开 |
| `showCheckedStrategy` | `'fullPath' \| 'leaf'` | `'fullPath'` | 选中标签展示策略 |
| `pathSeparator` | `string` | `'/'` | 完整路径的标签分隔符 |
| `fieldMap` | `Partial<Record<keyof HCascaderOption, keyof HCascaderOption \| string>>` | — | 映射选项字段名 |

### 触发器与展示

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `trigger` | `'hover' \| 'click' \| 'never'` | `'click'` | 外层面板触发方式 |
| `expandTrigger` | `'hover' \| 'click'` | `'click'` | 子面板展开方式 |
| `hoverShowDelay` / `hoverHideDelay` | `number` | `0` / `200` | 悬浮触发延迟，单位毫秒 |
| `placeholder` | `string` | — | 触发器占位内容 |
| `size` | `'large' \| 'medium' \| 'small'` | — | 触发器尺寸 |
| `inputStyle` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | 触发器视觉样式 |
| `inputAttrs` | `PickerNativeInputAttrs` | — | 主输入框的原生 ARIA、数据、命名与表单属性；树关系和内部行为仍由 Cascader 管理 |
| `inputStatus` | `PickerInputStatusType` | `'normal'` | 触发器校验状态 |
| `maxHeight` | `string \| number` | `256` | 触发器最大高度 |
| `popperClassName` | `string` | — | 应用于浮层的自定义类名 |
| `placement` | `PopoverProps['placement']` | `'bottom-start'` | 首选浮层位置 |
| `flip` | `boolean` | `true` | 空间不足时允许浮层翻转 |
| `toBody` | `boolean` | `true` | 将浮层传送到 `body` |
| `popoverOptions` | `Partial<PopoverProps>` | — | Popover 扩展参数 |
| `showPopoverContentOnly` | `boolean` | `false` | 仅展示浮层内容 |
| `expandIcon` / `dropdownIcon` / `selectedIcon` | 图标输入 / 图标输入或 `false` / 图标输入 | — | 子级展开、触发器与单选叶子节点图标 |

### 标签与选项面板

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `collapseTags` | `boolean` | `false` | 多选时折叠已选标签 |
| `collapseTagsTooltip` | `boolean` | `false` | 在 tooltip 中展示折叠标签 |
| `maxCollapseTags` | `number` | — | 折叠前保留的标签数量 |
| `collapseTagsFillUp` | `boolean` | `true` | 让可见标签尽量填满可用空间 |
| `collapsedTagsProps` | `Partial<TagProps>` | — | 折叠 `+N` 标签的参数 |
| `useStatistic` | `boolean` | `false` | 显示多选数量统计 |
| `statisticText` | `string` | — | 选择数量前的文字 |
| `showRadio` | `boolean` | `false` | 单选时显示单选框 |
| `maxPanelItemWidth` | `number \| boolean` | `254` | 单项标签最大宽度；`false` 不限制 |
| `showTooltip` | `boolean` | `true` | 宽度受限时显示 tooltip；`false` 则换行 |
| `optionMaxLines` | `number` | `1` | 单项标签最大行数 |
| `tooltipShowAfter` / `tooltipHideAfter` | `number` | `100` / `200` | 选项 tooltip 延迟，单位毫秒 |
| `panelsLoading` | `boolean \| LoadingOptions` | `false` | 面板加载状态或 `v-loading` 参数 |
| `showTagsInPanel` | `boolean` | `false` | 在面板中展示已选标签 |
| `useVirtualScroll` | `boolean` | `false` | 为长选项列表启用虚拟滚动 |

### 过滤、确认与动态数据

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `filter` | `boolean \| HCascaderSearchParams` | `false` | 启用过滤，或传入 `{ filter, limit?, searchPanelWidth?, sort? }` |
| `filterable` | `boolean` | `false` | 在触发器中启用搜索 |
| `filterMethod` | `HCascaderFilterFunction` | — | 匹配函数：`(input, paths) => boolean` |
| `filterMaxResult` | `number` | `50` | 最大过滤结果数 |
| `filterResultSort` | `HCascaderFilterSortFunction` | — | 排序函数：`(a, b, inputValue) => number` |
| `reserveKeyword` | `boolean \| 'reserve-deselect'` | `true` | 过滤选择后是否保留关键字 |
| `inputAble` | `boolean` | `false` | `filter` 为 `false` 时允许自定义触发器输入 |
| `inputEmitFrequency` | `number` | `200` | 自定义输入事件频率，单位毫秒 |
| `searchIcon` | 图标输入或 `false` | check 图标 | 搜索图标；`false` 时隐藏 |
| `fitInputWidth` | `boolean \| 'fit-content'` | `true` | 过滤面板宽度策略 |
| `fitContentInputMinWidth` | `string \| number` | `1` | 自适应输入框最小宽度 |
| `panelFilterOption` | `boolean` | `false` | 在选项面板内启用过滤 |
| `panelFilterInputValue` | `string` | `''` | 受控的面板过滤文字 |
| `useBuildInPanelFilter` | `boolean` | `false` | 显示内置面板过滤输入框 |
| `panelInputPlaceholder` | `string` | — | 面板过滤占位内容 |
| `searchPanelWidth` | `string \| number` | `''` | 搜索结果面板宽度 |
| `useFilterCheckAll` | `boolean` | `false` | 多选过滤结果支持全选 |
| `useCheckAllSummary` | `boolean` | `false` | 全选时以摘要替代标签列表 |
| `checkAllSummaryText` | `string` | — | 自定义全选摘要文案 |
| `needConfirm` | `boolean` | `false` | 需要显式确认选择 |
| `confirmButtonText` / `cancelButtonText` | `string` | 国际化 | 确认操作按钮文案 |
| `emptyText` | `string` | 国际化 | 空状态文案 |
| `dynamicLoad` | `(node: HCascaderDynamicLoadNode) => Promise<HCascaderOption[]>` | — | 动态加载子项；`node` 包含 `level`、`options` 与可选的 `vnode` |

## Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `value: ModelValueType` | 选中值变化 |
| `update:options` | `options: HCascaderOption[]` | 选项树变化，包括动态加载更新 |
| `dropdownVisibleChange` | `visible: boolean` | 浮层显隐变化 |
| `focus` | — | 获得焦点 |
| `blur` | — | 失去焦点 |
| `input` | `value: string` | 自定义输入文字变化 |
| `search` | `value: string` | 过滤文字变化 |
| `change` | `selected?: boolean, option?: HCascaderExtendOption` | 一个选项被选中或取消选中 |
| `clear` | — | 清空选中值 |
| `select` | `valuePath?: Array<string \| number>, option?: HCascaderExtendOption` | 选中一个选项 |
| `deselect` | `valuePath?: Array<string \| number>, option?: HCascaderExtendOption` | 取消选中一个选项 |
| `modify` | `modelValue: ModelValueType, selected?: boolean, option?: HCascaderExtendOption` | 已提交的选项集合变化 |
| `confirm` | `modelValue: ModelValueType` | 确认暂存选择 |
| `cancel` | `modelValue: ModelValueType` | 取消暂存选择 |
| `panelReachBottom` | `event: Event \| undefined, parent: HCascaderOption \| null \| undefined` | 子面板滚动至底部 |
| `click` | `event: MouseEvent` | 点击触发器 |

## Slots

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | `{ visible: Ref<boolean> }` | 替换完整的触发器与面板组合 |
| `tagRender` | `HCascaderExtendOption` | 渲染一个已选标签 |
| `selectRender` | — | 渲染完整的已选值区域 |
| `itemRender` | `HCascaderExtendOption` | 渲染一个面板选项 |
| `searchPanelRender` | `{ paths: HCascaderFilterPathData[]; inputValue: string }` | 渲染过滤搜索结果 |
| `empty` | — | 渲染空选项列表 |
| `confirmRender` | `{ cancelHandle; confirmHandle }` | 渲染确认操作区 |
| `panelHeaderRender` | — | 渲染面板顶部内容 |
| `panelFooterRender` | — | 渲染面板底部内容 |
| `panelConfirmLeft` | — | 渲染确认区左侧内容 |

## Exposes

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| `confirmHandle()` | `() => void` | 确认暂存选择 |
| `cancelHandle()` | `() => void` | 取消暂存选择 |
| `focusOption(valuePath)` | `(valuePath: ModelValueSingleType) => void` | 聚焦指定选项路径 |
| `changePanelVisible(status)` | `(status: boolean) => void` | 改变浮层显隐 |
| `setInputAble()` | `() => void` | 启用自定义输入 |
| `inputChange(value)` | `(value: string \| null) => void` | 将自定义触发器文字传给过滤逻辑；`null` 清空 |
| `clear()` | `() => void` | 清空已选值 |
| `renderedModelValueTags` | `Ref<Array<VNode \| JSX.Element>>` | 已渲染的选中标签节点 |
| `focus()` | `() => void` | 聚焦组件 |
| `blur()` | `() => void` | 使组件失焦 |

## 基础用法

组合 `size`、`input-style`、`disabled` 与 `check-strictly`，并对比单选和多选。示例中的焦点、失焦与选择结果会直接显示在页面中。

:::demo vue/components/Cascader/basic.vue :::

## 单选

`show-radio` 可以明确显示单选控件；配合 `check-strictly` 时，也能选择非叶子节点。

:::demo vue/components/Cascader/single.vue :::

## 多选标签

使用 `collapse-tags`、`collapse-tags-tooltip` 与 `max-collapse-tags` 控制密集选项的摘要方式。

:::demo vue/components/Cascader/multiple.vue :::

## 全选摘要

`use-check-all-summary` 会在全部选中后展示简洁摘要，`check-all-summary-text` 可替换业务文案。

:::demo vue/components/Cascader/check-all-summary.vue :::

## 父子节点关联

`check-strictly` 控制父子节点是否独立选择。关闭时遵循层级关联，开启后可独立选择任意可用节点。

:::demo vue/components/Cascader/check-strictly.vue :::

## 父节点展开行为

在 `check-strictly` 开启时，`expand-strictly` 决定选择父节点是否继续展开下一层。

:::demo vue/components/Cascader/expand-strictly.vue :::

## 选项统计

`use-statistic` 将多选结果显示为数量摘要，`statistic-text` 可以使用业务名词。

:::demo vue/components/Cascader/statistic.vue :::

## 选中项展示策略

`show-checked-strategy="fullPath"` 保留完整上下文；`leaf` 只显示最终节点。

:::demo vue/components/Cascader/display-way.vue :::

## 悬浮打开面板

`trigger="hover"` 控制面板显隐，`hover-show-delay` 与 `hover-hide-delay` 可减少误触。

:::demo vue/components/Cascader/trigger-hover.vue :::

## 子面板展开方式

`expand-trigger` 支持 `click` 与 `hover`。点击方式也适合触控和键盘，悬浮方式适合快速浏览。

:::demo vue/components/Cascader/panel-trigger.vue :::

## 确认选择

`need-confirm` 将临时选择与最终值分开，并通过 `confirm`、`cancel` 事件反馈结果。

:::demo vue/components/Cascader/confirm.vue :::

## 自定义确认区

可以修改内置按钮文案、通过 `confirmRender` 插槽组合操作，或调用实例暴露的 `confirmHandle`、`cancelHandle`。

:::demo vue/components/Cascader/custom-confirm.vue :::

## 面板分组

只有 `groupLabel` 的选项可作为不可选择的分组标题，用于组织多套独立层级。

:::demo vue/components/Cascader/panel-grouped.vue :::

## 动态加载

动态加载必须使用 `v-model:options` 同步选项，并将待加载节点标记为 `isLeaf: false`。同一层级的 `value` 必须唯一。

:::demo vue/components/Cascader/dynamic-load.vue :::

## 过滤

`filterable` 支持在触发器中搜索；`panel-filter-option` 则在打开的面板内过滤。示例同时展示内置与自定义面板搜索框。

:::demo vue/components/Cascader/filterable.vue :::

## 过滤结果全选

多选过滤时开启 `use-filter-check-all`，即可一次选择当前搜索结果中的可选节点。

:::demo vue/components/Cascader/filter-check-all.vue :::

## 自定义过滤配置

`filter-method` 控制匹配规则，`filter-max-result` 限制结果数量，`filter-result-sort` 控制排序。

:::demo vue/components/Cascader/filterable-config.vue :::

## 自定义过滤结果

`searchPanelRender` 插槽可以重新组织每条搜索结果，同时保留完整层级信息。

:::demo vue/components/Cascader/filter-render-slot.vue :::

## 过滤并确认

组合 `filterable` 与 `need-confirm`，适合在大数据集中检索后批量确认。

:::demo vue/components/Cascader/common-search-confirm.vue :::

## 保留搜索关键字

`reserve-keyword` 支持始终保留、始终清除，或仅在取消选择时保留关键字。

:::demo vue/components/Cascader/filter-reserve-keyword.vue :::

## 空子列表

当节点被明确标记为非叶子但没有子项时，可使用 `empty-text` 或 `empty` 插槽解释该分支的空状态。

:::demo vue/components/Cascader/empty-list.vue :::

## 空数据集

当 `options` 为空时，组件会展示空状态；可提供业务文案或完整的自定义空状态。

:::demo vue/components/Cascader/empty.vue :::

## 字段映射

`field-map` 可把 `value`、`label`、`stringLabel` 与 `children` 映射到已有数据结构，无需预先改写数据。

如需扩展 TypeScript 类型，可在项目中补充 `HCascaderOption` 声明：

```ts
declare module '@aurora/horizon-vue' {
  interface HCascaderOption {
    id?: HCascaderOption['value'];
    tag?: HCascaderOption['label'];
    tagString?: HCascaderOption['stringLabel'];
    nodes?: HCascaderOption[];
  }
}
```

:::demo vue/components/Cascader/field-map.vue :::

## 自定义触发器内容

`selectRender` 插槽可将选中路径改写为更紧凑的业务摘要。

:::demo vue/components/Cascader/custom-trigger-inner.vue :::

## 自定义选中标签

多选模式下使用 `tagRender` 自定义每个选中标签的内容。

:::demo vue/components/Cascader/custom-selected-item.vue :::

## 自定义图标

`expand-icon` 与 `selected-icon` 分别控制层级展开图标和叶子选中图标。

:::demo vue/components/Cascader/custom-icon.vue :::

## 自定义选项

`itemRender` 自定义选项行。若 `label` 是渲染函数，请同时提供 `stringLabel`，确保过滤和选中摘要仍有可读文本。

:::demo vue/components/Cascader/custom-option-render.vue :::

## 自定义完整触发器

默认插槽可替换完整触发器；实例的 `inputChange` 方法可以把自定义输入同步给过滤逻辑。

:::demo vue/components/Cascader/custom-trigger.vue :::

## 未匹配的值

当已保存值不在当前 `options` 中时，组件保留原始值；完整路径与叶子策略仍然有效。

:::demo vue/components/Cascader/unmatched-value.vue :::

## 虚拟滚动

`use-virtual-scroll` 只渲染可见选项。示例使用 40 × 40 × 4、共 6,400 个叶子节点验证搜索和多选。

:::demo vue/components/Cascader/virtual-scroll.vue :::

## 不可选择与禁用

`selectable: false` 只禁止选择当前节点，仍可展开并选择后代；`disabled: true` 会禁用该节点及其交互。

:::demo vue/components/Cascader/selectable.vue :::
