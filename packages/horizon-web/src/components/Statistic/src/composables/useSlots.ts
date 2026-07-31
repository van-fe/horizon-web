import type { SlotsType } from 'vue';

export const useStatisticSlots = Object as SlotsType<{
  /**
   * 自定义标题
   * @en Custom title.
   */
  title?: {};
  /**
   * 自定义统计值；使用后跳过 formatter 和数字格式化
   * @en Custom value. Formatter and number formatting are skipped when provided.
   */
  default?: {};
  /**
   * 自定义前缀
   * @en Custom prefix.
   */
  prefix?: {};
  /**
   * 自定义后缀
   * @en Custom suffix.
   */
  suffix?: {};
  /**
   * 自定义趋势内容
   * @en Custom trend content.
   */
  trend?: {};
}>;

export type StatisticSlots = typeof useStatisticSlots;
