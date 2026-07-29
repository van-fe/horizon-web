import type { ExtractPropTypes, PropType } from 'vue';
import { IconMaybeFalsyPropType } from '~/utils/useIcon';

export const useInputProps = {
  /** 
   * 绑定值
    * @en Configuration for model value.
   */
  modelValue: {
    type: String,
    default: '',
  },
  /** 
   * 类型，目前仅支持三种
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<'text' | 'textarea' | 'password'>,
    default: 'text',
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
   * 占位文本
    * @en Configuration for placeholder.
   */
  placeholder: {
    type: String,
  },
  /** 
   * 是否可清空
    * @en Configuration for clearable.
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /** 
   * 是否只读，原生属性
    * @en Configuration for readonly.
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /** 
   * 前缀图标
    * @en Configuration for prefix icon.
   */
  prefixIcon: {
    type: IconMaybeFalsyPropType,
  },
  /** 
   * 后缀图标
    * @en Configuration for suffix icon.
   */
  suffixIcon: {
    type: IconMaybeFalsyPropType,
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
   * 是否显示切换密码图标
    * @en Configuration for show password.
   */
  showPassword: {
    type: Boolean,
    default: false,
  },
  /** 
   * 是否显示输入字数统计，需要与maxlength配合使用
    * @en Configuration for show limit.
   */
  showLimit: {
    type: Boolean,
    default: false,
  },
  /** 
   * 原生属性，最大输入长度
    * @en Configuration for maxlength.
   */
  maxlength: {
    type: Number,
    required: false,
  },
  /**
   * 允许在设置了 `maxlength` 后仍超出输入范围
   * 但此时会提示 `error`
    * @en Configuration for enable out of exceeded.
   */
  enableOutOfExceeded: {
    type: Boolean,
    default: false,
  },
  /** 
   * 原生属性，最小输入长度
    * @en Configuration for minlength.
   */
  minlength: {
    type: Number,
    required: false,
  },
  /** 
   * type为textarea时的初始行数
    * @en Configuration for rows.
   */
  rows: {
    type: Number,
    default: 2,
  },
  /** 
   * 是否可改变textarea大小
    * @en Configuration for resize.
   */
  resize: {
    type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline'>,
    default: 'vertical',
  },
  /**
   * inputStyle属性
    * @en Configuration for input style.
   */
  inputStyle: {
    type: String as PropType<'normal' | 'emphasize' | 'no-border'>,
    default: 'normal',
  },
  /** 
   * 输入框状态
    * @en Configuration for status.
   */
  status: {
    type: String as PropType<'error'>,
    required: false,
  },
  /**
   * 自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }
    * @en Configuration for auto size.
   */
  autoSize: {
    type: [Boolean, Object] as PropType<boolean | { minRows?: number; maxRows?: number }>,
    default: false,
  },
};

export type InputProps = ExtractPropTypes<typeof useInputProps>;
