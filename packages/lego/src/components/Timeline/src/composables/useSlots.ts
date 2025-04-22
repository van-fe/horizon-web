export const useTimelineSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
};

export type TimelineSlots = typeof useTimelineSlots;

export const useTimelineItemSlots = {
  /**
   * 折叠节点图标
   */
  hiddenDot: () => true,
  /**
   * 	节点图标
   */
  dot: () => true,
  /**
   * 节点名称
   */
  name: () => true,
  /**
   * 节点描述
   */
  desc: () => true,
};

export type TimelineItemSlots = typeof useTimelineItemSlots;
