import type { SlotsType } from 'vue';

export const useDrawerSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
  /**
   * 标题 slot
   **/
  title?: {};

  /**
   * 顶部 slot
   * @version 2.0.4
   **/
  header?: {};

  /**
   * 底部 slot
   */
  footer?: {};
}>;

export type DrawerSlots = typeof useDrawerSlots;
