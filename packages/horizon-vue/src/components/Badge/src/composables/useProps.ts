import type { ExtractPropTypes, PropType } from 'vue';
import type { BadgeAlign, BadgeCommonProps, BadgeOffset, BadgeType } from '@aurora/core';
import { BADGE_DEFAULTS, isBadgeAlign, isBadgeType } from '@aurora/core';
import { cssVariable, declarePropType } from '@aurora/utils';

export const useBadgeProps = declarePropType({
  /**
   * 类型
   * dot: 圆点
   * num: 数字
   * icon: 图标
   * @en Configuration for type.
   */
  type: {
    type: String as PropType<BadgeType>,
    default: BADGE_DEFAULTS.type,
    validator: isBadgeType,
  },
  /**
   * 内容
   * 当 type 是 num 时，表示数字
   * 当 type 是 icon 时，表示图标名称
   * @en Configuration for content.
   */
  content: {
    type: [String, Number] as PropType<BadgeCommonProps['content']>,
    default: BADGE_DEFAULTS.content,
  },
  /** 是否隐藏
   * @en Configuration for hidden.
   */
  hidden: {
    type: Boolean,
    default: BADGE_DEFAULTS.hidden,
  },
  /** 最大的数字，当大于该值时显示 ${numMax}+
   * @en Configuration for num max.
   */
  numMax: {
    type: Number,
    default: BADGE_DEFAULTS.numMax,
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
    default: BADGE_DEFAULTS.bottom,
  },
  /** 位置
   * @en Configuration for align.
   */
  align: {
    type: String as PropType<BadgeAlign>,
    default: BADGE_DEFAULTS.align,
    validator: isBadgeAlign,
  },
  /** 偏移量
   * @en Configuration for offset.
   */
  offset: {
    type: Object as PropType<BadgeOffset>,
    default: BADGE_DEFAULTS.offset,
  },
});

export type Offset = BadgeOffset;

export type BadgeProps = ExtractPropTypes<typeof useBadgeProps>;
