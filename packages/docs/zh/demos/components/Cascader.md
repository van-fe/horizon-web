## 基本用法
与其他选择器组件一致，都会有 `normal` `emphasize` `no-border` 样式
:::demo components/Cascader/basic.vue :::

## 单选
单选模式下，可以配置 `show-radio` 是否在节点中显示 `radio`

在显示 `radio` 的时候，只允许点击非叶子节点的 `radio` 才可以选中当前节点

与 `check-strictly` 配合，会有不同的显示逻辑

:::demo components/Cascader/single.vue :::

## 多选
与 `select` 一样，多选的标签使用了 `h-tag` 和 `h-tag-group` 组件结合

默认情况下，不会折叠选中项。可以配置 `collapse-tags = true` 折叠已选项

另外可以配置 `collapse-tags-tooltip = true`，可以在悬浮在 `+N` 上时显示其他已选项，并可以快捷反选已选项

另外，如果你的 `select` 空间很小，可能会此被挤压到只有 `+N` ，则可以配置 `max-collapse-tags`，强制展示多少个已选项，其余已选项则会折叠起来

:::demo components/Cascader/multiple.vue :::

## 全选
支持配置 `use-check-all-summary`，可以在所有选项都选中时标记为 `全部` (会有国际化处理)

如果希望自定义 `全部` 的文字，可以配置 `check-all-summary-text`

:::demo components/Cascader/check-all-summary.vue :::

## 父子节点点选严格模式
可以通过设置 `check-strictly` 来控制是否父子节点是否严格控制

如果设置为 `true`，则可以点选任意非 `disabled` 状态的节点

如果设置为 `false`，则不可展开 `disabled` 的节点，并且也无法选择其下属节点

:::demo components/Cascader/check-strictly.vue :::

## 父子节点展开控制
在配置了 `check-strictly = true` 后，展开的逻辑也会根据 `expand-strictly` 控制

如果设置为 `true`，则在点击 单选、多选 框时，不会展开子节点

如果设置为 `false`，点击 单选、多选 框时，会展开子节点

需要注意的是，对于单选，则需要开启 `show-radio` 才有效，否则无论如何都会展开子节点

:::demo components/Cascader/expand-strictly.vue :::

## 选项统计
传入 `use-statistic = true`，即可对多选项进行统计

可以设置 `statistic-text` 来指定统计文字

:::demo components/Cascader/statistic.vue :::

## 节点展示策略
可以选择展示完整路径还是展示叶子节点，默认展示完整路径
:::demo components/Cascader/display-way.vue :::

## 面板展开方式
设置 `trigger = 'hover'` 即可在悬浮时打开面板
:::demo components/Cascader/trigger-hover.vue :::

## 节点展开方式
可以设置 `expand-trigger` 来修改展开方式

默认为 `click`，可以修改为 `hover` 悬浮节点展开子节点

:::demo components/Cascader/panel-trigger.vue :::

## 确认选择
配置 `need-confirm = true` ，开启勾选后二次确认能力
:::demo components/Cascader/confirm.vue :::

## 确认选择自定义内容
通过 `confirm-button-text` `cancel-button-text` 可以控制确认、取消按钮文字

`confirmRender` 插槽也对外暴露了 `cancelHandle` `confirmHandle` 两个方法，用于自定义尾部时使用

另外也可以通过 `cascader` 实例对外暴露的 `exposeConfirm` 来执行确认和取消操作
:::demo components/Cascader/custom-confirm.vue :::
## panel 分组
因 `cascader` 树结构的特殊性，如果要达到分组效果，只能在传入 `options` 时，设置一个只有 `groupLabel` 的节点来模拟分组

:::demo components/Cascader/panel-grouped.vue :::

## 动态加载
需要注意的是，在使用动态加载的时候，需要使用 `v-model:options` 的方式传入 `options`

因为这里需要双向同步 `options` 数据，另外需要给动态加载的 `option`指定为非叶子结点（即设置 `isLeaf` 为 `false`）

**特别注意：同层级下的 `value` 不得重复，否则组件在挂载子项时会出现异常**
:::demo components/Cascader/dynamic-load.vue :::

## 过滤
设置 `filterable` 即可开启过滤功能

需要注意的是，`check-strictly` 状态的不同会影响展示的 `option` 列表
:::demo components/Cascader/filterable.vue :::

## 过滤全选
支持传入 `use-filter-check-all = true`，在过滤时开启全选

:::demo components/Cascader/filter-check-all.vue :::

## 过滤配置
配置 `filter-method` 可以自定义过滤方法

`filter-max-result` 可以控制展示结果的最大数量

`filter-result-sort` 可以控制过滤后结果的排列函数
:::demo components/Cascader/filterable-config.vue :::

## 过滤后自定义展示
通过 `searchPanelRender` 插槽，可以自定义过滤的内容
:::demo components/Cascader/filter-render-slot.vue :::

## 过滤并确认
`filterable` 与 `need-confirm` 结合展示
:::demo components/Cascader/common-search-confirm.vue :::

## 关键字保留
使用 `reserve-keyword` 配置，可以控制在勾选选项后是否保留关键字
:::demo components/Cascader/filter-reserve-keyword.vue :::

## 空列表
一般来说 `cascader` 会根据 `children` 是否为空来判断是否是叶子节点，如果你显式地给一个 `children` 为空的节点指定了 `isLeaf` 属性为 `false`，这个时候就会展示空状态
:::demo components/Cascader/empty-list.vue :::

## 空数据集
如果 `options` 是空数组，则会直接展示空状态

此处的设置对过滤情况下结果集为空时同样起效

:::demo components/Cascader/empty.vue :::


## 字段映射
配置 `field-map` 来控制映射的字段，从而可以直接使用自定的 `options` 结构而不必改成 `cascader` 指定默认字段

对于 `ts` 类型报错的问题，可以在全局 `declare HCascaderOption` 类型解决（以下方 `demo` 中使用字段为例）：

```ts
import type { HCascaderOption } from '@aurora/horizon-web';

declare module '@aurora/horizon-web' {
  interface HCascaderOption {
    id?: HCascaderOption['value'];
    tag?: HCascaderOption['label'];
    tagString?: HCascaderOption['stringLabel'];
  }
}
```
:::demo components/Cascader/field-map.vue :::

## 自定义触发器输入框内展示内容
通过 `selectRender` 插槽，可以自定义选择器的渲染
:::demo components/Cascader/custom-trigger-inner.vue :::

## 自定义选中 tag
常用在多选中，使用 `tagRender` 插槽自定义被选中的 `tag`
:::demo components/Cascader/custom-selected-item.vue :::

## 自定义图标
使用 `expand-icon` 和 `selected-icon`，可以自定义 展开图标 和 单选选中图标
:::demo components/Cascader/custom-icon.vue :::

## 自定义选项 render
使用 `itemRender` 自定义每个选项的渲染

为了选中内容和搜索结果的正确展示，当指定 `label` 的类型为函数时，需要给 `option` 指定 `stringLabel` 的值

:::demo components/Cascader/custom-option-render.vue :::

## 自定义选择器
借助 `default` 插槽，可以自定义选择器
:::demo components/Cascader/custom-trigger.vue :::

## model-value 未匹配
当 `model-value` 无法在 options 中找到时，会直接展示其 `value` 值
:::demo components/Cascader/unmatched-value.vue :::

## 虚拟滚动
设置 `use-virtual-scroll = true` ，则会启用虚拟滚动

此处展示了 5w 条数据（因为需要处理父子层级关系，层级越多性能影响越大，这个会在后续迭代中优化计算能力）

:::demo components/Cascader/virtual-scroll.vue :::

## 不可选择
传入 `options` 时，可以设定 `selectable = false`，即可不允许选择该项（但展开不受限）

**下面是与 disabled 的对比表格（树和树选择器同理）：**

<table class="md-table text-center">
    <thead>
        <tr>
            <th rowspan="2"></th>
            <th rowspan="2">设置对象</th>
            <th rowspan="2" width="120">鼠标选择对象</th>
            <th>disabled = true</th>
            <th>selectable = false</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th rowspan="9" width="120">父子节点关联</th>
            <th rowspan="3" width="80">根节点</th>
            <th width="80">当前根节点</th>
            <td>不可勾选、交互</td>
            <td>不可勾选、交互</td>
        </tr>
        <tr>
            <th width="80">子节点</th>
            <td>不可勾选、交互</td>
            <td>可以自由勾选并交互，并且可以关联勾选其后代节点状态</td>
        </tr>
        <tr>
            <th width="80">叶子节点</th>
            <td>不可勾选、交互</td>
            <td colspan="2">可以勾选并交互</td>
        </tr>
        <tr>
            <th rowspan="3" width="80">子节点</th>
            <th width="80">根节点</th>
            <td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>disabled</code> 的节点状态</td>
            <td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>unselectable</code> 的节点状态</td>
        </tr>
        <tr>
            <th width="80">当前子节点</th>
            <td>不可勾选、交互</td>
            <td>不可勾选、交互</td>
        </tr>
        <tr>
            <th width="80">叶子节点</th>
            <td>不可勾选、交互</td>
            <td>可以勾选并交互</td>
        </tr>
        <tr>
            <th rowspan="3" width="80">叶子节点</th>
            <th width="80">根节点</th>
            <td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>disabled</code> 的节点状态</td>
            <td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>unselectable</code> 的节点状态</td>
        </tr>
        <tr>
            <th width="80">子节点</th>
            <td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>disabled</code> 的节点状态</td>
            <td>可以勾选、交互 <br> 但不可更改其后代设置了 <code>unselectable</code> 的节点状态</td>
        </tr>
        <tr>
            <th width="80">当前叶子节点</th>
            <td>不可勾选、交互</td>
            <td>不可勾选、交互</td>
        </tr>
        <tr>
            <th rowspan="3" width="120">父子节点不关联</th>
            <th>根节点</th>
            <td rowspan="3" colspan="3">自身不可以勾选、交互，其他节点不干扰</td>
        </tr>
        <tr>
            <th>子节点</th>
        </tr>
        <tr>
            <th>叶子结点</th>
        </tr>
    </tbody>
</table>

如果启用了单选，则最好搭配 `show-radio = true`，否则在展示形式上无法看出区别
:::demo components/Cascader/selectable.vue :::
