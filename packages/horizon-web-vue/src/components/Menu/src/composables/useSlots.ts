import type { Ref, SlotsType, VNode } from 'vue';
import type { Arrayable } from '@aurora/utils';

export const useMenuSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 前置插槽，可以放 `logo` 等元素
   *
   * @param isCollapse 是否展开
   * @paramEn isCollapse The is collapse value.
   * @en Custom content for the prepend slot.
   */
  prepend?: (isCollapse: Ref<boolean>) => Arrayable<VNode>;
  /**
   * 后置插槽
   * @param isCollapse 是否展开
   * @paramEn isCollapse The is collapse value.
   * @en Custom content for the append slot.
   */
  append?: (isCollapse: Ref<boolean>) => Arrayable<VNode>;
}>;

export const useSubMenuSlots = Object as SlotsType<{
  /**
   * 子标签插槽，例如 `subMenu` `menuItem`
   * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 图标插槽
   * @en Custom content for the icon slot.
   */
  icon?: {};
  /**
   * 自定义标题内容
   * @en Custom content for the title slot.
   */
  title?: {};
}>;

export const useMenuItemSlots = Object as SlotsType<{
  /**
   * 自定义默认内容
   * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 图标插槽
   * @en Custom content for the icon slot.
   */
  icon?: {};
  /**
   * 自定义标题内容
   * @en Custom content for the title slot.
   */
  title?: {};
}>;

export type MenuSlots = typeof useMenuSlots;
export type SubMenuSlots = typeof useSubMenuSlots;
export type MenuItemSlots = typeof useMenuItemSlots;
