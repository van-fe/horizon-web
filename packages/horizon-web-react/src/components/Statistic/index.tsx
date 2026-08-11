import type { HTMLAttributes, ReactElement } from 'react';
import { forwardRef, useMemo } from 'react';
import type { StatisticCommonProps, StatisticRegionMap } from '@aurora/core';
import { formatStatisticValue, STATISTIC_DEFAULTS } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import type { ReactRegionContent } from '../_shared/api';

export interface StatisticProps
  extends
    StatisticCommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'prefix' | 'title'> {
  children?: ReactRegionContent<StatisticRegionMap, 'value'>;
  titleContent?: ReactRegionContent<StatisticRegionMap, 'title'>;
  prefixContent?: ReactRegionContent<StatisticRegionMap, 'prefix'>;
  suffixContent?: ReactRegionContent<StatisticRegionMap, 'suffix'>;
  trendContent?: ReactRegionContent<StatisticRegionMap, 'trend'>;
}

export const Statistic = forwardRef<HTMLDivElement, StatisticProps>(function Statistic(
  {
    title,
    value = STATISTIC_DEFAULTS.value,
    precision,
    useGrouping = STATISTIC_DEFAULTS.useGrouping,
    locale = 'en',
    prefix,
    suffix,
    formatter,
    trend = STATISTIC_DEFAULTS.trend,
    trendValue,
    trendType = STATISTIC_DEFAULTS.trendType,
    loading = STATISTIC_DEFAULTS.loading,
    children,
    titleContent,
    prefixContent,
    suffixContent,
    trendContent,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('statistic', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const formatted = formatStatisticValue({ value, precision, useGrouping, locale, formatter });
  const trendLabel = trend === 'up' ? 'Increased' : trend === 'down' ? 'Decreased' : undefined;
  return (
    <div {...nativeProps} aria-busy={loading} className={cls(classes.block, className)} ref={ref}>
      {title || titleContent ? (
        <div className={classes.e('title')}>{titleContent ?? title}</div>
      ) : null}
      <div className={classes.e('body')}>
        <div className={classes.e('value')}>
          {prefix || prefixContent ? (
            <span className={classes.e('prefix')}>{prefixContent ?? prefix}</span>
          ) : null}
          <span className={classes.e('number')}>{children ?? formatted}</span>
          {suffix || suffixContent ? (
            <span className={classes.e('suffix')}>{suffixContent ?? suffix}</span>
          ) : null}
        </div>
        {trendContent || trend !== 'none' || trendValue !== undefined ? (
          <div
            aria-label={trendLabel}
            className={cls(classes.e('trend'), classes.m(`trend-${trendType}`))}
          >
            {trendContent ?? (
              <>
                {trend !== 'none' ? (
                  <span aria-hidden="true">{trend === 'up' ? '↑' : '↓'}</span>
                ) : null}
                {trendValue !== undefined ? <span>{trendValue}</span> : null}
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export const HStatistic = Statistic;
export type {
  StatisticFormatter,
  StatisticTrend,
  StatisticTrendType,
  StatisticValue,
} from '@aurora/core';
