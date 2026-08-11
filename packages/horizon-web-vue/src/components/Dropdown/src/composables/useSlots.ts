import type { SlotsType } from 'vue';

export const useDropdownSlots = Object as SlotsType<{
  /**
   * 触发器插槽
   * @param popperVisible: 下拉菜单是否显示
    * @en Content slot for default.
   */
  default: { popperVisible: boolean };
  /**
   * 下拉菜单的插槽
    * @en Custom content for the dropdown slot.
   */
  dropdown?: {};
}>;

export const useDropdownGroupSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 标题
    * @en Custom content for the title slot.
   */
  title?: {};
}>;

export const useDropdownItemSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 前置图标
    * @en Custom content for the icon slot.
   */
  icon?: {};
}>;

export const useDropdownMenuSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export const useDropdownSubmenuSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 标题
    * @en Custom content for the title slot.
   */
  title?: {};
  /**
   前置图标
    * @en Custom content for the icon slot.
   */
  icon?: {};
}>;

export type DropdownSlots = typeof useDropdownSlots;
export type DropdownGroupSlots = typeof useDropdownGroupSlots;
export type DropdownItemSlots = typeof useDropdownItemSlots;
export type DropdownMenuSlots = typeof useDropdownMenuSlots;
export type DropdownSubmenuSlots = typeof useDropdownSubmenuSlots;
