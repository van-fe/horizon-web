import { defineComponentApiContract } from '../_shared/api';
import type { ChoiceSize, ChoiceValue } from '../_shared/choice';
import { isChoiceSize, isChoiceValue, isChoiceValueArray } from '../_shared/choice';

export type CheckboxValue = ChoiceValue | readonly ChoiceValue[];
export type CheckboxVariant = 'checkbox' | 'button';

export interface CheckboxCommonProps {
  value?: CheckboxValue;
  defaultValue?: CheckboxValue;
  optionValue?: ChoiceValue;
  trueValue?: ChoiceValue;
  falseValue?: ChoiceValue;
  disabled?: boolean;
  readOnly?: boolean;
  bordered?: boolean;
  indeterminate?: boolean;
  size?: ChoiceSize;
  variant?: CheckboxVariant;
  fill?: string;
}

export interface CheckboxGroupCommonProps {
  value?: readonly ChoiceValue[];
  defaultValue?: readonly ChoiceValue[];
  disabled?: boolean;
  readOnly?: boolean;
  size?: ChoiceSize;
}

export interface CheckboxChangeDetails {
  checked: boolean;
  optionValue: ChoiceValue;
}

export interface CheckboxEventMap<BlurEvent = unknown, ClickEvent = unknown> {
  change: [value: CheckboxValue, details: CheckboxChangeDetails];
  blur: [event: BlurEvent];
  click: [event: ClickEvent];
}

export interface CheckboxGroupEventMap<BlurEvent = unknown> {
  change: [value: readonly ChoiceValue[]];
  blur: [event: BlurEvent];
}

export interface CheckboxLabelRegionContext {
  checked: boolean;
  value: ChoiceValue;
}

export interface CheckboxRegionMap {
  label: CheckboxLabelRegionContext;
}

export interface CheckboxGroupRegionMap {
  content: Record<string, never>;
}

export interface CheckboxCommandMap {
  toggle: () => void;
}

export interface CheckboxChangeResult {
  value: CheckboxValue;
  checked: boolean;
}

export const CHECKBOX_DEFAULTS = Object.freeze({
  defaultValue: false,
  optionValue: '',
  disabled: false,
  readOnly: false,
  bordered: false,
  indeterminate: false,
  size: 'medium',
  variant: 'checkbox',
  fill: '',
} as const);

export const CHECKBOX_GROUP_DEFAULTS = Object.freeze({
  defaultValue: [] as readonly ChoiceValue[],
  disabled: false,
  readOnly: false,
  size: 'medium',
} as const);

export function isCheckboxValue(value: unknown): value is CheckboxValue {
  return isChoiceValue(value) || isChoiceValueArray(value);
}

export function isCheckboxVariant(value: unknown): value is CheckboxVariant {
  return value === 'checkbox' || value === 'button';
}

export function getCheckboxOptionValue(
  optionValue: ChoiceValue,
  trueValue?: ChoiceValue,
): ChoiceValue {
  return trueValue ?? optionValue;
}

export function getCheckboxChecked(
  value: CheckboxValue | undefined,
  optionValue: ChoiceValue,
  trueValue?: ChoiceValue,
): boolean {
  const checkedValue = getCheckboxOptionValue(optionValue, trueValue);
  return Array.isArray(value)
    ? value.includes(checkedValue)
    : trueValue === undefined
      ? value === true
      : value === trueValue;
}

export function toggleCheckboxValue(
  value: CheckboxValue | undefined,
  optionValue: ChoiceValue,
  trueValue?: ChoiceValue,
  falseValue?: ChoiceValue,
): CheckboxChangeResult {
  const checkedValue = getCheckboxOptionValue(optionValue, trueValue);
  if (Array.isArray(value)) {
    const checked = !value.includes(checkedValue);
    return {
      value: checked ? [...value, checkedValue] : value.filter(item => item !== checkedValue),
      checked,
    };
  }

  if (trueValue !== undefined) {
    const checked = value !== trueValue;
    return { value: checked ? trueValue : (falseValue ?? false), checked };
  }

  const checked = value !== true;
  return { value: checked ? true : (falseValue ?? false), checked };
}

export const checkboxApiContract = defineComponentApiContract<
  CheckboxCommonProps,
  CheckboxEventMap,
  CheckboxRegionMap,
  CheckboxCommandMap
>({
  defaults: CHECKBOX_DEFAULTS,
  validators: {
    value: isCheckboxValue,
    defaultValue: isCheckboxValue,
    optionValue: isChoiceValue,
    trueValue: isChoiceValue,
    falseValue: isChoiceValue,
    size: isChoiceSize,
    variant: isCheckboxVariant,
  },
});
