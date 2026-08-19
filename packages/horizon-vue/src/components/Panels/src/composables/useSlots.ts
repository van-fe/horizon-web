import type { AdaptComponentApiShape, PanelRegionMap, PanelsRegionMap } from '@aurora/core';
import type { SlotsType } from 'vue';

type PanelsVueSlots = AdaptComponentApiShape<PanelsRegionMap, { content: 'default' }>;
type PanelVueSlots = AdaptComponentApiShape<PanelRegionMap, { content: 'default' }>;

export const usePanelsSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Composed panel items.
   */
  default?: PanelsVueSlots['default'];
}>;

export type PanelsSlots = typeof usePanelsSlots;

export const usePanelSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Panel content.
   */
  default?: PanelVueSlots['default'];
}>;

export type PanelSlots = typeof usePanelSlots;
