import { isObject } from '@nio-fe/shared';

export const useListSlots = {
  /**
   * 真实DOM
   */
  default: () => true,
  /**
   * 列表头部元素
   */
  header: () => true,
  /**
   * 	列表尾部元素
   */
  footer: () => true,
  /**
   * 元素渲染插槽
   * @param val 子元素
   * @invisible
   */
  item: (val: { item: any[]; index: number }) => isObject(val),
};

export type ListSlots = typeof useListSlots;

export const useListItemSlots = {
  /**
   * 	真实DOM
   */
  default: () => true,
  /**
   * 自定义描述title元素
   */
  title: () => true,
  /**
   * 列表item左侧元素，常用来放置图片
   */
  sider: () => true,
  /**
   * 自定义描述元素
   */
  describe: () => true,
  /**
   * 列表item右侧元素，常用来放置功能按钮等
   */
  right: () => true,
};

export type ListItemSlots = typeof useListItemSlots;
