import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const BADGE_TYPES = ['dot', 'num', 'icon'] as const;
export const BADGE_ALIGNS = ['center-point', 'inner', 'outer', 'fix-left'] as const;

export type BadgeType = (typeof BADGE_TYPES)[number];
export type BadgeAlign = (typeof BADGE_ALIGNS)[number];

export interface BadgeOffset {
  /** 左侧偏移。@en Left offset. */
  left?: string;
  /** 右侧偏移。@en Right offset. */
  right?: string;
  /** 顶部偏移。@en Top offset. */
  top?: string;
  /** 底部偏移。@en Bottom offset. */
  bottom?: string;
}

export interface BadgeCommonProps {
  /** 徽标类型。@en Badge type. */
  type?: BadgeType;
  /** 数量或图标内容。@en Count or icon content. */
  content?: string | number;
  /** 是否隐藏徽标。@en Whether the badge is hidden. */
  hidden?: boolean;
  /** 数量显示上限。@en Maximum displayed count. */
  numMax?: number;
  /** 是否定位到底部。@en Whether the badge is positioned at the bottom. */
  bottom?: boolean;
  /** 徽标对齐方式。@en Badge alignment. */
  align?: BadgeAlign;
  /** 定位偏移。@en Position offset. */
  offset?: BadgeOffset | null;
}

export type BadgeEventMap = EmptyComponentApi;

export interface BadgeRegionMap {
  /** 被标记的目标内容。@en Target content receiving the badge. */
  content: EmptyComponentApi;
  /** 图标徽标内容。@en Icon badge content. */
  icon: EmptyComponentApi;
}

export type BadgeCommandMap = EmptyComponentApi;

export const BADGE_DEFAULTS = Object.freeze({
  type: 'dot',
  content: '',
  hidden: false,
  numMax: Number.POSITIVE_INFINITY,
  bottom: false,
  align: 'center-point',
  offset: null,
} as const satisfies Required<BadgeCommonProps>);

export function isBadgeType(value: unknown): value is BadgeType {
  return BADGE_TYPES.includes(value as BadgeType);
}

export function isBadgeAlign(value: unknown): value is BadgeAlign {
  return BADGE_ALIGNS.includes(value as BadgeAlign);
}

export const badgeApiContract = defineComponentApiContract<
  BadgeCommonProps,
  BadgeEventMap,
  BadgeRegionMap,
  BadgeCommandMap
>({
  defaults: BADGE_DEFAULTS,
  validators: {
    type: isBadgeType,
    align: isBadgeAlign,
  },
});
