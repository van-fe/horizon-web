import type { SlotsType } from 'vue';

export const useSplitterSlots = Object as SlotsType<{
  /**
   * SplitterPanel 面板列表
   * @en SplitterPanel children.
   */
  default?: {};
}>;

export const useSplitterPanelSlots = Object as SlotsType<{
  /**
   * 面板内容
   * @en Panel content.
   */
  default?: {};
}>;

export type SplitterSlots = typeof useSplitterSlots;
export type SplitterPanelSlots = typeof useSplitterPanelSlots;
