import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const BREADCRUMB_SIZES = ['small', 'medium'] as const;
export const BREADCRUMB_DISPLAY_TYPES = ['full', 'ellipsis'] as const;

export type BreadcrumbSize = (typeof BREADCRUMB_SIZES)[number];
export type BreadcrumbDisplayType = (typeof BREADCRUMB_DISPLAY_TYPES)[number];

/** Renderer-neutral data for one hierarchy level. */
export interface BreadcrumbItemCommonProps<Route = unknown> {
  /** Text used by data-driven rendering and collapsed menus. @en Text used by data-driven rendering and collapsed menus. */
  text?: string;
  /** Text separator used after this item. @en Text separator used after this item. */
  separator?: string;
  /** Whether the current item uses title emphasis. @en Whether the current item uses title emphasis. */
  title?: boolean;
  /** Route target handled by the renderer navigation adapter. @en Route target handled by the renderer navigation adapter. */
  route?: Route;
  /** Whether route navigation replaces the current history entry. @en Whether route navigation replaces the current history entry. */
  replace?: boolean;
  /** Item size. @en Item size. */
  size?: BreadcrumbSize;
  /** Whether an item without a route behaves as an action. @en Whether an item without a route behaves as an action. */
  clickable?: boolean;
}

export interface BreadcrumbCommonProps<
  Item extends BreadcrumbItemCommonProps = BreadcrumbItemCommonProps,
> {
  /** Default text separator. @en Default text separator. */
  separator?: string;
  /** Whether the final item uses title emphasis. @en Whether the final item uses title emphasis. */
  title?: boolean;
  /** Data-driven hierarchy items. @en Data-driven hierarchy items. */
  items?: readonly Item[];
  /** Component size. @en Component size. */
  size?: BreadcrumbSize;
  /** Overflow display strategy. @en Overflow display strategy. */
  displayType?: BreadcrumbDisplayType;
}

export interface BreadcrumbEventMap<Item = BreadcrumbItemCommonProps, Event = unknown> {
  /** Clicks an interactive hierarchy item. @en Clicks an interactive hierarchy item. */
  itemClick: [item: Item, event: Event];
}

export interface BreadcrumbItemEventMap<Event = unknown> {
  /** Clicks this interactive hierarchy item. @en Clicks this interactive hierarchy item. */
  click: [event: Event];
}

export interface BreadcrumbRegionMap {
  /** Hierarchy items. @en Hierarchy items. */
  content: EmptyComponentApi;
  /** Default separator content. @en Default separator content. */
  separator: EmptyComponentApi;
}

export interface BreadcrumbItemRegionMap {
  /** Item content. @en Item content. */
  content: EmptyComponentApi;
  /** Item separator content. @en Item separator content. */
  separator: EmptyComponentApi;
}

export type BreadcrumbCommandMap = EmptyComponentApi;
export type BreadcrumbItemCommandMap = EmptyComponentApi;

export const BREADCRUMB_DEFAULTS = Object.freeze({
  separator: '/',
  title: false,
  items: Object.freeze([]) as readonly BreadcrumbItemCommonProps[],
  size: 'medium',
  displayType: 'full',
} as const satisfies Required<BreadcrumbCommonProps>);

export const BREADCRUMB_ITEM_DEFAULTS = Object.freeze({
  title: false,
  replace: false,
  size: 'medium',
  clickable: false,
} as const satisfies Required<
  Pick<BreadcrumbItemCommonProps, 'title' | 'replace' | 'size' | 'clickable'>
>);

export function isBreadcrumbSize(value: unknown): value is BreadcrumbSize {
  return BREADCRUMB_SIZES.includes(value as BreadcrumbSize);
}

export function isBreadcrumbDisplayType(value: unknown): value is BreadcrumbDisplayType {
  return BREADCRUMB_DISPLAY_TYPES.includes(value as BreadcrumbDisplayType);
}

export function isBreadcrumbItemClickable(item: BreadcrumbItemCommonProps): boolean {
  return item.route !== undefined || item.clickable === true;
}

export type BreadcrumbNavigationAction = 'none' | 'push' | 'replace';

export function resolveBreadcrumbNavigation(
  item: BreadcrumbItemCommonProps,
  canNavigate: boolean,
): BreadcrumbNavigationAction {
  if (item.route === undefined || !canNavigate) return 'none';
  return item.replace ? 'replace' : 'push';
}

export interface BreadcrumbCollapseInput {
  containerWidth: number;
  contentWidth: number;
  collapsibleItemWidths: readonly number[];
  ellipsisWidth: number;
}

/** Calculates how many middle items must be replaced by the ellipsis item. */
export function calculateBreadcrumbCollapseCount({
  containerWidth,
  contentWidth,
  collapsibleItemWidths,
  ellipsisWidth,
}: BreadcrumbCollapseInput): number {
  if (containerWidth < 0 || contentWidth <= containerWidth) return 0;

  let removedWidth = 0;
  for (let index = 0; index < collapsibleItemWidths.length; index++) {
    removedWidth += Math.max(0, collapsibleItemWidths[index] ?? 0);
    if (contentWidth - removedWidth + Math.max(0, ellipsisWidth) <= containerWidth) {
      return index + 1;
    }
  }

  return collapsibleItemWidths.length;
}

export const breadcrumbApiContract = defineComponentApiContract<
  BreadcrumbCommonProps,
  BreadcrumbEventMap,
  BreadcrumbRegionMap,
  BreadcrumbCommandMap
>({
  defaults: BREADCRUMB_DEFAULTS,
  validators: {
    separator: (value): value is string => typeof value === 'string',
    size: isBreadcrumbSize,
    displayType: isBreadcrumbDisplayType,
  },
});

export const breadcrumbItemApiContract = defineComponentApiContract<
  BreadcrumbItemCommonProps,
  BreadcrumbItemEventMap,
  BreadcrumbItemRegionMap,
  BreadcrumbItemCommandMap
>({
  defaults: BREADCRUMB_ITEM_DEFAULTS,
  validators: {
    separator: (value): value is string => typeof value === 'string',
    size: isBreadcrumbSize,
  },
});
