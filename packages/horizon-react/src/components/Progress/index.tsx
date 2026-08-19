import type { CSSProperties, HTMLAttributes, ReactElement } from 'react';
import { forwardRef, useMemo } from 'react';
import type { ProgressCommonProps, ProgressRegionMap } from '@aurora/core';
import {
  clampProgressPercentage,
  PROGRESS_DEFAULTS,
  resolveProgressColor,
} from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import type { ReactRegionContent } from '../_shared/api';

export interface ProgressProps
  extends
    ProgressCommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'content'> {
  /** 自定义进度文本。@en Custom progress text. */
  children?: ReactRegionContent<ProgressRegionMap, 'label'>;
}

const lineSize = { mini: 2, small: 4, medium: 6, large: 8 } as const;
const circleSize = { mini: 32, small: 80, medium: 112, large: 144 } as const;
const circleStroke = { mini: 12.5, small: 7, medium: 6, large: 5.5 } as const;

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    type = PROGRESS_DEFAULTS.type,
    percentage,
    status = PROGRESS_DEFAULTS.status,
    duration = PROGRESS_DEFAULTS.duration,
    size = PROGRESS_DEFAULTS.size,
    format = PROGRESS_DEFAULTS.format,
    content = PROGRESS_DEFAULTS.content,
    placement = PROGRESS_DEFAULTS.placement,
    textBold = PROGRESS_DEFAULTS.textBold,
    showText = PROGRESS_DEFAULTS.showText,
    color = PROGRESS_DEFAULTS.color,
    children,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('progress', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const value = clampProgressPercentage(percentage);
  const statusColor =
    status === 'success'
      ? classes.color('bg-success-default')
      : status === 'warning'
        ? classes.color('bg-warning-default')
        : status === 'exception' || status === 'error'
          ? classes.color('bg-error-default')
          : classes.color('bg-info-default');
  const currentColor = resolveProgressColor(color, value) ?? statusColor;
  const fallbackLabel = content !== '' ? content : format(value);
  const label = children ?? fallbackLabel;
  const statusSymbol =
    status === 'success' ? '✓' : status === 'warning' ? '!' : status ? '×' : null;
  const text = statusSymbol ?? label;

  let visual: ReactElement;
  if (type === 'line') {
    visual = (
      <div className={`${classes.block}-bar`}>
        <div className={`${classes.block}-bar__outer`} style={{ height: lineSize[size] }}>
          <div
            className={`${classes.block}-bar__inner`}
            style={{
              animationDuration: `${duration}s`,
              backgroundColor: currentColor,
              width: `${value}%`,
            }}
          />
        </div>
      </div>
    );
  } else {
    const strokeWidth = circleStroke[size];
    const radius = 50 - strokeWidth / 2;
    const perimeter = 2 * Math.PI * radius;
    const rate = type === 'dashboard' ? 0.75 : 1;
    const dash = perimeter * rate;
    const offset = (-perimeter * (1 - rate)) / 2;
    const path = `M 50 50 m 0 ${type === 'dashboard' ? '' : '-'}${radius} a ${radius} ${radius} 0 1 1 0 ${type === 'dashboard' ? '-' : ''}${radius * 2} a ${radius} ${radius} 0 1 1 0 ${type === 'dashboard' ? '' : '-'}${radius * 2}`;
    visual = (
      <div
        className={`${classes.block}-circle`}
        style={{ height: circleSize[size], width: circleSize[size] }}
      >
        <svg aria-hidden="true" viewBox="0 0 100 100">
          <path
            d={path}
            fill="none"
            stroke={classes.color('bg-hover')}
            strokeDasharray={`${dash}px, ${perimeter}px`}
            strokeDashoffset={`${offset}px`}
            strokeWidth={strokeWidth}
          />
          <path
            d={path}
            fill="none"
            stroke={currentColor}
            strokeDasharray={`${dash * (value / 100)}px, ${perimeter}px`}
            strokeDashoffset={`${offset}px`}
            strokeLinecap="round"
            strokeWidth={value ? strokeWidth : 0}
            style={{ transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease' }}
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      {...nativeProps}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={value}
      aria-valuetext={String(fallbackLabel)}
      className={cls(
        classes.block,
        `${classes.block}-${type}`,
        `${classes.block}-status-${status}`,
        `${classes.block}-${size}`,
        className,
      )}
      ref={ref}
      role="progressbar"
    >
      {visual}
      {showText && !(type === 'circle' && size === 'mini') ? (
        <div className={cls(classes.e('text'), `${classes.e('text')}-${placement}`)}>
          <span style={{ fontWeight: textBold ? 'bold' : 'normal' } as CSSProperties}>{text}</span>
        </div>
      ) : null}
    </div>
  );
});

export const HProgress = Progress;
export type {
  ProgressColor,
  ProgressColorResolver,
  ProgressColorStop,
  ProgressFormatter,
  ProgressPlacement,
  ProgressSize,
  ProgressStatus,
  ProgressType,
} from '@aurora/core';
