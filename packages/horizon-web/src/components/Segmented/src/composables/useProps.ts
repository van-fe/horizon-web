import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

export type HSegmentedSize = 'small' | 'medium' | 'large' | 'huge';

export type HSegmentedValue = string | number;

export const useSegmentedProps = declarePropType({
  /**
   * 当前激活的选项，可使用 `v-model:active-key` 绑定
   * 特别说明：undefined、null 值均会当成空值处理
    * @en Configuration for active key.
   */
  activeKey: {
    type: [String, Number] as PropType<HSegmentedValue>,
    required: false,
  },

  /**
   * 默认激活的选项，优先级低于 `activeKey`，当 `defaultActiveKey` 和 `activeKey` 均不存在时候，第一个选项激活
   * 特别说明：undefined、null 值均会当成空值处理
    * @en Configuration for default active key.
   */
  defaultActiveKey: {
    type: [String, Number] as PropType<HSegmentedValue>,
    required: false,
  },

  /**
   * Segmented 尺寸大小
    * @en Configuration for size.
   **/
  size: {
    type: String as PropType<HSegmentedSize>,
  },

  /**
   * 当元素过多时候，可滑动
    * @en Configuration for scrollable.
   **/
  scrollable: {
    type: Boolean,
    default: false,
  },

  /**
   * 当元素选中时候，否滑动到目标元素
    * @en Configuration for focusable.
   **/
  focusable: {
    type: Boolean,
    default: false,
  },

  /**
   * 当超长的时候，是否使用箭头
    * @en Configuration for arrow.
   **/
  arrow: {
    type: Boolean,
    default: false,
  },

  /**
   * 使其适应父级宽度
    * @en Configuration for block.
   */
  block: {
    type: Boolean,
  },

  /**
   * 是否启用表单模式，以适配 `h-form` 组件
    * @en Configuration for form.
   */
  form: {
    type: Boolean,
  },
});

export const useSegmentedItemProps = declarePropType({
  /**
   * 名称，值使用 `key`
    * @en Configuration for label.
   **/
  label: {
    type: [String, Number] as PropType<HSegmentedValue>,
  },

  /** 图标名字，为空表示没有图标
   * @en Configuration for icon.
 */
  icon: {
    type: String,
    default: '',
  },

  /** 图标大小
   * @en Configuration for icon size.
 */
  iconSize: {
    type: [String, Number] as PropType<HSegmentedValue>,
  },

  /**
   * 是否禁用
    * @en Configuration for disabled.
   **/
  disabled: {
    type: Boolean,
    default: false,
  },
});

export type SegmentedProps = ExtractPropTypes<typeof useSegmentedProps>;
export type SegmentedItemProps = ExtractPropTypes<typeof useSegmentedItemProps>;
