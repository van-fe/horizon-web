export const useDialogSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
  /**
   * 标题slot
   */
  title: () => true,
  /**
   * 尾部slot
   */
  footer: () => true,
};

export type DialogSlots = typeof useDialogSlots;
