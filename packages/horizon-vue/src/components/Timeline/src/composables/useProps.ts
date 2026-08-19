import type { ExtractPropTypes, PropType } from 'vue';
import type {
  AdaptComponentApiShape,
  ComponentRendererPropDefinitions,
  TimelineCommonProps,
  TimelineDotCommonProps,
  TimelineDotSize,
  TimelineDotType,
  TimelineFoldCommonProps,
  TimelineItemCommonProps,
  TimelineSort,
  TimelineTimestampPlacement,
} from '@aurora/core';
import {
  isTimelineDotSize,
  isTimelineDotType,
  isTimelineSort,
  isTimelineTimestampPlacement,
  TIMELINE_DEFAULTS,
  TIMELINE_ITEM_DEFAULTS,
} from '@aurora/core';
import { declarePropType } from '@aurora/utils';

export type TimelineItemDotType = TimelineDotCommonProps<string>;

export interface FoldConfig extends Omit<TimelineFoldCommonProps<string, string>, 'dot'> {
  /** 可折叠数
   * @en Configuration for number.
   */
  /** 折叠后节点图标属性
   * @en Configuration for dot.
   */
  dot: TimelineItemDotType;
}

type TimelineVueProps = TimelineCommonProps<string>;
type TimelineItemVueProps = AdaptComponentApiShape<
  TimelineItemCommonProps<string, string, string, string>,
  { description: 'desc' },
  'timestamp' | 'foldConfig',
  { timestamp?: string | number; foldConfig?: FoldConfig }
>;

export const useTimelineProps = declarePropType({
  /**
   * 指定节点排序方向
   * @en Configuration for sort.
   */
  sort: {
    type: String as PropType<TimelineSort>,
    required: false,
    default: TIMELINE_DEFAULTS.sort,
    validator: isTimelineSort,
  },
  /**
   * 第一个节点属性
   * @en Configuration for first.
   */
  first: {
    type: Object as PropType<TimelineDotCommonProps<string>>,
    required: false,
  },
  /**
   * 最后一个节点属性
   * @en Configuration for last.
   */
  last: {
    type: Object as PropType<TimelineDotCommonProps<string>>,
    required: false,
  },
} satisfies ComponentRendererPropDefinitions<TimelineVueProps>);

export const useTimelineItemProps = declarePropType({
  /**
   * 时间戳
   * @en Configuration for timestamp.
   */
  timestamp: {
    type: [String, Number],
    required: false,
    default: TIMELINE_ITEM_DEFAULTS.timestamp,
  },
  /**
   * 时间戳格式
   * @en Configuration for format.
   */
  format: {
    type: String,
    required: false,
  },
  /**
   * 时间戳位置
   * @en Configuration for placement.
   */
  placement: {
    type: String as PropType<TimelineTimestampPlacement>,
    required: false,
    default: TIMELINE_ITEM_DEFAULTS.placement,
    validator: isTimelineTimestampPlacement,
  },
  /**
   * 时间线偏移
   * @en Configuration for offset.
   */
  offset: {
    type: [String, Number],
    required: false,
    default: TIMELINE_ITEM_DEFAULTS.offset,
  },
  /**
   * 节点类型
   * @en Configuration for type.
   */
  type: {
    type: String as PropType<TimelineDotType>,
    required: false,
    default: TIMELINE_ITEM_DEFAULTS.type,
    validator: isTimelineDotType,
  },
  /**
   * 节点颜色
   * @en Configuration for color.
   */
  color: {
    type: String,
    required: false,
  },
  /**
   * 节点边框颜色
   * @en Configuration for border color.
   */
  borderColor: {
    type: String,
    required: false,
  },
  /**
   * 线条颜色
   * @en Configuration for tail color.
   */
  tailColor: {
    type: String,
    required: false,
  },
  /**
   * 节点尺寸
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<TimelineDotSize>,
    required: false,
    validator: isTimelineDotSize,
  },
  /**
   * 节点图标
   * @en Configuration for icon.
   */
  icon: {
    type: String,
    required: false,
  },
  /**
   * 名称
   * @en Configuration for name.
   */
  name: {
    type: String,
    required: false,
  },
  /**
   * 描述
   * @en Configuration for desc.
   */
  desc: {
    type: String,
    required: false,
  },
  /**
   * 使用虚拟线
   * @en Configuration for dashed.
   */
  dashed: {
    type: Boolean,
    required: false,
    default: TIMELINE_ITEM_DEFAULTS.dashed,
  },
  /**
   * 折叠节点配置
   * @en Configuration for fold config.
   */
  foldConfig: {
    type: Object as PropType<FoldConfig>,
    required: false,
  },
  /**
   * 使用线条
   * @en Configuration for tail.
   */
  tail: {
    type: Boolean,
    required: false,
    default: TIMELINE_ITEM_DEFAULTS.tail,
  },
} satisfies ComponentRendererPropDefinitions<TimelineItemVueProps>);

export type TimelineProps = ExtractPropTypes<typeof useTimelineProps>;
export type TimelineItemProps = ExtractPropTypes<typeof useTimelineItemProps>;
