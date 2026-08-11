import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';
import type { ChoiceSize } from '../_shared/choice';
import { isChoiceSize } from '../_shared/choice';

export const LINK_VARIANTS = ['primary', 'normal', 'danger'] as const;
export const LINK_TARGETS = ['_blank', '_self', '_parent', '_top'] as const;
export const LINK_ANCHOR_POSITIONS = ['left', 'right'] as const;

export type LinkVariant = (typeof LINK_VARIANTS)[number];
export type LinkTarget = (typeof LINK_TARGETS)[number];
export type LinkAnchorPosition = (typeof LINK_ANCHOR_POSITIONS)[number];
export type LinkUnderline = boolean | 'always';

export interface LinkCommonProps {
  /** 语义颜色。@en Semantic color variant. */
  variant?: LinkVariant;
  /** 组件尺寸。@en Component size. */
  size?: ChoiceSize;
  /** 下划线策略。@en Underline policy. */
  underline?: LinkUnderline;
  /** 是否禁用。@en Whether the link is disabled. */
  disabled?: boolean;
  /** 原生链接地址。@en Native link address. */
  href?: string;
  /** 浏览上下文目标。@en Browsing-context target. */
  target?: LinkTarget;
  /** 是否使用注释样式。@en Whether annotation styling is enabled. */
  attribute?: boolean;
  /** 锚点标识。@en Anchor identifier. */
  anchor?: string;
  /** 锚点标记位置。@en Anchor-marker position. */
  anchorPosition?: LinkAnchorPosition;
  /** 锚点滚动偏移。@en Anchor scroll offset. */
  anchorOffset?: number;
  /** 交给 renderer 导航适配器的路由目标。@en Route target handled by the renderer navigation adapter. */
  route?: unknown;
  /** 是否替换当前历史记录。@en Whether navigation replaces the current history entry. */
  replace?: boolean;
  /** 是否加载中。@en Whether the link is loading. */
  loading?: boolean;
}

export interface LinkEventMap<MouseEvent = unknown> {
  /** 点击链接或操作。@en Clicks the link or action. */
  click: [event: MouseEvent];
}

export interface LinkRegionMap {
  /** 主内容。@en Main content. */
  content: EmptyComponentApi;
  /** 前缀内容。@en Prefix content. */
  prefix: EmptyComponentApi;
  /** 后缀内容。@en Suffix content. */
  suffix: EmptyComponentApi;
}

export const LINK_DEFAULTS = Object.freeze({
  variant: 'primary',
  size: 'medium',
  underline: true,
  disabled: false,
  attribute: false,
  anchorPosition: 'right',
  anchorOffset: 0,
  replace: false,
  loading: false,
} as const);

export type LinkActionKind = 'blocked' | 'anchor' | 'route' | 'href' | 'click';

export interface LinkActionInput {
  disabled?: boolean;
  loading?: boolean;
  anchor?: string;
  route?: unknown;
  canNavigateRoute?: boolean;
  href?: string;
}

export function isLinkVariant(value: unknown): value is LinkVariant {
  return LINK_VARIANTS.includes(value as LinkVariant);
}

export function isLinkTarget(value: unknown): value is LinkTarget {
  return LINK_TARGETS.includes(value as LinkTarget);
}

export function isLinkAnchorPosition(value: unknown): value is LinkAnchorPosition {
  return LINK_ANCHOR_POSITIONS.includes(value as LinkAnchorPosition);
}

export function isLinkUnderline(value: unknown): value is LinkUnderline {
  return typeof value === 'boolean' || value === 'always';
}

export function isLinkString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isLinkAnchorOffset(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function resolveLinkAction(input: LinkActionInput): LinkActionKind {
  if (input.disabled || input.loading) return 'blocked';
  if (input.anchor) return 'anchor';
  if (input.route !== undefined && input.canNavigateRoute) return 'route';
  if (input.href) return 'href';
  return 'click';
}

export function isLinkActionRole(anchor?: string, href?: string): boolean {
  return !anchor && !href;
}

export function getLinkLoadingIconSize(size: ChoiceSize): number {
  return size === 'small' ? 12 : 16;
}

export const linkApiContract = defineComponentApiContract<
  LinkCommonProps,
  LinkEventMap,
  LinkRegionMap
>({
  defaults: LINK_DEFAULTS,
  validators: {
    variant: isLinkVariant,
    size: isChoiceSize,
    underline: isLinkUnderline,
    href: isLinkString,
    target: isLinkTarget,
    anchor: isLinkString,
    anchorPosition: isLinkAnchorPosition,
    anchorOffset: isLinkAnchorOffset,
  },
});
