import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType, isNumber, isString } from '@aurora/utils';

export type HSortableListItemKey = string | number;
export type HSortableListItemKeyGetter = (item: any, index: number) => HSortableListItemKey;
export type HSortableListItemDisabledGetter = (item: any, index: number) => boolean;

export const useSortableListProps = declarePropType({
  /**
   * 排序列表的数据
   * @en Data displayed by the sortable list.
   */
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  /**
   * 返回列表项稳定唯一键的字段名或函数
   * @param item 当前列表项
   * @paramEn item Current list item.
   * @param index 当前索引
   * @paramEn index Current index.
   * @en Field name or function that returns a stable unique key for each item.
   */
  itemKey: {
    type: [String, Function] as PropType<string | HSortableListItemKeyGetter>,
    required: true,
  },
  /**
   * 判断列表项是否禁用拖拽的字段名或函数
   * @param item 当前列表项
   * @paramEn item Current list item.
   * @param index 当前索引
   * @paramEn index Current index.
   * @en Field name or function that determines whether an item is disabled.
   */
  itemDisabled: {
    type: [String, Function] as PropType<string | HSortableListItemDisabledGetter>,
  },
  /**
   * 是否禁用整个排序列表
   * @en Whether the entire sortable list is disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否只能通过拖拽手柄排序
   * @en Whether dragging can start only from the drag handle.
   */
  dragOnHandler: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否在排序完成后播放位置过渡动画
   * @en Whether to animate item positions after sorting.
   */
  animated: {
    type: Boolean,
    default: true,
  },
  /**
   * 排序列表的根元素类型
   * @en Root element type of the sortable list.
   */
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div',
  },
  /**
   * 列表项的根元素类型
   * @en Root element type of each sortable item.
   */
  itemTag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div',
  },
});

export function isSortableListItemKey(value: unknown): value is HSortableListItemKey {
  return isString(value) || isNumber(value);
}

export type SortableListProps = ExtractPropTypes<typeof useSortableListProps>;
