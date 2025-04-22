export const useDropdownSlots = {
  /**
   * 触发器插槽
   */
  default: () => true,
  /**
   * 下拉菜单的插槽
   */
  dropdown: () => true,
};

export const useDropdownGroupSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
  /**
   * 标题
   * @version 2.0.5
   */
  title: () => true,
};

export const useDropdownItemSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
  /**
   * 前置图标
   * @version 2.0.5
   */
  icon: () => true,
};

export const useDropdownMenuSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
};

export const useDropdownSubmenuSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
  /**
   * 标题
   */
  title: () => true,
  /**
   前置图标
   @version 2.0.5
   */
  icon: () => true,
};

export type DropdownSlots = typeof useDropdownSlots;
export type DropdownGroupSlots = typeof useDropdownGroupSlots;
export type DropdownItemSlots = typeof useDropdownItemSlots;
export type DropdownMenuSlots = typeof useDropdownMenuSlots;
export type DropdownSubmenuSlots = typeof useDropdownSubmenuSlots;
