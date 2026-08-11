import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useDescriptionsProps = declarePropType({
  /**
   * 标题
    * @en Configuration for title.
   */
  title: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 开启边框
   * 对于vertical类型有效
    * @en Configuration for border.
   */
  border: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 设置间距,要于单列类型配合使用
    * @en Configuration for size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 类型
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<'horizontal' | 'vertical'>,
    required: false,
    default: 'horizontal',
  },
  /**
   * 列数
   * 需要配合type="vertical"食用
    * @en Configuration for column.
   */
  column: {
    type: Number,
    required: false,
    default: 1,
  },
  /**
   * 标签位置
    * @en Configuration for label position.
   */
  labelPosition: {
    type: String as PropType<'top' | 'left'>,
    required: false,
    default: 'left',
  },
  /**
   * <456px 列数
   * 需要配合type="vertical"食用
    * @en Configuration for xs.
   */
  xs: {
    type: Number,
    required: false,
  },
  /**
   * ≥456px 列数
   * 需要配合type="vertical"食用
    * @en Configuration for sm.
   */
  sm: {
    type: Number,
    required: false,
  },
  /**
   * ≥760px 列数
   * 需要配合type="vertical"食用
    * @en Configuration for md.
   */
  md: {
    type: Number,
    required: false,
  },
  /**
   * ≥1176px 列数
   * 需要配合type="vertical"食用
    * @en Configuration for lg.
   */
  lg: {
    type: Number,
    required: false,
  },
  /**
   * ≥1656px 列数
   * 需要配合type="vertical"食用
    * @en Configuration for xl.
   */
  xl: {
    type: Number,
    required: false,
  },
  /**
   * label的类名，请添加全局类名（不使用scoped）
    * @en Configuration for label class.
   */
  labelClass: {
    type: String,
    required: false,
  },
  /**
   * value的类名，请添加全局类名（不使用scoped）
    * @en Configuration for value class.
   */
  valueClass: {
    type: String,
    required: false,
  },
});

export const useDescriptionItemProps = declarePropType({
  /**
   * 标签名
    * @en Configuration for label.
   */
  label: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 标签值
    * @en Configuration for value.
   */
  value: {
    type: String,
    required: false,
    default: '--',
  },
  /**
   * 跨列数
    * @en Configuration for span col.
   */
  spanCol: {
    type: Number,
    required: false,
    default: 1,
  },
  /**
   * 跨行数
    * @en Configuration for span row.
   */
  spanRow: {
    type: Number,
    required: false,
    default: 1,
  },
  /**
   * <456px 跨列数
    * @en Configuration for xs.
   */
  xs: {
    type: Number,
    required: false,
  },
  /**
   * ≥456px 跨列数
    * @en Configuration for sm.
   */
  sm: {
    type: Number,
    required: false,
  },
  /**
   * ≥760px 跨列数
    * @en Configuration for md.
   */
  md: {
    type: Number,
    required: false,
  },
  /**
   * ≥1176px 跨列数
    * @en Configuration for lg.
   */
  lg: {
    type: Number,
    required: false,
  },
  /**
   * ≥1656px 跨列数
    * @en Configuration for xl.
   */
  xl: {
    type: Number,
    required: false,
  },
});

export type DescriptionsProps = ExtractPropTypes<typeof useDescriptionsProps>;
export type DescriptionItemProps = ExtractPropTypes<typeof useDescriptionItemProps>;
