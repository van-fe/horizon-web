import type { SlotsType } from 'vue';
import type {
  AdaptComponentApiShape,
  DropdownGroupRegionMap,
  DropdownItemRegionMap,
  DropdownMenuRegionMap,
  DropdownRegionMap,
  DropdownSubmenuRegionMap,
} from '@aurora/core';

type DropdownVueSlots = AdaptComponentApiShape<
  DropdownRegionMap,
  { trigger: 'default'; menu: 'dropdown' }
>;
type DropdownGroupVueSlots = AdaptComponentApiShape<DropdownGroupRegionMap, { content: 'default' }>;
type DropdownItemVueSlots = AdaptComponentApiShape<DropdownItemRegionMap, { content: 'default' }>;
type DropdownMenuVueSlots = AdaptComponentApiShape<DropdownMenuRegionMap, { content: 'default' }>;
type DropdownSubmenuVueSlots = AdaptComponentApiShape<
  DropdownSubmenuRegionMap,
  { content: 'title'; submenu: 'default' }
>;

export const useDropdownSlots = Object as SlotsType<{
  /**
   * 触发器插槽
   * @param popperVisible: 下拉菜单是否显示
   * @en Content slot for default.
   */
  default: DropdownVueSlots['default'] & { popperVisible: boolean };
  /**
   * 下拉菜单的插槽
   * @en Custom content for the dropdown slot.
   */
  dropdown?: DropdownVueSlots['dropdown'];
}>;

export const useDropdownGroupSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: DropdownGroupVueSlots['default'];
  /**
   * 标题
   * @en Custom content for the title slot.
   */
  title?: DropdownGroupVueSlots['title'];
}>;

export const useDropdownItemSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: DropdownItemVueSlots['default'];
  /**
   * 前置图标
   * @en Custom content for the icon slot.
   */
  icon?: DropdownItemVueSlots['icon'];
}>;

export const useDropdownMenuSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: DropdownMenuVueSlots['default'];
}>;

export const useDropdownSubmenuSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: DropdownSubmenuVueSlots['default'];
  /**
   * 标题
   * @en Custom content for the title slot.
   */
  title?: DropdownSubmenuVueSlots['title'];
  /**
   前置图标
    * @en Custom content for the icon slot.
   */
  icon?: DropdownSubmenuVueSlots['icon'];
}>;

export type DropdownSlots = typeof useDropdownSlots;
export type DropdownGroupSlots = typeof useDropdownGroupSlots;
export type DropdownItemSlots = typeof useDropdownItemSlots;
export type DropdownMenuSlots = typeof useDropdownMenuSlots;
export type DropdownSubmenuSlots = typeof useDropdownSubmenuSlots;
