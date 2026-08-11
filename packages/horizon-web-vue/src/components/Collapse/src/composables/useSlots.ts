import type { SlotsType } from 'vue';
import type {
  AdaptComponentApiShape,
  CollapseItemRegionMap,
  CollapseRegionMap,
} from '@aurora/core';

type CollapseVueSlots = AdaptComponentApiShape<CollapseRegionMap, { content: 'default' }>;
type CollapseItemVueSlots = AdaptComponentApiShape<CollapseItemRegionMap, { content: 'default' }>;

export const useCollapseSlots = Object as SlotsType<{
  /** 面板条目。 @en Composed collapse items. */
  default?: CollapseVueSlots['default'];
}>;

export const useCollapseItemSlots = Object as SlotsType<{
  /** 面板正文。 @en Panel body. */
  default?: CollapseItemVueSlots['default'];
  /** 面板标题。 @en Panel title. */
  title?: CollapseItemVueSlots['title'];
  /** 展开图标。 @en Expand icon. */
  icon?: CollapseItemVueSlots['icon'];
}>;

export type CollapseSlots = typeof useCollapseSlots;
export type CollapseItemSlots = typeof useCollapseItemSlots;
