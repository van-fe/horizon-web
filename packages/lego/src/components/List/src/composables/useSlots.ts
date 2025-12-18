import type { SlotsType } from 'vue';

export const useListSlots = Object as SlotsType<{
  /**
   * 真实DOM
   */
  default?: {};
  /**
   * 列表头部元素
   */
  header?: {};
  /**
   * 	列表尾部元素
   */
  footer?: {};
  /**
   * 元素渲染插槽
   * @param val 子元素
   * @invisible
   */
  item: { item: any[]; index: number };
}>;

export type ListSlots = typeof useListSlots;

export const useListItemSlots = Object as SlotsType<{
  /**
   * 	真实DOM
   */
  default?: {};
  /**
   * 自定义描述title元素
   */
  title?: {};
  /**
   * 列表item左侧元素，常用来放置图片
   */
  sider?: {};
  /**
   * 自定义描述元素
   */
  describe?: {};
  /**
   * 列表item右侧元素，常用来放置功能按钮等
   */
  right?: {};
}>;

export type ListItemSlots = typeof useListItemSlots;
