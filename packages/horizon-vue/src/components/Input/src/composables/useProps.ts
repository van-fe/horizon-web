import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import { IconMaybeFalsyPropType } from '~/utils/useIcon';
import type {
  AdaptComponentApiShape,
  ChoiceSize,
  ComponentRendererPropDefinitions,
  InputAutoSize,
  InputCommonProps,
  InputResizeMode,
  InputStatus,
  InputType,
  InputVariant,
} from '@aurora/core';
import { INPUT_DEFAULTS } from '@aurora/core';

interface InputVueExtensions {
  prefixIcon?: unknown;
  suffixIcon?: unknown;
  embedded?: boolean;
  fitContent?: boolean;
  fitContentMinWidth?: string | number;
  fitContentClass?: string;
  fitContentMirrorClass?: string;
  embeddedClass?: string;
  embeddedStyle?: CSSProperties;
  embeddedInputHandler?: (event: Event) => void;
  tabindex?: string | number;
  autocomplete?: string;
  unselectable?: 'on' | 'off';
}

type InputVueProps = AdaptComponentApiShape<
  InputCommonProps,
  {
    value: 'modelValue';
    readOnly: 'readonly';
    maxLength: 'maxlength';
    allowOverflow: 'enableOutOfExceeded';
    minLength: 'minlength';
    variant: 'inputStyle';
  },
  'defaultValue',
  InputVueExtensions
>;

export const useInputProps = declarePropType({
  /** 绑定值。@en Bound input value. */
  modelValue: { type: String, default: INPUT_DEFAULTS.defaultValue },
  /** 输入类型。@en Input type. */
  type: { type: String as PropType<InputType>, default: INPUT_DEFAULTS.type },
  /** 尺寸。@en Input size. */
  size: { type: String as PropType<ChoiceSize>, required: false },
  /** 占位文本。@en Placeholder text. */
  placeholder: { type: String, required: false },
  /** 是否可清空。@en Whether the value can be cleared. */
  clearable: { type: Boolean, default: INPUT_DEFAULTS.clearable },
  /** 是否只读。@en Whether the input is read only. */
  readonly: { type: Boolean, default: INPUT_DEFAULTS.readOnly },
  /** 前缀图标。@en Prefix icon. */
  prefixIcon: { type: IconMaybeFalsyPropType, required: false },
  /** 后缀图标。@en Suffix icon. */
  suffixIcon: { type: IconMaybeFalsyPropType, required: false },
  /** 是否禁用；undefined 允许继承 Form 状态。@en Disabled state; undefined inherits Form. */
  disabled: { type: Boolean, default: undefined },
  /** 是否显示密码切换。@en Whether to show the password toggle. */
  showPassword: { type: Boolean, default: INPUT_DEFAULTS.showPassword },
  /** 是否显示字数。@en Whether to show the character count. */
  showLimit: { type: Boolean, default: INPUT_DEFAULTS.showLimit },
  /** 最大输入长度。@en Maximum input length. */
  maxlength: { type: Number, required: false },
  /** 是否允许超出最大长度。@en Whether values may exceed max length. */
  enableOutOfExceeded: { type: Boolean, default: INPUT_DEFAULTS.allowOverflow },
  /** 最小输入长度。@en Minimum input length. */
  minlength: { type: Number, required: false },
  /** 文本域初始行数。@en Initial textarea rows. */
  rows: { type: Number, default: INPUT_DEFAULTS.rows },
  /** 文本域缩放方式。@en Textarea resize mode. */
  resize: { type: String as PropType<InputResizeMode>, default: INPUT_DEFAULTS.resize },
  /** 视觉样式。@en Visual variant. */
  inputStyle: { type: String as PropType<InputVariant>, default: INPUT_DEFAULTS.variant },
  /** 校验状态。@en Validation status. */
  status: { type: String as PropType<InputStatus>, required: false },
  /** 文本域自适应高度。@en Automatic textarea height. */
  autoSize: {
    type: [Boolean, Object] as PropType<InputAutoSize>,
    default: INPUT_DEFAULTS.autoSize,
  },
  /** 是否作为复合控件的无外观输入使用。@en Unstyled composite-control input. */
  embedded: { type: Boolean, default: false },
  /** 嵌入输入是否按内容适配宽度。@en Whether embedded width fits its content. */
  fitContent: { type: Boolean, default: false },
  /** 自适应内容的最小宽度。@en Minimum fit-content width. */
  fitContentMinWidth: { type: [String, Number], required: false },
  /** 自适应根节点类名。@en Fit-content root class. */
  fitContentClass: { type: String, required: false },
  /** 尺寸镜像节点类名。@en Sizing mirror class. */
  fitContentMirrorClass: { type: String, required: false },
  /** 嵌入原生输入类名。@en Embedded native input class. */
  embeddedClass: { type: String, required: false },
  /** 嵌入原生输入样式。@en Embedded native input styles. */
  embeddedStyle: { type: Object as PropType<CSSProperties>, required: false },
  /** 嵌入原生输入事件处理器。@en Embedded native input handler. */
  embeddedInputHandler: { type: Function as PropType<(event: Event) => void>, required: false },
  /** 原生 tab 顺序。@en Native tab order. */
  tabindex: { type: [String, Number], required: false },
  /** 原生自动完成策略。@en Native autocomplete strategy. */
  autocomplete: { type: String, required: false },
  /** 原生选择提示。@en Native selection hint. */
  unselectable: { type: String as PropType<'on' | 'off'>, required: false },
} satisfies ComponentRendererPropDefinitions<InputVueProps>);

export type InputProps = ExtractPropTypes<typeof useInputProps>;
