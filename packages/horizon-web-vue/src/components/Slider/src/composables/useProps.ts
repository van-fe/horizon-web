import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { InputNumberProps } from '~/components/InputNumber/src/composables/useProps';
import type {
  AdaptComponentApiShape,
  ChoiceSize,
  ComponentRendererPropDefinitions,
  SliderCommonProps,
  SliderTooltipFormatter,
  SliderTooltipPlacement,
  SliderTone,
  SliderValue,
} from '@aurora/core';
import { SLIDER_DEFAULTS } from '@aurora/core';

type SliderVueProps = AdaptComponentApiShape<
  SliderCommonProps,
  {
    value: 'modelValue';
    showSeparators: 'showSeparator';
    tone: 'type';
    showInput: 'inputEnable';
    keyboard: 'keyboardEnable';
    showTooltip: 'tooltipEnable';
    formatTooltip: 'tooltipFormatter';
  },
  'defaultValue',
  { inputProps?: Partial<InputNumberProps> }
>;

export const useSliderProps = declarePropType({
  /** 绑定值。@en Bound slider value. */
  modelValue: {
    type: [Number, Array] as PropType<SliderValue>,
    default: SLIDER_DEFAULTS.defaultValue,
  },
  /** 是否禁用。@en Whether the slider is disabled. */
  disabled: { type: Boolean, default: SLIDER_DEFAULTS.disabled },
  /** 尺寸。@en Slider size. */
  size: { type: String as PropType<ChoiceSize>, required: false },
  /** 最大值。@en Maximum value. */
  max: { type: Number, default: SLIDER_DEFAULTS.max },
  /** 最小值。@en Minimum value. */
  min: { type: Number, default: SLIDER_DEFAULTS.min },
  /** 步长。@en Value step. */
  step: { type: Number, default: SLIDER_DEFAULTS.step },
  /** 是否显示刻度。@en Whether to show step separators. */
  showSeparator: { type: Boolean, default: SLIDER_DEFAULTS.showSeparators },
  /** 语义色。@en Semantic tone. */
  type: { type: String as PropType<SliderTone>, default: SLIDER_DEFAULTS.tone },
  /** 自定义进度颜色。@en Custom progress color. */
  color: { type: String, required: false },
  /** 是否启用范围选择。@en Whether range selection is enabled. */
  range: { type: Boolean, default: SLIDER_DEFAULTS.range },
  /** 轨道是否可点击。@en Whether the track is clickable. */
  trackClickable: { type: Boolean, default: SLIDER_DEFAULTS.trackClickable },
  /** 是否显示数字输入。@en Whether to show the number input. */
  inputEnable: { type: Boolean, default: SLIDER_DEFAULTS.showInput },
  /** 传给 InputNumber 的属性。@en Props passed to InputNumber. */
  inputProps: { type: Object as PropType<Partial<InputNumberProps>>, required: false },
  /** 是否允许键盘操作。@en Whether keyboard control is enabled. */
  keyboardEnable: { type: Boolean, default: SLIDER_DEFAULTS.keyboard },
  /** 是否显示提示。@en Whether the tooltip is enabled. */
  tooltipEnable: { type: Boolean, default: SLIDER_DEFAULTS.showTooltip },
  /** 提示位置。@en Tooltip placement. */
  tooltipPlacement: {
    type: String as PropType<SliderTooltipPlacement>,
    default: SLIDER_DEFAULTS.tooltipPlacement,
  },
  /** 格式化提示内容。@en Formats the tooltip content. */
  tooltipFormatter: { type: Function as PropType<SliderTooltipFormatter>, required: false },
} satisfies ComponentRendererPropDefinitions<SliderVueProps>);

export type SliderProps = ExtractPropTypes<typeof useSliderProps>;
