import type { ExtractPropTypes, PropType } from 'vue';
import { cssVariable, declarePropType } from '@aurora/utils';

export const useRateProps = declarePropType({
  /**
   * 绑定值
   */
  modelValue: {
    type: Number,
    default: 3,
  },
  /**
   * icon数量
   */
  count: {
    type: Number,
    default: 5,
  },
  /**
   * 允许半星
   */
  half: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示提示文字
   */
  showTooltip: {
    type: Boolean,
    default: false,
  },
  /**
   * 提示文字文本
   */
  tooltip: {
    type: Array,
    default: [],
  },
  /**
   * 是否只读
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 图标大小
   */
  size: {
    type: [String, Number] as PropType<'large' | 'medium' | 'small' | number>,
  },
  /**
   * 自定义图标种类
   */
  icon: {
    type: String,
    default: 'star_filled',
  },
  /**
   * 自定义图标active颜色
   */
  color: {
    type: String,
    default: `rgb(${cssVariable('rate-color--content')})`,
  },
  /**
   * 图标空时的颜色
   */
  voidColor: {
    type: String,
    default: cssVariable('border-default'),
  },
  /**
   * 图标禁用时的颜色
   */
  disabledColor: {
    type: String,
    default: '#9B9DA9',
  },
  /**
   * icon间距
   */
  gutter: {
    type: Number,
    default: 5,
  },
});

export type RateProps = ExtractPropTypes<typeof useRateProps>;
