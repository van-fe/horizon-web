Table 适合展示需要比较、排序、筛选或批量操作的结构化数据。建议为动态数据设置稳定的 `row-key`，在窄屏中保留表格自身的横向滚动，并为加载、空数据、选择和远程查询提供明确状态反馈。

## 基本用法

通过 `data` 传入行数据；`h-table-column` 使用 `title` 定义表头，并通过 `field` 读取每行字段。单元格插槽可在需要时补充状态与操作。

:::demo components/Table/basic.vue :::

## 尺寸

组件支持 `mini`、`small`、`medium`、`large` 四种尺寸。选择密度时应兼顾信息量、触控目标和长文本可读性。

:::demo components/Table/size.vue :::

## 边框

`border` 支持 `default`、`full`、`outer` 和 `false`。全边框适合财务等高对齐场景，默认横向分隔更适合普通列表。

:::demo components/Table/border.vue :::

## 斑马纹

设置 `stripe` 开启斑马纹，可帮助用户跨越多列追踪较长的行。

:::demo components/Table/stripe.vue :::

## 状态表格

`row-class-name` 可根据行数据返回类名，用于表达异常、警告、完成等状态。自定义颜色应使用主题 token，并避免仅依赖颜色传递信息。

:::demo components/Table/row-class-name.vue :::

## 溢出显示提示

内容默认可以换行；需要保持单行时，可结合列宽与 `show-overflow-tooltip`。被截断的内容会在悬浮提示中完整展示。

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
为需要调整宽度的列设置 `resizable`，拖动表头右侧分隔线即可修改列宽
:::demo components/Table/resizable.vue :::

## 拖拽排序
为列设置 `draggable` 可以拖动表头调整同级列顺序；添加 `type="drag"` 的列则可以拖动手柄调整同级行顺序

行拖拽通过 `v-model:data` 回写数据。树形表格只允许节点在同一个父节点下排序

:::demo components/Table/draggable.vue :::

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

## 跨页选择

在选择列上开启 `reserve-selection` 后，替换表格当前页的 `data` 不会清除该列的已选值。选择值始终来自当前列的 `column-key`。

:::demo components/Table/cross-page-selection.vue :::

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

## 单元格与行编辑
给列设置 `editable` 即可启用编辑，默认双击进入。内置编辑器直接复用 Input、InputNumber、Select、TreeSelect、Cascader、DatePicker 和 TimePicker，也可以通过 `editor` 插槽自定义。

`before-edit`、`before-commit` 支持异步校验；提交失败时保留编辑器和错误状态。键盘使用 Enter 提交、Escape 取消。

:::demo components/Table/editable.vue :::

## 统一状态与远程查询
`getState`/`setState` 汇总排序、过滤、选择、展开以及列顺序、显隐、固定和宽度，可用 `exportState`/`restoreState` 持久化。设置 `query-mode="remote"` 后，排序过滤只更新查询状态并触发 `query-change`，不会处理本地数据。

:::demo components/Table/state.vue :::

## 分组与聚合
`group-by` 支持单字段、多级字段或计算函数。`aggregations` 内置 `sum`、`count`、`average`、`min`、`max`，也可传自定义函数。分组行支持鼠标和键盘展开，并可与虚拟滚动组合。

:::demo components/Table/grouping.vue :::

## 自定义列模板
可以通过 `column` 默认插槽自定义列内容

可以在 [类型定义](#类型定义) 查看 `HTableCellScopeSlots` 类型
:::demo components/Table/column-default-slot.vue :::

## 自定义表头
可以通过 `column.header` 插槽自定义表头

可以在 [类型定义](#类型定义) 查看 `HTableHeaderCellScopeSlots` 类型
:::demo components/Table/column-header-slot.vue :::

## 空状态
数据为空时可通过 `empty-text` 提供简短说明。

需要解释原因或提供恢复操作时，使用 `empty` 插槽构建更完整的空状态。

:::demo components/Table/empty.vue :::

## 加载中
设置 `loading` 使表格进入加载状态。加载控制应放在遮罩目标之外，确保用户始终可以取消或重试。

加载中使用 `v-loading` 处理，因此默认文字是国际化形式，可以通过 `loading-text` 配置自定义加载中文案

如果需要进一步配置，可传入 `v-loading` 支持的对象。

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
开启 `show-summary` 后，表格会内置累加各数值列，无需配置 `summary-method`。内置与示例中的自定义合计均使用 `Decimal.js` 累加，避免普通浮点计算误差。

需要自定义计算或展示多行合计时，通过 `summary-row-amount` 指定行数，并由 `summary-method` 返回二维数组。

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

## 虚拟滚动
数据量较大时设置 `virtual`，Table 才会按需启用组件库现有的 `VirtualScroller`；未开启时仍使用普通表格渲染，不增加运行时开销。固定行高性能最好，内容可能换行时可开启 `dynamic` 测量真实行高。

虚拟滚动必须同时设置 `height` 和 `row-key`。可通过 `scrollToIndex`、`scrollToRow` 和 `getVisibleRange` 控制或读取滚动位置。

:::demo components/Table/virtual.vue :::

## 大数据处理

`virtual` 只减少 DOM 渲染量；排序、过滤等数据计算可通过 `data-processing` 单独优化：

- `sync` 保持同步执行，适合小数据或自定义计算；
- `auto` 在数据达到阈值且只使用内置排序、过滤时自动使用 Web Worker；
- `worker` 优先使用 Worker，创建失败或操作不可序列化时会透明回退到同步执行。

Worker 只接收查询涉及字段的轻量投影并返回行索引，原始行对象、插槽和事件仍留在主线程。`sort-method`、`sort-by`、`filter-method` 等函数会使用同步回退；树表、SSR、严格 CSP 禁止 Blob Worker 或浏览器不支持 Worker 时同样不会影响结果。严格 CSP 场景可通过 `workerFactory` 提供自托管 Worker。

组件包同时导出无 UI 的 `processTableData`、`createTableDataProcessingRequest`、`createTableDataProcessingWorkerSource`、协议版本和相关类型，便于在构建阶段生成自托管 Worker，或在其他数据管理场景复用同一套列式过滤与稳定排序引擎。

如果业务以不可变方式替换 `data`，可设置 `:watch-data="false"` 跳过 Vue 对大数组的深度遍历；原地修改后需要调用 `reloadData()`。`data-processing-change`、`getDataProcessingState()`、`refreshDataProcessing()` 和 `cancelDataProcessing()` 可用于观察或控制异步任务。

Worker 默认 30 秒无响应会终止并同步回退，可通过 `workerTimeout` 调整，设为 `0` 可关闭超时。运行期替换自定义 `sort-method`、`sort-by` 或 `filter-method` 后，可调用 `refreshDataProcessing()` 立即重算。

下面的示例使用 50,000 行数据，可切换同步、自动和 Worker 模式，并与虚拟滚动组合。

:::demo components/Table/data-processing.vue :::

## 类型定义

:::code ../../../../horizon-web/src/components/Table/src/utils/types.ts :::
