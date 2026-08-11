import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';
import type { ChoiceSize } from '../_shared/choice';
import { isChoiceSize } from '../_shared/choice';

export const INPUT_TYPES = ['text', 'textarea', 'password'] as const;
export const INPUT_RESIZE_MODES = [
  'none',
  'both',
  'horizontal',
  'vertical',
  'block',
  'inline',
] as const;
export const INPUT_VARIANTS = ['normal', 'emphasize', 'no-border'] as const;
export const INPUT_STATUSES = ['error'] as const;

export type InputType = (typeof INPUT_TYPES)[number];
export type InputResizeMode = (typeof INPUT_RESIZE_MODES)[number];
export type InputVariant = (typeof INPUT_VARIANTS)[number];
export type InputStatus = (typeof INPUT_STATUSES)[number];

export interface InputAutoSizeOptions {
  minRows?: number;
  maxRows?: number;
}

export type InputAutoSize = boolean | InputAutoSizeOptions;

export interface InputCommonProps {
  value?: string;
  defaultValue?: string;
  type?: InputType;
  size?: ChoiceSize;
  placeholder?: string;
  clearable?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  showPassword?: boolean;
  showLimit?: boolean;
  maxLength?: number;
  allowOverflow?: boolean;
  minLength?: number;
  rows?: number;
  resize?: InputResizeMode;
  variant?: InputVariant;
  status?: InputStatus;
  autoSize?: InputAutoSize;
}

export interface InputEventMap<
  InputEvent = unknown,
  MouseEvent = unknown,
  FocusEvent = unknown,
  KeyboardEvent = unknown,
  CompositionEvent = unknown,
> {
  valueChange: [value: string];
  click: [event: MouseEvent];
  input: [value: string, event: InputEvent];
  change: [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  clear: [];
  keyDown: [event: KeyboardEvent];
  keyPress: [event: KeyboardEvent];
  keyUp: [event: KeyboardEvent];
  compositionStart: [event: CompositionEvent];
  compositionUpdate: [event: CompositionEvent];
  compositionEnd: [event: CompositionEvent];
}

export interface InputRegionMap {
  prefix: EmptyComponentApi;
  suffix: EmptyComponentApi;
  prepend: EmptyComponentApi;
  append: EmptyComponentApi;
}

export interface InputCommandMap {
  focus: () => void;
  blur: () => void;
  select: () => void;
}

export const INPUT_DEFAULTS = Object.freeze({
  defaultValue: '',
  type: 'text',
  clearable: false,
  readOnly: false,
  disabled: false,
  showPassword: false,
  showLimit: false,
  allowOverflow: false,
  rows: 2,
  resize: 'vertical',
  variant: 'normal',
  autoSize: false,
} as const);

export function isInputString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isInputType(value: unknown): value is InputType {
  return INPUT_TYPES.includes(value as InputType);
}

export function isInputResizeMode(value: unknown): value is InputResizeMode {
  return INPUT_RESIZE_MODES.includes(value as InputResizeMode);
}

export function isInputVariant(value: unknown): value is InputVariant {
  return INPUT_VARIANTS.includes(value as InputVariant);
}

export function isInputStatus(value: unknown): value is InputStatus {
  return INPUT_STATUSES.includes(value as InputStatus);
}

export function isInputLength(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

export function isInputRows(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

export function isInputAutoSize(value: unknown): value is InputAutoSize {
  if (typeof value === 'boolean') return true;
  if (!value || typeof value !== 'object') return false;
  const options = value as InputAutoSizeOptions;
  return (
    (options.minRows === undefined || isInputRows(options.minRows)) &&
    (options.maxRows === undefined || isInputRows(options.maxRows))
  );
}

export function normalizeInputType(type: unknown): InputType {
  return isInputType(type) ? type : INPUT_DEFAULTS.type;
}

export function getInputNativeType(type: unknown, passwordVisible: boolean): 'text' | 'password' {
  return normalizeInputType(type) === 'password' && !passwordVisible ? 'password' : 'text';
}

export function isInputValueOverflow(value: string, maxLength?: number): boolean {
  return isInputLength(maxLength) && maxLength > 0 && value.length > maxLength;
}

export function shouldEmitInputChange(valueAtFocus: string, value: string): boolean {
  return valueAtFocus !== value;
}

export const inputApiContract = defineComponentApiContract<
  InputCommonProps,
  InputEventMap,
  InputRegionMap,
  InputCommandMap
>({
  defaults: INPUT_DEFAULTS,
  validators: {
    value: isInputString,
    defaultValue: isInputString,
    type: isInputType,
    size: isChoiceSize,
    placeholder: isInputString,
    maxLength: isInputLength,
    minLength: isInputLength,
    rows: isInputRows,
    resize: isInputResizeMode,
    variant: isInputVariant,
    status: isInputStatus,
    autoSize: isInputAutoSize,
  },
});
