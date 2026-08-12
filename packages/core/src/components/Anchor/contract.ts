import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const ANCHOR_SIZES = ['small', 'medium'] as const;
export const ANCHOR_SCROLL_BEHAVIORS = ['auto', 'smooth'] as const;
export const ANCHOR_NAMED_OFFSETS = ['start', 'center', 'end'] as const;
export const ANCHOR_LINK_TARGETS = ['_self', '_blank', '_parent', '_top'] as const;
export const ANCHOR_TOOLTIP_PLACEMENTS = [
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'top',
  'bottom',
  'right',
  'left',
] as const;

export type AnchorSize = (typeof ANCHOR_SIZES)[number];
export type AnchorScrollBehavior = (typeof ANCHOR_SCROLL_BEHAVIORS)[number];
export type AnchorNamedOffset = (typeof ANCHOR_NAMED_OFFSETS)[number];
export type AnchorOffset = AnchorNamedOffset | number;
export type AnchorLinkTarget = (typeof ANCHOR_LINK_TARGETS)[number];
export type AnchorTooltipPlacement = (typeof ANCHOR_TOOLTIP_PLACEMENTS)[number];

export interface AnchorListItem {
  id?: string;
  title?: string;
  children?: AnchorListItem[];
}

export interface AnchorLinkInfo {
  href: string;
  title: string;
}

export interface AnchorCommonProps<ScrollTarget = unknown, CollapseContent = unknown> {
  /** 导航尺寸。 @en Navigation size. */
  size?: AnchorSize;
  /** 导航内容最大高度。 @en Maximum navigation content height. */
  maxHeight?: number;
  /** 点击时是否更新 URL hash。 @en Whether clicks update the URL hash. */
  changeHash?: boolean;
  /** 被观察和滚动的容器。 @en Container that is observed and scrolled. */
  scrollContainer?: ScrollTarget;
  /** 滚动行为。 @en Scrolling behavior. */
  scrollBehavior?: AnchorScrollBehavior;
  /** 点击后的目标落点。 @en Target alignment after a click. */
  scrollOffset?: AnchorOffset;
  /** 滚动激活边界。 @en Boundary used to activate a section while scrolling. */
  boundsOffset?: AnchorOffset;
  /** 是否启用折叠操作。 @en Whether collapse controls are enabled. */
  useCollapse?: boolean;
  /** 受控折叠状态。 @en Controlled collapsed state. */
  collapsed?: boolean;
  /** 非受控初始折叠状态。 @en Initial uncontrolled collapsed state. */
  defaultCollapsed?: boolean;
  /** 折叠操作内容。 @en Collapse action content. */
  collapseText?: CollapseContent;
  /** 是否显示侧边线。 @en Whether the side line is visible. */
  showLine?: boolean;
  /** 是否显示活动高亮线。 @en Whether the active highlight line is visible. */
  showHighlightLine?: boolean;
  /** 是否显示一级标题的子项数量。 @en Whether top-level titles show child counts. */
  showTitleSuffix?: boolean;
  /** 溢出提示的位置。 @en Overflow-tooltip placement. */
  placement?: AnchorTooltipPlacement;
  /** 是否自动扫描标题。 @en Whether headings are scanned automatically. */
  autoRender?: boolean;
  /** 自动扫描的分级选择器。 @en Levelled selectors used by automatic scanning. */
  autoRenderRules?: readonly (string | readonly string[])[];
  /** 覆盖所有链接目标。 @en Target applied to every link. */
  linkTarget?: AnchorLinkTarget;
}

export interface AnchorLinkCommonProps {
  /** 链接标题。 @en Link title. */
  title?: string;
  /** 章节 hash 链接。 @en Section hash link. */
  href?: string;
  /** 原生链接目标。 @en Native link target. */
  target?: AnchorLinkTarget;
}

export interface AnchorEventMap<Event = unknown> {
  /** 点击章节链接。 @en A section link was clicked. */
  click: [link: AnchorLinkInfo, event: Event];
  /** 当前活动章节变化。 @en The active section changed. */
  change: [link: string, previousLink: string];
  /** 折叠状态变化。 @en The collapsed state changed. */
  collapseChange: [collapsed: boolean];
}

export interface AnchorRegionMap {
  /** 导航链接。 @en Navigation links. */
  content: EmptyComponentApi;
  /** 折叠操作内容。 @en Collapse action content. */
  collapseLabel: EmptyComponentApi;
}

export interface AnchorLinkRegionMap {
  /** 子级导航链接。 @en Nested navigation links. */
  children: EmptyComponentApi;
  /** 自定义标题。 @en Custom title. */
  title: EmptyComponentApi;
}

export interface AnchorCommandMap {
  /** 更新活动链接。 @en Updates the active link. */
  updateActiveLink: (link: string, scroll?: boolean) => void;
  /** 重新扫描自动目录。 @en Rescans the automatic table of contents. */
  refreshAnchorList: () => void;
  /** 重新解析滚动容器。 @en Resolves the scrolling container again. */
  updateScrollContainer: () => void;
  /** 获取当前自动目录。 @en Returns the current automatic table of contents. */
  getAnchorList: () => AnchorListItem[];
}

export type AnchorLinkEventMap = EmptyComponentApi;
export type AnchorLinkCommandMap = EmptyComponentApi;

export const ANCHOR_DEFAULT_AUTO_RENDER_RULES = Object.freeze([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
] as const);

export const ANCHOR_DEFAULTS = Object.freeze({
  size: 'medium',
  maxHeight: 750,
  changeHash: true,
  scrollBehavior: 'smooth',
  scrollOffset: 'start',
  boundsOffset: 5,
  useCollapse: false,
  defaultCollapsed: false,
  showLine: true,
  showHighlightLine: true,
  showTitleSuffix: false,
  placement: 'left',
  autoRender: false,
  autoRenderRules: ANCHOR_DEFAULT_AUTO_RENDER_RULES,
} as const satisfies Partial<AnchorCommonProps>);

export const ANCHOR_LINK_DEFAULTS = Object.freeze({
  target: '_self',
} as const satisfies Partial<AnchorLinkCommonProps>);

export function isAnchorSize(value: unknown): value is AnchorSize {
  return ANCHOR_SIZES.includes(value as AnchorSize);
}

export function isAnchorScrollBehavior(value: unknown): value is AnchorScrollBehavior {
  return ANCHOR_SCROLL_BEHAVIORS.includes(value as AnchorScrollBehavior);
}

export function isAnchorOffset(value: unknown): value is AnchorOffset {
  return (
    (typeof value === 'number' && Number.isFinite(value)) ||
    ANCHOR_NAMED_OFFSETS.includes(value as AnchorNamedOffset)
  );
}

export function isAnchorLinkTarget(value: unknown): value is AnchorLinkTarget {
  return ANCHOR_LINK_TARGETS.includes(value as AnchorLinkTarget);
}

export function isAnchorTooltipPlacement(value: unknown): value is AnchorTooltipPlacement {
  return ANCHOR_TOOLTIP_PLACEMENTS.includes(value as AnchorTooltipPlacement);
}

export function isAnchorMaxHeight(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export const anchorApiContract = defineComponentApiContract<
  AnchorCommonProps,
  AnchorEventMap,
  AnchorRegionMap,
  AnchorCommandMap
>({
  defaults: ANCHOR_DEFAULTS,
  validators: {
    size: isAnchorSize,
    maxHeight: isAnchorMaxHeight,
    scrollBehavior: isAnchorScrollBehavior,
    scrollOffset: isAnchorOffset,
    boundsOffset: isAnchorOffset,
    placement: isAnchorTooltipPlacement,
    linkTarget: isAnchorLinkTarget,
  },
});

export const anchorLinkApiContract = defineComponentApiContract<
  AnchorLinkCommonProps,
  AnchorLinkEventMap,
  AnchorLinkRegionMap,
  AnchorLinkCommandMap
>({
  defaults: ANCHOR_LINK_DEFAULTS,
  validators: { target: isAnchorLinkTarget },
});
