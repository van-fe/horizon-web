export type ChoiceValue = string | number | boolean;

export const CHOICE_SIZES = ['small', 'medium', 'large'] as const;

export type ChoiceSize = (typeof CHOICE_SIZES)[number];

export function isChoiceValue(value: unknown): value is ChoiceValue {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}

export function isChoiceSize(value: unknown): value is ChoiceSize {
  return CHOICE_SIZES.includes(value as ChoiceSize);
}

export function isChoiceValueArray(value: unknown): value is readonly ChoiceValue[] {
  return Array.isArray(value) && value.every(isChoiceValue);
}
