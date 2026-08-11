import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const DIVIDER_VARIANTS = ['default', 'strong', 'primary', 'secondary'] as const;
export const DIVIDER_DIRECTIONS = ['horizontal', 'vertical'] as const;
export const DIVIDER_LINE_STYLES = ['solid', 'dashed', 'dotted'] as const;
export const DIVIDER_TITLE_PLACEMENTS = ['left', 'center', 'right'] as const;

export type DividerVariant = (typeof DIVIDER_VARIANTS)[number];
export type DividerDirection = (typeof DIVIDER_DIRECTIONS)[number];
export type DividerLineStyle = (typeof DIVIDER_LINE_STYLES)[number];
export type DividerTitlePlacement = (typeof DIVIDER_TITLE_PLACEMENTS)[number];

export interface DividerCommonProps {
  /** 分割线视觉强度。@en Divider visual strength. */
  variant?: DividerVariant;
  /** 分割线方向。@en Divider direction. */
  direction?: DividerDirection;
  /** 分割线线型。@en Divider line style. */
  lineStyle?: DividerLineStyle;
  /** 标题位置。@en Title placement. */
  titlePlacement?: DividerTitlePlacement;
  /** 垂直分割线的左右边距。@en Horizontal margin around a vertical divider. */
  verticalMargin?: string | number;
  /** 水平分割线的上下边距。@en Vertical margin around a horizontal divider. */
  horizontalMargin?: string | number;
}

export type DividerEventMap = EmptyComponentApi;

export interface DividerRegionMap {
  /** 分割线标题。@en Divider title. */
  title: EmptyComponentApi;
}

export type DividerCommandMap = EmptyComponentApi;

export const DIVIDER_DEFAULTS = Object.freeze({
  variant: 'default',
  direction: 'horizontal',
  lineStyle: 'solid',
  titlePlacement: 'center',
} as const satisfies Required<Omit<DividerCommonProps, 'verticalMargin' | 'horizontalMargin'>>);

export function isDividerVariant(value: unknown): value is DividerVariant {
  return DIVIDER_VARIANTS.includes(value as DividerVariant);
}

export function isDividerDirection(value: unknown): value is DividerDirection {
  return DIVIDER_DIRECTIONS.includes(value as DividerDirection);
}

export function isDividerLineStyle(value: unknown): value is DividerLineStyle {
  return DIVIDER_LINE_STYLES.includes(value as DividerLineStyle);
}

export function isDividerTitlePlacement(value: unknown): value is DividerTitlePlacement {
  return DIVIDER_TITLE_PLACEMENTS.includes(value as DividerTitlePlacement);
}

export const dividerApiContract = defineComponentApiContract<
  DividerCommonProps,
  DividerEventMap,
  DividerRegionMap,
  DividerCommandMap
>({
  defaults: DIVIDER_DEFAULTS,
  validators: {
    variant: isDividerVariant,
    direction: isDividerDirection,
    lineStyle: isDividerLineStyle,
    titlePlacement: isDividerTitlePlacement,
  },
});
