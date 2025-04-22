import type { Component, ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@nio-fe/shared';

export const useInputNumberProps = declarePropType({
  /**
   * 选中项绑定值
   */
  modelValue: {
    type: [Number, String, null] as PropType<number | string | null | undefined>,
    required: false,
  },
  /**
   * 输入框样式
   * @version 2.4.0
   */
  inputStyle: {
    type: String as PropType<'normal' | 'emphasize' | 'no-border'>,
    default: 'normal',
  },
  /**
   * 最小值
   * @version 2.0.12 支持 string 类型
   */
  min: {
    type: [Number, String],
    default: -Infinity,
  },
  /**
   * 最大值
   * @version 2.0.12 支持 string 类型
   */
  max: {
    type: [Number, String],
    default: Infinity,
  },
  /**
   * 步长
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * 是否仅允许输入步长的倍数
   */
  stepStrictly: {
    type: Boolean,
    default: false,
  },
  /**
   * 数值精度的位数
   */
  precision: {
    type: Number,
    required: false,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 是否使用控制按钮
   */
  controls: {
    type: Boolean,
    default: true,
  },
  /**
   * 控制按钮的位置
   */
  controlsPosition: {
    type: String as PropType<'between' | 'right'>,
    default: 'right',
  },
  /**
   * 原生 `name` 属性
   */
  name: {
    type: String,
    required: false,
  },
  /**
   * 输入框 `placeholder`
   */
  placeholder: {
    type: String,
  },
  /**
   * 是否允许清空
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否只读，原生属性
   * 如果设置为 `true` 则也不会显示 `controls`
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许长按
   */
  enableLangPress: {
    type: Boolean,
    default: false,
  },
  /**
   * 长按触发频率，单位ms
   */
  langPressFrequency: {
    type: Number,
    default: 200,
  },
  /**
   * 前缀 Icon name 或 iconSvg 对象
   * @version 2.0.0 支持 `object` 类型
   */
  prefixIcon: {
    type: [String, Object] as PropType<string | Component>,
    required: false,
  },
  /**
   * 后缀 Icon name 或 iconSvg 对象
   * @version 2.0.0 支持 `object` 类型
   */
  suffixIcon: {
    type: [String, Object] as PropType<string | Component>,
    required: false,
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<'error'>,
    required: false,
  },
  /**
   * 是否是字符串模式
   * @version 2.2.5
   */
  stringMode: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许鼠标滚动改变数值
   * @version 2.3.2
   */
  wheelToChange: {
    type: Boolean,
    default: false,
  },
  /**
   * 指定输入框展示值的格式
   * @param val 当前的数字
   * @param info userTyping 是否是用户输入 \n input: 如果是用户输入，此处是用户输入的内容
   * @version 2.3.5
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
   * @version 2.3.5
   */
  parser: {
    type: Function as PropType<(val: string) => number | string>,
  },
});

export type InputNumberProps = ExtractPropTypes<typeof useInputNumberProps>;
