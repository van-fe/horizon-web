import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const LIST_SIZES = ['small', 'medium'] as const;
export type ListSize = (typeof LIST_SIZES)[number];

export interface ListCommonProps<Item = unknown> {
  /** 列表数据。 @en Source items rendered by the item region. */
  data?: readonly Item[];
  /** 是否显示斑马纹。 @en Whether alternating row backgrounds are displayed. */
  zebra?: boolean;
  /** 是否显示外边框。 @en Whether the outer border is displayed. */
  border?: boolean;
  /** 是否显示项目分割线。 @en Whether separators are displayed between items. */
  split?: boolean;
  /** 列表最大高度，非正数表示不限制。 @en Maximum list height; non-positive values disable the limit. */
  maxHeight?: number;
  /** 列表项目尺寸。 @en List item spacing size. */
  size?: ListSize;
}

export interface ListItemCommonProps {
  /** 标题。 @en Item title. */
  title?: string;
  /** 标题尺寸。 @en Title size. */
  titleSize?: ListSize;
  /** 副标题。 @en Item subtitle. */
  subtitle?: string;
  /** 标题是否加粗。 @en Whether the title is bold. */
  titleBold?: boolean;
  /** 描述文字。 @en Item description. */
  describe?: string;
}

export type ListEventMap = EmptyComponentApi;
export type ListItemEventMap = EmptyComponentApi;

export interface ListItemRegionContext<Item = unknown> {
  item: Item;
  index: number;
}

export interface ListRegionMap<Item = unknown> {
  content: EmptyComponentApi;
  header: EmptyComponentApi;
  footer: EmptyComponentApi;
  item: ListItemRegionContext<Item>;
}

export interface ListItemRegionMap {
  content: EmptyComponentApi;
  title: EmptyComponentApi;
  leading: EmptyComponentApi;
  description: EmptyComponentApi;
  actions: EmptyComponentApi;
}

export type ListCommandMap = EmptyComponentApi;
export type ListItemCommandMap = EmptyComponentApi;

export const LIST_DEFAULTS = Object.freeze({
  zebra: false,
  border: false,
  split: true,
  maxHeight: 0,
} as const satisfies Partial<ListCommonProps>);

export const LIST_ITEM_DEFAULTS = Object.freeze({
  titleBold: true,
} as const satisfies Partial<ListItemCommonProps>);

export function isListSize(value: unknown): value is ListSize {
  return LIST_SIZES.includes(value as ListSize);
}

export function isListMaxHeight(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export function resolveListMaxHeight(value: number | undefined): number | undefined {
  return value !== undefined && value > 0 ? value : undefined;
}

export const listApiContract = defineComponentApiContract<
  ListCommonProps,
  ListEventMap,
  ListRegionMap,
  ListCommandMap
>({ defaults: LIST_DEFAULTS, validators: { size: isListSize, maxHeight: isListMaxHeight } });

export const listItemApiContract = defineComponentApiContract<
  ListItemCommonProps,
  ListItemEventMap,
  ListItemRegionMap,
  ListItemCommandMap
>({ defaults: LIST_ITEM_DEFAULTS, validators: { titleSize: isListSize } });
