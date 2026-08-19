import type {
  FocusEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactElement,
  ReactNode,
  WheelEvent,
} from 'react';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type {
  InputNumberCommandMap,
  InputNumberCommonProps,
  InputNumberControlPosition,
  InputNumberStatus,
  InputNumberValue,
  InputNumberVariant,
} from '@aurora/core';
import {
  areInputNumberValuesEqual,
  canStepInputNumber,
  formatInputNumberDisplay,
  INPUT_NUMBER_DEFAULTS,
  normalizePartialInputNumber,
  sanitizeInputNumberBlurText,
  sanitizeInputNumberText,
  stepInputNumberValue,
  toInputNumberDecimal,
  toInputNumberOutput,
  verifyInputNumberValue,
} from '@aurora/core';
import type { InputNumberLongPressController } from '@aurora/horizon-core';
import { createInputNumberLongPressController } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { useFormFieldControl } from '../Form/context';

export interface InputNumberHandle extends InputNumberCommandMap {
  readonly input: HTMLInputElement | null;
}

export interface InputNumberProps
  extends
    Omit<InputNumberCommonProps<ReactNode>, 'readOnly'>,
    Omit<
      HTMLAttributes<HTMLDivElement>,
      | 'children'
      | 'defaultValue'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'onInput'
      | 'onKeyDown'
      | 'onKeyPress'
      | 'onKeyUp'
      | 'onWheel'
      | 'prefix'
    > {
  /** 只读。 @en Makes the field read-only. */
  readOnly?: boolean;
  /** 前缀内容。 @en Prefix content. */
  prefix?: ReactNode;
  /** 后缀内容。 @en Suffix content. */
  suffix?: ReactNode;
  /** 前置内容。 @en Prepended content. */
  prepend?: ReactNode;
  /** 后置内容。 @en Appended content. */
  append?: ReactNode;
  /** 值更新。 @en Called when the value updates. */
  onValueChange?: (value: InputNumberValue) => void;
  /** 输入事件。 @en Called while the user inputs. */
  onInput?: (value: InputNumberValue) => void;
  /** 提交后的值变化。 @en Called when a value change is committed. */
  onChange?: (value: InputNumberValue) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onWheel?: (event: WheelEvent<HTMLInputElement>) => void;
  /** 原生 input 属性。 @en Native input attributes. */
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | 'defaultValue'
    | 'disabled'
    | 'max'
    | 'min'
    | 'name'
    | 'onBlur'
    | 'onChange'
    | 'onFocus'
    | 'onInput'
    | 'onKeyDown'
    | 'onKeyPress'
    | 'onKeyUp'
    | 'onWheel'
    | 'placeholder'
    | 'readOnly'
    | 'step'
    | 'value'
  >;
}

export const InputNumber = forwardRef<InputNumberHandle, InputNumberProps>(function InputNumber(
  {
    value,
    defaultValue = null,
    variant = INPUT_NUMBER_DEFAULTS.variant,
    min = INPUT_NUMBER_DEFAULTS.min,
    max = INPUT_NUMBER_DEFAULTS.max,
    step = INPUT_NUMBER_DEFAULTS.step,
    stepStrictly = INPUT_NUMBER_DEFAULTS.stepStrictly,
    precision,
    disabled = false,
    size,
    controls = INPUT_NUMBER_DEFAULTS.controls,
    controlsPosition = INPUT_NUMBER_DEFAULTS.controlsPosition,
    name,
    placeholder,
    clearable = INPUT_NUMBER_DEFAULTS.clearable,
    readOnly = INPUT_NUMBER_DEFAULTS.readOnly,
    longPress = INPUT_NUMBER_DEFAULTS.longPress,
    longPressInterval = INPUT_NUMBER_DEFAULTS.longPressInterval,
    prefixIcon,
    suffixIcon,
    status,
    stringMode = INPUT_NUMBER_DEFAULTS.stringMode,
    wheelToChange = INPUT_NUMBER_DEFAULTS.wheelToChange,
    formatter,
    parser,
    prefix,
    suffix,
    prepend,
    append,
    onValueChange,
    onInput,
    onChange,
    onFocus,
    onBlur,
    onClear,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onWheel,
    inputProps,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const formField = useFormFieldControl();
  const classes = useMemo(
    () => new ComponentClassBlock('input-number', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const actionRef = useRef<(() => void) | null>(null);
  const longPressRef = useRef<InputNumberLongPressController | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState<InputNumberValue>(defaultValue);
  const [editingValue, setEditingValue] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const committedValueRef = useRef<InputNumberValue>(defaultValue);
  const currentValue = value !== undefined ? value : uncontrolledValue;
  const currentValueRef = useRef<InputNumberValue>(currentValue);
  currentValueRef.current = currentValue;
  const resolvedSize = size ?? config.size;
  const resolvedDisabled = disabled || formField?.disabled === true;
  const resolvedStatus = status ?? (formField?.invalid ? 'error' : undefined);
  const numericOptions = useMemo(
    () => ({ max, min, precision, step, stepStrictly, stringMode }),
    [max, min, precision, step, stepStrictly, stringMode],
  );
  const displayValue =
    editingValue ?? formatInputNumberDisplay(currentValue, precision, stringMode).toString();
  const formattedValue = formatter
    ? formatter(displayValue, {
        userTyping: editingValue !== null,
        input: editingValue ?? undefined,
      })
    : displayValue;
  const canIncrease = canStepInputNumber(currentValue, 'up', numericOptions);
  const canDecrease = canStepInputNumber(currentValue, 'down', numericOptions);
  const hasPrefix = prefix !== undefined || prefixIcon !== undefined;
  const hasSuffix = suffix !== undefined || suffixIcon !== undefined;
  const showControls = controls && !readOnly;

  useEffect(() => {
    const controller = createInputNumberLongPressController({
      interval: () => longPressInterval,
      onRepeat: () => actionRef.current?.(),
    });
    longPressRef.current = controller;
    return () => {
      controller.destroy();
      longPressRef.current = null;
      actionRef.current = null;
    };
  }, [longPressInterval]);

  function emitValue(nextValue: InputNumberValue, source: 'input' | 'step' | 'clear'): void {
    currentValueRef.current = nextValue;
    if (value === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
    if (source === 'input') onInput?.(nextValue);
    if (source !== 'input') commitValue(nextValue);
  }

  function commitValue(nextValue: InputNumberValue): void {
    if (areInputNumberValuesEqual(committedValueRef.current, nextValue)) return;
    committedValueRef.current = nextValue;
    onChange?.(nextValue);
    formField?.notify('change');
  }

  function parseAndVerify(rawValue: string): InputNumberValue {
    const sanitized = sanitizeInputNumberText(rawValue);
    const parsed = parser ? parser(sanitized) : sanitized;
    const normalized = normalizePartialInputNumber(parsed);
    const verified = verifyInputNumberValue(toInputNumberDecimal(normalized), numericOptions);
    return toInputNumberOutput(verified, stringMode);
  }

  function applyStep(direction: 'up' | 'down'): void {
    if (
      resolvedDisabled ||
      readOnly ||
      !canStepInputNumber(currentValueRef.current, direction, numericOptions)
    )
      return;
    setEditingValue(null);
    const nextValue = toInputNumberOutput(
      stepInputNumberValue(currentValueRef.current, direction, numericOptions),
      stringMode,
    );
    emitValue(nextValue, 'step');
  }

  function beginLongPress(event: ReactPointerEvent<HTMLButtonElement>, direction: 'up' | 'down') {
    if (!longPress || resolvedDisabled || readOnly) return;
    actionRef.current = () => applyStep(direction);
    longPressRef.current?.start(event.nativeEvent);
  }

  function clear(): void {
    if (resolvedDisabled || readOnly) return;
    setEditingValue(null);
    emitValue(null, 'clear');
    onClear?.();
    inputRef.current?.focus();
  }

  useImperativeHandle(ref, () => ({
    get input() {
      return inputRef.current;
    },
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    increase: () => applyStep('up'),
    decrease: () => applyStep('down'),
    clear,
  }));

  const stepButton = (direction: 'up' | 'down', content: ReactNode, extraClass?: string) => {
    const enabled = direction === 'up' ? canIncrease : canDecrease;
    return (
      <button
        aria-label={
          direction === 'up' ? config.inputNumberLabels.increase : config.inputNumberLabels.decrease
        }
        aria-disabled={resolvedDisabled || readOnly || !enabled || undefined}
        className={cls(
          classes.e('step-item'),
          classes.e(direction === 'up' ? 'step-up' : 'step-down'),
          classes.is('disabled', resolvedDisabled || readOnly || !enabled),
          extraClass,
        )}
        data-trigger-type={direction}
        onClick={() => applyStep(direction)}
        onPointerDown={event => beginLongPress(event, direction)}
        tabIndex={-1}
        type="button"
      >
        {content}
      </button>
    );
  };

  return (
    <div
      {...nativeProps}
      className={cls(
        classes.block,
        classes.m(resolvedSize),
        classes.m(variant),
        classes.is('disabled', resolvedDisabled),
        classes.is('no-controls', !showControls),
        classes.is('right-controls', controlsPosition === 'right'),
        classes.is('between-controls', controlsPosition === 'between'),
        classes.is('clearable', clearable),
        classes.is('error', resolvedStatus === 'error'),
        classes.is('inner-active', focused),
        classes.has('prefix', hasPrefix),
        classes.has('suffix', hasSuffix),
        className,
      )}
    >
      <div className={classes.e('group')}>
        {prepend !== undefined ? (
          <div className={classes.em('group', 'prepend')}>{prepend}</div>
        ) : null}
        <div
          className={cls(
            classes.em('group', 'inner'),
            classes.has('prepend', prepend !== undefined),
            classes.has('append', append !== undefined),
          )}
        >
          {hasPrefix || (showControls && controlsPosition === 'between') ? (
            <div className={classes.em('prefix', 'wrapper')}>
              {showControls && controlsPosition === 'between' ? (
                <div className={cls(classes.e('step-wrapper'), classes.is('left'))}>
                  {stepButton('down', '−', classes.e('step-minus'))}
                </div>
              ) : null}
              {hasPrefix ? (
                <div className={classes.e('prefix')} onClick={() => inputRef.current?.focus()}>
                  {prefix ?? prefixIcon}
                </div>
              ) : null}
            </div>
          ) : null}
          <input
            {...inputProps}
            aria-describedby={formField?.describedBy ?? inputProps?.['aria-describedby']}
            aria-invalid={resolvedStatus === 'error' || undefined}
            aria-labelledby={formField?.labelId ?? inputProps?.['aria-labelledby']}
            aria-valuemax={Number.isFinite(Number(max)) ? Number(max) : undefined}
            aria-valuemin={Number.isFinite(Number(min)) ? Number(min) : undefined}
            aria-valuenow={
              currentValue === null || currentValue === undefined || currentValue === ''
                ? undefined
                : Number(currentValue)
            }
            className={cls(classes.e('inner'), inputProps?.className)}
            data-focus-visible-proxy
            disabled={resolvedDisabled}
            id={formField?.controlId ?? inputProps?.id}
            inputMode="decimal"
            max={max}
            min={min}
            name={name}
            onBlur={event => {
              setFocused(false);
              const nextValue = parseAndVerify(
                sanitizeInputNumberBlurText(event.currentTarget.value),
              );
              setEditingValue(null);
              if (!areInputNumberValuesEqual(currentValueRef.current, nextValue)) {
                currentValueRef.current = nextValue;
                if (value === undefined) setUncontrolledValue(nextValue);
                onValueChange?.(nextValue);
              }
              commitValue(nextValue);
              onBlur?.(event);
              formField?.notify('blur');
            }}
            onFocus={event => {
              committedValueRef.current = currentValue;
              setFocused(true);
              onFocus?.(event);
            }}
            onInput={event => {
              if (resolvedDisabled || readOnly) return;
              const rawValue = sanitizeInputNumberText(event.currentTarget.value);
              const parsed = parser ? parser(rawValue) : rawValue;
              setEditingValue(String(parsed));
              emitValue(parseAndVerify(rawValue), 'input');
            }}
            onKeyDown={event => {
              const horizontal = controlsPosition === 'between';
              if (event.key === (horizontal ? 'ArrowRight' : 'ArrowUp')) {
                event.preventDefault();
                applyStep('up');
              } else if (event.key === (horizontal ? 'ArrowLeft' : 'ArrowDown')) {
                event.preventDefault();
                applyStep('down');
              }
              onKeyDown?.(event);
            }}
            onKeyPress={onKeyPress}
            onKeyUp={onKeyUp}
            onWheel={event => {
              if (focused) {
                event.stopPropagation();
                if (wheelToChange) applyStep(event.deltaY < 0 ? 'up' : 'down');
                else event.preventDefault();
              }
              onWheel?.(event);
            }}
            placeholder={placeholder ?? config.inputNumberLabels.placeholder}
            readOnly={readOnly}
            ref={inputRef}
            role="spinbutton"
            step={step}
            type="text"
            value={formattedValue}
          />
          {clearable &&
          currentValue !== null &&
          currentValue !== undefined &&
          currentValue !== '' ? (
            <button
              aria-label={config.inputNumberLabels.clear}
              className={classes.e('clear')}
              onClick={clear}
              tabIndex={-1}
              type="button"
            >
              ×
            </button>
          ) : null}
          {hasSuffix || showControls ? (
            <div className={classes.em('suffix', 'wrapper')}>
              {hasSuffix ? (
                <div className={classes.e('suffix')} onClick={() => inputRef.current?.focus()}>
                  {suffix ?? suffixIcon}
                </div>
              ) : null}
              {showControls ? (
                <div className={cls(classes.e('step-wrapper'), classes.is('right'))}>
                  {stepButton('up', controlsPosition === 'between' ? '+' : '⌃')}
                  {controlsPosition === 'right' ? stepButton('down', '⌄') : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        {append !== undefined ? (
          <div className={classes.em('group', 'append')}>{append}</div>
        ) : null}
      </div>
    </div>
  );
});

export const HInputNumber = InputNumber;
export type { InputNumberControlPosition, InputNumberStatus, InputNumberVariant };
