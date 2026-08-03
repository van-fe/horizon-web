import type { SlotsType } from 'vue';

export const useDrawerSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 标题 slot
    * @en Custom content for the title slot.
   **/
  title?: {};

  /**
   * 顶部 slot
    * @en Custom content for the header slot.
   **/
  header?: {};

  /**
   * 底部 slot
    * @en Custom content for the footer slot.
   */
  footer?: {};
}>;

export type DrawerSlots = typeof useDrawerSlots;
