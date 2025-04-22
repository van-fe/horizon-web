export const useCollapseSlots = {
  /**
   * 默认插槽，用来承放 `n-collapse-item`
   */
  default: () => true,
};

export const useCollapseItemSlots = {
  /**
   * 折叠面板节点的内容
   */
  default: () => true,
  /**
   * 折叠面板节点头部的内容
   */
  title: () => true,
  /**
   * 折叠面板节点头部的自定义图标
   */
  icon: () => true,
};

export type CollapseSlots = typeof useCollapseSlots;
export type CollapseItemSlots = typeof useCollapseItemSlots;
