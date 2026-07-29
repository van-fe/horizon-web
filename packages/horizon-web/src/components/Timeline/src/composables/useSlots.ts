import type { SlotsType } from 'vue';
export const useTimelineSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type TimelineSlots = typeof useTimelineSlots;

export const useTimelineItemSlots = Object as SlotsType<{
  /**
   * 折叠节点图标
    * @en Custom content for the hidden dot slot.
   */
  hiddenDot?: {};
  /**
   * 	节点图标
    * @en Custom content for the dot slot.
   */
  dot?: {};
  /**
   * 节点名称
    * @en Custom content for the name slot.
   */
  name?: {};
  /**
   * 节点描述
    * @en Custom content for the desc slot.
   */
  desc?: {};
}>;

export type TimelineItemSlots = typeof useTimelineItemSlots;
