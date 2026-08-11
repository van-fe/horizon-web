import type { HTMLAttributes, ReactElement } from 'react';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import type { CountCommonProps, CountEventMap, CountRegionMap } from '@aurora/core';
import { COUNT_DEFAULTS, formatCountNumber, nextCountValue } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import type { ReactEventHandler, ReactRegionContent } from '../_shared/api';

export interface CountProps
  extends CountCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'prefix'> {
  prefixContent?: ReactRegionContent<CountRegionMap, 'prefix'>;
  suffixContent?: ReactRegionContent<CountRegionMap, 'suffix'>;
  onChange?: ReactEventHandler<CountEventMap, 'change'>;
}

export const Count = forwardRef<HTMLDivElement, CountProps>(function Count(
  {
    startValue = COUNT_DEFAULTS.startValue,
    endValue,
    decimal = COUNT_DEFAULTS.decimal,
    step = COUNT_DEFAULTS.step,
    autoPlay = COUNT_DEFAULTS.autoPlay,
    delay = COUNT_DEFAULTS.delay,
    separator = COUNT_DEFAULTS.separator,
    extent = COUNT_DEFAULTS.extent,
    prefix,
    suffix,
    prefixContent,
    suffixContent,
    onChange,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('count', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const [value, setValue] = useState(startValue);
  useEffect(() => setValue(startValue), [startValue]);
  useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);
  useEffect(() => {
    if (!autoPlay || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(endValue);
      return;
    }
    if (value >= endValue) return;
    const timer = window.setTimeout(
      () => setValue(current => nextCountValue(current, endValue, step)),
      delay,
    );
    return () => clearTimeout(timer);
  }, [autoPlay, delay, endValue, step, value]);
  return (
    <div {...nativeProps} className={cls(classes.block, className)} ref={ref}>
      {prefixContent ?? prefix}
      <div className={classes.e('content')}>
        {formatCountNumber(value, separator, extent, decimal)}
      </div>
      {suffixContent ?? suffix}
    </div>
  );
});

export const HCount = Count;
