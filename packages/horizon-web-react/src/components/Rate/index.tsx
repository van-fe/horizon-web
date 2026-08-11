import type {
  CSSProperties,
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type {
  RateCommandMap,
  RateCommonProps,
  RateEventMap,
  RateIconRegionContext,
  RateRegionMap,
} from '@aurora/core';
import {
  getRateItemStatus,
  getRateKeyboardValue,
  normalizeRateValue,
  RATE_DEFAULTS,
  resolveRateTooltip,
} from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import type { ReactEventHandler, ReactRegionContent } from '../_shared/api';

export type RateHandle = RateCommandMap;

export interface RateProps
  extends
    RateCommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue' | 'onBlur' | 'onChange'> {
  /** 自定义评分图标。@en Custom rating icon or renderer. */
  renderIcon?: ReactRegionContent<RateRegionMap, 'icon'>;
  /** 值变化回调。@en Called when the rating changes. */
  onChange?: ReactEventHandler<RateEventMap, 'change'>;
  /** 原生失焦回调。@en Native blur callback. */
  onBlur?: ReactEventHandler<RateEventMap<FocusEvent<HTMLDivElement>>, 'blur'>;
  /** 无障碍名称。@en Accessible label for the rating control. */
  'aria-label'?: string;
}

const presetSize = { small: 12, medium: 16, large: 20 } as const;

export const Rate = forwardRef<RateHandle, RateProps>(function Rate(
  {
    value,
    defaultValue = RATE_DEFAULTS.defaultValue,
    count = RATE_DEFAULTS.count,
    half = RATE_DEFAULTS.half,
    showTooltip = RATE_DEFAULTS.showTooltip,
    tooltip = RATE_DEFAULTS.tooltip,
    readOnly = RATE_DEFAULTS.readOnly,
    disabled = RATE_DEFAULTS.disabled,
    size = 'medium',
    color,
    voidColor,
    disabledColor,
    gutter = RATE_DEFAULTS.gutter,
    renderIcon,
    onChange,
    onBlur,
    className,
    onKeyDown,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const namespace = config.namespace.toLowerCase();
  const classes = useMemo(() => new ComponentClassBlock('rate', namespace), [namespace]);
  const rootRef = useRef<HTMLDivElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    normalizeRateValue(defaultValue, count, half),
  );
  const currentValue = normalizeRateValue(value ?? uncontrolledValue, count, half);
  const iconSize = typeof size === 'number' ? size : presetSize[size];
  const activeColor = color ?? `rgb(var(--${namespace}-rate-color-content))`;
  const emptyColor = voidColor ?? `var(--${namespace}-border-default)`;
  const inactiveColor = disabledColor ?? `var(--${namespace}-text-disabled)`;

  useImperativeHandle(ref, () => ({ focus: () => rootRef.current?.focus() }), []);

  function updateValue(nextValue: number): void {
    if (disabled || readOnly) return;
    const normalized = normalizeRateValue(nextValue, count, half);
    if (normalized === currentValue) return;
    if (value === undefined) setUncontrolledValue(normalized);
    onChange?.(normalized);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled || readOnly) return;
    const nextValue = getRateKeyboardValue(currentValue, event.key, count, half);
    if (nextValue === undefined) return;
    event.preventDefault();
    updateValue(nextValue);
  }

  function iconContent(context: RateIconRegionContext): ReactNode {
    return typeof renderIcon === 'function' ? renderIcon(context) : (renderIcon ?? '★');
  }

  return (
    <div
      {...nativeProps}
      aria-disabled={disabled}
      aria-readonly={readOnly}
      aria-valuemax={count}
      aria-valuemin={0}
      aria-valuenow={currentValue}
      className={cls(
        classes.block,
        classes.m('enabled', !readOnly && !disabled),
        classes.m('disabled', disabled),
        className,
      )}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      ref={rootRef}
      role="slider"
      tabIndex={disabled ? -1 : 0}
    >
      {Array.from({ length: count }, (_, index) => {
        const itemIndex = index + 1;
        const status = getRateItemStatus(currentValue, itemIndex);
        const itemColor = disabled ? inactiveColor : status === 'void' ? emptyColor : activeColor;
        const style: CSSProperties = {
          color: itemColor,
          fontSize: iconSize,
          height: iconSize,
          marginRight: gutter,
          width: iconSize,
        };
        const context = { index, status, value: currentValue } satisfies RateIconRegionContext;
        const handleClick = (event: MouseEvent<HTMLSpanElement>): void => {
          const useHalf =
            half &&
            event.nativeEvent.offsetX < event.currentTarget.getBoundingClientRect().width / 2;
          updateValue(itemIndex - (useHalf ? 0.5 : 0));
        };
        return (
          <span
            aria-hidden="true"
            className={cls(
              classes.e('icon'),
              status === 'void' ? classes.m('void') : classes.m('full'),
            )}
            key={itemIndex}
            onClick={handleClick}
            style={style}
          >
            {iconContent(context)}
            {status === 'half' ? (
              <span
                className={classes.m('half')}
                style={{
                  color: activeColor,
                  left: 0,
                  overflow: 'hidden',
                  position: 'absolute',
                  top: 0,
                  width: '50%',
                }}
              >
                {iconContent(context)}
              </span>
            ) : null}
          </span>
        );
      })}
      {showTooltip ? (
        <span className={classes.e('tooltip')}>
          {resolveRateTooltip(currentValue, count, tooltip)}
        </span>
      ) : null}
    </div>
  );
});

export const HRate = Rate;
export type { RateItemStatus, RatePresetSize, RateSize, RateTooltip } from '@aurora/core';
