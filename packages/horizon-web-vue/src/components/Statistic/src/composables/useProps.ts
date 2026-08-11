import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

export type StatisticFormatter = (value: number | string) => number | string;

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
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  /**
   * 数值小数位数
   * @en Number of decimal places.
   */
  precision: {
    type: Number,
    validator: (value: number) => Number.isInteger(value) && value >= 0 && value <= 20,
  },
  /**
   * 是否使用千位分组
   * @en Whether to use digit grouping.
   */
  useGrouping: {
    type: Boolean,
    default: true,
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
    type: String as PropType<'up' | 'down' | 'none'>,
    default: 'none',
    values: ['up', 'down', 'none'],
  },
  /**
   * 趋势说明值
   * @en Trend description value.
   */
  trendValue: {
    type: [Number, String] as PropType<number | string>,
  },
  /**
   * 趋势语义类型，由业务含义决定而非升降方向自动推断
   * @en Semantic trend type, explicitly chosen by business meaning rather than inferred from direction.
   */
  trendType: {
    type: String as PropType<'success' | 'danger' | 'neutral'>,
    default: 'neutral',
    values: ['success', 'danger', 'neutral'],
  },
  /**
   * 是否处于加载状态
   * @en Whether the statistic is loading.
   */
  loading: {
    type: Boolean,
    default: false,
  },
});

export type StatisticProps = ExtractPropTypes<typeof useStatisticProps>;
