import type { Ref, SlotsType, VNode } from 'vue';
import type { Arrayable } from '@aurora/utils';

export const useMenuSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
  /**
   * 前置插槽，可以放 `logo` 等元素
   *
   * @param isCollapse 是否展开
   */
  prepend?: (isCollapse: Ref<boolean>) => Arrayable<VNode>;
  /**
   * 后置插槽
   * @param isCollapse 是否展开
   */
  append?: (isCollapse: Ref<boolean>) => Arrayable<VNode>;
}>;

export const useSubMenuSlots = Object as SlotsType<{
  /**
   * 子标签插槽，例如 `subMenu` `menuItem`
   */
  default?: {};
  /**
   * 图标插槽
   */
  icon?: {};
  /**
   * 自定义标题内容
   * @version 2.0.1
   */
  title?: {};
  /**
   * 自定义标题内容，与 `title` 相同
   * @deprecated 请改用 `title`
   */
  name?: {};
}>;

export const useMenuItemSlots = Object as SlotsType<{
  /**
   * 自定义默认内容
   */
  default?: {};
  /**
   * 图标插槽
   */
  icon?: {};
  /**
   * 自定义标题内容
   * @version 2.0.1
   */
  title?: {};
  /**
   * 自定义标题内容，与 `title` 相同
   * @deprecated 请改用 `title`
   */
  name?: {};
}>;

export type MenuSlots = typeof useMenuSlots;
export type SubMenuSlots = typeof useSubMenuSlots;
export type MenuItemSlots = typeof useMenuItemSlots;
