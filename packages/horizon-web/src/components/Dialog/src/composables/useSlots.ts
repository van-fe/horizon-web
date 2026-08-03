import type { SlotsType } from 'vue';

export const useDialogSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 标题slot
    * @en Custom content for the title slot.
   */
  title?: {};
  /**
   * 尾部slot
    * @en Custom content for the footer slot.
   */
  footer?: {};
}>;

export type DialogSlots = typeof useDialogSlots;
