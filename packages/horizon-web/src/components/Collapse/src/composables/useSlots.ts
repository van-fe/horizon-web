import type { SlotsType } from 'vue';
export const useCollapseSlots = Object as SlotsType<{
  /**
   * 默认插槽，用来承放 `n-collapse-item`
   */
  default?: {};
}>;

export const useCollapseItemSlots = Object as SlotsType<{
  /**
   * 折叠面板节点的内容
   */
  default?: {};
  /**
   * 折叠面板节点头部的内容
   */
  title?: {};
  /**
   * 折叠面板节点头部的自定义图标
   */
  icon?: {};
}>;

export type CollapseSlots = typeof useCollapseSlots;
export type CollapseItemSlots = typeof useCollapseItemSlots;
