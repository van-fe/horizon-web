import type { Ref } from 'vue';
import { isRef } from 'vue';

export const useMenuSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
  /**
   * 前置插槽，可以放 `logo` 等元素
   *
   * @param isCollapse 是否展开
   */
  prepend: (isCollapse: Ref<boolean>) => isRef(isCollapse),
  /**
   * 后置插槽
   * @param isCollapse 是否展开
   */
  append: (isCollapse: Ref<boolean>) => isRef(isCollapse),
};

export const useSubMenuSlots = {
  /**
   * 子标签插槽，例如 `subMenu` `menuItem`
   */
  default: () => true,
  /**
   * 图标插槽
   */
  icon: () => true,
  /**
   * 自定义标题内容
   * @version 2.0.1
   */
  title: () => true,
  /**
   * 自定义标题内容，与 `title` 相同
   * @deprecated 请改用 `title`
   */
  name: () => true,
};

export const useMenuItemSlots = {
  /**
   * 自定义默认内容
   */
  default: () => true,
  /**
   * 图标插槽
   */
  icon: () => true,
  /**
   * 自定义标题内容
   * @version 2.0.1
   */
  title: () => true,
  /**
   * 自定义标题内容，与 `title` 相同
   * @deprecated 请改用 `title`
   */
  name: () => true,
};

export type MenuSlots = typeof useMenuSlots;
export type SubMenuSlots = typeof useSubMenuSlots;
export type MenuItemSlots = typeof useMenuItemSlots;
