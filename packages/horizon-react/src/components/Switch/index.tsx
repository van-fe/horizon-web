import type { FocusEventHandler, InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import {
  getSwitchState,
  resolveControllableValue,
  resolveSwitchChange,
  SWITCH_DEFAULTS,
} from '@aurora/core';
import type { SwitchChangeResult, SwitchCommonProps } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { useFormFieldControl } from '../Form/context';

export type { SwitchLabelPosition, SwitchSize, SwitchStatusPosition } from '@aurora/core';

export interface SwitchProps extends SwitchCommonProps {
  /** 状态变化回调。@en Called when the value changes. */
  onChange?: (value: boolean, details: { reason: 'toggle' }) => void;
  /** 状态改变前的守卫。@en Guard evaluated before a value change. */
  /** 标签内容。@en Label content. */
  label?: ReactNode;
  /** 标签位置。@en Position of the label. */
  /** 开启状态文字。@en Text shown for the on state. */
  statusOnText?: ReactNode;
  /** 关闭状态文字。@en Text shown for the off state. */
  statusOffText?: ReactNode;
  /** 根元素类名。@en Class name applied to the root element. */
  className?: string;
  /** 原生输入属性。@en Native input attributes. */
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'defaultChecked' | 'disabled' | 'onBlur' | 'onChange' | 'readOnly' | 'role' | 'type'
  >;
  /** 原生失焦回调。@en Native blur callback. */
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    value,
    defaultValue = SWITCH_DEFAULTS.defaultValue,
    onChange,
    beforeChange,
    disabled = SWITCH_DEFAULTS.disabled,
    readOnly = SWITCH_DEFAULTS.readOnly,
    label,
    labelPosition = SWITCH_DEFAULTS.labelPosition,
    status = SWITCH_DEFAULTS.status,
    statusPosition = SWITCH_DEFAULTS.statusPosition,
    statusOnText,
    statusOffText,
    size = SWITCH_DEFAULTS.size,
    className,
    inputProps,
    onBlur,
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const formField = useFormFieldControl();
  const classHelper = useMemo(
    () => new ComponentClassBlock('switch', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    resolveControllableValue(undefined, defaultValue),
  );
  const [pending, setPending] = useState(false);
  const currentValue = resolveControllableValue(value, uncontrolledValue);
  const currentValueRef = useRef(currentValue);
  const mounted = useRef(true);
  const transitionId = useRef(0);
  currentValueRef.current = currentValue;
  const resolvedDisabled = disabled || formField?.disabled === true;
  const state = getSwitchState({
    value: currentValue,
    disabled: resolvedDisabled,
    readonly: readOnly,
    pending,
  });

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  function applyChange(result: SwitchChangeResult): void {
    if (!result.accepted) return;
    if (value === undefined) setUncontrolledValue(result.value);
    onChange?.(result.value, { reason: result.reason });
    formField?.notify('change');
  }

  function requestChange(): void {
    const sourceValue = state.value;
    const resolution = resolveSwitchChange({ ...state, beforeChange });
    if (resolution instanceof Promise) {
      const requestId = ++transitionId.current;
      setPending(true);
      void resolution
        .then(result => {
          if (
            mounted.current &&
            requestId === transitionId.current &&
            currentValueRef.current === sourceValue
          ) {
            applyChange(result);
          }
        })
        .finally(() => {
          if (mounted.current && requestId === transitionId.current) setPending(false);
        });
    } else {
      applyChange(resolution);
    }
  }

  const statusText = currentValue
    ? (statusOnText ?? config.switchLabels.on)
    : (statusOffText ?? config.switchLabels.off);

  return (
    <div
      className={cls(
        classHelper.block,
        classHelper.m(labelPosition),
        classHelper.m('active', currentValue),
        classHelper.m('sm', size === 'small'),
        classHelper.m(size),
        classHelper.m('disabled', resolvedDisabled),
        className,
      )}
      onClick={requestChange}
    >
      {label && <span className={classHelper.e('label')}>{label}</span>}
      <span className={classHelper.e('main')}>
        <span
          className={cls(
            classHelper.e('core'),
            classHelper.is('disabled', resolvedDisabled),
            classHelper.is('active', currentValue),
            classHelper.is('readonly', readOnly),
            classHelper.is('with-inner-text', status && statusPosition === 'inside'),
          )}
        >
          <input
            {...inputProps}
            aria-describedby={formField?.describedBy ?? inputProps?.['aria-describedby']}
            aria-busy={pending || undefined}
            aria-checked={currentValue}
            aria-disabled={resolvedDisabled}
            aria-invalid={formField?.invalid || undefined}
            aria-label={
              inputProps?.['aria-label'] ?? (typeof label === 'string' ? label : undefined)
            }
            aria-readonly={readOnly}
            checked={currentValue}
            data-focus-visible-proxy
            disabled={resolvedDisabled}
            id={formField?.controlId}
            onBlur={event => {
              onBlur?.(event);
              formField?.notify('blur');
            }}
            onChange={requestChange}
            onClick={event => event.stopPropagation()}
            readOnly={readOnly}
            ref={ref}
            role="switch"
            type="checkbox"
          />
          {status && statusPosition === 'inside' && (
            <span
              aria-hidden="true"
              className={cls(classHelper.e('inner-text'), classHelper.is('active', currentValue))}
            >
              {statusText}
            </span>
          )}
          <span className={classHelper.e('inner')} />
        </span>
        {status && statusPosition === 'outside' && (
          <span className={classHelper.e('status')}>{statusText}</span>
        )}
      </span>
    </div>
  );
});

export const HSwitch = Switch;
