import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/shared';

export interface FoldConfig {
  /** 可折叠数 */
  number: number;
  /** 折叠后显示文案 */
  content: string;
  /** 折叠后节点图标属性 */
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
   */
  sort: {
    type: String as PropType<'order' | 'reverse'>,
    required: false,
    default: '',
  },
  /**
   * 第一个节点属性
   */
  first: {
    type: Object as PropType<TimelineItemDotType>,
    required: false,
  },
  /**
   * 最后一个节点属性
   */
  last: {
    type: Object as PropType<TimelineItemDotType>,
    required: false,
  },
  /**
   * 是否使用day.js格式化方式
   * @version 2.12.0
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
   */
  timestamp: {
    type: [String, Number],
    required: false,
    default: '',
  },
  /**
   * 时间戳格式
   */
  format: {
    type: String,
    required: false,
  },
  /**
   * 时间戳位置
   */
  placement: {
    type: String as PropType<'top' | 'bottom' | 'right'>,
    required: false,
    default: 'bottom',
  },
  /**
   * 时间线偏移
   */
  offset: {
    type: [String, Number],
    required: false,
    default: 4,
  },
  /**
   * 节点类型
   */
  type: {
    type: String as PropType<'disc' | 'circle'>,
    required: false,
    default: 'disc',
  },
  /**
   * 节点颜色
   */
  color: {
    type: String,
    required: false,
  },
  /**
   * 节点边框颜色
   */
  borderColor: {
    type: String,
    required: false,
  },
  /**
   * 线条颜色
   * @version 2.12.0
   */
  tailColor: {
    type: String,
    required: false,
  },
  /**
   * 节点尺寸
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 节点图标
   */
  icon: {
    type: String,
    required: false,
  },
  /**
   * 名称
   */
  name: {
    type: String,
    required: false,
  },
  /**
   * 描述
   */
  desc: {
    type: String,
    required: false,
  },
  /**
   * 使用虚拟线
   */
  dashed: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 折叠节点配置
   */
  foldConfig: {
    type: Object as PropType<FoldConfig>,
    required: false,
  },
  /**
   * 使用线条
   */
  tail: {
    type: Boolean,
    required: false,
    default: true,
  },
});

export type TimelineProps = ExtractPropTypes<typeof useTimelineProps>;
export type TimelineItemProps = ExtractPropTypes<typeof useTimelineItemProps>;
