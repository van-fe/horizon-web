import type {
  FocusEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactElement,
} from 'react';
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type {
  AdaptComponentApiShape,
  ComponentEventHandlers,
  SliderCommandMap,
  SliderCommonProps,
  SliderEventMap,
  SliderValue,
} from '@aurora/core';
import {
  getClosestSliderThumb,
  getSliderKeyboardValue,
  getSliderProgress,
  getSliderSeparatorPercents,
  getSliderValueFromPosition,
  normalizeSliderValue,
  SLIDER_DEFAULTS,
} from '@aurora/core';
import {
  captureSliderPointer,
  focusSliderThumb,
  getSliderTrackMetrics,
} from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

type SliderReactEventMap = AdaptComponentApiShape<
  SliderEventMap<FocusEvent<HTMLDivElement>>,
  { change: 'onChange'; focus: 'onFocus'; blur: 'onBlur' }
>;

type SliderReactCallbacks = ComponentEventHandlers<SliderReactEventMap>;

export type SliderHandle = SliderCommandMap;

export type SliderProps = SliderCommonProps &
  SliderReactCallbacks &
  Omit<
    HTMLAttributes<HTMLDivElement>,
    'color' | 'defaultValue' | 'onBlur' | 'onChange' | 'onFocus'
  > & {
    /** 原生数字输入属性。@en Native number-input attributes. */
    inputProps?: Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'defaultValue' | 'disabled' | 'max' | 'min' | 'onChange' | 'step' | 'type' | 'value'
    >;
  };

function sliderValuesEqual(left: SliderValue, right: SliderValue): boolean {
  if (Array.isArray(left) && Array.isArray(right)) {
    return left[0] === right[0] && left[1] === right[1];
  }
  return left === right;
}

export const Slider = forwardRef<SliderHandle, SliderProps>(function Slider(
  {
    value,
    defaultValue = SLIDER_DEFAULTS.defaultValue,
    disabled = SLIDER_DEFAULTS.disabled,
    size = SLIDER_DEFAULTS.size,
    max = SLIDER_DEFAULTS.max,
    min = SLIDER_DEFAULTS.min,
    step = SLIDER_DEFAULTS.step,
    showSeparators = SLIDER_DEFAULTS.showSeparators,
    tone = SLIDER_DEFAULTS.tone,
    color,
    range = SLIDER_DEFAULTS.range,
    trackClickable = SLIDER_DEFAULTS.trackClickable,
    showInput = SLIDER_DEFAULTS.showInput,
    keyboard = SLIDER_DEFAULTS.keyboard,
    showTooltip = SLIDER_DEFAULTS.showTooltip,
    tooltipPlacement = SLIDER_DEFAULTS.tooltipPlacement,
    formatTooltip,
    inputProps,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    className,
    'aria-label': ariaLabel = 'Slider',
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('slider', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeThumbRef = useRef<number | undefined>(undefined);
  const [uncontrolledValue, setUncontrolledValue] = useState<SliderValue>(defaultValue);
  const [activeThumb, setActiveThumb] = useState<number>();
  const sourceValue = value ?? uncontrolledValue;
  const normalized = normalizeSliderValue(sourceValue, range, min, max, step);
  const values = range ? [normalized.first, normalized.second] : [normalized.first];
  const progress = getSliderProgress(normalized.first, normalized.second, min, max, range);
  const separators = showSeparators ? getSliderSeparatorPercents(min, max, step) : [];
  const thumbHalfSize = size === 'small' ? 7 : size === 'large' ? 12 : 10;

  useImperativeHandle(ref, () => ({ focus: () => focusSliderThumb(thumbRefs.current[0]) }), []);

  function commitThumb(index: number, nextThumbValue: number): void {
    if (disabled) return;
    const nextValue = range
      ? normalizeSliderValue(
          index === 0 ? [nextThumbValue, normalized.second] : [normalized.first, nextThumbValue],
          true,
          min,
          max,
          step,
        ).value
      : normalizeSliderValue(nextThumbValue, false, min, max, step).value;
    if (sliderValuesEqual(nextValue, normalized.value)) return;
    if (value === undefined) setUncontrolledValue(nextValue);
    onChange?.(nextValue);
  }

  function valueFromPointer(event: { clientX: number }): number {
    const { left, width } = getSliderTrackMetrics(trackRef.current);
    return getSliderValueFromPosition(event.clientX, left, width, min, max, step);
  }

  function handleTrackClick(event: MouseEvent<HTMLDivElement>): void {
    if (disabled || !trackClickable || event.defaultPrevented) return;
    const nextValue = valueFromPointer(event);
    const index = range ? getClosestSliderThumb(nextValue, normalized.first, normalized.second) : 0;
    commitThumb(index, nextValue);
    focusSliderThumb(thumbRefs.current[index]);
  }

  function handlePointerDown(index: number, event: PointerEvent<HTMLDivElement>): void {
    if (disabled) return;
    event.preventDefault();
    event.stopPropagation();
    captureSliderPointer(event.currentTarget, event.pointerId);
    activeThumbRef.current = index;
    setActiveThumb(index);
    commitThumb(index, valueFromPointer(event));
  }

  function handlePointerMove(index: number, event: PointerEvent<HTMLDivElement>): void {
    if (disabled || activeThumbRef.current !== index) return;
    event.preventDefault();
    commitThumb(index, valueFromPointer(event));
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLDivElement>): void {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled || !keyboard) return;
    const nextValue = getSliderKeyboardValue(values[index] ?? min, event.key, min, max, step);
    if (nextValue === undefined) return;
    event.preventDefault();
    commitThumb(index, nextValue);
  }

  return (
    <div
      {...nativeProps}
      aria-label={ariaLabel}
      className={cls(
        classes.block,
        classes.is('disabled', disabled),
        classes.m(size),
        classes.m(tone),
        className,
      )}
    >
      <div className={classes.e('container')} onClick={handleTrackClick}>
        <div className={classes.e('track')} ref={trackRef}>
          <div
            aria-hidden="true"
            className={classes.e('progress')}
            style={{ background: color, left: `${progress.left}%`, width: `${progress.width}%` }}
          />
          {separators.length > 0 ? (
            <div aria-hidden="true" className={classes.e('separator')}>
              {separators.map((left, index) => (
                <i
                  className={classes.em('separator', 'item')}
                  key={`${left}-${index}`}
                  style={{ left: `${left}%` }}
                />
              ))}
            </div>
          ) : null}
          {values.map((thumbValue, index) => {
            const thumbProgress = getSliderProgress(thumbValue, min, min, max, false).width;
            const label = range ? `${ariaLabel} ${index === 0 ? 'start' : 'end'}` : ariaLabel;
            const tooltip = formatTooltip?.(thumbValue) ?? String(thumbValue);
            return (
              <div
                aria-disabled={disabled}
                aria-label={label}
                aria-orientation="horizontal"
                aria-valuemax={Math.max(min, max)}
                aria-valuemin={Math.min(min, max)}
                aria-valuenow={thumbValue}
                className={classes.e('cursor')}
                data-index={index}
                key={index}
                onBlur={event => {
                  if (activeThumbRef.current === index) activeThumbRef.current = undefined;
                  setActiveThumb(current => (current === index ? undefined : current));
                  onBlur?.(event);
                }}
                onFocus={event => {
                  activeThumbRef.current = index;
                  setActiveThumb(index);
                  onFocus?.(event);
                }}
                onKeyDown={event => handleKeyDown(index, event)}
                onPointerDown={event => handlePointerDown(index, event)}
                onPointerMove={event => handlePointerMove(index, event)}
                onPointerUp={() => {
                  activeThumbRef.current = undefined;
                  setActiveThumb(undefined);
                }}
                ref={element => {
                  thumbRefs.current[index] = element;
                }}
                role="slider"
                style={{ left: `calc(${thumbProgress}% - ${thumbHalfSize}px)` }}
                tabIndex={disabled ? -1 : 0}
                title={showTooltip ? tooltip : undefined}
              >
                {showTooltip && activeThumb === index ? (
                  <span
                    className={classes.e('tooltip')}
                    data-placement={tooltipPlacement}
                    role="tooltip"
                  >
                    {tooltip}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      {showInput && !range ? (
        <div className={classes.e('input')}>
          <input
            {...inputProps}
            aria-label={`${ariaLabel} input`}
            className={cls(classes.em('input', 'native'), inputProps?.className)}
            disabled={disabled}
            max={Math.max(min, max)}
            min={Math.min(min, max)}
            onChange={event => commitThumb(0, Number(event.currentTarget.value))}
            step={step}
            type="number"
            value={normalized.first}
          />
        </div>
      ) : null}
    </div>
  );
});

export const HSlider = Slider;
export type {
  SliderRangeValue,
  SliderTone,
  SliderTooltipFormatter,
  SliderTooltipPlacement,
  SliderValue,
} from '@aurora/core';
