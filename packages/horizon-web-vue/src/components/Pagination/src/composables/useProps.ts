import type { ExtractPropTypes, PropType } from 'vue';
import type {
  AdaptComponentApiShape,
  ComponentRendererPropDefinitions,
  PaginationAlign,
  PaginationCommonProps,
  PaginationLayout,
  PaginationSize,
  PaginationVariant,
} from '@aurora/core';
import {
  isPaginationAlign,
  isPaginationLayout,
  isPaginationPage,
  isPaginationPageSize,
  isPaginationPageSizes,
  isPaginationPagerCount,
  isPaginationSize,
  isPaginationTotal,
  isPaginationVariant,
  PAGINATION_DEFAULTS,
} from '@aurora/core';
import { declarePropType } from '@aurora/utils';

export interface PaginationLabelType {
  /** 每页数量后缀。 @en Page-size suffix. */
  sizeText?: string;
  /** 每页数量后缀的历史蛇形命名。 @en Legacy snake-case page-size suffix. */
  size_text?: string;
  /** 每页数量选项后缀。 @en Page-size option suffix. */
  sizeItemText?: string;
  /** 每页数量选项后缀的历史蛇形命名。 @en Legacy snake-case option suffix. */
  size_item_text?: string;
  /** 跳转输入前缀。 @en Jump-input prefix. */
  jumpPrefixText?: string;
  /** 跳转输入前缀的历史蛇形命名。 @en Legacy snake-case jump prefix. */
  jump_prefix_text?: string;
  /** 跳转输入后缀。 @en Jump-input suffix. */
  jumpSuffixText?: string;
  /** 跳转输入后缀的历史蛇形命名。 @en Legacy snake-case jump suffix. */
  jump_suffix_text?: string;
}

type PaginationVueProps = AdaptComponentApiShape<
  PaginationCommonProps,
  { value: 'currentPage'; variant: 'type' },
  'defaultValue' | 'defaultPageSize' | 'labels',
  { label?: PaginationLabelType; pageSizesToBody?: boolean }
>;

export const usePaginationProps = declarePropType({
  /** 组件尺寸；未设置时继承 Application。 @en Component size; inherits Application when omitted. */
  size: {
    type: String as PropType<PaginationSize>,
    required: false,
    validator: isPaginationSize,
  },
  /** 当前页数。 @en Current page. */
  currentPage: {
    type: Number,
    default: PAGINATION_DEFAULTS.defaultValue,
    validator: isPaginationPage,
  },
  /** 数据总数。 @en Total item count. */
  total: {
    type: Number,
    required: true,
    default: PAGINATION_DEFAULTS.total,
    validator: isPaginationTotal,
  },
  /** 可选择的每页数量。 @en Available page sizes. */
  pageSizes: {
    type: Array as PropType<readonly number[]>,
    default: () => [...PAGINATION_DEFAULTS.pageSizes],
    validator: isPaginationPageSizes,
  },
  /** 每页数量。 @en Page size. */
  pageSize: {
    type: Number,
    default: PAGINATION_DEFAULTS.defaultPageSize,
    validator: isPaginationPageSize,
  },
  /** 最大页码按钮数量。 @en Maximum pager item count. */
  pagerCount: {
    type: Number,
    default: PAGINATION_DEFAULTS.pagerCount,
    validator: isPaginationPagerCount,
  },
  /** 子区域布局。 @en Visible pagination regions. */
  layout: {
    type: [Array, String] as PropType<PaginationLayout>,
    default: PAGINATION_DEFAULTS.layout.join(', '),
    validator: isPaginationLayout,
  },
  /** 展示模式。 @en Presentation variant. */
  type: {
    type: String as PropType<PaginationVariant>,
    default: PAGINATION_DEFAULTS.variant,
    validator: isPaginationVariant,
  },
  /** 历史局部文案覆盖。 @en Legacy local label overrides. */
  label: {
    type: Object as PropType<PaginationLabelType>,
    required: false,
  },
  /** 单页时隐藏。 @en Hides the control for a single page. */
  hideOnSinglePage: {
    type: Boolean,
    default: PAGINATION_DEFAULTS.hideOnSinglePage,
  },
  /** 总数区域展示当前范围。 @en Shows the current range in total copy. */
  showRange: {
    type: Boolean,
    default: PAGINATION_DEFAULTS.showRange,
  },
  /** 水平对齐方式。 @en Horizontal alignment. */
  align: {
    type: String as PropType<PaginationAlign>,
    default: PAGINATION_DEFAULTS.align,
    validator: isPaginationAlign,
  },
  /** 是否禁用交互。 @en Whether interaction is disabled. */
  disabled: {
    type: Boolean,
    default: PAGINATION_DEFAULTS.disabled,
  },
  /** 将每页数量面板传送至 body。 @en Teleports the page-size panel to body. */
  pageSizesToBody: {
    type: Boolean,
    default: false,
  },
} satisfies ComponentRendererPropDefinitions<PaginationVueProps>);

export type PaginationProps = ExtractPropTypes<typeof usePaginationProps>;
