## 基本用法
与传统 `vue` 表格组件一致，给 `h-table` 传入 `data` 即表格数据；给 `h-table-column` 传入 `title` 作为标题，`field` 作为表格数据中每行摘取的数据
:::demo components/Table/basic.vue :::

## 尺寸
组件支持 `mini` `small` `medium` `large` 四个尺寸
:::demo components/Table/size.vue :::

## 边框
设置 `:border="true"` 开启全边框，缩减空间后仍能区分不同的元素，有较强的信息对比性  
:::demo components/Table/border.vue :::

## 斑马纹
设置 `:stripe="true"` 开启斑马纹，以用来引导用户的视线，避免在阅读时出现错行、迷失的情况  
:::demo components/Table/stripe.vue :::

## 状态表格
设置 `row-class-name`，可以将设定行给予自定义高亮颜色
:::demo components/Table/row-class-name.vue :::

## 溢出显示提示
如果内容太长会将内容换行。但希望不换行并保持一行显示，除了设定宽度，也可以设置 `show-overflow-tooltip`
:::demo components/Table/show-overflow-tooltip.vue :::

## 固定表头
如果表格条目过多，可以设置 `height | maxHeight` 来控制表格高度，从而使表头固定
:::demo components/Table/height.vue :::

## 表头吸顶
可以配置 `header-sticky` 开启表头吸顶，与普通模式下不同的是，此配置可以使表头在自定义的滚动容器内吸顶展示

滚动容器默认是父级容器，如果不是父级，则可以配置 `header-sticky-container` 来指定容器

:::demo components/Table/header-sticky.vue :::

## 固定列
为 `h-table-column` 设置 `fixed` 即可

可选参数是 `true` `'left'` `'right'`

:::demo components/Table/fixed.vue :::

## 拖拽列宽
默认情况下，每列都默认允许拖拽宽度，但如果需要配置某列不允许拖拽，请设置 `resizable = false` 即可
:::demo components/Table/resizable.vue :::

## 流体高度
当数据量是动态变化时，可以设置 `max-height`，当表格高度超出 `max-height` 后，会显示滚动条
:::demo components/Table/max-height.vue :::

## 多级表头
在 `h-table-column` 组件中套入 `h-table-column`，即可将子项纳入父级，实现多级表头

使用多级表头时，自动启用全边框样式，且无法更改

另外，子项的 `fixed` 的值会直接使用父级的 `fixed`

:::demo components/Table/multiple-header.vue :::

## 列管理
开启 `use-column-manager`，可以开启列管理
:::demo components/Table/use-column-manager.vue :::

## 单选
为 `h-table-column` 设置 `type = "selection"` 即可开启单选列

为了方便设置和理解，请将每一列理解为一个独立的表单元素

如果不做双向绑定，则在点击选择器时将不会有选中效果

:::demo components/Table/single.vue :::

## 多选
为 `h-table-column` 设置 `type = "selection"` `multiple = true` 即可开启多选列

为了方便设置和理解，请将每一列理解为一个独立的表单元素

如果不做双向绑定，则在点击选择器时将不会有选中效果

:::demo components/Table/multiple.vue :::

## 列提示
如果需要对列提示，则给予 `h-table-column` 设置 `tip` 即可
:::demo components/Table/tip.vue :::

## 排序
对需要排序的列设置 `sortable` 即可开启排序

`table` 内置了排序功能，使用默认的 `Array.prototype.sort` 排序方式

如果排序有特殊需求（例如数字、日期），则可以传入 `sort-method` 自定义前端排序能力

如果希望多列同时排序，则按下 `ctrl/command` 的同时点击排序图标

你也可以设置使用接口排序，既可以对 `table` 监听 `sort-change`，可以对 `column` 监听 `sort-change`，回调后更改 `data` 的顺序即可

:::demo components/Table/sort.vue :::

## 过滤

过滤有两种形式：

1. 提供可选项，以 `select` `date-picker` 等选择器组件的形式进行过滤
2. 直接进行搜索，以 `input` 或 `input-number` 输入类组件形式搜索

<br>

如果希望由接口过滤，则传入 `:use-built-in-filter="false"`，并对 `column` 监听 `filter-change` 事件

:::demo components/Table/filter.vue :::

## 自定义列模板
可以通过 `column` 默认插槽自定义列内容

可以在 [类型定义](#类型定义) 查看 `HTableCellScopeSlots` 类型
:::demo components/Table/column-default-slot.vue :::

## 自定义表头
可以通过 `column.header` 插槽自定义表头

可以在 [类型定义](#类型定义) 查看 `HTableHeaderCellScopeSlots` 类型
:::demo components/Table/column-header-slot.vue :::

## 空状态
数据为空时的展示形式，如果希望自定义文字，可以配置 `empty-text`

另外提供了 `empty` 插槽可做更多定制化能力

:::demo components/Table/empty.vue :::

## 加载中
可以配置 `loading` 使表格处于加载中状态

加载中使用 `v-loading` 处理，因此默认文字是国际化形式，可以通过 `loading-text` 配置自定义加载中文案

另外如果对于加载中有特别的配置，可以传入 `v-loading` 可接收的对象数据自定义其表现 

:::demo components/Table/loading.vue :::

## 展开行
如果存在子表，或不希望表头承载过多次要信息，则可以使用展开行功能

:::warning 请注意，如果存在多个 `type="expand"`，只会取第一个的 `expand` 插槽渲染 :::
:::demo components/Table/expand.vue :::

## 嵌套表格
在展开行的基础上，可以实现嵌套表格，用于将一些次要信息但是数组形式的数据展示的需求
:::demo components/Table/nested-tables.vue :::

## 树形表格
对于树结构，需要先配置 `prop.row-key` 确定每行的唯一值，然后通过配置 `children` 字段数据将子数据放入

如果有懒加载情况，需要对这行数据配置 `isLeaf: false`，并配置 `prop.dynamic-load` 方法

对于 `children` `isLeaf` 字段需要自定义的，可以通过 `prop.field-map` 修改

另外，树形表格会自动根据 `prop.row-key` 判断在哪一列上设置为展开列，如果 `prop.row-key` 不在给定的列中，则会自动给第一列设置为展开列

此外，也可以设置 `prop.tree-expand-field` 自定义展开列

:::demo components/Table/tree.vue :::

## 树形表格及单选
树结构的单选，可以通过给 `column` 配置 `type = "selection"` 启用

可以配置 `check-strictly` 用于勾选时忽略父子级关系
:::demo components/Table/tree-single-selection.vue :::

## 树形表格及多选
树结构的多选，可以通过给 `column` 配置 `type = "selection"` 和 `multiple = true` 启用

可以配置 `check-strictly` 用于勾选时忽略父子级关系

:::demo components/Table/tree-multiple-selection.vue :::

## 表尾合计
如果对于一些数值需要做统计，则可以开启 `show-summary` 控制是否显示表尾统计

如果需要多行合计，则设置 `summary-row-amount` 为你想要的行数，然后 `summary-method` 返回一个二维数组即可（参照第二个表格）

:::tip `summary-method` 始终需要返回一个二维数组 :::
:::demo components/Table/summary.vue :::

## 合并行、列
合并列和行可以传入 `span-method`，允许返回 `[number, number]` `{ rowSpan?: number; colSpan?: number }` `void(默认，不合并)`

当 `rowSpan` 或 `colSpan` 为 `0` 时，单元格会被隐藏

:::demo components/Table/span-method.vue :::

## 自定义索引
在设置列的 `type="index"` 后，如果对于索引有特殊设定，可以给 `index` 传入具体数值，或者传入一个函数用来计算

`index` 的类型是 `number | ((index: number, row: HTableTransformedRowDataType) => number)`

:::demo components/Table/index.vue :::

## 表格布局
可以配置 `fixed` `auto`，默认 `fixed`

参考 [table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout)
:::demo components/Table/table-layout.vue :::

## 类型定义
:::code ../../../../horizon-web/src/components/Table/src/utils/types.ts :::