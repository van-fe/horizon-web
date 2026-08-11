import type { AdaptComponentApiShape, DrawerRegionMap } from '@aurora/core';
import type { SlotsType } from 'vue';

type DrawerVueSlots = AdaptComponentApiShape<DrawerRegionMap, { content: 'default' }>;

export const useDrawerSlots = Object as SlotsType<{
  /** 默认展示内容。 @en Drawer body content. */
  default?: DrawerVueSlots['default'];
  /** 默认头部中的标题。 @en Title within the default header. */
  title?: DrawerVueSlots['title'];
  /** 完整头部内容。 @en Complete header content. */
  header?: DrawerVueSlots['header'];
  /** 底部操作区。 @en Footer actions. */
  footer?: DrawerVueSlots['footer'];
}>;

export type DrawerSlots = typeof useDrawerSlots;
