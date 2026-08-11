import type { DropdownCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useDropdownExposes = {
  /** 打开下拉菜单。 @en Opens the menu. */
  handleOpen: Function as ExposeType<DropdownCommandMap['open']>,
  /** 关闭下拉菜单。 @en Closes the menu. */
  handleClose: Function as ExposeType<DropdownCommandMap['close']>,
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
