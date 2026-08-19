import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';
import type {
  StatisticFormatter,
  StatisticTrend,
  StatisticTrendType,
  StatisticValue,
} from '@aurora/core';
import {
  isStatisticPrecision,
  isStatisticTrend,
  isStatisticTrendType,
  STATISTIC_DEFAULTS,
} from '@aurora/core';

export type { StatisticFormatter } from '@aurora/core';

export const useStatisticProps = declarePropType({
  /**
   * 统计标题
   * @en Statistic title.
   */
  title: {
    type: String,
  },
  /**
   * 统计值
   * @en Statistic value.
   */
  value: {
    type: [Number, String] as PropType<StatisticValue>,
    default: STATISTIC_DEFAULTS.value,
  },
  /**
   * 数值小数位数
   * @en Number of decimal places.
   */
  precision: {
    type: Number,
    validator: isStatisticPrecision,
  },
  /**
   * 是否使用千位分组
   * @en Whether to use digit grouping.
   */
  useGrouping: {
    type: Boolean,
    default: STATISTIC_DEFAULTS.useGrouping,
  },
  /**
   * Intl.NumberFormat 使用的语言标识；默认跟随 Horizon Web 当前语言
   * @en Locale identifier used by Intl.NumberFormat. Defaults to the current Horizon Web locale.
   */
  locale: {
    type: String,
  },
  /**
   * 文本前缀
   * @en Text prefix.
   */
  prefix: {
    type: String,
  },
  /**
   * 文本后缀
   * @en Text suffix.
   */
  suffix: {
    type: String,
  },
  /**
   * 自定义格式化函数
   * @en Custom value formatter.
   */
  formatter: {
    type: Function as PropType<StatisticFormatter>,
  },
  /**
   * 趋势方向
   * @en Trend direction.
   */
  trend: {
    type: String as PropType<StatisticTrend>,
    default: STATISTIC_DEFAULTS.trend,
    values: ['up', 'down', 'none'],
    validator: isStatisticTrend,
  },
  /**
   * 趋势说明值
   * @en Trend description value.
   */
  trendValue: {
    type: [Number, String] as PropType<StatisticValue>,
  },
  /**
   * 趋势语义类型，由业务含义决定而非升降方向自动推断
   * @en Semantic trend type, explicitly chosen by business meaning rather than inferred from direction.
   */
  trendType: {
    type: String as PropType<StatisticTrendType>,
    default: STATISTIC_DEFAULTS.trendType,
    values: ['success', 'danger', 'neutral'],
    validator: isStatisticTrendType,
  },
  /**
   * 是否处于加载状态
   * @en Whether the statistic is loading.
   */
  loading: {
    type: Boolean,
    default: STATISTIC_DEFAULTS.loading,
  },
});

export type StatisticProps = ExtractPropTypes<typeof useStatisticProps>;
