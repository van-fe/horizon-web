import type { SlotsType } from 'vue';
import type {
  AdaptComponentApiShape,
  TimelineItemRegionMap,
  TimelineRegionMap,
} from '@aurora/core';

type TimelineVueSlots = AdaptComponentApiShape<TimelineRegionMap, { content: 'default' }>;
type TimelineItemVueSlots = AdaptComponentApiShape<TimelineItemRegionMap, { description: 'desc' }>;

export const useTimelineSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: TimelineVueSlots['default'];
}>;

export type TimelineSlots = typeof useTimelineSlots;

export const useTimelineItemSlots = Object as SlotsType<{
  /**
   * 折叠节点图标
   * @en Custom content for the hidden dot slot.
   */
  hiddenDot?: TimelineItemVueSlots['hiddenDot'];
  /**
   * 	节点图标
   * @en Custom content for the dot slot.
   */
  dot?: TimelineItemVueSlots['dot'];
  /**
   * 节点名称
   * @en Custom content for the name slot.
   */
  name?: TimelineItemVueSlots['name'];
  /**
   * 节点描述
   * @en Custom content for the desc slot.
   */
  desc?: TimelineItemVueSlots['desc'];
}>;

export type TimelineItemSlots = typeof useTimelineItemSlots;
