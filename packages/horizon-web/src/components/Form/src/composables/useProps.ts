import type { ExtractPropTypes, PropType, Ref, VNode } from 'vue';
import type { RuleItem } from 'async-validator';
import { declarePropType } from '@aurora/utils';

export interface HFormItemHelper {
  /**
   * 帮助标题
   */
  title?: string | VNode | (() => VNode);
  /**
   * 帮助内容
    * @en Configuration for content.
   */
  content: string | VNode | (() => VNode);
  /**
   * 触发方式，默认 `hover`
   */
  trigger?: 'hover' | 'click';
  /**
   * 是否挂载在 `body` 上，默认 `true`
   */
  toBody?: boolean;
  /**
   * 弹出位置，默认 'auto'
   */
  placement?:
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end'
    | 'top'
    | 'bottom'
    | 'right'
    | 'left';
  /**
   * 主题。默认 `light`
   */
  theme?: 'light' | 'dark';
  /**
   * 内边距，默认 8px
   */
  padding?: number | string;
}

export const useFormProps = declarePropType({
  /**
   * 表单字段的集合，如果不需要表单验证可以不设置
    * @en Configuration for model.
   */
  model: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  /**
   * 使用行内表单
    * @en Configuration for inline.
   */
  inline: {
    type: Boolean,
    default: false,
  },
  /**
   * 尺寸
   * 会直接覆盖通过 `n-application` 设置的 `size`
    * @en Configuration for size.
   */
  size: {
    type: String as PropType<'medium' | 'large' | 'small'>,
    required: false,
  },
  /**
   * 标签的位置
    * @en Configuration for label position.
   */
  labelPosition: {
    type: String as PropType<'top' | 'left'>,
    default: 'top',
  },
  /**
   * 标签的水平对齐方式，仅当 `label-position` 为 `left` 时有效
    * @en Configuration for label justify align.
   */
  labelJustifyAlign: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
  /**
   * 标签的垂直对齐方式，仅当 `label-position` 为 `left` 时有效
    * @en Configuration for label vertical align.
   */
  labelVerticalAlign: {
    type: String as PropType<'top' | 'middle'>,
    default: 'top',
  },
  /**
   * 标签宽度，`auto` 表示自动设置为合适的宽度
    * @en Configuration for label width.
   */
  labelWidth: {
    type: [String, Number] as PropType<'auto' | string | number>,
    default: 'auto',
  },
  /**
   * 当表单项的验证规则中包含了必填项（`required` 为 `true`）时，是否在标签后展示星号
    * @en Configuration for show require mark.
   */
  showRequireMark: {
    type: Boolean,
    default: true,
  },
  /**
   * 验证规则
    * @en Configuration for rules.
   */
  rules: {
    type: Object as PropType<Record<string, RuleItem[] | RuleItem>>,
    required: false,
  },
  /**
   * 必填字段星号的位置
    * @en Configuration for require mark position.
   */
  requireMarkPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
  },
  /**
   * 当验证出错时，自动滚动到第一个错误项
    * @en Configuration for scroll to error.
   */
  scrollToError: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁止 submit 事件的默认行为
    * @en Configuration for prevent submit default.
   */
  preventSubmitDefault: {
    type: Boolean,
    default: true,
  },
  /**
   * 校验规则变更后立刻执行一次验证
    * @en Configuration for validate on rule change.
   */
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  /**
   * 触发校验的时机
   * `change`: 只要触发了表单元素的 `update:modalValue` 事件就会验证
   * `blur`: 只有在表单元素失焦时才会验证
   * `false`: 只希望在手动验证时触发
    * @en Configuration for validate trigger.
   */
  validateTrigger: {
    type: [String, Array, Boolean] as PropType<
      'change' | 'blur' | Array<'change' | 'blur'> | false
    >,
    default: 'change',
  },
  /**
   * 是否在 `model` 变更后立刻验证
   * @deprecated validateTrigger
    * @en Configuration for validate on change.
   */
  validateOnChange: {
    type: Boolean,
    default: false,
  },
  /**
   * 当前表单是否只做渲染
   * 如果 `n-form-item` 有设置 `error`，则会立刻将组件标为错误状态
    * @en Configuration for only render.
   */
  onlyRender: {
    type: Boolean,
    default: false,
  },
  /**
   * 提示帮助放置位置
   * right: 在 `form-item` 整体的右侧
   * after-label: 在 `label` 的后面缀上
   * before-label: 在 `label` 的前面缀上
    * @en Configuration for helper placement.
   */
  helperPlacement: {
    type: String as PropType<'right' | 'after-label' | 'before-label'>,
    default: 'right',
  },
  /**
   * 提示帮助的主题
    * @en Configuration for helper theme.
   */
  helperTheme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
  /**
   * 是否禁用表单组件，此设置将会覆盖表单组件的 `disabled` 属性
    * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否启用紧凑布局
   * 紧凑布局不会显示校验信息
   * @deprecated spacing
    * @en Configuration for compact.
   */
  compact: {
    type: Boolean,
  },
  /**
   * 间距方式
   * 'default': 最小间距为 `20px`，`tip` `error` 互斥显示
   * 'static': 静态间距为 `20px`，`tip` `error` 互斥显示
   * 'compact': 紧凑间距，间距为 `16px`，此时错误与提示将会被隐藏
   * 'dynamic': 动态间距，最小间距为 `16px`，`tip` `error` 可以同时显示
    * @en Configuration for spacing.
   */
  spacing: {
    type: String as PropType<'default' | 'static' | 'compact' | 'dynamic'>,
    default: 'default',
  },
  /**
   * 是否使用 `label` 作为默认必填的显示名称
    * @en Configuration for required use label.
   */
  requiredUseLabel: {
    type: Boolean,
    default: false,
  },
});

export const useFormItemProps = declarePropType({
  /**
   * 标签
    * @en Configuration for label.
   */
  label: {
    type: String,
    required: false,
  },
  /**
   * 表单项的绑定字段，应该是 `n-form` 上 `model` 属性的字段名，如果不需要表单验证可以不设置
    * @en Configuration for prop.
   */
  prop: {
    type: String,
    required: false,
  },
  /**
   * 验证规则，会覆盖 `n-form` 的规则，如果不需要表单验证可以不设置
    * @en Configuration for rules.
   */
  rules: {
    type: [Object, Array] as PropType<RuleItem | RuleItem[]>,
    required: false,
  },
  /**
   * 帮助文本，显示优先级低于错误信息
    * @en Configuration for tip.
   */
  tip: {
    type: String,
    required: false,
  },
  /**
   * 提示帮助
   * 使用了 `popover`，比 `tip` 有更丰富的帮助提示功能
   * @verison latest 可以传入 `string`，默认为 `'content'` 字段数据
    * @en Configuration for helper.
   */
  helper: {
    type: [Object, String] as PropType<HFormItemHelper | string>,
    required: false,
  },
  /**
   * 提示帮助放置位置
   * right: 在 `form-item` 整体的右侧
   * after-label: 在 `label` 的后面缀上
   * before-label: 在 `label` 的前面缀上
    * @en Configuration for helper placement.
   */
  helperPlacement: {
    type: String as PropType<'right' | 'after-label' | 'before-label'>,
  },
  /**
   * 提示帮助的主题
    * @en Configuration for helper theme.
   */
  helperTheme: {
    type: String as PropType<'light' | 'dark'>,
  },
  /**
   * 标签的水平对齐方式，仅当 `label-position` 为 `left` 时有效
   * 会继承 `n-form` 的 `label-width`
    * @en Configuration for label justify align.
   */
  labelJustifyAlign: {
    type: String as PropType<'left' | 'right'>,
    required: false,
  },
  /**
   * 标签的垂直对齐方式，仅当 `label-position` 为 `left` 时有效
   * 会继承 `n-form` 的 `label-width`
    * @en Configuration for label vertical align.
   */
  labelVerticalAlign: {
    type: String as PropType<'top' | 'middle'>,
    required: false,
  },
  /**
   * 标签宽度，`auto` 表示自动设置为合适的宽度
   * 会继承 `n-form` 的 `label-width`
    * @en Configuration for label width.
   */
  labelWidth: {
    type: [String, Number] as PropType<'auto' | string | number>,
    required: false,
  },
  /**
   * 是否必填
   * 会被验证规则覆盖
    * @en Configuration for required.
   */
  required: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否使用 `label` 作为默认必填的显示名称
    * @en Configuration for required use label.
   */
  requiredUseLabel: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 当前项的验证规则中包含了必填项（`required` 为 `true`）时，是否在标签后展示星号
    * @en Configuration for show require mark.
   */
  showRequireMark: {
    type: Boolean,
    default: true,
  },
  /**
   * 当校验错误时显示的信息
   * 如果设置了 `rules`，则会被覆盖
   * 可以快速用于设置 `required` 的校验错误提示语
    * @en Configuration for error.
   */
  error: {
    type: String,
    default: '',
  },
  /**
   * 校验触发的时机
   * `change`: 只要触发了表单元素的 `update:modalValue` 事件就会验证
   * `blur`: 只有在表单元素失焦时才会验证
   * `false`: 只希望在手动验证时才触发
   * 会覆盖 `form.validateTrigger` 的配置
    * @en Configuration for validate trigger.
   */
  validateTrigger: {
    type: [String, Array, Boolean] as PropType<
      'change' | 'blur' | false | Array<'change' | 'blur'>
    >,
    required: false,
    default: undefined,
  },
});

export type FormProps = ExtractPropTypes<typeof useFormProps>;
export type FormItemProps = ExtractPropTypes<typeof useFormItemProps>;

export interface ValidateReturnType {
  errors: ValidateErrorType[];
  fields: Record<string, ValidateErrorType[]>;
}

export type ValidateErrorType = {
  message: string;
  fieldValue: any;
  field: string;
};

export interface BindComponent {
  uid?: number;
  $el: Ref<HTMLElement | null>;
  props: FormItemProps;
  validate: () => Promise<null | Record<string, any>>;
  resetField: () => void;
  clearValidate: () => void;
}

export interface HFormInstance {
  validate: () => Promise<null | Record<string, any>>;
  validateField: (props?: string[]) => Promise<null | Record<string, any>>;
  resetFields: (props?: string[]) => void;
  scrollToField: (prop: string) => void;
  clearValidate: (props?: string[]) => void;
}
export type HFormRule = RuleItem;
