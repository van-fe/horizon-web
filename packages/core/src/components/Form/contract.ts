import type { RuleItem } from 'async-validator';
import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';
import type { GridAlignment, GridValue } from '../Layout';

export const FORM_SIZES = ['small', 'medium', 'large'] as const;
export const FORM_LABEL_POSITIONS = ['top', 'left'] as const;
export const FORM_LABEL_JUSTIFY_ALIGNMENTS = ['left', 'right'] as const;
export const FORM_LABEL_VERTICAL_ALIGNMENTS = ['top', 'middle'] as const;
export const FORM_REQUIRED_MARK_POSITIONS = ['left', 'right'] as const;
export const FORM_HELPER_PLACEMENTS = ['right', 'after-label', 'before-label'] as const;
export const FORM_HELPER_THEMES = ['light', 'dark'] as const;
export const FORM_SPACINGS = ['default', 'static', 'compact', 'dynamic'] as const;
export const FORM_VALIDATE_EVENTS = ['change', 'blur'] as const;

export type FormSize = (typeof FORM_SIZES)[number];
export type FormLabelPosition = (typeof FORM_LABEL_POSITIONS)[number];
export type FormLabelJustifyAlignment = (typeof FORM_LABEL_JUSTIFY_ALIGNMENTS)[number];
export type FormLabelVerticalAlignment = (typeof FORM_LABEL_VERTICAL_ALIGNMENTS)[number];
export type FormRequiredMarkPosition = (typeof FORM_REQUIRED_MARK_POSITIONS)[number];
export type FormHelperPlacement = (typeof FORM_HELPER_PLACEMENTS)[number];
export type FormHelperTheme = (typeof FORM_HELPER_THEMES)[number];
export type FormSpacing = (typeof FORM_SPACINGS)[number];
export type FormValidateEvent = (typeof FORM_VALIDATE_EVENTS)[number];
export type FormValidateTrigger = FormValidateEvent | readonly FormValidateEvent[] | false;
export type FormRule = RuleItem;
export type FormRules = Record<string, FormRule | FormRule[]>;
export type FormModel = Record<string, unknown>;

export interface FormCommonProps {
  /** 表单数据模型。 @en Form data model. */
  model?: FormModel;
  /** 使用行内布局。 @en Uses inline layout. */
  inline?: boolean;
  /** 每行网格列数；设置后启用网格布局。 @en Grid columns per row; enables grid layout when set. */
  cols?: GridValue;
  /** 网格行列间距。 @en Grid row and column gap. */
  gap?: GridValue;
  /** 网格列间距。 @en Grid column gap. */
  columnGap?: GridValue;
  /** 网格行间距。 @en Grid row gap. */
  rowGap?: GridValue;
  /** 网格垂直对齐。 @en Grid vertical alignment. */
  align?: GridAlignment;
  /** 网格水平对齐。 @en Grid horizontal alignment. */
  justify?: GridAlignment;
  /** 表单控件尺寸。 @en Form control size. */
  size?: FormSize;
  /** 标签位置。 @en Label position. */
  labelPosition?: FormLabelPosition;
  /** 左侧标签的水平对齐方式。 @en Horizontal alignment for left-positioned labels. */
  labelJustifyAlign?: FormLabelJustifyAlignment;
  /** 左侧标签的垂直对齐方式。 @en Vertical alignment for left-positioned labels. */
  labelVerticalAlign?: FormLabelVerticalAlignment;
  /** 标签宽度。 @en Label width. */
  labelWidth?: 'auto' | string | number;
  /** 展示必填标记。 @en Shows required marks. */
  showRequireMark?: boolean;
  /** 表单校验规则。 @en Form validation rules. */
  rules?: FormRules;
  /** 必填标记位置。 @en Required-mark position. */
  requireMarkPosition?: FormRequiredMarkPosition;
  /** 校验失败时滚动到首个错误字段。 @en Scrolls to the first invalid field. */
  scrollToError?: boolean;
  /** 阻止原生提交默认行为。 @en Prevents the native submit default. */
  preventSubmitDefault?: boolean;
  /** 规则变化后重新校验。 @en Revalidates after rules change. */
  validateOnRuleChange?: boolean;
  /** 自动校验触发时机。 @en Automatic validation triggers. */
  validateTrigger?: FormValidateTrigger;
  /** 仅渲染外部错误，不执行规则校验。 @en Only renders external errors without running rules. */
  onlyRender?: boolean;
  /** 帮助内容位置。 @en Helper-content placement. */
  helperPlacement?: FormHelperPlacement;
  /** 帮助内容主题。 @en Helper-content theme. */
  helperTheme?: FormHelperTheme;
  /** 覆盖字段控件禁用状态。 @en Overrides disabled state for field controls. */
  disabled?: boolean;
  /** 字段垂直间距策略。 @en Field vertical-spacing strategy. */
  spacing?: FormSpacing;
  /** 必填消息使用标签作为字段名。 @en Uses the label as the required-message field name. */
  requiredUseLabel?: boolean;
}

export interface FormItemCommonProps<Helper = unknown> {
  /** 字段标签。 @en Field label. */
  label?: string;
  /** 标签位置。 @en Label position. */
  labelPosition?: FormLabelPosition;
  /** 网格占据列数。 @en Occupied grid columns. */
  span?: GridValue;
  /** 网格左侧偏移列数。 @en Empty grid columns before the field. */
  offset?: GridValue;
  /** 数据模型中的字段路径。 @en Field path in the data model. */
  field?: string;
  /** 字段级校验规则。 @en Field-level validation rules. */
  rules?: FormRule | FormRule[];
  /** 字段提示文字。 @en Field tip text. */
  tip?: string;
  /** 帮助内容。 @en Helper content. */
  helper?: Helper;
  /** 帮助内容位置。 @en Helper-content placement. */
  helperPlacement?: FormHelperPlacement;
  /** 帮助内容主题。 @en Helper-content theme. */
  helperTheme?: FormHelperTheme;
  /** 标签水平对齐。 @en Label horizontal alignment. */
  labelJustifyAlign?: FormLabelJustifyAlignment;
  /** 标签垂直对齐。 @en Label vertical alignment. */
  labelVerticalAlign?: FormLabelVerticalAlignment;
  /** 标签宽度。 @en Label width. */
  labelWidth?: 'auto' | string | number;
  /** 无显式规则时启用必填校验。 @en Enables required validation when no explicit rule exists. */
  required?: boolean;
  /** 必填消息使用标签作为字段名。 @en Uses the label as the required-message field name. */
  requiredUseLabel?: boolean;
  /** 展示该字段的必填标记。 @en Shows the required mark for this field. */
  showRequireMark?: boolean;
  /** 外部错误信息。 @en External error message. */
  error?: string;
  /** 覆盖表单级校验触发时机。 @en Overrides form-level validation triggers. */
  validateTrigger?: FormValidateTrigger;
}

export interface FormEventMap<SubmitEvent = unknown> {
  /** 原生提交事件。 @en Native submit event. */
  submit: [event: SubmitEvent];
  /** 字段校验结果。 @en Field validation result. */
  validate: [field: string, valid: boolean, message?: string];
}

export interface FormRegionMap {
  /** 表单内容。 @en Form content. */
  content: EmptyComponentApi;
}

export interface FormItemRegionMap {
  /** 字段控件。 @en Field control. */
  content: EmptyComponentApi;
  /** 字段标签。 @en Field label. */
  label: EmptyComponentApi;
  /** 标签尾部内容。 @en Label trailing content. */
  labelAppend: EmptyComponentApi;
  /** 完整帮助内容。 @en Complete helper content. */
  helper: EmptyComponentApi;
  /** 帮助标题。 @en Helper title. */
  helperTitle: EmptyComponentApi;
  /** 帮助正文。 @en Helper body. */
  helperContent: EmptyComponentApi;
  /** 字段提示。 @en Field tip. */
  tip: EmptyComponentApi;
  /** 校验错误。 @en Validation error. */
  error: EmptyComponentApi;
}

export interface FormCommandMap {
  /** 校验全部字段。 @en Validates all fields. */
  validate(): Promise<void>;
  /** 校验指定字段。 @en Validates selected fields. */
  validateField(fields: string | readonly string[]): Promise<readonly string[]>;
  /** 重置指定字段或全部字段。 @en Resets selected fields or all fields. */
  resetFields(fields?: string | readonly string[]): void;
  /** 滚动到指定字段。 @en Scrolls to a field. */
  scrollToField(field: string): void;
  /** 清除指定字段或全部字段的校验状态。 @en Clears validation for selected fields or all fields. */
  clearValidate(fields?: string | readonly string[]): void;
}

export interface FormItemCommandMap {
  /** 校验当前字段。 @en Validates the current field. */
  validate(): Promise<void>;
  /** 重置当前字段。 @en Resets the current field. */
  resetFields(): void;
  /** 清除当前字段的校验状态。 @en Clears validation for the current field. */
  clearValidate(): void;
}

export const FORM_DEFAULTS = Object.freeze({
  model: Object.freeze({}),
  inline: false,
  size: 'medium',
  labelPosition: 'top',
  labelJustifyAlign: 'left',
  labelVerticalAlign: 'top',
  labelWidth: 'auto',
  showRequireMark: true,
  requireMarkPosition: 'right',
  scrollToError: false,
  preventSubmitDefault: true,
  validateOnRuleChange: true,
  validateTrigger: 'change',
  onlyRender: false,
  helperPlacement: 'right',
  helperTheme: 'light',
  spacing: 'default',
  requiredUseLabel: false,
} as const satisfies Partial<FormCommonProps>);

export const FORM_ITEM_DEFAULTS = Object.freeze({
  span: 1,
  offset: 0,
  required: false,
  showRequireMark: true,
  error: '',
} as const satisfies Partial<FormItemCommonProps>);

function includes<const Values extends readonly string[]>(
  values: Values,
  value: unknown,
): value is Values[number] {
  return typeof value === 'string' && values.includes(value);
}

export const isFormSize = (value: unknown): value is FormSize => includes(FORM_SIZES, value);
export const isFormLabelPosition = (value: unknown): value is FormLabelPosition =>
  includes(FORM_LABEL_POSITIONS, value);
export const isFormLabelJustifyAlignment = (value: unknown): value is FormLabelJustifyAlignment =>
  includes(FORM_LABEL_JUSTIFY_ALIGNMENTS, value);
export const isFormLabelVerticalAlignment = (value: unknown): value is FormLabelVerticalAlignment =>
  includes(FORM_LABEL_VERTICAL_ALIGNMENTS, value);
export const isFormRequiredMarkPosition = (value: unknown): value is FormRequiredMarkPosition =>
  includes(FORM_REQUIRED_MARK_POSITIONS, value);
export const isFormHelperPlacement = (value: unknown): value is FormHelperPlacement =>
  includes(FORM_HELPER_PLACEMENTS, value);
export const isFormHelperTheme = (value: unknown): value is FormHelperTheme =>
  includes(FORM_HELPER_THEMES, value);
export const isFormSpacing = (value: unknown): value is FormSpacing =>
  includes(FORM_SPACINGS, value);
export function isFormValidateTrigger(value: unknown): value is FormValidateTrigger {
  return (
    value === false ||
    includes(FORM_VALIDATE_EVENTS, value) ||
    (Array.isArray(value) && value.every(item => includes(FORM_VALIDATE_EVENTS, item)))
  );
}

export const formApiContract = defineComponentApiContract<
  FormCommonProps,
  FormEventMap,
  FormRegionMap,
  FormCommandMap
>({
  defaults: FORM_DEFAULTS,
  validators: {
    size: isFormSize,
    labelPosition: isFormLabelPosition,
    labelJustifyAlign: isFormLabelJustifyAlignment,
    labelVerticalAlign: isFormLabelVerticalAlignment,
    requireMarkPosition: isFormRequiredMarkPosition,
    validateTrigger: isFormValidateTrigger,
    helperPlacement: isFormHelperPlacement,
    helperTheme: isFormHelperTheme,
    spacing: isFormSpacing,
  },
});

export const formItemApiContract = defineComponentApiContract<
  FormItemCommonProps,
  EmptyComponentApi,
  FormItemRegionMap,
  FormItemCommandMap
>({
  defaults: FORM_ITEM_DEFAULTS,
  validators: {
    labelPosition: isFormLabelPosition,
    labelJustifyAlign: isFormLabelJustifyAlignment,
    labelVerticalAlign: isFormLabelVerticalAlignment,
    validateTrigger: isFormValidateTrigger,
    helperPlacement: isFormHelperPlacement,
    helperTheme: isFormHelperTheme,
  },
});
