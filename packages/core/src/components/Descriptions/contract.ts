import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const DESCRIPTION_SIZES = ['small', 'medium', 'large'] as const;
export const DESCRIPTION_TYPES = ['horizontal', 'vertical'] as const;
export const DESCRIPTION_LABEL_POSITIONS = ['top', 'left'] as const;
export const DESCRIPTION_BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type DescriptionSize = (typeof DESCRIPTION_SIZES)[number];
export type DescriptionType = (typeof DESCRIPTION_TYPES)[number];
export type DescriptionLabelPosition = (typeof DESCRIPTION_LABEL_POSITIONS)[number];
export type DescriptionBreakpoint = (typeof DESCRIPTION_BREAKPOINTS)[number];

export interface DescriptionResponsiveValues {
  /** 小于 456px 时的值。 @en Value below 456px. */
  xs?: number;
  /** 456px 至 759px 时的值。 @en Value from 456px through 759px. */
  sm?: number;
  /** 760px 至 1175px 时的值。 @en Value from 760px through 1175px. */
  md?: number;
  /** 1176px 至 1655px 时的值。 @en Value from 1176px through 1655px. */
  lg?: number;
  /** 1656px 及以上时的值。 @en Value at 1656px and above. */
  xl?: number;
}

export interface DescriptionsCommonProps extends DescriptionResponsiveValues {
  /** 标题。 @en Section title. */
  title?: string;
  /** 是否显示边框。 @en Whether borders are displayed. */
  border?: boolean;
  /** 间距尺寸。 @en Spacing size. */
  size?: DescriptionSize;
  /** 排列类型。 @en Layout direction. */
  type?: DescriptionType;
  /** 默认列数。 @en Default column count. */
  column?: number;
  /** 标签相对值的位置。 @en Label position relative to the value. */
  labelPosition?: DescriptionLabelPosition;
  /** 标签附加类名。 @en Additional label class name. */
  labelClass?: string;
  /** 值附加类名。 @en Additional value class name. */
  valueClass?: string;
}

export interface DescriptionItemCommonProps extends DescriptionResponsiveValues {
  /** 标签文字。 @en Label text. */
  label?: string;
  /** 值文字。 @en Value text. */
  value?: string;
  /** 默认跨列数。 @en Default column span. */
  spanCol?: number;
  /** 跨行数。 @en Row span. */
  spanRow?: number;
}

export type DescriptionsEventMap = EmptyComponentApi;
export type DescriptionItemEventMap = EmptyComponentApi;
export interface DescriptionsRegionMap {
  /** 描述项。 @en Description items. */
  content: EmptyComponentApi;
  /** 自定义标题。 @en Custom title. */
  title: EmptyComponentApi;
}
export interface DescriptionItemRegionMap {
  /** 自定义值。 @en Custom value. */
  content: EmptyComponentApi;
  /** 自定义标签。 @en Custom label. */
  label: EmptyComponentApi;
}
export type DescriptionsCommandMap = EmptyComponentApi;
export type DescriptionItemCommandMap = EmptyComponentApi;

export const DESCRIPTIONS_DEFAULTS = Object.freeze({
  title: '',
  border: false,
  type: 'horizontal',
  column: 1,
  labelPosition: 'left',
} as const satisfies Partial<DescriptionsCommonProps>);

export const DESCRIPTION_ITEM_DEFAULTS = Object.freeze({
  label: '',
  value: '--',
  spanCol: 1,
  spanRow: 1,
} as const satisfies Partial<DescriptionItemCommonProps>);

export function isDescriptionSize(value: unknown): value is DescriptionSize {
  return DESCRIPTION_SIZES.includes(value as DescriptionSize);
}
export function isDescriptionType(value: unknown): value is DescriptionType {
  return DESCRIPTION_TYPES.includes(value as DescriptionType);
}
export function isDescriptionLabelPosition(value: unknown): value is DescriptionLabelPosition {
  return DESCRIPTION_LABEL_POSITIONS.includes(value as DescriptionLabelPosition);
}
export function isDescriptionGridSpan(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}
export function resolveDescriptionBreakpoint(width: number): DescriptionBreakpoint {
  if (width < 456) return 'xs';
  if (width < 760) return 'sm';
  if (width < 1176) return 'md';
  if (width < 1656) return 'lg';
  return 'xl';
}
export function resolveDescriptionResponsiveValue(
  width: number,
  fallback: number,
  values: DescriptionResponsiveValues,
): number {
  const candidate = values[resolveDescriptionBreakpoint(width)];
  return isDescriptionGridSpan(candidate) ? candidate : fallback;
}

export const descriptionsApiContract = defineComponentApiContract<
  DescriptionsCommonProps,
  DescriptionsEventMap,
  DescriptionsRegionMap,
  DescriptionsCommandMap
>({
  defaults: DESCRIPTIONS_DEFAULTS,
  validators: {
    size: isDescriptionSize,
    type: isDescriptionType,
    column: isDescriptionGridSpan,
    labelPosition: isDescriptionLabelPosition,
    xs: isDescriptionGridSpan,
    sm: isDescriptionGridSpan,
    md: isDescriptionGridSpan,
    lg: isDescriptionGridSpan,
    xl: isDescriptionGridSpan,
  },
});

export const descriptionItemApiContract = defineComponentApiContract<
  DescriptionItemCommonProps,
  DescriptionItemEventMap,
  DescriptionItemRegionMap,
  DescriptionItemCommandMap
>({
  defaults: DESCRIPTION_ITEM_DEFAULTS,
  validators: {
    spanCol: isDescriptionGridSpan,
    spanRow: isDescriptionGridSpan,
    xs: isDescriptionGridSpan,
    sm: isDescriptionGridSpan,
    md: isDescriptionGridSpan,
    lg: isDescriptionGridSpan,
    xl: isDescriptionGridSpan,
  },
});
