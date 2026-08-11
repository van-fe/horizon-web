import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const COLLAPSE_SIZES = ['small', 'medium', 'large'] as const;
export const COLLAPSE_ICON_POSITIONS = ['left', 'right'] as const;
export const COLLAPSE_DIRECTIVES = ['show', 'if'] as const;

export type CollapseKey = string | number;
export type CollapseValue = CollapseKey | readonly CollapseKey[] | undefined;
export type CollapseSize = (typeof COLLAPSE_SIZES)[number];
export type CollapseIconPosition = (typeof COLLAPSE_ICON_POSITIONS)[number];
export type CollapseDirective = (typeof COLLAPSE_DIRECTIVES)[number];

export interface CollapseCommonProps {
  /** 当前展开项。 @en Controlled expanded panels. */
  value?: CollapseValue;
  /** 非受控初始展开项。 @en Initial uncontrolled expanded panels. */
  defaultValue?: CollapseValue;
  /** 同一时间仅允许一个面板展开。 @en Allows only one expanded panel. */
  accordion?: boolean;
  /** 使用边框外观。 @en Uses the bordered appearance. */
  border?: boolean;
  /** 使用填充外观。 @en Uses the filled appearance. */
  filled?: boolean;
  /** 展开图标位置。 @en Expand-icon position. */
  expandIconPosition?: CollapseIconPosition;
  /** 组件尺寸。 @en Component size. */
  size?: CollapseSize;
  /** 初始展开全部非禁用面板。 @en Initially expands every enabled panel. */
  expandAll?: boolean;
}

export interface CollapseItemCommonProps<Title = string, Icon = string> {
  /** 面板唯一标识。 @en Unique panel key. */
  name: CollapseKey;
  /** 面板标题。 @en Panel title. */
  title?: Title;
  /** 禁用面板交互。 @en Disables panel interaction. */
  disabled?: boolean;
  /** 展开图标。 @en Expand icon. */
  expandIcon?: Icon;
  /** 分隔线颜色。 @en Divider color. */
  color?: string;
  /** 标题背景色。 @en Header background color. */
  background?: string;
  /** 正文保留或条件挂载策略。 @en Body persistence strategy. */
  directive?: CollapseDirective;
}

export interface CollapseEventMap {
  /** 展开项变化。 @en Expanded panels changed. */
  change: [value: CollapseValue];
}

export interface CollapseRegionMap {
  /** 面板条目。 @en Composed collapse items. */
  content: EmptyComponentApi;
}

export interface CollapseItemRegionMap {
  /** 面板正文。 @en Panel body. */
  content: EmptyComponentApi;
  /** 面板标题。 @en Panel title. */
  title: EmptyComponentApi;
  /** 展开图标。 @en Expand icon. */
  icon: EmptyComponentApi;
}

export interface CollapseCommandMap {
  /** 聚焦首个或指定面板标题。 @en Focuses the first or requested panel header. */
  focus: (key?: CollapseKey) => void;
}

export const COLLAPSE_DEFAULTS = Object.freeze({
  defaultValue: Object.freeze([] as CollapseKey[]),
  accordion: false,
  border: false,
  filled: false,
  expandIconPosition: 'left',
  size: 'medium',
  expandAll: false,
} as const satisfies Partial<CollapseCommonProps>);

export const COLLAPSE_ITEM_DEFAULTS = Object.freeze({
  disabled: false,
  directive: 'show',
} as const satisfies Partial<CollapseItemCommonProps>);

export function isCollapseKey(value: unknown): value is CollapseKey {
  return typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));
}

export function isCollapseKeyArray(value: unknown): value is readonly CollapseKey[] {
  return Array.isArray(value) && value.every(isCollapseKey);
}

export function isCollapseValue(value: unknown): value is CollapseValue {
  return value === undefined || isCollapseKey(value) || isCollapseKeyArray(value);
}

export function isDefinedCollapseValue(value: unknown): value is NonNullable<CollapseValue> {
  return isCollapseKey(value) || isCollapseKeyArray(value);
}

export function isCollapseSize(value: unknown): value is CollapseSize {
  return COLLAPSE_SIZES.includes(value as CollapseSize);
}

export function isCollapseIconPosition(value: unknown): value is CollapseIconPosition {
  return COLLAPSE_ICON_POSITIONS.includes(value as CollapseIconPosition);
}

export function isCollapseDirective(value: unknown): value is CollapseDirective {
  return COLLAPSE_DIRECTIVES.includes(value as CollapseDirective);
}

export function normalizeCollapseValue(value: CollapseValue, accordion: boolean): CollapseValue {
  if (accordion) return isCollapseKeyArray(value) ? value[0] : value;
  if (value === undefined) return [];
  return isCollapseKeyArray(value) ? [...new Set(value)] : [value];
}

export function isCollapseItemActive(
  value: CollapseValue,
  key: CollapseKey,
  accordion: boolean,
): boolean {
  const normalized = normalizeCollapseValue(value, accordion);
  return accordion ? normalized === key : (normalized as readonly CollapseKey[]).includes(key);
}

export function toggleCollapseValue(
  value: CollapseValue,
  key: CollapseKey,
  accordion: boolean,
): CollapseValue {
  const normalized = normalizeCollapseValue(value, accordion);
  if (accordion) return normalized === key ? undefined : key;
  const keys = normalized as readonly CollapseKey[];
  return keys.includes(key) ? keys.filter(item => item !== key) : [...keys, key];
}

export function resolveCollapseInitialValue(
  value: CollapseValue,
  items: readonly Pick<CollapseItemCommonProps, 'name' | 'disabled'>[],
  accordion: boolean,
  expandAll: boolean,
): CollapseValue {
  if (accordion || !expandAll) return normalizeCollapseValue(value, accordion);
  const expanded = new Set(normalizeCollapseValue(value, false) as readonly CollapseKey[]);
  for (const item of items) if (!item.disabled) expanded.add(item.name);
  return [...expanded];
}

export function isCollapseActivationKey(key: string): boolean {
  return key === 'Enter' || key === ' ';
}

export const collapseApiContract = defineComponentApiContract<
  CollapseCommonProps,
  CollapseEventMap,
  CollapseRegionMap,
  CollapseCommandMap
>({
  defaults: COLLAPSE_DEFAULTS,
  validators: {
    value: isDefinedCollapseValue,
    defaultValue: isDefinedCollapseValue,
    expandIconPosition: isCollapseIconPosition,
    size: isCollapseSize,
  },
});

export const collapseItemApiContract = defineComponentApiContract<
  CollapseItemCommonProps,
  EmptyComponentApi,
  CollapseItemRegionMap
>({
  defaults: COLLAPSE_ITEM_DEFAULTS,
  validators: {
    name: isCollapseKey,
    directive: isCollapseDirective,
  },
});
