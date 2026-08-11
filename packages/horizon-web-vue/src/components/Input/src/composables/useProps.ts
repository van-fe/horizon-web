import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
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
  /**
   * 是否作为复合表单组件的无外观输入框使用
   * 启用后仅渲染原生输入能力，不渲染 Input 的边框、前后缀和字数统计
   * @en Whether to render as an unstyled input embedded in a composite form control.
   */
  embedded: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否使嵌入式输入框宽度自适应内容
   * 仅在 `embedded` 为 `true` 且 `type` 为 `text` 时生效
   * @en Whether an embedded text input should fit its content width.
   */
  fitContent: {
    type: Boolean,
    default: false,
  },
  /**
   * 自适应内容输入框的最小宽度
   * @en Minimum width of a fit-content input.
   */
  fitContentMinWidth: {
    type: [String, Number],
  },
  /**
   * 自适应内容输入框根节点的类名
   * 复合组件可通过该属性保持已有 DOM 样式契约
   * @en Root class name of a fit-content input.
   */
  fitContentClass: {
    type: String,
  },
  /**
   * 自适应内容输入框尺寸镜像节点的类名
   * 复合组件可通过该属性保持已有 DOM 样式契约
   * @en Sizing mirror class name of a fit-content input.
   */
  fitContentMirrorClass: {
    type: String,
  },
  /**
   * 嵌入式原生输入框的类名，供复合组件衔接既有样式
   * @en Class name applied to the embedded native input.
   */
  embeddedClass: {
    type: String,
  },
  /**
   * 嵌入式原生输入框的样式，供复合组件控制原生输入区域
   * @en Styles applied to the embedded native input.
   */
  embeddedStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 嵌入式原生输入框的输入事件处理器
   * 复合组件可用它保持原生事件时序，包括输入法组合输入期间的事件
   * @param evt 原生输入事件
   * @paramEn evt Native input event.
   * @en Native input handler for preserving event timing in composite controls.
   */
  embeddedInputHandler: {
    type: Function as PropType<(evt: Event) => void>,
  },
  /**
   * 原生输入框的 tab 顺序
   * @en Native input tab order.
   */
  tabindex: {
    type: [String, Number],
  },
  /**
   * 原生输入框的自动完成策略
   * @en Native input autocomplete strategy.
   */
  autocomplete: {
    type: String,
  },
  /**
   * 原生输入框是否可被选择
   * @en Native input selection hint.
   */
  unselectable: {
    type: String as PropType<'on' | 'off'>,
  },
};

export type InputProps = ExtractPropTypes<typeof useInputProps>;
