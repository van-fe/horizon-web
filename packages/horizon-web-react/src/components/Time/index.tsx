import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import type { TimeCommonProps, TimeEventMap, TimeParts, TimeRegionMap } from '@aurora/core';
import {
  formatTimeParts,
  resolveTimeDurationSeconds,
  splitTimeDuration,
  TIME_DEFAULTS,
} from '@aurora/core';
import { createTimeController } from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import type { ReactEventHandler, ReactRegionContent } from '../_shared/api';

export interface TimeProps
  extends TimeCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 自定义显示内容或基于时间分段的渲染函数。 @en Custom content or a render function receiving the time parts. */
  children?: ReactRegionContent<TimeRegionMap, 'content'>;
  /** 倒计时归零时触发。 @en Runs when the countdown reaches zero. */
  onFinished?: ReactEventHandler<TimeEventMap, 'finished'>;
}

export const Time = forwardRef<HTMLDivElement, TimeProps>(function Time(
  {
    time = TIME_DEFAULTS.time,
    endTime = TIME_DEFAULTS.endTime,
    forward = TIME_DEFAULTS.forward,
    calculative = TIME_DEFAULTS.calculative,
    children,
    onFinished,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('time', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const duration = useMemo(
    () => resolveTimeDurationSeconds({ time, endTime, calculative }),
    [calculative, endTime, time],
  );
  const [parts, setParts] = useState<TimeParts>(() => splitTimeDuration(forward ? 0 : duration));

  useEffect(() => {
    const controller = createTimeController({
      duration,
      forward,
      calculative,
      onChange: setParts,
      onFinished: () => onFinished?.(),
    });
    return () => controller.destroy();
  }, [calculative, duration, forward, onFinished]);

  const content: ReactNode =
    typeof children === 'function' ? children(parts) : (children ?? formatTimeParts(parts));
  return (
    <div
      {...nativeProps}
      aria-live="off"
      className={cls(classes.block, className)}
      ref={ref}
      role="timer"
    >
      {content}
    </div>
  );
});

export const HTime = Time;
export type { TimeParts, TimeValue } from '@aurora/core';
