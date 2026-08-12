import type { Component, ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import {
  INPUT_NUMBER_DEFAULTS,
  isInputNumberControlPosition,
  isInputNumberPrecision,
  isInputNumberStatus,
  isInputNumberVariant,
} from '@aurora/core';
import type {
  InputNumberCommonProps,
  InputNumberControlPosition,
  InputNumberStatus,
  InputNumberVariant,
} from '@aurora/core';

export const useInputNumberProps = declarePropType({
  /**
   * 选中项绑定值
   * @en Configuration for model value.
   */
  modelValue: {
    type: [Number, String, null] as PropType<number | string | null | undefined>,
    required: false,
  },
  /**
   * 输入框样式
   * @en Configuration for input style.
   */
  inputStyle: {
    type: String as PropType<InputNumberVariant>,
    default: INPUT_NUMBER_DEFAULTS.variant,
    validator: isInputNumberVariant,
  },
  /**
   * 最小值
   * @en Configuration for min.
   */
  min: {
    type: [Number, String],
    default: INPUT_NUMBER_DEFAULTS.min,
  },
  /**
   * 最大值
   * @en Configuration for max.
   */
  max: {
    type: [Number, String],
    default: INPUT_NUMBER_DEFAULTS.max,
  },
  /**
   * 步长
   * @en Configuration for step.
   */
  step: {
    type: Number,
    default: INPUT_NUMBER_DEFAULTS.step,
  },
  /**
   * 是否仅允许输入步长的倍数
   * @en Configuration for step strictly.
   */
  stepStrictly: {
    type: Boolean,
    default: INPUT_NUMBER_DEFAULTS.stepStrictly,
  },
  /**
   * 数值精度的位数
   * @en Configuration for precision.
   */
  precision: {
    type: Number,
    required: false,
    validator: isInputNumberPrecision,
  },
  /**
   * 是否禁用
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: undefined,
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
   * 是否使用控制按钮
   * @en Configuration for controls.
   */
  controls: {
    type: Boolean,
    default: INPUT_NUMBER_DEFAULTS.controls,
  },
  /**
   * 控制按钮的位置
   * @en Configuration for controls position.
   */
  controlsPosition: {
    type: String as PropType<InputNumberControlPosition>,
    default: INPUT_NUMBER_DEFAULTS.controlsPosition,
    validator: isInputNumberControlPosition,
  },
  /**
   * 原生 `name` 属性
   * @en Configuration for name.
   */
  name: {
    type: String,
    required: false,
  },
  /**
   * 输入框 `placeholder`
   * @en Configuration for placeholder.
   */
  placeholder: {
    type: String,
  },
  /**
   * 是否允许清空
   * @en Configuration for clearable.
   */
  clearable: {
    type: Boolean,
    default: INPUT_NUMBER_DEFAULTS.clearable,
  },
  /**
   * 是否只读，原生属性
   * 如果设置为 `true` 则也不会显示 `controls`
   * @en Configuration for readonly.
   */
  readonly: {
    type: Boolean,
    default: INPUT_NUMBER_DEFAULTS.readOnly,
  },
  /**
   * 是否允许长按
   * @en Configuration for enable lang press.
   */
  enableLangPress: {
    type: Boolean,
    default: INPUT_NUMBER_DEFAULTS.longPress,
  },
  /**
   * 长按触发频率，单位ms
   * @en Configuration for lang press frequency.
   */
  langPressFrequency: {
    type: Number,
    default: INPUT_NUMBER_DEFAULTS.longPressInterval,
  },
  /**
   * 前缀 Icon name 或 iconSvg 对象
   * @en Configuration for prefix icon.
   */
  prefixIcon: {
    type: [String, Object] as PropType<string | Component>,
    required: false,
  },
  /**
   * 后缀 Icon name 或 iconSvg 对象
   * @en Configuration for suffix icon.
   */
  suffixIcon: {
    type: [String, Object] as PropType<string | Component>,
    required: false,
  },
  /** 输入框状态
   * @en Configuration for status.
   */
  status: {
    type: String as PropType<InputNumberStatus>,
    required: false,
    validator: isInputNumberStatus,
  },
  /**
   * 是否是字符串模式
   * @en Configuration for string mode.
   */
  stringMode: {
    type: Boolean,
    default: INPUT_NUMBER_DEFAULTS.stringMode,
  },
  /**
   * 是否允许鼠标滚动改变数值
   * @en Configuration for wheel to change.
   */
  wheelToChange: {
    type: Boolean,
    default: INPUT_NUMBER_DEFAULTS.wheelToChange,
  },
  /**
   * 指定输入框展示值的格式
   * @param val 当前的数字
   * @paramEn val The val value.
   * @param info userTyping 是否是用户输入 \n input: 如果是用户输入，此处是用户输入的内容
   * @paramEn info The info value.
   * @en Configuration for formatter.
   */
  formatter: {
    type: Function as PropType<
      (
        val: number | string,
        info: {
          userTyping: boolean;
          input?: string;
        },
      ) => string
    >,
  },
  /**
   * 从 `formatter` 里转换回数字的方法，必须和 `formatter` 搭配使用
   * @en Configuration for parser.
   */
  parser: {
    type: Function as PropType<(val: string) => number | string>,
  },
});

export type InputNumberProps = ExtractPropTypes<typeof useInputNumberProps>;
export type InputNumberCommonContract = InputNumberCommonProps<string | Component>;
