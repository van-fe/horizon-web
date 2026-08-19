import type { SlotsType } from 'vue';

export interface HSortableListItemSlotScope {
  item: any;
  index: number;
  dragging: boolean;
  disabled: boolean;
}

export const useSortableListSlots = Object as SlotsType<{
  /**
   * 自定义列表项内容
   * @param item 当前列表项
   * @paramEn item Current list item.
   * @param index 当前索引
   * @paramEn index Current index.
   * @param dragging 当前项是否正在拖拽
   * @paramEn dragging Whether the item is being dragged.
   * @param disabled 当前项是否禁用
   * @paramEn disabled Whether the item is disabled.
   * @en Custom content for each sortable item.
   */
  item?: HSortableListItemSlotScope;
  /**
   * 自定义拖拽手柄
   * @param item 当前列表项
   * @paramEn item Current list item.
   * @param index 当前索引
   * @paramEn index Current index.
   * @param dragging 当前项是否正在拖拽
   * @paramEn dragging Whether the item is being dragged.
   * @param disabled 当前项是否禁用
   * @paramEn disabled Whether the item is disabled.
   * @en Custom drag handle content.
   */
  handle?: HSortableListItemSlotScope;
  /**
   * 列表为空时的内容
   * @en Content displayed when the list is empty.
   */
  empty?: {};
}>;

export type SortableListSlots = typeof useSortableListSlots;
