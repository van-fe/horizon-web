import type {
  ComputedRef,
  ExtractPropTypes,
  PropType,
  Ref,
  SetupContext,
  UnwrapNestedRefs,
} from 'vue';
import { nextTick } from 'vue';
import type {
  AdaptComponentApiShape,
  ChoiceSize,
  ChoiceValue,
  ComponentRendererPropDefinitions,
  RadioCommonProps,
  RadioGroupCommonProps,
} from '@aurora/core';
import { RADIO_DEFAULTS, resolveRadioSelection } from '@aurora/core';
import type { RadioEmits } from './useEmits';
import { declarePropType } from '@aurora/utils';
import type { HFormItemTriggerType } from '~/components/Form/src/utils/injectedKeys';

const choiceValueType = [String, Number, Boolean] as PropType<ChoiceValue>;

type RadioVueProps = AdaptComponentApiShape<
  RadioCommonProps,
  {
    value: 'modelValue';
    optionValue: 'value';
    readOnly: 'viewable';
    bordered: 'border';
  },
  'defaultValue' | 'variant' | 'fill'
>;

type RadioButtonVueProps = AdaptComponentApiShape<
  RadioCommonProps,
  { value: 'modelValue'; optionValue: 'value'; readOnly: 'viewable' },
  'defaultValue' | 'variant' | 'bordered'
>;

type RadioGroupVueProps = AdaptComponentApiShape<
  RadioGroupCommonProps,
  { value: 'modelValue'; readOnly: 'viewable' },
  'defaultValue'
>;

export const useRadioProps = declarePropType({
  /** 选中项绑定值。@en Bound selected value. */
  modelValue: { type: choiceValueType, required: false, default: RADIO_DEFAULTS.defaultValue },
  /** 单选框对应的值。@en Value represented by this option. */
  value: { type: choiceValueType, required: false, default: RADIO_DEFAULTS.optionValue },
  /** 是否禁用单选框。@en Whether the radio is disabled. */
  disabled: { type: Boolean, default: undefined },
  /** 是否显示边框。@en Whether to show a border. */
  border: { type: Boolean, default: RADIO_DEFAULTS.bordered },
  /** 开启只读展示模式。@en Enables read-only display mode. */
  viewable: { type: Boolean, default: RADIO_DEFAULTS.readOnly },
  /** 单选框尺寸，仅在开启边框时有效。@en Size used by bordered radios. */
  size: { type: String as PropType<ChoiceSize>, required: false },
  /** 同原生 name。@en Native radio name. */
  name: { type: String },
} satisfies ComponentRendererPropDefinitions<RadioVueProps>);

export const useRadioButtonProps = declarePropType({
  /** 选中项绑定值。@en Bound selected value. */
  modelValue: { type: choiceValueType, required: false, default: RADIO_DEFAULTS.defaultValue },
  /** 单选框按钮对应的值。@en Value represented by this button. */
  value: { type: choiceValueType, required: false, default: RADIO_DEFAULTS.optionValue },
  /** 是否禁用单选框按钮。@en Whether the radio button is disabled. */
  disabled: { type: Boolean, default: undefined },
  /** 单选框按钮尺寸。@en Radio button size. */
  size: { type: String as PropType<ChoiceSize>, required: false },
  /** 开启只读展示模式。@en Enables read-only display mode. */
  viewable: { type: Boolean, default: RADIO_DEFAULTS.readOnly },
  /** 填充色。@en Checked fill color. */
  fill: { type: String, default: RADIO_DEFAULTS.fill },
  /** 同原生 name。@en Native radio name. */
  name: { type: String },
} satisfies ComponentRendererPropDefinitions<RadioButtonVueProps>);

export const useRadioGroupProps = declarePropType({
  /** 选中项绑定值。@en Bound selected value. */
  modelValue: { type: choiceValueType, required: true },
  /** 是否禁用单选框组。@en Whether the group is disabled. */
  disabled: { type: Boolean, default: undefined },
  /** 单选框组尺寸。@en Radio group size. */
  size: { type: String as PropType<ChoiceSize>, required: false },
  /** 开启只读展示模式。@en Enables read-only display mode. */
  viewable: { type: Boolean, default: RADIO_DEFAULTS.readOnly },
  /** 设置给子元素的原生 name。@en Native name passed to child radios. */
  name: { type: String },
} satisfies ComponentRendererPropDefinitions<RadioGroupVueProps>);

export interface RadioGroupPropsProvideType {
  value?: ComputedRef<ChoiceValue | undefined>;
  changeEvent?: (value: ChoiceValue) => void;
  blurEvent?: (event: FocusEvent) => void;
  disabled?: ComputedRef<boolean | undefined>;
  viewable?: ComputedRef<boolean | undefined>;
  size?: ComputedRef<ChoiceSize | undefined>;
  name?: Ref<string | undefined>;
}

export function handleChange(
  value: ChoiceValue,
  emit: SetupContext<RadioEmits>['emit'],
  radioGroupInject: UnwrapNestedRefs<RadioGroupPropsProvideType> | undefined,
  formItemTrigger?: HFormItemTriggerType,
): void {
  const currentValue = radioGroupInject?.value;
  const result = resolveRadioSelection(currentValue, value);
  if (!result.accepted && result.reason === 'already-selected') return;

  emit('change', value);
  if (radioGroupInject) {
    radioGroupInject.changeEvent?.(value);
    return;
  }
  emit('update:modelValue', value);
  void nextTick().then(() => formItemTrigger?.('change'));
}

export function handleBlur(
  event: FocusEvent,
  emit: SetupContext<RadioEmits>['emit'],
  radioGroupInject: UnwrapNestedRefs<RadioGroupPropsProvideType> | undefined,
  formItemTrigger?: HFormItemTriggerType,
): void {
  emit('blur', event);
  if (radioGroupInject) {
    radioGroupInject.blurEvent?.(event);
    return;
  }
  void nextTick().then(() => formItemTrigger?.('blur'));
}

export type RadioProps = ExtractPropTypes<typeof useRadioProps>;
export type RadioButtonProps = ExtractPropTypes<typeof useRadioButtonProps>;
export type RadioGroupProps = ExtractPropTypes<typeof useRadioGroupProps>;
