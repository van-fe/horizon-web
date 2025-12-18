import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import { IconMaybeFalsyPropType } from '~/utils/useIcon';

export const useInputProps = declarePropType({
  /** 绑定值 */
  modelValue: {
    type: String,
    default: '',
  },
  /** 类型，目前仅支持三种 */
  type: {
    type: String as PropType<'text' | 'textarea' | 'password'>,
    default: 'text',
  },
  /** 尺寸 */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /** 占位文本 */
  placeholder: {
    type: String,
  },
  /** 是否可清空 */
  clearable: {
    type: Boolean,
    default: false,
  },
  /** 是否只读，原生属性 */
  readonly: {
    type: Boolean,
    default: false,
  },
  /** 前缀图标 */
  prefixIcon: {
    type: IconMaybeFalsyPropType,
  },
  /** 后缀图标 */
  suffixIcon: {
    type: IconMaybeFalsyPropType,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 是否显示切换密码图标 */
  showPassword: {
    type: Boolean,
    default: false,
  },
  /** 是否显示输入字数统计，需要与maxlength配合使用 */
  showLimit: {
    type: Boolean,
    default: false,
  },
  /** 原生属性，最大输入长度 */
  maxlength: {
    type: Number,
    required: false,
  },
  /**
   * 允许在设置了 `maxlength` 后仍超出输入范围
   * 但此时会提示 `error`
   */
  enableOutOfExceeded: {
    type: Boolean,
    default: false,
  },
  /** 原生属性，最小输入长度 */
  minlength: {
    type: Number,
    required: false,
  },
  /** type为textarea时的初始行数 */
  rows: {
    type: Number,
    default: 2,
  },
  /** 是否可改变textarea大小 */
  resize: {
    type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline'>,
    default: 'vertical',
  },
  /** 是否使用面性输入框
   * @deprecated
   */
  filled: {
    type: Boolean,
    default: false,
  },
  /**
   * inputStyle属性
   * @version 2.3.0
   */
  inputStyle: {
    type: String as PropType<'normal' | 'emphasize' | 'no-border'>,
    default: 'normal',
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<'error'>,
    required: false,
  },
  /**
   * 自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }
   * @version 2.0.14
   */
  autoSize: {
    type: [Boolean, Object] as PropType<boolean | { minRows?: number; maxRows?: number }>,
    default: false,
  },
});

export type InputProps = ExtractPropTypes<typeof useInputProps>;
