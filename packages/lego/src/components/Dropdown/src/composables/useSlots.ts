import type { SlotsType } from 'vue';

export const useDropdownSlots = Object as SlotsType<{
  /**
   * 触发器插槽
   * @param popperVisible: 下拉菜单是否显示
   */
  default: { popperVisible: boolean };
  /**
   * 下拉菜单的插槽
   */
  dropdown?: {};
}>;

export const useDropdownGroupSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
  /**
   * 标题
   * @version 2.0.5
   */
  title?: {};
}>;

export const useDropdownItemSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
  /**
   * 前置图标
   * @version 2.0.5
   */
  icon?: {};
}>;

export const useDropdownMenuSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export const useDropdownSubmenuSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
  /**
   * 标题
   */
  title?: {};
  /**
   前置图标
   @version 2.0.5
   */
  icon?: {};
}>;

export type DropdownSlots = typeof useDropdownSlots;
export type DropdownGroupSlots = typeof useDropdownGroupSlots;
export type DropdownItemSlots = typeof useDropdownItemSlots;
export type DropdownMenuSlots = typeof useDropdownMenuSlots;
export type DropdownSubmenuSlots = typeof useDropdownSubmenuSlots;
