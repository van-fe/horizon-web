import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export interface FoldConfig {
  /** 可折叠数
   * @en Configuration for number.
 */
  number: number;
  /** 折叠后显示文案
   * @en Configuration for content.
 */
  content: string;
  /** 折叠后节点图标属性
   * @en Configuration for dot.
 */
  dot: TimelineItemDotType;
}
export interface TimelineItemDotType {
  /**
   * 节点类型
   */
  type?: 'disc' | 'circle';
  /**
   * 节点颜色
   */
  color?: string;
  /**
   * 节点边框颜色
   */
  borderColor?: string;
  /**
   * 节点尺寸
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 节点图标
   */
  icon?: string;
}
export const useTimelineProps = declarePropType({
  /**
   * 指定节点排序方向
    * @en Configuration for sort.
   */
  sort: {
    type: String as PropType<'order' | 'reverse'>,
    required: false,
    default: '',
  },
  /**
   * 第一个节点属性
    * @en Configuration for first.
   */
  first: {
    type: Object as PropType<TimelineItemDotType>,
    required: false,
  },
  /**
   * 最后一个节点属性
    * @en Configuration for last.
   */
  last: {
    type: Object as PropType<TimelineItemDotType>,
    required: false,
  },
  /**
   * 是否使用day.js格式化方式
    * @en Configuration for v2.
   */
  v2: {
    type: Boolean,
    required: false,
    default: false,
  },
});

export const useTimelineItemProps = declarePropType({
  /**
   * 时间戳
    * @en Configuration for timestamp.
   */
  timestamp: {
    type: [String, Number],
    required: false,
    default: '',
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
    type: String as PropType<'top' | 'bottom' | 'right'>,
    required: false,
    default: 'bottom',
  },
  /**
   * 时间线偏移
    * @en Configuration for offset.
   */
  offset: {
    type: [String, Number],
    required: false,
    default: 4,
  },
  /**
   * 节点类型
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<'disc' | 'circle'>,
    required: false,
    default: 'disc',
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
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
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
    default: false,
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
    default: true,
  },
});

export type TimelineProps = ExtractPropTypes<typeof useTimelineProps>;
export type TimelineItemProps = ExtractPropTypes<typeof useTimelineItemProps>;
