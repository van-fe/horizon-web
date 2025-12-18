import { declarePropType } from '@nio-fe/shared';
import type { ExtractPropTypes, PropType } from 'vue';

export type NSegmentedSize = 'small' | 'medium' | 'large' | 'huge';

export type NSegmentedValue = string | number;

export const useSegmentedProps = declarePropType({
  /**
   * 当前激活的选项，可使用 `v-model:active-key` 绑定
   * 特别说明：undefined、null 值均会当成空值处理
   */
  activeKey: {
    type: [String, Number] as PropType<NSegmentedValue>,
    required: false,
  },

  /**
   * 默认激活的选项，优先级低于 `activeKey`，当 `defaultActiveKey` 和 `activeKey` 均不存在时候，第一个选项激活
   * 特别说明：undefined、null 值均会当成空值处理
   */
  defaultActiveKey: {
    type: [String, Number] as PropType<NSegmentedValue>,
    required: false,
  },

  /**
   * Segmented 尺寸大小
   **/
  size: {
    type: String as PropType<NSegmentedSize>,
  },

  /**
   * 当元素过多时候，可滑动
   **/
  scrollable: {
    type: Boolean,
    default: false,
  },

  /**
   * 当元素选中时候，否滑动到目标元素
   **/
  focusable: {
    type: Boolean,
    default: false,
  },

  /**
   * 当超长的时候，是否使用箭头
   **/
  arrow: {
    type: Boolean,
    default: false,
  },

  /**
   * 使其适应父级宽度
   */
  block: {
    type: Boolean,
  },

  /**
   * 是否启用表单模式，以适配 `n-form` 组件
   */
  form: {
    type: Boolean,
  },
});

export const useSegmentedItemProps = declarePropType({
  /**
   * 名称，值使用 `key`
   **/
  label: {
    type: [String, Number] as PropType<NSegmentedValue>,
  },

  /** 图标名字，为空表示没有图标 */
  icon: {
    type: String,
    default: '',
  },

  /** 图标大小 */
  iconSize: {
    type: [String, Number] as PropType<NSegmentedValue>,
  },

  /**
   * 是否禁用
   **/
  disabled: {
    type: Boolean,
    default: false,
  },
});

export type SegmentedProps = ExtractPropTypes<typeof useSegmentedProps>;
export type SegmentedItemProps = ExtractPropTypes<typeof useSegmentedItemProps>;
