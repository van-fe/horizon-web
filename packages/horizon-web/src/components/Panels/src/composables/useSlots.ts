import type { SlotsType } from 'vue';
export const usePanelsSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type PanelsSlots = typeof usePanelsSlots;

export const usePanelSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type PanelSlots = typeof usePanelSlots;
