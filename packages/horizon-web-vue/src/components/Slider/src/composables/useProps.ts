import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { InputNumberProps } from '~/components/InputNumber/src/composables/useProps';

export const useSliderProps = declarePropType({
  /**
   * 绑定值
    * @en Configuration for model value.
   */
  modelValue: {
    type: [Number, Array] as PropType<number | [number, number]>,
    default: 0,
  },
  /**
   * 是否禁用
    * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 尺寸
    * @en Configuration for size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 最大值
    * @en Configuration for max.
   */
  max: {
    type: Number,
    default: 100,
  },
  /**
   * 最小值
    * @en Configuration for min.
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * 步长
    * @en Configuration for step.
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * 是否显示分割符，在设定了大于 `1` 的 `step` 时有效
    * @en Configuration for show separator.
   */
  showSeparator: {
    type: Boolean,
    default: false,
  },
  /**
   * 进度条类型
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<'primary' | 'info' | 'success' | 'warning' | 'danger'>,
    default: 'primary',
  },
  /**
   * 进度条颜色
    * @en Configuration for color.
   */
  color: {
    type: String,
    required: false,
  },
  /**
   * 是否启用范围选择模式
    * @en Configuration for range.
   */
  range: {
    type: Boolean,
    default: false,
  },
  /**
   * 轨道是否可以点击
    * @en Configuration for track clickable.
   */
  trackClickable: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示 `input` 输入框
    * @en Configuration for input enable.
   */
  inputEnable: {
    type: Boolean,
    default: false,
  },
  /**
   * 传给 input-number 的 `props`
    * @en Configuration for input props.
   */
  inputProps: {
    type: Object as PropType<Partial<InputNumberProps>>,
    required: false,
  },
  /**
   * 是否允许键盘控制游标
    * @en Configuration for keyboard enable.
   */
  keyboardEnable: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否启用 `tooltip`
    * @en Configuration for tooltip enable.
   */
  tooltipEnable: {
    type: Boolean,
    default: true,
  },
  /**
   * `tooltip` 的位置
    * @en Configuration for tooltip placement.
   */
  tooltipPlacement: {
    type: String as PropType<
      'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'top' | 'bottom' | 'right' | 'left'
    >,
    default: 'top',
  },
  /**
   * 自定义提示
   * 传入的是当前滑块的数字，返回一个处理后的字符串即可
    * @en Configuration for tooltip formatter.
   */
  tooltipFormatter: {
    type: Function as PropType<(value: number) => string>,
    required: false,
  },
});

export type SliderProps = ExtractPropTypes<typeof useSliderProps>;
