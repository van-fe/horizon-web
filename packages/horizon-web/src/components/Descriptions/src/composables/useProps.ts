import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useDescriptionsProps = declarePropType({
  /**
   * 标题
   */
  title: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 开启边框
   * 对于vertical类型有效
   */
  border: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 设置间距,要于单列类型配合使用
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 类型
   */
  type: {
    type: String as PropType<'horizontal' | 'vertical'>,
    required: false,
    default: 'horizontal',
  },
  /**
   * 列数
   * 需要配合type="vertical"食用
   */
  column: {
    type: Number,
    required: false,
    default: 1,
  },
  /**
   * 标签位置
   */
  labelPosition: {
    type: String as PropType<'top' | 'left'>,
    required: false,
    default: 'left',
  },
  /**
   * <456px 列数
   * 需要配合type="vertical"食用
   * @version 2.12.12
   */
  xs: {
    type: Number,
    required: false,
  },
  /**
   * ≥456px 列数
   * 需要配合type="vertical"食用
   * @version 2.12.12
   */
  sm: {
    type: Number,
    required: false,
  },
  /**
   * ≥760px 列数
   * 需要配合type="vertical"食用
   * @version 2.12.12
   */
  md: {
    type: Number,
    required: false,
  },
  /**
   * ≥1176px 列数
   * 需要配合type="vertical"食用
   * @version 2.12.12
   */
  lg: {
    type: Number,
    required: false,
  },
  /**
   * ≥1656px 列数
   * 需要配合type="vertical"食用
   * @version 2.12.12
   */
  xl: {
    type: Number,
    required: false,
  },
  /**
   * label的类名，请添加全局类名（不使用scoped）
   * @version 2.12.17
   */
  labelClass: {
    type: String,
    required: false,
  },
  /**
   * value的类名，请添加全局类名（不使用scoped）
   * @version 2.12.17
   */
  valueClass: {
    type: String,
    required: false,
  },
});

export const useDescriptionItemProps = declarePropType({
  /**
   * 标签名
   */
  label: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 标签值
   */
  value: {
    type: String,
    required: false,
    default: '--',
  },
  /**
   * 跨列数
   */
  spanCol: {
    type: Number,
    required: false,
    default: 1,
  },
  /**
   * 跨行数
   */
  spanRow: {
    type: Number,
    required: false,
    default: 1,
  },
  /**
   * <456px 跨列数
   * @version 2.12.12
   */
  xs: {
    type: Number,
    required: false,
  },
  /**
   * ≥456px 跨列数
   * @version 2.12.12
   */
  sm: {
    type: Number,
    required: false,
  },
  /**
   * ≥760px 跨列数
   * @version 2.12.12
   */
  md: {
    type: Number,
    required: false,
  },
  /**
   * ≥1176px 跨列数
   * @version 2.12.12
   */
  lg: {
    type: Number,
    required: false,
  },
  /**
   * ≥1656px 跨列数
   * @version 2.12.12
   */
  xl: {
    type: Number,
    required: false,
  },
});

export type DescriptionsProps = ExtractPropTypes<typeof useDescriptionsProps>;
export type DescriptionItemProps = ExtractPropTypes<typeof useDescriptionItemProps>;
