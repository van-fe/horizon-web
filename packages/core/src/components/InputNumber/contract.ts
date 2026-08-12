import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';
import type { ChoiceSize } from '../_shared/choice';
import { isChoiceSize } from '../_shared/choice';

export const INPUT_NUMBER_VARIANTS = ['normal', 'emphasize', 'no-border'] as const;
export const INPUT_NUMBER_CONTROL_POSITIONS = ['between', 'right'] as const;
export const INPUT_NUMBER_STATUSES = ['error'] as const;

export type InputNumberVariant = (typeof INPUT_NUMBER_VARIANTS)[number];
export type InputNumberControlPosition = (typeof INPUT_NUMBER_CONTROL_POSITIONS)[number];
export type InputNumberStatus = (typeof INPUT_NUMBER_STATUSES)[number];
export type InputNumberValue = number | string | null | undefined;
export type InputNumberStepDirection = 'down' | 'up';

export interface InputNumberFormatInfo {
  userTyping: boolean;
  input?: string;
}

export interface InputNumberCommonProps<Icon = unknown> {
  /** 当前值。 @en Current value. */
  value?: InputNumberValue;
  /** 非受控初始值。 @en Initial uncontrolled value. */
  defaultValue?: InputNumberValue;
  /** 输入框视觉样式。 @en Input visual variant. */
  variant?: InputNumberVariant;
  /** 最小值。 @en Minimum value. */
  min?: number | string;
  /** 最大值。 @en Maximum value. */
  max?: number | string;
  /** 步长。 @en Step size. */
  step?: number;
  /** 仅允许步长倍数。 @en Restricts values to step multiples. */
  stepStrictly?: boolean;
  /** 小数精度。 @en Decimal precision. */
  precision?: number;
  /** 禁用控件。 @en Disables the control. */
  disabled?: boolean;
  /** 控件尺寸。 @en Control size. */
  size?: ChoiceSize;
  /** 展示步进按钮。 @en Shows step controls. */
  controls?: boolean;
  /** 步进按钮位置。 @en Step-control position. */
  controlsPosition?: InputNumberControlPosition;
  /** 原生字段名。 @en Native field name. */
  name?: string;
  /** 占位文字。 @en Placeholder text. */
  placeholder?: string;
  /** 展示清空按钮。 @en Shows a clear action. */
  clearable?: boolean;
  /** 只读。 @en Makes the control read-only. */
  readOnly?: boolean;
  /** 启用长按连续步进。 @en Enables repeated stepping on long press. */
  longPress?: boolean;
  /** 长按重复间隔。 @en Long-press repeat interval in milliseconds. */
  longPressInterval?: number;
  /** 前缀图标。 @en Prefix icon. */
  prefixIcon?: Icon;
  /** 后缀图标。 @en Suffix icon. */
  suffixIcon?: Icon;
  /** 校验状态。 @en Validation status. */
  status?: InputNumberStatus;
  /** 使用字符串保留高精度。 @en Uses strings to preserve high precision. */
  stringMode?: boolean;
  /** 允许滚轮改变数值。 @en Allows the wheel to change the value. */
  wheelToChange?: boolean;
  /** 格式化展示值。 @en Formats the displayed value. */
  formatter?: (value: number | string, info: InputNumberFormatInfo) => string;
  /** 解析格式化输入。 @en Parses formatted input. */
  parser?: (value: string) => number | string;
}

export interface InputNumberEventMap<
  FocusEvent = unknown,
  KeyboardEvent = unknown,
  WheelEvent = unknown,
> {
  valueChange: [value: InputNumberValue];
  input: [value: InputNumberValue];
  change: [value: InputNumberValue];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  clear: [];
  keyDown: [event: KeyboardEvent];
  keyPress: [event: KeyboardEvent];
  keyUp: [event: KeyboardEvent];
  wheel: [event: WheelEvent];
}

export interface InputNumberRegionMap {
  prefix: EmptyComponentApi;
  suffix: EmptyComponentApi;
  prepend: EmptyComponentApi;
  append: EmptyComponentApi;
}

export interface InputNumberCommandMap {
  focus(): void;
  blur(): void;
  increase(): void;
  decrease(): void;
  clear(): void;
}

export const INPUT_NUMBER_DEFAULTS = Object.freeze({
  variant: 'normal',
  min: -Infinity,
  max: Infinity,
  step: 1,
  stepStrictly: false,
  controls: true,
  controlsPosition: 'right',
  clearable: false,
  readOnly: false,
  longPress: false,
  longPressInterval: 200,
  stringMode: false,
  wheelToChange: false,
} as const satisfies Partial<InputNumberCommonProps>);

const includes = <Values extends readonly string[]>(
  values: Values,
  value: unknown,
): value is Values[number] => typeof value === 'string' && values.includes(value);

export const isInputNumberVariant = (value: unknown): value is InputNumberVariant =>
  includes(INPUT_NUMBER_VARIANTS, value);
export const isInputNumberControlPosition = (value: unknown): value is InputNumberControlPosition =>
  includes(INPUT_NUMBER_CONTROL_POSITIONS, value);
export const isInputNumberStatus = (value: unknown): value is InputNumberStatus =>
  includes(INPUT_NUMBER_STATUSES, value);
export const isInputNumberBound = (value: unknown): value is number | string =>
  typeof value === 'number' || typeof value === 'string';
export const isInputNumberStep = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;
export const isInputNumberPrecision = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0;
export const isInputNumberLongPressInterval = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

export const inputNumberApiContract = defineComponentApiContract<
  InputNumberCommonProps,
  InputNumberEventMap,
  InputNumberRegionMap,
  InputNumberCommandMap
>({
  defaults: INPUT_NUMBER_DEFAULTS,
  validators: {
    variant: isInputNumberVariant,
    min: isInputNumberBound,
    max: isInputNumberBound,
    step: isInputNumberStep,
    precision: isInputNumberPrecision,
    size: isChoiceSize,
    controlsPosition: isInputNumberControlPosition,
    status: isInputNumberStatus,
    longPressInterval: isInputNumberLongPressInterval,
  },
});
