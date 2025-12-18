import type { ExtractPropTypes, PropType, StyleValue, VNode, Ref } from 'vue';
import { declarePropType } from '@aurora/shared';
import { sizeProp } from '~/utils/useSize';
import type {
  NTableDynamicLoadMethodType,
  NTableRowDataType,
  NTableTransformedRowDataType,
  NTableRowKeyType,
  NTableSortType,
  NTableSpanMethodType,
  NTableSummaryMethodType,
  NTableTreeRowDataType,
} from '../utils/types';
import { NTableAlignEnum, NTableSortOrderEnum } from '../utils/types';
import type { TooltipProps } from '~/components/Tooltip/src/composables/useProps';
import type { LoadingProps } from '~/directives/v-loading/src/composables/useProps';
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
   */
  rowKey: {
    type: [String, Number] as PropType<NTableRowKeyType>,
  },
  /**
   * 表格数据
   */
  data: {
    type: Array as PropType<NTableRowDataType[]>,
    default: () => [],
  },
  /**
   * 表格高度，默认根据表格数据自适应。 会使用 `@aurora/shared.sizeUnitTransform` 转化尺寸
   */
  height: {
    type: [String, Number],
  },
  /**
   * 表格最小高度。 会使用 `@aurora/shared.sizeUnitTransform` 转化尺寸
   */
  minHeight: {
    type: [String, Number],
  },
  /**
   * 表格最大高度。 会使用 `@aurora/shared.sizeUnitTransform` 转化尺寸
   */
  maxHeight: {
    type: [String, Number],
  },
  /**
   * 是否启用斑马纹
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
   */
  border: {
    type: [Boolean, String] as PropType<boolean | 'default' | 'full' | 'outer'>,
    default: 'default',
  },
  /**
   * 是否在鼠标悬浮行时出现背景色
   */
  hoverable: {
    type: Boolean,
    default: true,
  },
  /**
   * 尺寸
   */
  size: {
    type: sizeProp,
  },
  /**
   * 是否展示表头
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /**
   * 表头是否根据滚动容器吸顶
   */
  headerSticky: {
    type: Boolean,
    default: false,
  },
  /**
   * 吸顶表头滚动容器
   */
  headerStickyContainer: {
    type: [String, Object] as PropType<string | HTMLElement>,
  },
  /**
   * 吸顶表头的偏移距离（top）
   */
  headerStickyOffset: {
    type: Number,
  },
  /**
   * 是否显示表头的列分割线
   */
  showHeaderDivider: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否高亮已选中行
   */
  highlightSelected: {
    type: Boolean,
    default: true,
  },
  /**
   * 每行的 `class`
   */
  rowClassName: {
    type: [String, Function] as PropType<
      string | ((row: NTableTransformedRowDataType, index: number) => string)
    >,
  },
  /**
   * 每行的 `style`
   */
  rowStyle: {
    type: [String, Array, Object, Function] as PropType<
      StyleValue | ((row: NTableTransformedRowDataType, index: number) => StyleValue)
    >,
  },
  /**
   * 每个单元格的 `class`
   */
  cellClassName: {
    type: [String, Function] as PropType<string | ((column: unknown) => string)>,
  },
  /**
   * 每个单元格的 `style`
   */
  cellStyle: {
    type: [String, Array, Object, Function] as PropType<
      StyleValue | ((row: NTableTransformedRowDataType) => StyleValue)
    >,
  },
  /**
   * 每个表头行的 `class`
   */
  headerRowClassName: {
    type: [String, Function] as PropType<string | ((row: unknown) => string)>,
  },
  /**
   * 每个表头行的 `style`
   */
  headerRowStyle: {
    type: [String, Array, Object, Function] as PropType<
      StyleValue | ((row: NTableTransformedRowDataType) => StyleValue)
    >,
  },
  /**
   * 每个表头单元格的 `class`
   */
  headerCellClassName: {
    type: [String, Function] as PropType<string | ((column: unknown) => string)>,
  },
  /**
   * 每个表头单元格的 `style`
   */
  headerCellStyle: {
    type: [String, Array, Object, Function] as PropType<
      StyleValue | ((row: NTableTransformedRowDataType) => StyleValue)
    >,
  },
  /**
   * 每个表尾行的 `class`
   */
  footerRowClassName: {
    type: [String, Function] as PropType<string | ((row: NTableTransformedRowDataType) => string)>,
  },
  /**
   * 每个表尾行的 `style`
   */
  footerRowStyle: {
    type: [String, Array, Object, Function] as PropType<
      StyleValue | ((row: NTableTransformedRowDataType) => StyleValue)
    >,
  },
  /**
   * 每个表尾单元格的 `class`
   */
  footerCellClassName: {
    type: [String, Function] as PropType<string | ((column: unknown) => string)>,
  },
  /**
   * 每个表尾单元格的 `style`
   */
  footerCellStyle: {
    type: [String, Array, Object, Function] as PropType<
      StyleValue | ((row: NTableTransformedRowDataType) => StyleValue)
    >,
  },
  /**
   * 空数据时显示的文字
   * 也提供 `slots.empty` 插槽自定义
   */
  emptyText: {
    type: String,
  },
  /**
   * 对于树形表格，是否默认全部展开
   * 只有在初始化时会展开，后续 `data` 变动将不会再处理，需要使用 `setAllCollapseStatus` 方法展开
   */
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  /**
   * 当前展开的节点
   * 需要设置 `row-key` 才可以使用
   * 可以使用 `v-model:expandRowKeys` 做双向绑定
   */
  expandRowKeys: {
    type: Array as PropType<Array<NTableRowKeyType>>,
  },
  /**
   * 是否对展开行做粘性定位处理
   */
  expandRowSticky: {
    type: Boolean,
    default: true,
  },
  /**
   * 默认的排序方式
   */
  defaultSort: {
    type: Array as PropType<NTableSortType[]>,
    default: () => [],
  },
  /**
   * `tooltip` 的默认主题
   */
  tooltipTheme: {
    type: String as PropType<TooltipProps['theme']>,
    default: 'dark',
  },
  /**
   * `tooltip` 的额外选项
   */
  tooltipOptions: {
    type: Object as PropType<Partial<TooltipProps>>,
  },
  /**
   * 是否显示表尾统计
   */
  showSummary: {
    type: Boolean,
    default: false,
  },
  /**
   * 表尾统计行行数
   */
  summaryRowAmount: {
    type: Number,
    default: 1,
  },
  /**
   * 表尾统计行第一个单元格的文字数组，按照从上到下的顺序渲染
   * 默认使用国际化文字
   * 可以被 `column.slots.footer` 覆盖
   */
  summaryTexts: {
    type: Array as PropType<string[]>,
  },
  /**
   * 总结显示的计算方法
   */
  summaryMethod: {
    type: Function as PropType<NTableSummaryMethodType>,
  },
  /**
   * 合并行或列的计算方法
   */
  spanMethod: {
    type: Function as PropType<NTableSpanMethodType>,
  },
  /**
   * 展示树形结构时，缩进距离
   */
  indent: {
    type: Number,
    default: 24,
  },
  /**
   * 动态加载树结构子数据的方法
   * 如果树结构中 `children` 或设置了 `isLeaf` = false，则会调用此方法获取子数据
   */
  dynamicLoad: {
    type: Function as PropType<NTableDynamicLoadMethodType>,
  },
  /**
   * 树形表格的字段对应关系
   */
  fieldMap: {
    type: Object as PropType<Partial<Record<keyof NTableTreeRowDataType, string>>>,
    default: () => ({
      children: 'children',
      isLeaf: 'isLeaf',
    }),
  },
  /**
   * 树形表格指定展开列
   * 如果不传入，则默认使用 `row-key` 所在列
   * 如果没有设置 `row-key` 的列，则使用第一个列
   */
  treeExpandField: {
    type: String,
  },
  /**
   * 是否始终显示滚动条
   */
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否处于加载状态
   * 也可以传入 `object` 用来自定义 `loading` 配置
   */
  loading: {
    type: [Boolean, Object] as PropType<boolean | Partial<LoadingProps>>,
    default: false,
  },
  /**
   * 加载中的提示文字
   */
  loadingText: {
    type: String,
  },
  /**
   * 设置表格单元、行和列的布局方式
   */
  tableLayout: {
    type: String as PropType<'fixed' | 'auto'>,
    default: 'fixed',
  },
  /**
   * 是否启用列管理器
   */
  useColumnManager: {
    type: Boolean,
    default: false,
  },
  /**
   * 表头标题内容是否粘性定位
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
   */
  type: {
    type: String as PropType<'default' | 'selection' | 'index' | 'expand' | 'drag'>,
    default: 'default',
  },
  /**
   * 如果设置了 `type=index`，则可以通过此字段自行指定序号
   */
  index: {
    type: [Number, Function] as PropType<
      number | ((index: number, row: NTableTransformedRowDataType) => number)
    >,
  },
  /**
   * 展示在 `header` 的文字
   */
  title: {
    type: [String, Number],
  },
  /**
   * 展示的字段
   * 可以使用 `lodash.get` 接受的数据形式展示，但请注意层级越深，性能影响越大
   */
  field: {
    type: String,
  },
  /**
   * 当前列的唯一 `key`，在启用一些效果时需要
   */
  columnKey: {
    type: String,
  },
  /**
   * 排序，如果不指定，则按照挂载顺序排列
   */
  order: {
    type: Number,
  },
  /**
   * 宽度
   */
  width: {
    type: [String, Number],
  },
  /**
   * 最小宽度
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
   */
  fixed: {
    type: [Boolean, String] as PropType<boolean | 'left' | 'right' | 'hover'>,
    default: false,
  },
  /**
   * 是否锁定位置
   */
  lockPosition: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否锁定固定效果
   */
  lockFixed: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示
   */
  visible: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否锁定显示状态
   */
  lockVisible: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许拖动列宽调整大小
   */
  resizable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许拖动列排序
   */
  draggable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许排序
   * `'custom'`: 自行处理排序，一般用于后端排序，需要监听 `table.sort-change` 事件自行处理
   */
  sortable: {
    type: [Boolean, String] as PropType<boolean | 'custom'>,
    default: false,
  },
  /**
   * 排序方式
   */
  sortBy: {
    type: Function as PropType<<T>(a: T, b: T) => number>,
  },
  /**
   * 是否将排序按钮热区分割
   * `true`: 将会生成上下两个热区
   * `false`: 只有一个热区按钮，相应顺序由 `sort-orders` 控制
   */
  sortSeparate: {
    type: Boolean,
    default: false,
  },
  /**
   * 当 `sort-separate = false` 时，点击排序按钮的轮训顺序
   */
  sortOrders: {
    type: Array as PropType<Array<NTableSortOrderEnum | null>>,
    default: () => [NTableSortOrderEnum.ASC, NTableSortOrderEnum.DESC, null],
  },
  /**
   * 是否禁用排序
   */
  sortDisabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 排序方法
   * 仅限同步处理，如果使用异步或服务端排序见 `useBuiltInSort` 说明
   */
  sortMethod: {
    type: Function as PropType<
      (
        sortOrder: NTableSortOrderEnum,
      ) => (a: NTableTransformedRowDataType, b: NTableTransformedRowDataType) => number
    >,
  },
  /**
   * 是否使用内置的排序方法
   * 如果希望使用远程排序，则传入 `false`，并监听 `table.sort-change` 事件
   */
  useBuiltInSort: {
    type: Boolean,
    default: true,
  },
  /**
   * 格式化方法
   */
  formatter: {
    type: Function as PropType<
      (row: any, column: any, cellValue: any, index: number) => VNode | string
    >,
  },
  /**
   * 是否在内容溢出时显示 `tooltip`
   * 相当于启用 `tooltip` 的 `overflow`
   */
  showOverflowTooltip: {
    type: Boolean,
    default: false,
  },
  /**
   * `tooltip` 的额外选项
   */
  tooltipOptions: {
    type: Object as PropType<Partial<TooltipProps>>,
  },
  /**
   * 是否在头部内容溢出时显示 `tooltip`
   * 相当于启用 `tooltip` 的 `overflow`
   */
  showHeaderOverflowTooltip: {
    type: Boolean,
    default: false,
  },
  /**
   * 头部 `tooltip` 的额外选项
   */
  headerTooltipOptions: {
    type: Object as PropType<Partial<TooltipProps>>,
  },
  /**
   * 表头标题内容是否粘性定位
   */
  headerContentSticky: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否在尾部内容溢出时显示 `tooltip`
   * 相当于启用 `tooltip` 的 `overflow`
   */
  showFooterOverflowTooltip: {
    type: Boolean,
    default: false,
  },
  /**
   * 尾部 `tooltip` 的额外选项
   */
  footerTooltipOptions: {
    type: Object as PropType<Partial<TooltipProps>>,
  },
  /**
   * 文本排列方式
   */
  align: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: NTableAlignEnum.LEFT,
  },
  /**
   * 表头文本排列方式
   * 如果不设置，会使用 `align` 的值
   */
  headerAlign: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: NTableAlignEnum.LEFT,
  },
  /**
   * 表尾文本排列方式
   * 如果不设置，会使用 `align` 的值
   */
  footerAlign: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: NTableAlignEnum.LEFT,
  },
  /**
   * 列的 `class`
   */
  className: {
    type: String,
  },
  /**
   * 表头的 `class`
   */
  headerClassName: {
    type: String,
  },
  /**
   * 表尾的 `class`
   */
  footerClassName: {
    type: String,
  },
  /**
   * 仅当 `type = 'selection'` 时有效
   * 通过传入的方法返回 `boolean` 告知当前行是否可以选中
   * 会覆盖 `table.selectable`
   */
  selectable: {
    type: [Boolean, Function] as PropType<((row: any, index: number) => boolean) | boolean>,
    default: true,
  },
  /**
   * 已勾选的行数据，可以使用 `v-model:selectedKeys` 双向绑定
   */
  selectedKeys: {
    type: [String, Number, Array] as PropType<string | number | Array<string | number>>,
  },
  /**
   * 仅当 `type = 'selection'` 时有效
   * 是否允许多选
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 仅当 `type = 'selection'` 时有效
   * 多选上限
   */
  multipleLimit: {
    type: Number,
    default: Infinity,
  },
  /**
   * 是否显示全选
   */
  useCheckAll: {
    type: Boolean,
    default: true,
  },
  /**
   * 在多选时且当半选时，可以控制点击表头的多选框时的行为。
   * `true`: 选中所有行
   * `false`: 取消选中所有行
   */
  selectOnIndeterminate: {
    type: Boolean,
    default: true,
  },
  /**
   * 在点击整行时，是否允许选中
   * 如果希望不与自定义渲染的单元格的点击事件冲突，请设置类似于 `@click.stop` 的事件阻止冒泡
   */
  selectOnClickRow: {
    type: Boolean,
    default: false,
  },
  /**
   * 仅当 `type = 'selection'` 并设置 `table.row-key` 和 `table-column.column-key` 时有效
   * 是否在 `data` 更新时，仍保留当前列、行的选中态
   * 开启此项可以支持跨页多选
   */
  reserveSelection: {
    type: Boolean,
    default: false,
  },
  /**
   * 同行互斥的字段列表
   * 在同一行存在多个 `selection` 时可用
   * todo
   */
  exclusionFields: {
    type: Array as PropType<Array<string>>,
  },
  /**
   * 对于树形结构，父子级关系是否关联
   */
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  /**
   * 提示信息
   */
  tip: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 是否启用过滤
   */
  filterable: {
    type: Boolean,
    default: false,
  },
  /**
   * 过滤类型
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
   */
  filterDisabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 过滤弹出框的定位，同 `popover.placement`
   */
  filterPopoverPlacement: {
    type: String as PropType<PopoverProps['placement']>,
  },
  /**
   * 过滤弹出框的类名
   */
  filterPopoverClassName: {
    type: [String, Object] as PropType<any>,
  },
  /**
   * 过滤弹出框的样式
   */
  filterPopoverStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
  },
  /**
   * 自定义过滤方法
   * @param value 当前筛选值，如果是多选选择器，则此类型是数组
   * @param row 当前行的数据
   * @param column 列的参数
   */
  filterMethod: {
    type: Function as PropType<(value: any, row: any, column: any) => boolean>,
  },
  /**
   * 是否使用内置过滤功能
   * 如果希望使用后端过滤，则可以传入 `false`
   */
  useBuiltInFilter: {
    type: Boolean,
    default: true,
  },
});

export type TableProps = ExtractPropTypes<typeof useTableProps>;
export type TableColumnProps = ExtractPropTypes<typeof useTableColumnProps>;
