import type { ExtractPropTypes, PropType } from 'vue';
import { cssVariable, declarePropType } from '@aurora/utils';

export interface Offset {
  /** 往左偏移的值 */
  left?: string;
  /** 往右偏移的值 */
  right?: string;
  /** 往上偏移的值 */
  top?: string;
  /** 往下偏移的值 */
  bottom?: string;
}

export const useBadgeProps = declarePropType({
  /**
   * 类型
   * dot: 圆点
   * num: 数字
   * icon: 图标
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<'dot' | 'num' | 'icon'>,
    default: 'dot',
  },
  /**
   * 内容
   * 当 type 是 num 时，表示数字
   * 当 type 是 icon 时，表示图标名称
    * @en Configuration for content.
   */
  content: {
    type: [String, Number],
    default: '',
  },
  /** 是否隐藏
   * @en Configuration for hidden.
 */
  hidden: {
    type: Boolean,
    default: false,
  },
  /** 最大的数字，当大于该值时显示 ${numMax}+
   * @en Configuration for num max.
 */
  numMax: {
    type: Number,
    default: Infinity,
  },
  /** 标记的颜色，仅对 type 为 dot 和 num 生效
   * @en Configuration for color.
 */
  color: {
    type: String,
    default: cssVariable('bg-error-default'),
  },
  /** 图标大小
   * @en Configuration for icon size.
 */
  iconSize: {
    type: Number,
    default: 16,
  },
  /** 图标颜色
   * @en Configuration for icon color.
 */
  iconColor: {
    type: String,
  },
  /** 是否显示在右下角
   * @en Configuration for bottom.
 */
  bottom: {
    type: Boolean,
    default: false,
  },
  /** 位置
   * @en Configuration for align.
 */
  align: {
    type: String as PropType<'center-point' | 'inner' | 'outer' | 'fix-left'>,
    default: 'center-point',
  },
  /** 偏移量
   * @en Configuration for offset.
 */
  offset: {
    type: Object as PropType<Offset>,
    default: null,
  },
});

export type BadgeProps = ExtractPropTypes<typeof useBadgeProps>;
