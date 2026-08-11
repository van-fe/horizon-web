import type { DropdownNavigationKey } from '@aurora/core';
import { getNextDropdownItemIndex } from '@aurora/core';

export const DROPDOWN_ENABLED_ITEM_SELECTOR =
  '[role="menuitem"]:not([aria-disabled="true"]):not([hidden])';

/** 返回菜单中可聚焦的菜单项。 @en Returns focusable items owned by a menu. */
export function getEnabledDropdownItems(container: ParentNode): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(DROPDOWN_ENABLED_ITEM_SELECTOR));
}

/** 按菜单导航键聚焦目标项。 @en Focuses the item selected by a menu navigation key. */
export function focusDropdownItem(
  container: ParentNode,
  key: DropdownNavigationKey,
  activeElement?: Element | null,
): HTMLElement | undefined {
  const items = getEnabledDropdownItems(container);
  const index = getNextDropdownItemIndex(
    items.length,
    items.indexOf((activeElement ?? container.ownerDocument?.activeElement) as HTMLElement),
    key,
  );
  const item = items.at(index);
  item?.focus();
  return item;
}

export interface DropdownContextMenuPosition {
  position: 'fixed';
  x: number;
  y: number;
}

/** 归一化上下文菜单视口坐标。 @en Normalizes viewport coordinates for a context menu. */
export function resolveDropdownContextMenuPosition(
  clientX: number,
  clientY: number,
): DropdownContextMenuPosition {
  return {
    position: 'fixed',
    x: Number.isFinite(clientX) ? clientX : 0,
    y: Number.isFinite(clientY) ? clientY : 0,
  };
}
