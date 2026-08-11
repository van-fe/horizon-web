import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const CARD_RADII = ['small', 'medium', 'large', 'none'] as const;

export type CardRadius = (typeof CARD_RADII)[number];

export interface CardCommonProps {
  /** 默认标题。@en Default title. */
  title?: string;
  /** 是否显示顶部分割线。@en Whether to show the top divider. */
  topDivider?: boolean;
  /** 是否显示底部分割线。@en Whether to show the bottom divider. */
  bottomDivider?: boolean;
  /** 卡片圆角尺寸。@en Card radius size. */
  radius?: CardRadius;
  /** 是否显示边框。@en Whether to show the border. */
  border?: boolean;
}

export type CardEventMap = EmptyComponentApi;

export interface CardRegionMap {
  /** 卡片主体内容。@en Card body content. */
  content: EmptyComponentApi;
  /** 卡片头部内容。@en Card header content. */
  header: EmptyComponentApi;
  /** 卡片底部内容。@en Card footer content. */
  footer: EmptyComponentApi;
}

export type CardCommandMap = EmptyComponentApi;

export const CARD_DEFAULTS = Object.freeze({
  title: '',
  topDivider: false,
  bottomDivider: false,
  radius: 'medium',
  border: true,
} as const satisfies Required<CardCommonProps>);

export function isCardRadius(value: unknown): value is CardRadius {
  return CARD_RADII.includes(value as CardRadius);
}

export const cardApiContract = defineComponentApiContract<
  CardCommonProps,
  CardEventMap,
  CardRegionMap,
  CardCommandMap
>({
  defaults: CARD_DEFAULTS,
  validators: { radius: isCardRadius },
});
