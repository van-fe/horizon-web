import type {
  CompositionEvent,
  FocusEvent,
  FormEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import { forwardRef, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type {
  AdaptComponentApiShape,
  ComponentEventHandlers,
  InputCommandMap,
  InputCommonProps,
  InputEventMap,
  InputRegionMap,
} from '@aurora/core';
import {
  getInputNativeType,
  INPUT_DEFAULTS,
  isInputValueOverflow,
  normalizeInputType,
  shouldEmitInputChange,
} from '@aurora/core';
import {
  blurInputElement,
  calculateInputAutoSizeStyle,
  focusInputElement,
  selectInputElement,
} from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { useFormFieldControl } from '../Form/context';

type InputFieldElement = HTMLInputElement | HTMLTextAreaElement;

type InputReactEventMap = AdaptComponentApiShape<
  InputEventMap<
    FormEvent<InputFieldElement>,
    MouseEvent<InputFieldElement>,
    FocusEvent<InputFieldElement>,
    KeyboardEvent<InputFieldElement>,
    CompositionEvent<InputFieldElement>
  >,
  {
    valueChange: 'onValueChange';
    click: 'onClick';
    input: 'onInput';
    change: 'onChange';
    focus: 'onFocus';
    blur: 'onBlur';
    clear: 'onClear';
    keyDown: 'onKeyDown';
    keyPress: 'onKeyPress';
    keyUp: 'onKeyUp';
    compositionStart: 'onCompositionStart';
    compositionUpdate: 'onCompositionUpdate';
    compositionEnd: 'onCompositionEnd';
  }
>;

type InputReactCallbacks = ComponentEventHandlers<InputReactEventMap>;

type InputReactRegions = {
  [Name in keyof InputRegionMap]?: ReactNode;
};

export interface InputHandle extends InputCommandMap {
  readonly input: InputFieldElement | null;
}

export type InputProps = InputCommonProps &
  InputReactCallbacks &
  InputReactRegions &
  Omit<
    HTMLAttributes<HTMLDivElement>,
    | 'children'
    | 'defaultValue'
    | 'onBlur'
    | 'onChange'
    | 'onClick'
    | 'onCompositionEnd'
    | 'onCompositionStart'
    | 'onCompositionUpdate'
    | 'onFocus'
    | 'onInput'
    | 'onKeyDown'
    | 'onKeyPress'
    | 'onKeyUp'
  > & {
    /** Native attributes for a single-line field. */
    inputProps?: Omit<
      InputHTMLAttributes<HTMLInputElement>,
      | 'defaultValue'
      | 'disabled'
      | 'maxLength'
      | 'minLength'
      | 'onBlur'
      | 'onChange'
      | 'onClick'
      | 'onCompositionEnd'
      | 'onCompositionStart'
      | 'onCompositionUpdate'
      | 'onFocus'
      | 'onInput'
      | 'onKeyDown'
      | 'onKeyPress'
      | 'onKeyUp'
      | 'placeholder'
      | 'readOnly'
      | 'type'
      | 'value'
    >;
    /** Native attributes for a textarea. */
    textareaProps?: Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      | 'defaultValue'
      | 'disabled'
      | 'maxLength'
      | 'minLength'
      | 'onBlur'
      | 'onChange'
      | 'onClick'
      | 'onCompositionEnd'
      | 'onCompositionStart'
      | 'onCompositionUpdate'
      | 'onFocus'
      | 'onInput'
      | 'onKeyDown'
      | 'onKeyPress'
      | 'onKeyUp'
      | 'placeholder'
      | 'readOnly'
      | 'rows'
      | 'value'
    >;
  };

export const Input = forwardRef<InputHandle, InputProps>(function Input(
  {
    value,
    defaultValue = INPUT_DEFAULTS.defaultValue,
    type = INPUT_DEFAULTS.type,
    size = 'medium',
    placeholder,
    clearable = INPUT_DEFAULTS.clearable,
    readOnly = INPUT_DEFAULTS.readOnly,
    disabled = INPUT_DEFAULTS.disabled,
    showPassword = INPUT_DEFAULTS.showPassword,
    showLimit = INPUT_DEFAULTS.showLimit,
    maxLength,
    allowOverflow = INPUT_DEFAULTS.allowOverflow,
    minLength,
    rows = INPUT_DEFAULTS.rows,
    resize = INPUT_DEFAULTS.resize,
    variant = INPUT_DEFAULTS.variant,
    status,
    autoSize = INPUT_DEFAULTS.autoSize,
    prefix,
    suffix,
    prepend,
    append,
    inputProps,
    textareaProps,
    onValueChange,
    onClick,
    onInput,
    onChange,
    onFocus,
    onBlur,
    onClear,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onCompositionStart,
    onCompositionUpdate,
    onCompositionEnd,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const formField = useFormFieldControl();
  const classes = useMemo(
    () => new ComponentClassBlock('input', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const fieldRef = useRef<InputFieldElement>(null);
  const composingRef = useRef(false);
  const valueAtFocusRef = useRef(defaultValue);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const currentValue = value ?? uncontrolledValue;
  const normalizedType = normalizeInputType(type);
  const isTextarea = normalizedType === 'textarea';
  const resolvedDisabled = disabled || formField?.disabled === true;
  const resolvedStatus = status ?? (formField?.invalid ? 'error' : undefined);
  const overflow = allowOverflow && isInputValueOverflow(currentValue, maxLength);
  const suffixVisible =
    (!resolvedDisabled && clearable && currentValue.length > 0) ||
    (normalizedType === 'password' && showPassword) ||
    suffix !== undefined;

  useImperativeHandle(
    ref,
    () => ({
      get input() {
        return fieldRef.current;
      },
      focus: () => focusInputElement(fieldRef.current),
      blur: () => blurInputElement(fieldRef.current),
      select: () => selectInputElement(fieldRef.current),
    }),
    [],
  );

  useLayoutEffect(() => {
    if (!isTextarea || !autoSize || !(fieldRef.current instanceof HTMLTextAreaElement)) return;
    const minRows = typeof autoSize === 'object' ? autoSize.minRows : undefined;
    const maxRows = typeof autoSize === 'object' ? autoSize.maxRows : undefined;
    Object.assign(
      fieldRef.current.style,
      calculateInputAutoSizeStyle(fieldRef.current, false, minRows, maxRows),
    );
  }, [autoSize, currentValue, isTextarea]);

  function updateValue(nextValue: string, event: FormEvent<InputFieldElement>): void {
    if (resolvedDisabled || readOnly || composingRef.current) return;
    if (value === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
    onInput?.(nextValue, event);
    formField?.notify('change');
  }

  function handleFocus(event: FocusEvent<InputFieldElement>): void {
    valueAtFocusRef.current = currentValue;
    setFocused(true);
    onFocus?.(event);
  }

  function handleBlur(event: FocusEvent<InputFieldElement>): void {
    setFocused(false);
    if (shouldEmitInputChange(valueAtFocusRef.current, currentValue)) {
      valueAtFocusRef.current = currentValue;
      onChange?.(currentValue);
    }
    onBlur?.(event);
    formField?.notify('blur');
  }

  function handleCompositionStart(event: CompositionEvent<InputFieldElement>): void {
    composingRef.current = true;
    onCompositionStart?.(event);
  }

  function handleCompositionEnd(event: CompositionEvent<InputFieldElement>): void {
    composingRef.current = false;
    onCompositionEnd?.(event);
    updateValue(event.currentTarget.value, event);
  }

  function clearValue(): void {
    if (resolvedDisabled || readOnly) return;
    const syntheticEvent = { currentTarget: fieldRef.current } as FormEvent<InputFieldElement>;
    if (value === undefined) setUncontrolledValue('');
    onValueChange?.('');
    onInput?.('', syntheticEvent);
    if (shouldEmitInputChange(valueAtFocusRef.current, '')) onChange?.('');
    valueAtFocusRef.current = '';
    formField?.notify('change');
    onClear?.();
    focusInputElement(fieldRef.current);
  }

  const commonFieldProps = {
    'aria-describedby': formField?.describedBy,
    'aria-invalid': formField?.invalid || undefined,
    disabled: resolvedDisabled,
    id: formField?.controlId,
    maxLength: allowOverflow ? undefined : maxLength,
    minLength,
    onBlur: handleBlur,
    onClick,
    onCompositionEnd: handleCompositionEnd,
    onCompositionStart: handleCompositionStart,
    onCompositionUpdate,
    onFocus: handleFocus,
    onInput: (event: FormEvent<InputFieldElement>) => updateValue(event.currentTarget.value, event),
    onKeyDown,
    onKeyPress,
    onKeyUp,
    placeholder,
    readOnly,
    value: currentValue,
  };

  const count =
    showLimit && maxLength ? (
      <span className={isTextarea ? classes.e('textarea-limit') : classes.e('limit')}>
        <span
          className={
            currentValue.length > 0
              ? isTextarea
                ? classes.em('textarea-limit', 'current')
                : classes.em('limit', 'current')
              : undefined
          }
        >
          {currentValue.length}
        </span>
        /{maxLength}
      </span>
    ) : null;

  if (isTextarea) {
    return (
      <div
        {...nativeProps}
        className={cls(
          classes.block,
          classes.e(`textarea--${variant}`),
          classes.em(`textarea--${variant}`, 'focused', focused),
          classes.em(`textarea--${variant}`, 'disabled', resolvedDisabled),
          classes.is('error', resolvedStatus === 'error'),
          classes.m('limit-with-multi-line', Boolean(count)),
          classes.is('out-of-exceeded', overflow),
          className,
        )}
      >
        <textarea
          {...textareaProps}
          {...commonFieldProps}
          className={cls(classes.e('inner'), classes.e('textarea-inner'), textareaProps?.className)}
          ref={element => {
            fieldRef.current = element;
          }}
          rows={autoSize ? undefined : rows}
          style={{ resize: autoSize ? 'none' : resize, ...textareaProps?.style }}
        />
        {count ? <span className={classes.e('textarea-limit-wrap')}>{count}</span> : null}
      </div>
    );
  }

  return (
    <div
      {...nativeProps}
      className={cls(
        classes.block,
        classes.m(size),
        classes.m('filled', variant === 'emphasize'),
        classes.m('no-border', variant === 'no-border'),
        classes.m('with-prepend', prepend !== undefined),
        classes.m('with-append', append !== undefined),
        classes.em('error', variant, resolvedStatus === 'error'),
        classes.is('out-of-exceeded', overflow),
        className,
      )}
    >
      <div className={classes.e('group-wrap')}>
        {prepend !== undefined ? <span className={classes.e('prepend')}>{prepend}</span> : null}
        <span
          className={cls(
            classes.e('inner-wrap'),
            classes.em('inner-wrap', 'focused', focused),
            classes.em('inner-wrap', 'disabled', resolvedDisabled),
          )}
        >
          {prefix !== undefined ? <span className={classes.e('prefix')}>{prefix}</span> : null}
          <input
            {...inputProps}
            {...commonFieldProps}
            className={cls(classes.e('inner'), inputProps?.className)}
            ref={element => {
              fieldRef.current = element;
            }}
            type={getInputNativeType(normalizedType, passwordVisible)}
          />
          {suffixVisible ? (
            <span className={classes.e('suffix')}>
              {!resolvedDisabled && clearable && currentValue.length > 0 ? (
                <button
                  aria-label="Clear input"
                  className={classes.m(
                    suffix !== undefined ? 'clear-action-with-multi' : 'clear-action',
                  )}
                  onClick={clearValue}
                  type="button"
                >
                  ×
                </button>
              ) : null}
              {normalizedType === 'password' && showPassword ? (
                <button
                  aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  className={classes.m('password-action')}
                  onClick={() => {
                    setPasswordVisible(visible => !visible);
                    focusInputElement(fieldRef.current);
                  }}
                  type="button"
                >
                  {passwordVisible ? '◉' : '◎'}
                </button>
              ) : null}
              {suffix}
            </span>
          ) : null}
          {count}
        </span>
        {append !== undefined ? <span className={classes.e('append')}>{append}</span> : null}
      </div>
    </div>
  );
});

export const HInput = Input;
export type {
  InputAutoSize,
  InputAutoSizeOptions,
  InputResizeMode,
  InputStatus,
  InputType,
  InputVariant,
} from '@aurora/core';
