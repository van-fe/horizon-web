import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useSortableListExposes = {
  /**
   * 将指定索引的列表项移动到新位置
   * @param oldIndex 原索引
   * @paramEn oldIndex Original index.
   * @param newIndex 新索引
   * @paramEn newIndex New index.
   * @en Move an item from one index to another.
   */
  move: Function as ExposeType<(oldIndex: number, newIndex: number) => void>,
};

export type SortableListExposes = ExtractExposeTypes<typeof useSortableListExposes>;
