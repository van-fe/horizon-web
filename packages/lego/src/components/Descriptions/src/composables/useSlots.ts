export const useDescriptionsSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,

  /**
   * 标题
   */
  title: () => true,
};

export type DescriptionsSlots = typeof useDescriptionsSlots;

export const useDescriptionItemSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,

  /**
   * Label 内容
   */
  label: () => true,
};

export type DescriptionItemSlots = typeof useDescriptionItemSlots;
