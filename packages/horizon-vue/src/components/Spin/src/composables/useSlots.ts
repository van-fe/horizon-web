import type { SlotsType } from 'vue';

export const useSpinSlots = Object as SlotsType<{
  /**
   * 被加载状态覆盖的内容
   * @en Content covered by the loading state.
   */
  default?: {};
  /**
   * 自定义加载指示器
   * @en Custom loading indicator.
   */
  indicator?: {};
  /**
   * 自定义提示内容
   * @en Custom tip content.
   */
  tip?: {};
}>;

export type SpinSlots = typeof useSpinSlots;
