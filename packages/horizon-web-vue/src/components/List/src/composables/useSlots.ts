import type { SlotsType } from 'vue';

export const useListSlots = Object as SlotsType<{
  /**
   * 真实DOM
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 列表头部元素
    * @en Custom content for the header slot.
   */
  header?: {};
  /**
   * 	列表尾部元素
    * @en Custom content for the footer slot.
   */
  footer?: {};
  /**
   * 元素渲染插槽
   * @param val 子元素
   * @paramEn val The val value.
   * @invisible
    * @en Content slot for item.
   */
  item: { item: any[]; index: number };
}>;

export type ListSlots = typeof useListSlots;

export const useListItemSlots = Object as SlotsType<{
  /**
   * 	真实DOM
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 自定义描述title元素
    * @en Custom content for the title slot.
   */
  title?: {};
  /**
   * 列表item左侧元素，常用来放置图片
    * @en Custom content for the sider slot.
   */
  sider?: {};
  /**
   * 自定义描述元素
    * @en Custom content for the describe slot.
   */
  describe?: {};
  /**
   * 列表item右侧元素，常用来放置功能按钮等
    * @en Custom content for the right slot.
   */
  right?: {};
}>;

export type ListItemSlots = typeof useListItemSlots;
