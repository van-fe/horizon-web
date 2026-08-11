import { defineComponentApiContract } from '../_shared/api';
import type { ChoiceSize, ChoiceValue } from '../_shared/choice';
import { isChoiceSize, isChoiceValue } from '../_shared/choice';

export type RadioVariant = 'radio' | 'button';
export type RadioChangeReason = 'select' | 'disabled' | 'readonly' | 'already-selected';

export interface RadioCommonProps {
  value?: ChoiceValue;
  defaultValue?: ChoiceValue;
  optionValue?: ChoiceValue;
  disabled?: boolean;
  readOnly?: boolean;
  bordered?: boolean;
  size?: ChoiceSize;
  variant?: RadioVariant;
  fill?: string;
  name?: string;
}

export interface RadioGroupCommonProps {
  value?: ChoiceValue;
  defaultValue?: ChoiceValue;
  disabled?: boolean;
  readOnly?: boolean;
  size?: ChoiceSize;
  name?: string;
}

export interface RadioEventMap<BlurEvent = unknown> {
  change: [value: ChoiceValue];
  blur: [event: BlurEvent];
}

export interface RadioGroupEventMap<BlurEvent = unknown> {
  change: [value: ChoiceValue];
  blur: [event: BlurEvent];
}

export interface RadioLabelRegionContext {
  checked: boolean;
  value: ChoiceValue;
}

export interface RadioRegionMap {
  label: RadioLabelRegionContext;
}

export interface RadioGroupRegionMap {
  content: Record<string, never>;
}

export interface RadioCommandMap {
  focus: () => void;
}

export type RadioSelectionResult =
  | { accepted: true; value: ChoiceValue; reason: 'select' }
  | {
      accepted: false;
      value: ChoiceValue | undefined;
      reason: Exclude<RadioChangeReason, 'select'>;
    };

export const RADIO_DEFAULTS = Object.freeze({
  defaultValue: '' as ChoiceValue,
  optionValue: '' as ChoiceValue,
  disabled: false,
  readOnly: false,
  bordered: false,
  size: 'medium',
  variant: 'radio',
  fill: '',
} as const);

export const RADIO_GROUP_DEFAULTS = Object.freeze({
  defaultValue: '' as ChoiceValue,
  disabled: false,
  readOnly: false,
  size: 'medium',
} as const);

export function isRadioVariant(value: unknown): value is RadioVariant {
  return value === 'radio' || value === 'button';
}

export function getRadioChecked(value: ChoiceValue | undefined, optionValue: ChoiceValue): boolean {
  return value === optionValue;
}

export function resolveRadioSelection(
  value: ChoiceValue | undefined,
  optionValue: ChoiceValue,
  disabled = false,
  readOnly = false,
): RadioSelectionResult {
  if (disabled) return { accepted: false, value, reason: 'disabled' };
  if (readOnly) return { accepted: false, value, reason: 'readonly' };
  if (value === optionValue) return { accepted: false, value, reason: 'already-selected' };
  return { accepted: true, value: optionValue, reason: 'select' };
}

export const radioApiContract = defineComponentApiContract<
  RadioCommonProps,
  RadioEventMap,
  RadioRegionMap,
  RadioCommandMap
>({
  defaults: RADIO_DEFAULTS,
  validators: {
    value: isChoiceValue,
    defaultValue: isChoiceValue,
    optionValue: isChoiceValue,
    size: isChoiceSize,
    variant: isRadioVariant,
  },
});
