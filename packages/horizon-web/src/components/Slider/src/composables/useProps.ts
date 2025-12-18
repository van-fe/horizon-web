import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/shared';
import type { InputNumberProps } from '~/components/InputNumber/src/composables/useProps';

export const useSliderProps = declarePropType({
  /**
   * 绑定值
   */
  modelValue: {
    type: [Number, Array] as PropType<number | [number, number]>,
    default: 0,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 尺寸
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 最大值
   */
  max: {
    type: Number,
    default: 100,
  },
  /**
   * 最小值
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * 步长
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * 是否显示分割符，在设定了大于 `1` 的 `step` 时有效
   */
  showSeparator: {
    type: Boolean,
    default: false,
  },
  /**
   * 进度条类型
   */
  type: {
    type: String as PropType<'primary' | 'info' | 'success' | 'warning' | 'danger'>,
    default: 'primary',
  },
  /**
   * 进度条颜色
   */
  color: {
    type: String,
    required: false,
  },
  /**
   * 是否启用范围选择模式
   */
  range: {
    type: Boolean,
    default: false,
  },
  /**
   * 轨道是否可以点击
   */
  trackClickable: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示 `input` 输入框
   */
  inputEnable: {
    type: Boolean,
    default: false,
  },
  /**
   * 传给 input-number 的 `props`
   */
  inputProps: {
    type: Object as PropType<Partial<InputNumberProps>>,
    required: false,
  },
  /**
   * 是否允许键盘控制游标
   */
  keyboardEnable: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否启用 `tooltip`
   */
  tooltipEnable: {
    type: Boolean,
    default: true,
  },
  /**
   * `tooltip` 的位置
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
   */
  tooltipFormatter: {
    type: Function as PropType<(value: number) => string>,
    required: false,
  },
});

export type SliderProps = ExtractPropTypes<typeof useSliderProps>;
