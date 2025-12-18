import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useDropdownExposes = {
  /**
   * 打开下拉菜单
   * @version 2.0.5
   */
  handleOpen: Function as ExposeType<() => void>,
  /**
   * 关闭下拉菜单
   * @version 2.0.5
   */
  handleClose: Function as ExposeType<() => void>,
};

export const useDropdownGroupExpose = {};
export const useDropdownItemExpose = {};
export const useDropdownMenuExpose = {};
export const useDropdownSubmenuExpose = {};

export type DropdownExposes = ExtractExposeTypes<typeof useDropdownExposes>;
export type DropdownGroupExposes = ExtractExposeTypes<typeof useDropdownGroupExpose>;
export type DropdownItemExposes = ExtractExposeTypes<typeof useDropdownItemExpose>;
export type DropdownMenuExposes = ExtractExposeTypes<typeof useDropdownMenuExpose>;
export type DropdownSubmenuExposes = ExtractExposeTypes<typeof useDropdownSubmenuExpose>;
