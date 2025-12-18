import type { SlotsType } from 'vue';

export const useDialogSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
  /**
   * 标题slot
   */
  title?: {};
  /**
   * 尾部slot
   */
  footer?: {};
}>;

export type DialogSlots = typeof useDialogSlots;
