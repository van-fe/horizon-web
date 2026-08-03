import { isBoolean, isObject } from '@aurora/utils';
import type { SubMenuProps, MenuItemProps } from './useProps';

export const useMenuEmits = {
  /**
   * 当菜单折叠打开后通知
   * @param value 是否折叠
   * @paramEn value The value value.
   * @en Emitted when update:collapse changes.
   */
  'update:collapse': (value: boolean) => isBoolean(value),
  /**
   * 选择了某菜单的回调
   * @param currentValue 当前菜单项的 value
   * @paramEn currentValue The current value value.
   * @param paths 菜单项到顶级的数组
   * @paramEn paths The paths value.
   * @param current 当前菜单项
   * @paramEn current The current value.
   * @en Emitted when selected changes.
   */
  selected: (
    currentValue: string,
    paths: (MenuItemProps | SubMenuProps)[],
    current: MenuItemProps | SubMenuProps,
  ) => isObject(current),
  /**
   * `sub-menu` 展开的回调
   * @param currentValue 当前 sub-menu 的 value
   * @paramEn currentValue The current value value.
   * @param paths 菜单项到顶级的数组
   * @paramEn paths The paths value.
   * @en Emitted when open changes.
   */
  open: (currentValue: string, paths: SubMenuProps[]) => Array.isArray(paths),
  /**
   * `sub-menu` 收起的回调
   * @param currentValue 当前 sub-menu 的 value
   * @paramEn currentValue The current value value.
   * @param paths 菜单项到顶级的数组
   * @paramEn paths The paths value.
   * @en Emitted when close changes.
   */
  close: (currentValue: string, paths: SubMenuProps[]) => Array.isArray(paths),
};

export type MenuEmits = typeof useMenuEmits;

export const useMenuItemEmits = {
  /**
   * 点击了当前菜单后触发
   * @param prop menu-item 的 prop
   * @paramEn prop The prop value.
   * @en Emitted when click changes.
   */
  click: (prop: MenuItemProps) => isObject(prop),
};

export type MenuItemEmits = typeof useMenuItemEmits;

export const useSubMenuEmits = {
  /**
   * 点击了当前菜单后触发
   * @param prop sub-menu 的 prop
   * @paramEn prop The prop value.
   * @en Emitted when click changes.
   */
  click: (prop: SubMenuProps) => isObject(prop),
};

export type SubMenuEmits = typeof useSubMenuEmits;
