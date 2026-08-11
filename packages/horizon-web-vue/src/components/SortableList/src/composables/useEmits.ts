import { isNumber } from '@aurora/utils';
import type { HSortableListItemKey } from './useProps';

export type HSortableListSortTrigger = 'drag' | 'keyboard';

export interface HSortableListSortContext {
  oldIndex: number;
  newIndex: number;
  item: any;
  list: any[];
  trigger: HSortableListSortTrigger;
}

export const useSortableListEmits = {
  /**
   * 更新排序后的列表数据
   * @param value 排序后的列表
   * @paramEn value Reordered list.
   * @en Emitted with the reordered list.
   */
  'update:modelValue': (value: any[]) => Array.isArray(value),
  /**
   * 完成一次有效排序时触发
   * @param context 排序前后索引、移动项、最新列表和触发方式
   * @paramEn context Previous and next indexes, moved item, reordered list, and trigger.
   * @en Emitted after a valid sort completes.
   */
  sort: (context: HSortableListSortContext) =>
    isNumber(context.oldIndex) &&
    isNumber(context.newIndex) &&
    Array.isArray(context.list) &&
    (context.trigger === 'drag' || context.trigger === 'keyboard'),
  /**
   * 开始拖拽列表项时触发
   * @param event 原始指针事件
   * @paramEn event Original pointer event.
   * @param item 当前列表项
   * @paramEn item Current list item.
   * @param index 当前索引
   * @paramEn index Current index.
   * @param key 当前列表项的稳定键
   * @paramEn key Stable key of the current item.
   * @en Emitted when item dragging starts.
   */
  dragStart: (event: PointerEvent, item: any, index: number, key: HSortableListItemKey) =>
    event instanceof Event && isNumber(index) && (typeof key === 'string' || isNumber(key)),
  /**
   * 结束拖拽列表项时触发
   * @param event 原始指针事件
   * @paramEn event Original pointer event.
   * @param item 当前列表项
   * @paramEn item Current list item.
   * @param index 当前索引
   * @paramEn index Current index.
   * @param key 当前列表项的稳定键
   * @paramEn key Stable key of the current item.
   * @en Emitted when item dragging ends.
   */
  dragEnd: (event: PointerEvent, item: any, index: number, key: HSortableListItemKey) =>
    event instanceof Event && isNumber(index) && (typeof key === 'string' || isNumber(key)),
};

export type SortableListEmits = typeof useSortableListEmits;
