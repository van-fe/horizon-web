import type { SlotsType } from 'vue';
export const useTimelineSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type TimelineSlots = typeof useTimelineSlots;

export const useTimelineItemSlots = Object as SlotsType<{
  /**
   * 折叠节点图标
   */
  hiddenDot?: {};
  /**
   * 	节点图标
   */
  dot?: {};
  /**
   * 节点名称
   */
  name?: {};
  /**
   * 节点描述
   */
  desc?: {};
}>;

export type TimelineItemSlots = typeof useTimelineItemSlots;
