import type { SlotsType } from 'vue';
export const useCollapseSlots = Object as SlotsType<{
  /**
   * 默认插槽，用来承放 `h-collapse-item`
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export const useCollapseItemSlots = Object as SlotsType<{
  /**
   * 折叠面板节点的内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 折叠面板节点头部的内容
    * @en Custom content for the title slot.
   */
  title?: {};
  /**
   * 折叠面板节点头部的自定义图标
    * @en Custom content for the icon slot.
   */
  icon?: {};
}>;

export type CollapseSlots = typeof useCollapseSlots;
export type CollapseItemSlots = typeof useCollapseItemSlots;
