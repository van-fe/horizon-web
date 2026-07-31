import type { ExtractPropTypes, PropType, StyleValue, VNode } from 'vue';
import { declarePropType } from '@aurora/utils';
import { sizeProp } from '~/utils/useSize';
import type {
  HTableColumnData,
  HTableDynamicLoadMethodType,
  HTableRowDataType,
  HTableTransformedRowDataType,
  HTableRowKeyType,
  HTableSortType,
  HTableSpanMethodType,
  HTableSummaryMethodType,
  HTableTreeRowDataType,
} from '../utils/types';
import { HTableAlignEnum, HTableSortOrderEnum } from '../utils/types';
import type { TooltipProps } from '~/components/Tooltip/src/composables/useProps';
import type { LoadingOptions } from '~/directives/v-loading/src/composables/useOptions';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import type { CascaderProps } from '~/components/Cascader/src/composables/useProps';
import type { DatePickerProps } from '~/components/DatePicker/src/composables/useProps';
import type { SelectProps } from '~/components/Select/src/composables/useProps';
import type { TimePickerProps } from '~/components/TimePicker/src/composables/useProps';
import type { TreeSelectProps } from '~/components/TreeSelect/src/composables/useProps';
import type { InputNumberProps } from '~/components/InputNumber/src/composables/useProps';
import type { InputProps } from '~/components/Input/src/composables/useProps';

export const useTableProps = declarePropType({
  /**
   * 行数据的 `key`，用来优化数据展示
   * @en Configuration for row key.
   */
  rowKey: {
    type: [String, Number] as PropType<HTableRowKeyType>,
  },
  /**
   * 表格数据
   * @en Configuration for data.
   */
  data: {
    type: Array as PropType<HTableRowDataType[]>,
    default: () => [],
  },
  /**
   * 表格高度，默认根据表格数据自适应。 会使用 `@aurora/utils.sizeUnitTransform` 转化尺寸
   * @en Configuration for height.
   */
  height: {
    type: [String, Number],
  },
  /**
   * 表格最小高度。 会使用 `@aurora/utils.sizeUnitTransform` 转化尺寸
   * @en Configuration for min height.
   */
  minHeight: {
    type: [String, Number],
  },
  /**
   * 表格最大高度。 会使用 `@aurora/utils.sizeUnitTransform` 转化尺寸
   * @en Configuration for max height.
   */
  maxHeight: {
    type: [String, Number],
  },
  /**
   * 是否启用斑马纹
   * @en Configuration for stripe.
   */
  stripe: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示边框
   * `true`: 显示边框，并全部显示
   * `'full'`: 与 `true` 一致
   * `'default'`: 默认，只显示横向边框
   * `'outer'`: 只显示外边框
   * `false`: 不显示边框
   * @en Configuration for border.
   */
  border: {
    type: [Boolean, String] as PropType<boolean | 'default' | 'full' | 'outer'>,
    default: 'default',
  },
  /**
   * 是否在鼠标悬浮行时出现背景色
   * @en Configuration for hoverable.
   */
  hoverable: {
    type: Boolean,
    default: true,
  },
  /**
   * 尺寸
   * @en Configuration for size.
   */
  size: {
    type: sizeProp,
  },
  /**
   * 是否展示表头
   * @en Configuration for show header.
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /**
   * 表头是否根据滚动容器吸顶
   * @en Configuration for header sticky.
   */
  headerSticky: {
    type: Boolean,
    default: false,
  },
  /**
   * 吸顶表头滚动容器
   * @en Configuration for header sticky container.
   */
  headerStickyContainer: {
    type: [String, Object] as PropType<string | HTMLElement>,
  },
  /**
   * 吸顶表头的偏移距离（top）
   * @en Configuration for header sticky offset.
   */
  headerStickyOffset: {
    type: Number,
  },
  /**
   * 是否显示表头的列分割线
   * @en Configuration for show header divider.
   */
  showHeaderDivider: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否高亮已选中行
   * @en Configuration for highlight selected.
   */
  highlightSelected: {
    type: Boolean,
    default: true,
  },
  /**
   * 每行的 `class`
   * @en Configuration for row class name.
   */
  rowClassName: {
    type: [String, Function] as PropType<
      string | ((row: HTableTransformedRowDataType, index: number) => string)
    >,
  },
  /**
   * 每行的 `style`
   * @en Configuration for row style.
   */
  rowStyle: {
    type: [String, Array, Object, Function] as PropType<
      StyleValue | ((row: HTableTransformedRowDataType, index: number) => StyleValue)
    >,
  },
  /**
   * 每个单元格的 `class`
   * @en Configuration for cell class name.
   */
  cellClassName: {
    type: [String, Function] as PropType<
      | string
      | ((
          row: HTableTransformedRowDataType,
          column: HTableColumnData,
          rowIndex: number,
          columnIndex: number,
        ) => string)
    >,
  },
  /**
   * 每个单元格的 `style`
   * @en Configuration for cell style.
   */
  cellStyle: {
    type: [String, Array, Object, Function] as PropType<
      | StyleValue
      | ((
          row: HTableTransformedRowDataType,
          column: HTableColumnData,
          rowIndex: number,
          columnIndex: number,
        ) => StyleValue)
    >,
  },
  /**
   * 每个表头行的 `class`
   * @en Configuration for header row class name.
   */
  headerRowClassName: {
    type: [String, Function] as PropType<
      string | ((columns: HTableColumnData[], rowIndex: number) => string)
    >,
  },
  /**
   * 每个表头行的 `style`
   * @en Configuration for header row style.
   */
  headerRowStyle: {
    type: [String, Array, Object, Function] as PropType<
      StyleValue | ((columns: HTableColumnData[], rowIndex: number) => StyleValue)
    >,
  },
  /**
   * 每个表头单元格的 `class`
   * @en Configuration for header cell class name.
   */
  headerCellClassName: {
    type: [String, Function] as PropType<
      string | ((column: HTableColumnData, columnIndex: number) => string)
    >,
  },
  /**
   * 每个表头单元格的 `style`
   * @en Configuration for header cell style.
   */
  headerCellStyle: {
    type: [String, Array, Object, Function] as PropType<
      StyleValue | ((column: HTableColumnData, columnIndex: number) => StyleValue)
    >,
  },
  /**
   * 每个表尾行的 `class`
   * @en Configuration for footer row class name.
   */
  footerRowClassName: {
    type: [String, Function] as PropType<
      string | ((columns: HTableColumnData[], rowIndex: number) => string)
    >,
  },
  /**
   * 每个表尾行的 `style`
   * @en Configuration for footer row style.
   */
  footerRowStyle: {
    type: [String, Array, Object, Function] as PropType<
      StyleValue | ((columns: HTableColumnData[], rowIndex: number) => StyleValue)
    >,
  },
  /**
   * 每个表尾单元格的 `class`
   * @en Configuration for footer cell class name.
   */
  footerCellClassName: {
    type: [String, Function] as PropType<
      string | ((column: HTableColumnData, columnIndex: number, rowIndex: number) => string)
    >,
  },
  /**
   * 每个表尾单元格的 `style`
   * @en Configuration for footer cell style.
   */
  footerCellStyle: {
    type: [String, Array, Object, Function] as PropType<
      StyleValue | ((column: HTableColumnData, columnIndex: number, rowIndex: number) => StyleValue)
    >,
  },
  /**
   * 空数据时显示的文字
   * 也提供 `slots.empty` 插槽自定义
   * @en Configuration for empty text.
   */
  emptyText: {
    type: String,
  },
  /**
   * 对于树形表格，是否默认全部展开
   * 只有在初始化时会展开，后续 `data` 变动将不会再处理，需要使用 `setAllCollapseStatus` 方法展开
   * @en Configuration for default expand all.
   */
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  /**
   * 当前展开的节点
   * 需要设置 `row-key` 才可以使用
   * 可以使用 `v-model:expandRowKeys` 做双向绑定
   * @en Configuration for expand row keys.
   */
  expandRowKeys: {
    type: Array as PropType<Array<HTableRowKeyType>>,
  },
  /**
   * 是否对展开行做粘性定位处理
   * @en Configuration for expand row sticky.
   */
  expandRowSticky: {
    type: Boolean,
    default: true,
  },
  /**
   * 默认的排序方式
   * @en Configuration for default sort.
   */
  defaultSort: {
    type: Array as PropType<HTableSortType[]>,
    default: () => [],
  },
  /**
   * `tooltip` 的默认主题
   * @en Configuration for tooltip theme.
   */
  tooltipTheme: {
    type: String as PropType<TooltipProps['theme']>,
    default: 'dark',
  },
  /**
   * `tooltip` 的额外选项
   * @en Configuration for tooltip options.
   */
  tooltipOptions: {
    type: Object as PropType<Partial<TooltipProps>>,
  },
  /**
   * 是否显示表尾统计
   * @en Configuration for show summary.
   */
  showSummary: {
    type: Boolean,
    default: false,
  },
  /**
   * 表尾统计行行数
   * @en Configuration for summary row amount.
   */
  summaryRowAmount: {
    type: Number,
    default: 1,
  },
  /**
   * 表尾统计行第一个单元格的文字数组，按照从上到下的顺序渲染
   * 默认使用国际化文字
   * 可以被 `column.slots.footer` 覆盖
   * @en Configuration for summary texts.
   */
  summaryTexts: {
    type: Array as PropType<string[]>,
  },
  /**
   * 总结显示的计算方法
   * @en Configuration for summary method.
   */
  summaryMethod: {
    type: Function as PropType<HTableSummaryMethodType>,
  },
  /**
   * 合并行或列的计算方法
   * @en Configuration for span method.
   */
  spanMethod: {
    type: Function as PropType<HTableSpanMethodType>,
  },
  /**
   * 展示树形结构时，缩进距离
   * @en Configuration for indent.
   */
  indent: {
    type: Number,
    default: 24,
  },
  /**
   * 动态加载树结构子数据的方法
   * 如果树结构中 `children` 或设置了 `isLeaf` = false，则会调用此方法获取子数据
   * @en Configuration for dynamic load.
   */
  dynamicLoad: {
    type: Function as PropType<HTableDynamicLoadMethodType>,
  },
  /**
   * 树形表格的字段对应关系
   * @en Configuration for field map.
   */
  fieldMap: {
    type: Object as PropType<Partial<Record<keyof HTableTreeRowDataType, string>>>,
    default: () => ({
      children: 'children',
      isLeaf: 'isLeaf',
    }),
  },
  /**
   * 树形表格指定展开列
   * 如果不传入，则默认使用 `row-key` 所在列
   * 如果没有设置 `row-key` 的列，则使用第一个列
   * @en Configuration for tree expand field.
   */
  treeExpandField: {
    type: String,
  },
  /**
   * 是否始终显示滚动条
   * @en Configuration for scrollbar always on.
   */
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否处于加载状态
   * 也可以传入 `object` 用来自定义 `loading` 配置
   * @en Configuration for loading.
   */
  loading: {
    type: [Boolean, Object] as PropType<boolean | LoadingOptions>,
    default: false,
  },
  /**
   * 加载中的提示文字
   * @en Configuration for loading text.
   */
  loadingText: {
    type: String,
  },
  /**
   * 设置表格单元、行和列的布局方式
   * @en Configuration for table layout.
   */
  tableLayout: {
    type: String as PropType<'fixed' | 'auto'>,
    default: 'fixed',
  },
  /**
   * 是否启用列管理器
   * @en Configuration for use column manager.
   */
  useColumnManager: {
    type: Boolean,
    default: false,
  },
  /**
   * 表头标题内容是否粘性定位
   * @en Configuration for header content sticky.
   */
  headerContentSticky: {
    type: Boolean,
    default: true,
  },
});

export const useTableColumnProps = declarePropType({
  /**
   * 字段类型
   * `'default'`: 默认展示数据中的 `field` 字段内容
   * `'selection'`: 单选或多选框，会根据 `multiple` 自动判断渲染组件
   * `'index'`: 序号，从 1 开始记
   * `'expand'`: 只展示展开图标，用于嵌套表格展示
   * `'drag'`: 拖拽排序
   * @en Configuration for type.
   */
  type: {
    type: String as PropType<'default' | 'selection' | 'index' | 'expand' | 'drag'>,
    default: 'default',
  },
  /**
   * 如果设置了 `type=index`，则可以通过此字段自行指定序号
   * @en Configuration for index.
   */
  index: {
    type: [Number, Function] as PropType<
      number | ((index: number, row: HTableTransformedRowDataType) => number)
    >,
  },
  /**
   * 展示在 `header` 的文字
   * @en Configuration for title.
   */
  title: {
    type: [String, Number],
  },
  /**
   * 展示的字段
   * 可以使用 `lodash.get` 接受的数据形式展示，但请注意层级越深，性能影响越大
   * @en Configuration for field.
   */
  field: {
    type: String,
  },
  /**
   * 当前列的唯一 `key`，在启用一些效果时需要
   * @en Configuration for column key.
   */
  columnKey: {
    type: String,
  },
  /**
   * 排序，如果不指定，则按照挂载顺序排列
   * @en Configuration for order.
   */
  order: {
    type: Number,
  },
  /**
   * 宽度
   * @en Configuration for width.
   */
  width: {
    type: [String, Number],
  },
  /**
   * 最小宽度
   * @en Configuration for min width.
   */
  minWidth: {
    type: [String, Number],
  },
  /**
   * 是否固定列
   * `true`：同 `left`
   * `'left'`: 固定在左侧
   * `'right'`: 固定在右侧
   * `'hover'`: 在悬浮时显示在右侧，需要注意只有一个列可以设置这个值
   * @en Configuration for fixed.
   */
  fixed: {
    type: [Boolean, String] as PropType<boolean | 'left' | 'right' | 'hover'>,
    default: false,
  },
  /**
   * 是否锁定位置
   * @en Configuration for lock position.
   */
  lockPosition: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否锁定固定效果
   * @en Configuration for lock fixed.
   */
  lockFixed: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示
   * @en Configuration for visible.
   */
  visible: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否锁定显示状态
   * @en Configuration for lock visible.
   */
  lockVisible: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许拖动列宽调整大小
   * @en Configuration for resizable.
   */
  resizable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许拖动列排序
   * @en Configuration for draggable.
   */
  draggable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许排序
   * `'custom'`: 自行处理排序，一般用于后端排序，需要监听 `table.sort-change` 事件自行处理
   * @en Configuration for sortable.
   */
  sortable: {
    type: [Boolean, String] as PropType<boolean | 'custom'>,
    default: false,
  },
  /**
   * 排序方式
   * @en Configuration for sort by.
   */
  sortBy: {
    type: Function as PropType<<T>(a: T, b: T) => number>,
  },
  /**
   * 是否将排序按钮热区分割
   * `true`: 将会生成上下两个热区
   * `false`: 只有一个热区按钮，相应顺序由 `sort-orders` 控制
   * @en Configuration for sort separate.
   */
  sortSeparate: {
    type: Boolean,
    default: false,
  },
  /**
   * 当 `sort-separate = false` 时，点击排序按钮的轮训顺序
   * @en Configuration for sort orders.
   */
  sortOrders: {
    type: Array as PropType<Array<HTableSortOrderEnum | null>>,
    default: () => [HTableSortOrderEnum.ASC, HTableSortOrderEnum.DESC, null],
  },
  /**
   * 是否禁用排序
   * @en Configuration for sort disabled.
   */
  sortDisabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 排序方法
   * 仅限同步处理，如果使用异步或服务端排序见 `useBuiltInSort` 说明
   * @en Configuration for sort method.
   */
  sortMethod: {
    type: Function as PropType<
      (
        sortOrder: HTableSortOrderEnum,
      ) => (a: HTableTransformedRowDataType, b: HTableTransformedRowDataType) => number
    >,
  },
  /**
   * 是否使用内置的排序方法
   * 如果希望使用远程排序，则传入 `false`，并监听 `table.sort-change` 事件
   * @en Configuration for use built in sort.
   */
  useBuiltInSort: {
    type: Boolean,
    default: true,
  },
  /**
   * 格式化方法
   * @en Configuration for formatter.
   */
  formatter: {
    type: Function as PropType<
      (row: any, column: any, cellValue: any, index: number) => VNode | string
    >,
  },
  /**
   * 是否在内容溢出时显示 `tooltip`
   * 相当于启用 `tooltip` 的 `overflow`
   * @en Configuration for show overflow tooltip.
   */
  showOverflowTooltip: {
    type: Boolean,
    default: false,
  },
  /**
   * `tooltip` 的额外选项
   * @en Configuration for tooltip options.
   */
  tooltipOptions: {
    type: Object as PropType<Partial<TooltipProps>>,
  },
  /**
   * 是否在头部内容溢出时显示 `tooltip`
   * 相当于启用 `tooltip` 的 `overflow`
   * @en Configuration for show header overflow tooltip.
   */
  showHeaderOverflowTooltip: {
    type: Boolean,
    default: false,
  },
  /**
   * 头部 `tooltip` 的额外选项
   * @en Configuration for header tooltip options.
   */
  headerTooltipOptions: {
    type: Object as PropType<Partial<TooltipProps>>,
  },
  /**
   * 表头标题内容是否粘性定位
   * @en Configuration for header content sticky.
   */
  headerContentSticky: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否在尾部内容溢出时显示 `tooltip`
   * 相当于启用 `tooltip` 的 `overflow`
   * @en Configuration for show footer overflow tooltip.
   */
  showFooterOverflowTooltip: {
    type: Boolean,
    default: false,
  },
  /**
   * 尾部 `tooltip` 的额外选项
   * @en Configuration for footer tooltip options.
   */
  footerTooltipOptions: {
    type: Object as PropType<Partial<TooltipProps>>,
  },
  /**
   * 文本排列方式
   * @en Configuration for align.
   */
  align: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: HTableAlignEnum.LEFT,
  },
  /**
   * 表头文本排列方式
   * 如果不设置，会使用 `align` 的值
   * @en Configuration for header align.
   */
  headerAlign: {
    type: String as PropType<'left' | 'right' | 'center'>,
  },
  /**
   * 表尾文本排列方式
   * 如果不设置，会使用 `align` 的值
   * @en Configuration for footer align.
   */
  footerAlign: {
    type: String as PropType<'left' | 'right' | 'center'>,
  },
  /**
   * 列的 `class`
   * @en Configuration for class name.
   */
  className: {
    type: String,
  },
  /**
   * 表头的 `class`
   * @en Configuration for header class name.
   */
  headerClassName: {
    type: String,
  },
  /**
   * 表尾的 `class`
   * @en Configuration for footer class name.
   */
  footerClassName: {
    type: String,
  },
  /**
   * 仅当 `type = 'selection'` 时有效
   * 通过传入的方法返回 `boolean` 告知当前行是否可以选中
   * 会覆盖 `table.selectable`
   * @en Configuration for selectable.
   */
  selectable: {
    type: [Boolean, Function] as PropType<((row: any, index: number) => boolean) | boolean>,
    default: true,
  },
  /**
   * 已勾选的行数据，可以使用 `v-model:selectedKeys` 双向绑定
   * @en Configuration for selected keys.
   */
  selectedKeys: {
    type: [String, Number, Array] as PropType<string | number | Array<string | number>>,
  },
  /**
   * 仅当 `type = 'selection'` 时有效
   * 是否允许多选
   * @en Configuration for multiple.
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 仅当 `type = 'selection'` 时有效
   * 多选上限
   * @en Configuration for multiple limit.
   */
  multipleLimit: {
    type: Number,
    default: Infinity,
  },
  /**
   * 是否显示全选
   * @en Configuration for use check all.
   */
  useCheckAll: {
    type: Boolean,
    default: true,
  },
  /**
   * 在多选时且当半选时，可以控制点击表头的多选框时的行为。
   * `true`: 选中所有行
   * `false`: 取消选中所有行
   * @en Configuration for select on indeterminate.
   */
  selectOnIndeterminate: {
    type: Boolean,
    default: true,
  },
  /**
   * 在点击整行时，是否允许选中
   * 如果希望不与自定义渲染的单元格的点击事件冲突，请设置类似于 `@click.stop` 的事件阻止冒泡
   * @en Configuration for select on click row.
   */
  selectOnClickRow: {
    type: Boolean,
    default: false,
  },
  /**
   * 仅当 `type = 'selection'` 并设置 `table.row-key` 和 `table-column.column-key` 时有效
   * 是否在 `data` 更新时，仍保留当前列、行的选中态
   * 开启此项可以支持跨页多选
   * @en Configuration for reserve selection.
   */
  reserveSelection: {
    type: Boolean,
    default: false,
  },
  /**
   * 同行互斥的字段列表
   * 在同一行存在多个 `selection` 时可用
   * 选中当前列时，会取消该行中 `field` 命中列表的其他选择列
   * @en Configuration for exclusion fields.
   */
  exclusionFields: {
    type: Array as PropType<Array<string>>,
  },
  /**
   * 对于树形结构，父子级关系是否关联
   * @en Configuration for check strictly.
   */
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  /**
   * 提示信息
   * @en Configuration for tip.
   */
  tip: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 是否启用过滤
   * @en Configuration for filterable.
   */
  filterable: {
    type: Boolean,
    default: false,
  },
  /**
   * 过滤类型
   * @en Configuration for filter type.
   */
  filterType: {
    type: String as PropType<
      | 'input'
      | 'input-number'
      | 'select'
      | 'cascader'
      | 'tree-select'
      | 'date-picker'
      | 'time-picker'
    >,
    default: 'input',
  },
  /**
   * 过滤器额外选项
   * @en Configuration for filter options.
   */
  filterOptions: {
    type: Object as PropType<
      Partial<
        | InputProps
        | InputNumberProps
        | SelectProps
        | CascaderProps
        | TreeSelectProps
        | DatePickerProps
        | TimePickerProps
      >
    >,
  },
  /**
   * 是否禁用过滤
   * @en Configuration for filter disabled.
   */
  filterDisabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 过滤弹出框的定位，同 `popover.placement`
   * @en Configuration for filter popover placement.
   */
  filterPopoverPlacement: {
    type: String as PropType<PopoverProps['placement']>,
  },
  /**
   * 过滤弹出框的类名
   * @en Configuration for filter popover class name.
   */
  filterPopoverClassName: {
    type: [String, Object] as PropType<any>,
  },
  /**
   * 过滤弹出框的样式
   * @en Configuration for filter popover style.
   */
  filterPopoverStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
  },
  /**
   * 自定义过滤方法
   * @param value 当前筛选值，如果是多选选择器，则此类型是数组
   * @paramEn value The value value.
   * @param row 当前行的数据
   * @paramEn row The row value.
   * @param column 列的参数
   * @paramEn column The column value.
   * @en Configuration for filter method.
   */
  filterMethod: {
    type: Function as PropType<(value: any, row: any, column: any) => boolean>,
  },
  /**
   * 是否使用内置过滤功能
   * 如果希望使用后端过滤，则可以传入 `false`
   * @en Configuration for use built in filter.
   */
  useBuiltInFilter: {
    type: Boolean,
    default: true,
  },
});

export type TableProps = ExtractPropTypes<typeof useTableProps>;
export type TableColumnProps = ExtractPropTypes<typeof useTableColumnProps>;
