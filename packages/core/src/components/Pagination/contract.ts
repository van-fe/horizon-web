import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const PAGINATION_SIZES = ['medium', 'large'] as const;
export const PAGINATION_VARIANTS = ['default', 'simple', 'simplest'] as const;
export const PAGINATION_ALIGNS = ['left', 'center', 'right'] as const;
export const PAGINATION_LAYOUT_ITEMS = ['pager', 'sizes', 'jumper', 'total'] as const;

export type PaginationSize = (typeof PAGINATION_SIZES)[number];
export type PaginationVariant = (typeof PAGINATION_VARIANTS)[number];
export type PaginationAlign = (typeof PAGINATION_ALIGNS)[number];
export type PaginationLayoutItem = (typeof PAGINATION_LAYOUT_ITEMS)[number];
export type PaginationLayout = string | readonly PaginationLayoutItem[];
export type PaginationRenderPart = PaginationLayoutItem | 'simplest-pager';
export type PaginationPagerItem = number | 'jump-prev' | 'jump-next';

export interface PaginationLabels {
  /** 导航区域名称。 @en Navigation landmark label. */
  navigation: string;
  /** 上一页按钮名称。 @en Previous-page button label. */
  previousPage: string;
  /** 下一页按钮名称。 @en Next-page button label. */
  nextPage: string;
  /** 页码名称模板，支持 `{page}`。 @en Page label template supporting `{page}`. */
  page: string;
  /** 向前跳转页组名称。 @en Backward page-group label. */
  jumpPrevious: string;
  /** 向后跳转页组名称。 @en Forward page-group label. */
  jumpNext: string;
  /** 总数模板，支持 `{total}`。 @en Total template supporting `{total}`. */
  total: string;
  /** 范围总数模板，支持 `{range}` 与 `{total}`。 @en Range-total template. */
  rangeTotal: string;
  /** 每页数量后缀。 @en Page-size suffix. */
  pageSize: string;
  /** 每页数量选择器名称。 @en Page-size selector label. */
  pageSizeSelection: string;
  /** 每页数量选项后缀。 @en Page-size option suffix. */
  pageSizeOption: string;
  /** 跳转输入名称。 @en Jump-input label. */
  jumpToPage: string;
  /** 跳转输入前缀。 @en Jump-input prefix. */
  jumpPrefix: string;
  /** 跳转输入后缀。 @en Jump-input suffix. */
  jumpSuffix: string;
}

export interface PaginationCommonProps {
  /** 当前页码。 @en Controlled current page. */
  value?: number;
  /** 非受控初始页码。 @en Initial uncontrolled page. */
  defaultValue?: number;
  /** 每页数量。 @en Controlled page size. */
  pageSize?: number;
  /** 非受控初始每页数量。 @en Initial uncontrolled page size. */
  defaultPageSize?: number;
  /** 数据总数。 @en Total item count. */
  total?: number;
  /** 可选择的每页数量。 @en Available page sizes. */
  pageSizes?: readonly number[];
  /** 最大页码按钮数量。 @en Maximum pager item count. */
  pagerCount?: number;
  /** 子区域布局。 @en Visible pagination regions. */
  layout?: PaginationLayout;
  /** 展示模式。 @en Presentation variant. */
  variant?: PaginationVariant;
  /** 单页时隐藏。 @en Hides the control for a single page. */
  hideOnSinglePage?: boolean;
  /** 总数区域展示当前范围。 @en Shows the current range in total copy. */
  showRange?: boolean;
  /** 水平对齐方式。 @en Horizontal alignment. */
  align?: PaginationAlign;
  /** 是否禁用交互。 @en Whether interaction is disabled. */
  disabled?: boolean;
  /** 组件尺寸。 @en Component size. */
  size?: PaginationSize;
  /** 局部文案覆盖。 @en Local label overrides. */
  labels?: Partial<PaginationLabels>;
}

export interface PaginationEventMap {
  /** 页码或每页数量变化。 @en Page or page size changed. */
  change: [page: number, pageSize: number];
  /** 当前页变化。 @en Current page changed. */
  pageChange: [page: number];
  /** 每页数量变化。 @en Page size changed. */
  pageSizeChange: [pageSize: number];
  /** 通过上一页操作切换。 @en Previous-page action completed. */
  previous: [page: number];
  /** 再次激活当前页。 @en Current page activated again. */
  currentPageClick: [page: number];
  /** 通过下一页操作切换。 @en Next-page action completed. */
  next: [page: number];
  /** 通过跳转输入切换。 @en Jump action completed. */
  jump: [page: number];
}

export interface PaginationRegionMap {
  /** 分页器前缀。 @en Content before the pagination controls. */
  prefix: EmptyComponentApi;
  /** 上一页内容。 @en Previous-page content. */
  previous: EmptyComponentApi;
  /** 下一页内容。 @en Next-page content. */
  next: EmptyComponentApi;
  /** 分页器后缀。 @en Content after the pagination controls. */
  suffix: EmptyComponentApi;
}

export interface PaginationCommandMap {
  /** 聚焦首个或指定页码按钮。 @en Focuses the first or requested page action. */
  focus: (page?: number) => void;
}

const DEFAULT_PAGE_SIZES = Object.freeze([10, 20, 30, 40, 50] as const);
const DEFAULT_LAYOUT = Object.freeze([
  'pager',
  'sizes',
  'jumper',
  'total',
] as const satisfies readonly PaginationLayoutItem[]);

export const PAGINATION_DEFAULT_LABELS = Object.freeze({
  navigation: 'Pagination',
  previousPage: 'Previous page',
  nextPage: 'Next page',
  page: 'Page {page}',
  jumpPrevious: 'Previous pages',
  jumpNext: 'Next pages',
  total: 'Total {total}',
  rangeTotal: '{range} of {total}',
  pageSize: ' / page',
  pageSizeSelection: 'Items per page',
  pageSizeOption: ' / page',
  jumpToPage: 'Go to page',
  jumpPrefix: 'Go to ',
  jumpSuffix: ' page',
} as const satisfies PaginationLabels);

export const PAGINATION_DEFAULTS = Object.freeze({
  defaultValue: 1,
  defaultPageSize: 10,
  total: 0,
  pageSizes: DEFAULT_PAGE_SIZES,
  pagerCount: 7,
  layout: DEFAULT_LAYOUT,
  variant: 'default',
  hideOnSinglePage: false,
  showRange: true,
  align: 'right',
  disabled: false,
  size: 'medium',
  labels: PAGINATION_DEFAULT_LABELS,
} as const satisfies Partial<PaginationCommonProps>);

export interface PaginationRange {
  start: number;
  end: number;
  text: string;
}

export type PaginationSelectionResult =
  | { accepted: true; page: number; reason: 'change' }
  | { accepted: false; page: number; reason: 'disabled' | 'same' };

export interface PaginationPageSizeResult {
  page: number;
  pageCount: number;
  pageSize: number;
}

export function isPaginationNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isPaginationPage(value: unknown): value is number {
  return isPaginationNumber(value) && Number.isInteger(value) && value >= 1;
}

export function isPaginationPageSize(value: unknown): value is number {
  return isPaginationPage(value);
}

export function isPaginationPageSizes(value: unknown): value is readonly number[] {
  return Array.isArray(value) && value.length > 0 && value.every(isPaginationPageSize);
}

export function isPaginationTotal(value: unknown): value is number {
  return isPaginationNumber(value) && Number.isInteger(value) && value >= 0;
}

export function isPaginationPagerCount(value: unknown): value is number {
  return isPaginationPage(value) && value >= 5 && value % 2 === 1;
}

export function isPaginationSize(value: unknown): value is PaginationSize {
  return PAGINATION_SIZES.includes(value as PaginationSize);
}

export function isPaginationVariant(value: unknown): value is PaginationVariant {
  return PAGINATION_VARIANTS.includes(value as PaginationVariant);
}

export function isPaginationAlign(value: unknown): value is PaginationAlign {
  return PAGINATION_ALIGNS.includes(value as PaginationAlign);
}

export function isPaginationLayoutItem(value: unknown): value is PaginationLayoutItem {
  return PAGINATION_LAYOUT_ITEMS.includes(value as PaginationLayoutItem);
}

export function isPaginationLayout(value: unknown): value is PaginationLayout {
  if (Array.isArray(value)) return value.every(isPaginationLayoutItem);
  if (typeof value !== 'string') return false;
  return value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
    .every(isPaginationLayoutItem);
}

export function normalizePaginationTotal(total: number): number {
  return isPaginationNumber(total) ? Math.max(0, Math.trunc(total)) : PAGINATION_DEFAULTS.total;
}

export function normalizePaginationPageSize(pageSize: number): number {
  if (!isPaginationNumber(pageSize) || pageSize === 0) return PAGINATION_DEFAULTS.defaultPageSize;
  return Math.max(1, Math.trunc(Math.abs(pageSize)));
}

export function getPaginationPageCount(total: number, pageSize: number): number {
  return Math.max(
    1,
    Math.ceil(normalizePaginationTotal(total) / normalizePaginationPageSize(pageSize)),
  );
}

export function clampPaginationPage(page: number, pageCount: number): number {
  const count = Math.max(1, Math.trunc(isPaginationNumber(pageCount) ? pageCount : 1));
  const normalized = isPaginationNumber(page) ? Math.trunc(page) : PAGINATION_DEFAULTS.defaultValue;
  return Math.min(Math.max(1, normalized), count);
}

export function resolvePaginationLayout(
  layout: PaginationLayout,
  variant: PaginationVariant,
): PaginationRenderPart[] {
  if (variant === 'simple') return ['total', 'pager'];
  if (variant === 'simplest') return ['simplest-pager'];
  const items =
    typeof layout === 'string'
      ? layout
          .split(',')
          .map(item => item.trim())
          .filter(Boolean)
      : layout;
  return [...new Set(items.filter(isPaginationLayoutItem))];
}

export function getPaginationRange(page: number, pageSize: number, total: number): PaginationRange {
  const normalizedTotal = normalizePaginationTotal(total);
  if (normalizedTotal === 0) return { start: 0, end: 0, text: '0-0' };
  const size = normalizePaginationPageSize(pageSize);
  const current = clampPaginationPage(page, getPaginationPageCount(normalizedTotal, size));
  const start = (current - 1) * size + 1;
  const end = Math.min(current * size, normalizedTotal);
  return { start, end, text: `${start}-${end}` };
}

export function getPaginationPagerItems(
  page: number,
  pageCount: number,
  pagerCount: number,
): PaginationPagerItem[] {
  const count = Math.max(1, Math.trunc(pageCount));
  if (count <= 1) return [1];
  const currentPage = clampPaginationPage(page, count);
  const visibleCount = Math.min(
    Math.max(
      3,
      Math.trunc(isPaginationNumber(pagerCount) ? pagerCount : PAGINATION_DEFAULTS.pagerCount),
    ),
    count,
  );
  const pages = new Set<number>([1, count, currentPage]);
  let left = 1;
  let right = 1;
  let useLeft = true;
  while (pages.size < visibleCount) {
    const candidate = useLeft ? currentPage - left++ : currentPage + right++;
    if (candidate > 1 && candidate < count) pages.add(candidate);
    useLeft = !useLeft;
  }
  const items: PaginationPagerItem[] = [...pages].sort((a, b) => a - b);
  for (let index = 1; index < items.length; index++) {
    const current = items[index];
    const previous = items[index - 1];
    if (typeof current !== 'number' || typeof previous !== 'number' || current === previous + 1)
      continue;
    if (current > currentPage) items[index - 1] = 'jump-next';
    else items[index] = 'jump-prev';
  }
  return items;
}

export function getPaginationJumpTarget(
  page: number,
  direction: 'previous' | 'next',
  pageCount: number,
  pagerCount: number,
): number {
  const count = Math.max(1, Math.trunc(pageCount));
  const current = clampPaginationPage(page, count);
  const distance = Math.max(1, Math.trunc(pagerCount) - 2);
  const requested = direction === 'previous' ? current - distance : current + distance;
  if (count <= 2) return clampPaginationPage(requested, count);
  return Math.min(Math.max(2, requested), count - 1);
}

export function resolvePaginationSelection(
  current: number,
  requested: number,
  pageCount: number,
  disabled = false,
): PaginationSelectionResult {
  const page = clampPaginationPage(requested, pageCount);
  if (disabled)
    return { accepted: false, page: clampPaginationPage(current, pageCount), reason: 'disabled' };
  if (page === clampPaginationPage(current, pageCount))
    return { accepted: false, page, reason: 'same' };
  return { accepted: true, page, reason: 'change' };
}

export function resolvePaginationPageSize(
  page: number,
  pageSize: number,
  total: number,
): PaginationPageSizeResult {
  const normalizedPageSize = normalizePaginationPageSize(pageSize);
  const pageCount = getPaginationPageCount(total, normalizedPageSize);
  return {
    page: clampPaginationPage(page, pageCount),
    pageCount,
    pageSize: normalizedPageSize,
  };
}

export function formatPaginationLabel(
  template: string,
  values: Readonly<Record<string, string | number>>,
): string {
  return Object.entries(values).reduce(
    (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
    template,
  );
}

export const paginationApiContract = defineComponentApiContract<
  PaginationCommonProps,
  PaginationEventMap,
  PaginationRegionMap,
  PaginationCommandMap
>({
  defaults: PAGINATION_DEFAULTS,
  validators: {
    value: isPaginationPage,
    defaultValue: isPaginationPage,
    pageSize: isPaginationPageSize,
    defaultPageSize: isPaginationPageSize,
    total: isPaginationTotal,
    pageSizes: isPaginationPageSizes,
    pagerCount: isPaginationPagerCount,
    layout: isPaginationLayout,
    variant: isPaginationVariant,
    align: isPaginationAlign,
    size: isPaginationSize,
  },
});
