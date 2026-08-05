## 基础用法

组合 `size`、`input-style`、`disabled` 与 `check-strictly`，并对比单选和多选。示例中的焦点、失焦与选择结果会直接显示在页面中。

:::demo components/Cascader/basic.vue :::

## 单选

`show-radio` 可以明确显示单选控件；配合 `check-strictly` 时，也能选择非叶子节点。

:::demo components/Cascader/single.vue :::

## 多选标签

使用 `collapse-tags`、`collapse-tags-tooltip` 与 `max-collapse-tags` 控制密集选项的摘要方式。

:::demo components/Cascader/multiple.vue :::

## 全选摘要

`use-check-all-summary` 会在全部选中后展示简洁摘要，`check-all-summary-text` 可替换业务文案。

:::demo components/Cascader/check-all-summary.vue :::

## 父子节点关联

`check-strictly` 控制父子节点是否独立选择。关闭时遵循层级关联，开启后可独立选择任意可用节点。

:::demo components/Cascader/check-strictly.vue :::

## 父节点展开行为

在 `check-strictly` 开启时，`expand-strictly` 决定选择父节点是否继续展开下一层。

:::demo components/Cascader/expand-strictly.vue :::

## 选项统计

`use-statistic` 将多选结果显示为数量摘要，`statistic-text` 可以使用业务名词。

:::demo components/Cascader/statistic.vue :::

## 选中项展示策略

`show-checked-strategy="fullPath"` 保留完整上下文；`leaf` 只显示最终节点。

:::demo components/Cascader/display-way.vue :::

## 悬浮打开面板

`trigger="hover"` 控制面板显隐，`hover-show-delay` 与 `hover-hide-delay` 可减少误触。

:::demo components/Cascader/trigger-hover.vue :::

## 子面板展开方式

`expand-trigger` 支持 `click` 与 `hover`。点击方式也适合触控和键盘，悬浮方式适合快速浏览。

:::demo components/Cascader/panel-trigger.vue :::

## 确认选择

`need-confirm` 将临时选择与最终值分开，并通过 `confirm`、`cancel` 事件反馈结果。

:::demo components/Cascader/confirm.vue :::

## 自定义确认区

可以修改内置按钮文案、通过 `confirmRender` 插槽组合操作，或调用实例暴露的 `confirmHandle`、`cancelHandle`。

:::demo components/Cascader/custom-confirm.vue :::

## 面板分组

只有 `groupLabel` 的选项可作为不可选择的分组标题，用于组织多套独立层级。

:::demo components/Cascader/panel-grouped.vue :::

## 动态加载

动态加载必须使用 `v-model:options` 同步选项，并将待加载节点标记为 `isLeaf: false`。同一层级的 `value` 必须唯一。

:::demo components/Cascader/dynamic-load.vue :::

## 过滤

`filterable` 支持在触发器中搜索；`panel-filter-option` 则在打开的面板内过滤。示例同时展示内置与自定义面板搜索框。

:::demo components/Cascader/filterable.vue :::

## 过滤结果全选

多选过滤时开启 `use-filter-check-all`，即可一次选择当前搜索结果中的可选节点。

:::demo components/Cascader/filter-check-all.vue :::

## 自定义过滤配置

`filter-method` 控制匹配规则，`filter-max-result` 限制结果数量，`filter-result-sort` 控制排序。

:::demo components/Cascader/filterable-config.vue :::

## 自定义过滤结果

`searchPanelRender` 插槽可以重新组织每条搜索结果，同时保留完整层级信息。

:::demo components/Cascader/filter-render-slot.vue :::

## 过滤并确认

组合 `filterable` 与 `need-confirm`，适合在大数据集中检索后批量确认。

:::demo components/Cascader/common-search-confirm.vue :::

## 保留搜索关键字

`reserve-keyword` 支持始终保留、始终清除，或仅在取消选择时保留关键字。

:::demo components/Cascader/filter-reserve-keyword.vue :::

## 空子列表

当节点被明确标记为非叶子但没有子项时，可使用 `empty-text` 或 `empty` 插槽解释该分支的空状态。

:::demo components/Cascader/empty-list.vue :::

## 空数据集

当 `options` 为空时，组件会展示空状态；可提供业务文案或完整的自定义空状态。

:::demo components/Cascader/empty.vue :::

## 字段映射

`field-map` 可把 `value`、`label`、`stringLabel` 与 `children` 映射到已有数据结构，无需预先改写数据。

如需扩展 TypeScript 类型，可在项目中补充 `HCascaderOption` 声明：

```ts
declare module '@aurora/horizon-web' {
  interface HCascaderOption {
    id?: HCascaderOption['value'];
    tag?: HCascaderOption['label'];
    tagString?: HCascaderOption['stringLabel'];
    nodes?: HCascaderOption[];
  }
}
```

:::demo components/Cascader/field-map.vue :::

## 自定义触发器内容

`selectRender` 插槽可将选中路径改写为更紧凑的业务摘要。

:::demo components/Cascader/custom-trigger-inner.vue :::

## 自定义选中标签

多选模式下使用 `tagRender` 自定义每个选中标签的内容。

:::demo components/Cascader/custom-selected-item.vue :::

## 自定义图标

`expand-icon` 与 `selected-icon` 分别控制层级展开图标和叶子选中图标。

:::demo components/Cascader/custom-icon.vue :::

## 自定义选项

`itemRender` 自定义选项行。若 `label` 是渲染函数，请同时提供 `stringLabel`，确保过滤和选中摘要仍有可读文本。

:::demo components/Cascader/custom-option-render.vue :::

## 自定义完整触发器

默认插槽可替换完整触发器；实例的 `inputChange` 方法可以把自定义输入同步给过滤逻辑。

:::demo components/Cascader/custom-trigger.vue :::

## 未匹配的值

当已保存值不在当前 `options` 中时，组件保留原始值；完整路径与叶子策略仍然有效。

:::demo components/Cascader/unmatched-value.vue :::

## 虚拟滚动

`use-virtual-scroll` 只渲染可见选项。示例使用 40 × 40 × 4、共 6,400 个叶子节点验证搜索和多选。

:::demo components/Cascader/virtual-scroll.vue :::

## 不可选择与禁用

`selectable: false` 只禁止选择当前节点，仍可展开并选择后代；`disabled: true` 会禁用该节点及其交互。

:::demo components/Cascader/selectable.vue :::
