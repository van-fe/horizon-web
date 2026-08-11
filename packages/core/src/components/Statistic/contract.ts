import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const STATISTIC_TRENDS = ['up', 'down', 'none'] as const;
export const STATISTIC_TREND_TYPES = ['success', 'danger', 'neutral'] as const;
export type StatisticValue = number | string;
export type StatisticFormatter = (value: StatisticValue) => StatisticValue;
export type StatisticTrend = (typeof STATISTIC_TRENDS)[number];
export type StatisticTrendType = (typeof STATISTIC_TREND_TYPES)[number];

export interface StatisticCommonProps {
  title?: string;
  value?: StatisticValue;
  precision?: number;
  useGrouping?: boolean;
  locale?: string;
  prefix?: string;
  suffix?: string;
  formatter?: StatisticFormatter;
  trend?: StatisticTrend;
  trendValue?: StatisticValue;
  trendType?: StatisticTrendType;
  loading?: boolean;
}
export type StatisticEventMap = EmptyComponentApi;
export interface StatisticRegionMap {
  title: EmptyComponentApi;
  value: EmptyComponentApi;
  prefix: EmptyComponentApi;
  suffix: EmptyComponentApi;
  trend: EmptyComponentApi;
}
export type StatisticCommandMap = EmptyComponentApi;

export const STATISTIC_DEFAULTS = Object.freeze({
  value: 0,
  useGrouping: true,
  trend: 'none',
  trendType: 'neutral',
  loading: false,
} as const);
export function isStatisticPrecision(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 20;
}
export function isStatisticTrend(value: unknown): value is StatisticTrend {
  return STATISTIC_TRENDS.includes(value as StatisticTrend);
}
export function isStatisticTrendType(value: unknown): value is StatisticTrendType {
  return STATISTIC_TREND_TYPES.includes(value as StatisticTrendType);
}
export function formatStatisticValue(
  props: Pick<StatisticCommonProps, 'value' | 'precision' | 'useGrouping' | 'locale' | 'formatter'>,
): StatisticValue {
  const value = props.value ?? STATISTIC_DEFAULTS.value;
  if (props.formatter) return props.formatter(value);
  if (typeof value !== 'number' || !Number.isFinite(value)) return value;
  return new Intl.NumberFormat(props.locale || 'en', {
    useGrouping: props.useGrouping ?? STATISTIC_DEFAULTS.useGrouping,
    minimumFractionDigits: props.precision,
    maximumFractionDigits: props.precision,
  }).format(value);
}
export const statisticApiContract = defineComponentApiContract<
  StatisticCommonProps,
  StatisticEventMap,
  StatisticRegionMap,
  StatisticCommandMap
>({
  defaults: STATISTIC_DEFAULTS,
  validators: {
    precision: isStatisticPrecision,
    trend: isStatisticTrend,
    trendType: isStatisticTrendType,
  },
});
