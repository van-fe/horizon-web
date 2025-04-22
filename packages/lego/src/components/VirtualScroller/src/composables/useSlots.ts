import { isObject } from '@nio-fe/shared';

export interface VirtualScrollerDefaultSlotRowType<T = any> {
  item: T;
  index: number;
  activated: boolean;
}

export const useVirtualScrollerItemSlots = {
  default: () => true,
};

export const useRecycleScrollerSlots = {
  /**
   * 表格头部插槽
   */
  before: () => true,
  /**
   * 表格底部插槽
   */
  after: () => true,
  /**
   * 空数据时的插槽
   */
  empty: () => true,
  /**
   * 用于渲染列表的 作用域插槽
   * @param row item: 属性Items中当前渲染的数据; index: 当前数据的索引值; activated: 当前渲染的item是否处于活动状态
   */
  default: (row: VirtualScrollerDefaultSlotRowType) => isObject(row),
};

export const useVirtualScrollerSlots = {
  /**
   * 表格头部插槽
   */
  before: () => true,
  /**
   * 表格底部插槽
   */
  after: () => true,
  /**
   * 空数据时的插槽
   */
  empty: () => true,
  /**
   * 用于渲染列表的 作用域插槽
   * @param row item: 属性Items中当前渲染的数据; index: 当前数据的索引值; activated: 当前渲染的item是否处于活动状态
   */
  default: (row: VirtualScrollerDefaultSlotRowType) => isObject(row),
};

export type VirtualScrollerSlots = typeof useVirtualScrollerSlots;
export type VirtualScrollerItemSlots = typeof useVirtualScrollerItemSlots;
export type RecycleScrollerSlots = typeof useRecycleScrollerSlots;
