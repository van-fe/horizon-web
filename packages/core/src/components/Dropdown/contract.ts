import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';
import type { PopoverHideEvent, PopoverPlacement } from '../Popover';
import type { TooltipChangeDetails } from '../Tooltip';

export const DROPDOWN_THEMES = ['default', 'gray', 'midnight'] as const;
export const DROPDOWN_TRIGGERS = ['hover', 'click', 'context-menu', 'manual'] as const;
export const DROPDOWN_SIZES = ['small', 'medium'] as const;
export const DROPDOWN_ALIGNS = ['left', 'right', 'center'] as const;
export const DROPDOWN_SUBMENU_TRIGGERS = ['hover', 'click'] as const;

export type DropdownTheme = (typeof DROPDOWN_THEMES)[number];
export type DropdownTrigger = (typeof DROPDOWN_TRIGGERS)[number];
export type DropdownSize = (typeof DROPDOWN_SIZES)[number];
export type DropdownAlign = (typeof DROPDOWN_ALIGNS)[number];
export type DropdownSubmenuTrigger = (typeof DROPDOWN_SUBMENU_TRIGGERS)[number];
export type DropdownNavigationKey = 'ArrowDown' | 'ArrowUp' | 'Home' | 'End';

export interface DropdownCommonProps<Width = string | number> {
  /** 视觉主题。 @en Visual theme. */
  theme?: DropdownTheme;
  /** 菜单触发方式。 @en Interaction used to open the menu. */
  trigger?: DropdownTrigger;
  /** 受控打开状态。 @en Controlled open state. */
  open?: boolean;
  /** 非受控初始状态。 @en Initial uncontrolled open state. */
  defaultOpen?: boolean;
  /** 菜单尺寸。 @en Menu size. */
  size?: DropdownSize;
  /** 禁用菜单。 @en Disables the menu. */
  disabled?: boolean;
  /** 未指定位置时的对齐方式。 @en Alignment used when placement is omitted. */
  align?: DropdownAlign;
  /** 浮层位置。 @en Floating placement. */
  placement?: PopoverPlacement;
  /** CSS 层级。 @en Floating z-index. */
  zIndex?: number;
  /** 菜单宽度。 @en Menu width. */
  width?: Width;
  /** 子菜单向左展开。 @en Opens submenus toward the left. */
  submenuLeft?: boolean;
  /** 使用浮层挂载容器。 @en Renders the menu through a portal. */
  portal?: boolean;
  /** hover 打开延迟。 @en Hover open delay. */
  showDelay?: number;
  /** hover 关闭延迟。 @en Hover close delay. */
  hideDelay?: number;
  /** 触发器与菜单的间距。 @en Distance between trigger and menu. */
  distance?: number;
  /** 与其他菜单互斥。 @en Closes other exclusive menus when opened. */
  exclusive?: boolean;
  /** 外部关闭事件。 @en Outside dismissal event. */
  hideEvent?: PopoverHideEvent;
}

export interface DropdownGroupCommonProps {
  /** 分组标题。 @en Group title. */
  title?: string;
}

export interface DropdownItemCommonProps<Command = unknown> {
  /** 禁用菜单项。 @en Disables the item. */
  disabled?: boolean;
  /** 激活菜单项。 @en Marks the item active. */
  active?: boolean;
  /** 允许同一节点上的后续监听器执行。 @en Allows later listeners on the same node to run. */
  allowImmediatePropagation?: boolean;
  /** 激活时派发的命令。 @en Command emitted on activation. */
  command?: Command;
  /** 显示分隔线。 @en Shows a divider before the item. */
  divided?: boolean;
}

export interface DropdownSubmenuCommonProps {
  /** 禁用子菜单。 @en Disables the submenu. */
  disabled?: boolean;
  /** 子菜单标题。 @en Submenu title. */
  title?: string;
  /** 激活子菜单。 @en Marks the submenu active. */
  active?: boolean;
  /** 子菜单触发方式。 @en Interaction used to open the submenu. */
  trigger?: DropdownSubmenuTrigger;
  /** 标记子菜单已选择。 @en Marks the submenu selected. */
  selected?: boolean;
}

export interface DropdownEventMap<Command = unknown> {
  /** 打开状态变化。 @en Open state changed. */
  openChange: [open: boolean, details: TooltipChangeDetails];
  /** 菜单命令。 @en Menu command. */
  command: [command: Command];
}

export interface DropdownItemEventMap<Event = unknown> {
  /** 菜单项被激活。 @en Item activated. */
  press: [event: Event];
}

export interface DropdownSubmenuEventMap<Event = unknown> {
  /** 子菜单触发器被激活。 @en Submenu trigger activated. */
  press: [event: Event];
}

export interface DropdownRegionMap {
  /** 唯一触发元素。 @en The single trigger element. */
  trigger: EmptyComponentApi;
  /** 菜单内容。 @en Menu content. */
  menu: EmptyComponentApi;
}

export interface DropdownMenuRegionMap {
  /** 菜单项。 @en Menu items. */
  content: EmptyComponentApi;
}

export interface DropdownGroupRegionMap {
  /** 分组标题。 @en Group title. */
  title: EmptyComponentApi;
  /** 分组内容。 @en Group content. */
  content: EmptyComponentApi;
}

export interface DropdownItemRegionMap {
  /** 前置图标。 @en Leading icon. */
  icon: EmptyComponentApi;
  /** 菜单项内容。 @en Item content. */
  content: EmptyComponentApi;
}

export interface DropdownSubmenuRegionMap extends DropdownItemRegionMap {
  /** 子菜单内容。 @en Nested menu content. */
  submenu: EmptyComponentApi;
}

export interface DropdownCommandMap {
  /** 打开菜单。 @en Opens the menu. */
  open: () => void;
  /** 关闭菜单。 @en Closes the menu. */
  close: () => void;
  /** 聚焦首个可用菜单项。 @en Focuses the first enabled menu item. */
  focusFirst: () => void;
}

export const DROPDOWN_DEFAULTS = Object.freeze({
  theme: 'default',
  trigger: 'hover',
  defaultOpen: false,
  size: 'medium',
  disabled: false,
  align: 'left',
  submenuLeft: false,
  portal: true,
  showDelay: 200,
  hideDelay: 100,
  distance: 4,
  exclusive: true,
  hideEvent: 'click',
} as const satisfies Partial<DropdownCommonProps>);

export const DROPDOWN_ITEM_DEFAULTS = Object.freeze({
  disabled: false,
  active: false,
  allowImmediatePropagation: false,
  divided: false,
} as const satisfies Partial<DropdownItemCommonProps>);

export const DROPDOWN_SUBMENU_DEFAULTS = Object.freeze({
  disabled: false,
  active: false,
  trigger: 'hover',
  selected: false,
} as const satisfies Partial<DropdownSubmenuCommonProps>);

export function isDropdownTheme(value: unknown): value is DropdownTheme {
  return DROPDOWN_THEMES.includes(value as DropdownTheme);
}
export function isDropdownTrigger(value: unknown): value is DropdownTrigger {
  return DROPDOWN_TRIGGERS.includes(value as DropdownTrigger);
}
export function isDropdownSize(value: unknown): value is DropdownSize {
  return DROPDOWN_SIZES.includes(value as DropdownSize);
}
export function isDropdownAlign(value: unknown): value is DropdownAlign {
  return DROPDOWN_ALIGNS.includes(value as DropdownAlign);
}
export function isDropdownSubmenuTrigger(value: unknown): value is DropdownSubmenuTrigger {
  return DROPDOWN_SUBMENU_TRIGGERS.includes(value as DropdownSubmenuTrigger);
}

export function resolveDropdownPlacement(
  placement: PopoverPlacement | undefined,
  align: DropdownAlign = DROPDOWN_DEFAULTS.align,
): PopoverPlacement {
  if (placement) return placement;
  if (align === 'right') return 'bottom-end';
  if (align === 'center') return 'bottom';
  return 'bottom-start';
}

export function normalizeDropdownTrigger(
  trigger: DropdownTrigger | 'contextMenu',
): DropdownTrigger {
  return trigger === 'contextMenu' ? 'context-menu' : trigger;
}

export function getNextDropdownItemIndex(
  itemCount: number,
  currentIndex: number,
  key: DropdownNavigationKey,
): number {
  if (itemCount <= 0) return -1;
  if (key === 'Home') return 0;
  if (key === 'End') return itemCount - 1;
  if (currentIndex < 0) return key === 'ArrowUp' ? itemCount - 1 : 0;
  return (currentIndex + (key === 'ArrowUp' ? -1 : 1) + itemCount) % itemCount;
}

export const dropdownApiContract = defineComponentApiContract<
  DropdownCommonProps,
  DropdownEventMap,
  DropdownRegionMap,
  DropdownCommandMap
>({
  defaults: DROPDOWN_DEFAULTS,
  validators: {
    theme: isDropdownTheme,
    trigger: isDropdownTrigger,
    size: isDropdownSize,
    align: isDropdownAlign,
  },
});

export const dropdownGroupApiContract = defineComponentApiContract<
  DropdownGroupCommonProps,
  Record<string, never>,
  DropdownGroupRegionMap
>({ defaults: {} });

export const dropdownMenuApiContract = defineComponentApiContract<
  Record<string, never>,
  Record<string, never>,
  DropdownMenuRegionMap
>({ defaults: {} });

export const dropdownItemApiContract = defineComponentApiContract<
  DropdownItemCommonProps,
  DropdownItemEventMap,
  DropdownItemRegionMap
>({ defaults: DROPDOWN_ITEM_DEFAULTS });

export const dropdownSubmenuApiContract = defineComponentApiContract<
  DropdownSubmenuCommonProps,
  DropdownSubmenuEventMap,
  DropdownSubmenuRegionMap
>({
  defaults: DROPDOWN_SUBMENU_DEFAULTS,
  validators: { trigger: isDropdownSubmenuTrigger },
});
