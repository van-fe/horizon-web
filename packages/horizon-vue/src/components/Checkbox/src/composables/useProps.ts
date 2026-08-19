import type { ExtractPropTypes, PropType, SetupContext } from 'vue';
import { nextTick } from 'vue';
import type { CheckboxEmits } from './useEmits';
import { declarePropType } from '@aurora/utils';
import type { CheckboxGroupPropsProvideType, CheckboxUnionType } from '../utils/types';
import type {
  AdaptComponentApiShape,
  CheckboxCommonProps,
  CheckboxGroupCommonProps,
  CheckboxValue,
  ChoiceSize,
  ComponentRendererPropDefinitions,
} from '@aurora/core';
import { CHECKBOX_DEFAULTS, getCheckboxChecked, toggleCheckboxValue } from '@aurora/core';

const checkboxValueType = [Array, String, Number, Boolean] as PropType<CheckboxValue>;
const choiceValueType = [String, Number, Boolean] as PropType<CheckboxUnionType>;

type CheckboxVueProps = AdaptComponentApiShape<
  CheckboxCommonProps,
  {
    value: 'modelValue';
    optionValue: 'label';
    trueValue: 'trueLabel';
    falseValue: 'falseLabel';
    readOnly: 'viewable';
    bordered: 'border';
  },
  'defaultValue' | 'variant' | 'fill'
>;

type CheckboxButtonVueProps = AdaptComponentApiShape<
  CheckboxCommonProps,
  {
    value: 'modelValue';
    optionValue: 'label';
    trueValue: 'trueLabel';
    falseValue: 'falseLabel';
    readOnly: 'viewable';
  },
  'defaultValue' | 'variant' | 'bordered' | 'indeterminate'
>;

type CheckboxGroupVueProps = AdaptComponentApiShape<
  CheckboxGroupCommonProps,
  { value: 'modelValue'; readOnly: 'viewable' },
  'defaultValue'
>;

export const useCheckboxProps = declarePropType({
  /** 选中项绑定值。@en Bound checkbox value. */
  modelValue: { type: checkboxValueType, required: false, default: undefined },
  /** 多选框对应的值。@en Value represented by this option. */
  label: { type: choiceValueType, required: false, default: CHECKBOX_DEFAULTS.optionValue },
  /** 选中时的值。@en Value used for the checked state. */
  trueLabel: { type: choiceValueType, required: false, default: undefined },
  /** 未选中时的值。@en Value used for the unchecked state. */
  falseLabel: { type: choiceValueType, required: false, default: undefined },
  /** 是否禁用多选框。@en Whether the checkbox is disabled. */
  disabled: { type: Boolean, default: undefined },
  /** 是否显示边框。@en Whether to show a border. */
  border: { type: Boolean, default: CHECKBOX_DEFAULTS.bordered },
  /** 不确定状态，仅控制展示。@en Mixed visual state. */
  indeterminate: { type: Boolean, default: CHECKBOX_DEFAULTS.indeterminate },
  /** 开启只读展示模式。@en Enables read-only display mode. */
  viewable: { type: Boolean, default: CHECKBOX_DEFAULTS.readOnly },
  /** 多选框尺寸，仅在开启边框时有效。@en Size used by bordered checkboxes. */
  size: { type: String as PropType<ChoiceSize>, required: false },
} satisfies ComponentRendererPropDefinitions<CheckboxVueProps>);

export const useCheckboxButtonProps = declarePropType({
  /** 选中项绑定值。@en Bound checkbox value. */
  modelValue: { type: checkboxValueType, required: false, default: () => [] },
  /** 多选框按钮对应的值。@en Value represented by this button. */
  label: { type: choiceValueType, required: false, default: CHECKBOX_DEFAULTS.optionValue },
  /** 选中时的值。@en Value used for the checked state. */
  trueLabel: { type: choiceValueType, required: false, default: undefined },
  /** 未选中时的值。@en Value used for the unchecked state. */
  falseLabel: { type: choiceValueType, required: false, default: undefined },
  /** 是否禁用多选框按钮。@en Whether the checkbox button is disabled. */
  disabled: { type: Boolean, default: undefined },
  /** 多选框按钮尺寸。@en Checkbox button size. */
  size: { type: String as PropType<ChoiceSize>, required: false },
  /** 开启只读展示模式。@en Enables read-only display mode. */
  viewable: { type: Boolean, default: CHECKBOX_DEFAULTS.readOnly },
  /** 填充色。@en Checked fill color. */
  fill: { type: String, default: CHECKBOX_DEFAULTS.fill },
} satisfies ComponentRendererPropDefinitions<CheckboxButtonVueProps>);

export const useCheckboxGroupProps = declarePropType({
  /** 选中项绑定值数组。@en Bound array of selected values. */
  modelValue: { type: Array as PropType<CheckboxUnionType[]>, required: false },
  /** 是否禁用多选框组。@en Whether the group is disabled. */
  disabled: { type: Boolean, default: undefined },
  /** 多选框按钮组尺寸。@en Checkbox group size. */
  size: { type: String as PropType<ChoiceSize>, required: false },
  /** 开启只读展示模式。@en Enables read-only display mode. */
  viewable: { type: Boolean, default: CHECKBOX_DEFAULTS.readOnly },
} satisfies ComponentRendererPropDefinitions<CheckboxGroupVueProps>);

export function handleChange(
  modelValue: CheckboxValue | undefined,
  labelValue: CheckboxUnionType,
  emit: SetupContext<CheckboxEmits>['emit'],
  checkGroupInject: CheckboxGroupPropsProvideType | undefined,
  formItemTrigger?: (type: 'change' | 'blur') => void,
  trueValue?: CheckboxUnionType,
  falseValue?: CheckboxUnionType,
): void {
  const result = toggleCheckboxValue(modelValue, labelValue, trueValue, falseValue);
  if (checkGroupInject && checkGroupInject.value !== false) {
    emit('change', result.checked);
    emit('update:modelValue', result.checked);
    checkGroupInject.changeEvent?.(result.value as CheckboxUnionType[]);
    return;
  }

  emit('update:modelValue', result.value as CheckboxUnionType);
  emit('change', result.value as CheckboxUnionType | CheckboxUnionType[]);
  void nextTick().then(() => formItemTrigger?.('change'));
}

export function handleBlur(
  event: FocusEvent,
  emit: SetupContext<CheckboxEmits>['emit'],
  checkGroupInject: CheckboxGroupPropsProvideType | undefined,
  formItemTrigger?: (type: 'change' | 'blur') => void,
): void {
  if (checkGroupInject && checkGroupInject.value !== false) {
    checkGroupInject.blurEvent?.(event);
    return;
  }
  emit('blur', event);
  void nextTick().then(() => formItemTrigger?.('blur'));
}

export function isChecked(
  modelValue: CheckboxValue | undefined,
  propValue: CheckboxUnionType,
  trueValue?: CheckboxUnionType,
): boolean {
  return getCheckboxChecked(modelValue, propValue, trueValue);
}

export type CheckboxProps = ExtractPropTypes<typeof useCheckboxProps>;
export type CheckboxButtonProps = ExtractPropTypes<typeof useCheckboxButtonProps>;
export type CheckboxGroupProps = ExtractPropTypes<typeof useCheckboxGroupProps>;
