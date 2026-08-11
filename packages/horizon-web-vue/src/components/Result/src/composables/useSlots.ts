import type { SlotsType } from 'vue';
export const useResultSlots = Object as SlotsType<{
  /**
   * 自定义图标
    * @en Custom content for the icon slot.
   */
  icon?: {};
  /**
   * 自定义标题
    * @en Custom content for the title slot.
   */
  title?: {};
  /**
   * 自定义二级标题
    * @en Custom content for the subtitle slot.
   */
  subtitle?: {};
  /**
   * 自定义底部额外区域
    * @en Custom content for the extra slot.
   */
  extra?: {};
}>;

export type ResultSlots = typeof useResultSlots;
