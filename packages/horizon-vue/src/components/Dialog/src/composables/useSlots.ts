import type { SlotsType } from 'vue';
import type { AdaptComponentApiShape, DialogRegionMap } from '@aurora/core';

type DialogVueSlots = AdaptComponentApiShape<DialogRegionMap, { content: 'default' }>;

export const useDialogSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: DialogVueSlots['default'];
  /**
   * 标题slot
   * @en Custom content for the title slot.
   */
  title?: DialogVueSlots['title'];
  /**
   * 尾部slot
   * @en Custom content for the footer slot.
   */
  footer?: DialogVueSlots['footer'];
}>;

export type DialogSlots = typeof useDialogSlots;
