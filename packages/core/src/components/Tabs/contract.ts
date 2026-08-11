import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const TABS_SIZES = ['small', 'medium', 'large', 'huge'] as const;
export const TABS_VARIANTS = ['line', 'card', 'segment', 'page'] as const;
export const TABS_ACTIVATION_KEYS = ['Enter', ' '] as const;
export const TABS_NAVIGATION_KEYS = ['ArrowLeft', 'ArrowRight', 'Home', 'End'] as const;

export type TabsKey = string | number;
export type TabsSize = (typeof TABS_SIZES)[number];
export type TabsVariant = (typeof TABS_VARIANTS)[number];
export type TabsNavigationKey = (typeof TABS_NAVIGATION_KEYS)[number];

export interface TabsCommonProps {
  /** 当前选中项。 @en Controlled selected tab. */
  value?: TabsKey;
  /** 非受控初始选中项。 @en Initial uncontrolled selected tab. */
  defaultValue?: TabsKey;
  /** 组件尺寸。 @en Component size. */
  size?: TabsSize;
  /** 允许拖拽排序。 @en Enables drag reordering. */
  draggable?: boolean;
  /** 允许溢出导航滚动。 @en Enables overflow navigation. */
  scrollable?: boolean;
  /** 切换后将选中项移入视口。 @en Brings the selected tab into view. */
  focusable?: boolean;
  /** 溢出时展示导航箭头。 @en Shows overflow navigation arrows. */
  arrow?: boolean;
  /** 外观类型。 @en Presentation variant. */
  variant?: TabsVariant;
  /** 展示底部分割线。 @en Shows the bottom divider. */
  underline?: boolean;
  /** 展示选中指示器。 @en Shows the selection indicator. */
  indicator?: boolean;
  /** 展示新增操作。 @en Shows the add action. */
  editable?: boolean;
  /** 切换前守卫。 @en Guard invoked before selection changes. */
  beforeChange?: (key: TabsKey) => boolean | PromiseLike<boolean>;
}

export interface TabCommonProps<Label = string | number, Icon = string> {
  /** 条目标识；部分渲染器可由结构身份提供。 @en Tab identity; renderers may provide it structurally. */
  value: TabsKey;
  /** 条目文本。 @en Tab label. */
  label?: Label;
  /** 条目图标。 @en Tab icon. */
  icon?: Icon;
  /** 图标尺寸。 @en Icon size. */
  iconSize?: string | number;
  /** 禁用条目。 @en Disables the tab. */
  disabled?: boolean;
  /** 展示关闭操作。 @en Shows the close action. */
  closable?: boolean;
  /** 允许当前条目拖拽。 @en Allows this tab to be dragged. */
  draggable?: boolean;
}

export interface TabsEventMap {
  /** 选中项变化。 @en Selected tab changed. */
  change: [key: TabsKey];
  /** 请求新增条目。 @en Add-tab action requested. */
  add: [];
  /** 请求关闭条目。 @en Close-tab action requested. */
  close: [key: TabsKey | undefined];
  /** 条目排序变化。 @en Tab order changed. */
  sort: [current: number, target: number, keys: readonly TabsKey[]];
}

export interface TabEventMap {
  /** 条目被激活。 @en Tab activated. */
  click: [key: TabsKey];
  /** 条目请求关闭。 @en Tab close requested. */
  close: [key: TabsKey];
}

export interface TabsExtraRegionContext {
  size: TabsSize;
}
export interface TabContentRegionContext {
  active: boolean;
  activeKey: TabsKey | undefined;
}

export interface TabsRegionMap {
  /** 条目集合。 @en Composed tabs. */
  content: EmptyComponentApi;
  /** 额外操作。 @en Extra actions. */
  extra: TabsExtraRegionContext;
}

export interface TabRegionMap {
  /** 条目内容。 @en Tab content. */
  content: TabContentRegionContext;
  /** 条目图标。 @en Tab icon. */
  icon: EmptyComponentApi;
}

export interface TabsCommandMap {
  /** 聚焦首个或指定条目。 @en Focuses the first or requested tab. */
  focus: (key?: TabsKey) => void;
}

export const TABS_DEFAULTS = Object.freeze({
  size: 'small',
  draggable: false,
  scrollable: true,
  focusable: true,
  arrow: true,
  variant: 'line',
  underline: true,
  indicator: true,
  editable: false,
} as const satisfies Partial<TabsCommonProps>);

export const TAB_DEFAULTS = Object.freeze({
  icon: '',
  disabled: false,
  closable: false,
  draggable: true,
} as const satisfies Partial<TabCommonProps>);

export function isTabsKey(value: unknown): value is TabsKey {
  return typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));
}
export function isTabsSize(value: unknown): value is TabsSize {
  return TABS_SIZES.includes(value as TabsSize);
}
export function isTabsVariant(value: unknown): value is TabsVariant {
  return TABS_VARIANTS.includes(value as TabsVariant);
}
export function isTabsActivationKey(key: string): boolean {
  return TABS_ACTIVATION_KEYS.includes(key as (typeof TABS_ACTIVATION_KEYS)[number]);
}
export function isTabsNavigationKey(key: string): key is TabsNavigationKey {
  return TABS_NAVIGATION_KEYS.includes(key as TabsNavigationKey);
}

export function resolveTabsNavigationIndex(
  currentIndex: number,
  key: TabsNavigationKey,
  length: number,
): number | undefined {
  if (length <= 0) return undefined;
  if (key === 'Home') return 0;
  if (key === 'End') return length - 1;
  const index = currentIndex < 0 ? 0 : currentIndex;
  return key === 'ArrowRight' ? (index + 1) % length : (index - 1 + length) % length;
}

export function resolveTabsCloseValue(
  activeKey: TabsKey | undefined,
  closingKey: TabsKey,
  keys: readonly TabsKey[],
): TabsKey | undefined {
  if (activeKey !== closingKey) return activeKey;
  const index = keys.indexOf(closingKey);
  if (index < 0) return activeKey;
  return keys[index + 1] ?? keys[index - 1];
}

export function reorderTabsKeys(
  keys: readonly TabsKey[],
  current: number,
  target: number,
): TabsKey[] {
  const result = [...keys];
  if (
    current < 0 ||
    target < 0 ||
    current >= result.length ||
    target >= result.length ||
    current === target
  )
    return result;
  [result[current], result[target]] = [result[target], result[current]];
  return result;
}

export const tabsApiContract = defineComponentApiContract<
  TabsCommonProps,
  TabsEventMap,
  TabsRegionMap,
  TabsCommandMap
>({
  defaults: TABS_DEFAULTS,
  validators: {
    value: isTabsKey,
    defaultValue: isTabsKey,
    size: isTabsSize,
    variant: isTabsVariant,
  },
});

export const tabApiContract = defineComponentApiContract<TabCommonProps, TabEventMap, TabRegionMap>(
  {
    defaults: TAB_DEFAULTS,
    validators: { value: isTabsKey },
  },
);
