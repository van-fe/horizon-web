import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export interface PaginationLabelType {
  /**
   * 每页显示数量的后置文字
   */
  sizeText?: string;
  /**
   * 每页显示数量的后置文字
   */
  size_text?: string;
  /**
   * 每页显示弹出层的子元素后置文字
   */
  sizeItemText?: string;
  /**
   * 每页显示弹出层的子元素后置文字
   */
  size_item_text?: string;
  /**
   * 跳转前置文字
   */
  jumpPrefixText?: string;
  /**
   * 跳转前置文字
   */
  jump_prefix_text?: string;
  /**
   * 跳转后置文字
   */
  jumpSuffixText?: string;
  /**
   * 跳转后置文字
   */
  jump_suffix_text?: string;
}

export const usePaginationProps = declarePropType({
  /**
   * 尺寸
   * @version 2.12.13
   */
  size: {
    type: String as PropType<'medium' | 'large'>,
  },
  /**
   * 当前页数
   */
  currentPage: {
    type: Number,
    default: 1,
  },
  /**
   * 数据总数
   */
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  /**
   * 指定每页可显示多少条
   */
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 30, 40, 50],
  },
  /**
   * 每页条数
   */
  pageSize: {
    type: Number,
    default: 10,
  },
  /**
   * 最大页面按钮数，超出此数量的按钮会被折叠
   * @version 2.0.0-beta.4
   */
  pagerCount: {
    type: Number,
    default: 7,
  },
  /**
   * 所需子组件的布局
   * 2.0.0-beta.4 支持字符串形式，每个子组件需要用逗号分隔开
   */
  layout: {
    type: [Array, String] as PropType<string | Array<'pager' | 'sizes' | 'jumper' | 'total'>>,
    default: 'pager, sizes, jumper, total',
  },
  /**
   * 模式选择，可以选择简要或极简
   */
  type: {
    type: String as PropType<'default' | 'simple' | 'simplest'>,
    default: 'default',
  },
  /**
   * 替换文字
   * 2.0.0-beta.4 开始使用国际化，所以可以不用设置此项
   */
  label: {
    type: Object as PropType<PaginationLabelType>,
  },
  /**
   * 在仅有一页时，是否不显示 `pagination`
   * @version 2.0.0-beta.4
   */
  hideOnSinglePage: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否展示显示范围
   * @version 2.0.0-beta.4
   */
  showRange: {
    type: Boolean,
    default: true,
  },
  /**
   * 布局方向
   * @version 2.0.0-beta.4
   */
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'right',
  },
  /**
   * 是否禁用
   * 在分页获取数据时，可以设置禁用，防止此时用户点击而错误地请求
   * @version 2.5.0
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否将选择每页多少的弹窗传送到 `body` 节点
   * @version 2.5.0
   */
  pageSizesToBody: {
    type: Boolean,
    default: false,
  },
});

export type PaginationProps = ExtractPropTypes<typeof usePaginationProps>;
