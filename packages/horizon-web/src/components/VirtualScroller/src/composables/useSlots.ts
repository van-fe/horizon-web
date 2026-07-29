import type { SlotsType } from 'vue';

export interface VirtualScrollerDefaultSlotRowType<T = any> {
  item: T;
  index: number;
  activated: boolean;
}

export const useVirtualScrollerItemSlots = Object as SlotsType<{
  /**
   * 自定义渲染
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export const useRecycleScrollerSlots = Object as SlotsType<{
  /**
   * 表格头部插槽
    * @en Custom content for the before slot.
   */
  before?: {};
  /**
   * 表格底部插槽
    * @en Custom content for the after slot.
   */
  after?: {};
  /**
   * 空数据时的插槽
    * @en Custom content for the empty slot.
   */
  empty?: {};
  /**
   * 用于渲染列表的 作用域插槽
   * @param row item: 属性Items中当前渲染的数据; index: 当前数据的索引值; activated: 当前渲染的item是否处于活动状态
   * @paramEn row The row value.
    * @en Custom content for the default slot.
   */
  default?: VirtualScrollerDefaultSlotRowType;
}>;

export const useVirtualScrollerSlots = Object as SlotsType<{
  /**
   * 表格头部插槽
    * @en Custom content for the before slot.
   */
  before?: {};
  /**
   * 表格底部插槽
    * @en Custom content for the after slot.
   */
  after?: {};
  /**
   * 空数据时的插槽
    * @en Custom content for the empty slot.
   */
  empty?: {};
  /**
   * 用于渲染列表的 作用域插槽
   * @param row item: 属性Items中当前渲染的数据; index: 当前数据的索引值; activated: 当前渲染的item是否处于活动状态
   * @paramEn row The row value.
    * @en Custom content for the default slot.
   */
  default?: VirtualScrollerDefaultSlotRowType;
}>;

export type VirtualScrollerSlots = typeof useVirtualScrollerSlots;
export type VirtualScrollerItemSlots = typeof useVirtualScrollerItemSlots;
export type RecycleScrollerSlots = typeof useRecycleScrollerSlots;
