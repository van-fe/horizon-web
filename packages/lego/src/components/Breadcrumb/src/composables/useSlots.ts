export const useBreadcrumbSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
  /**
   * 分隔符
   */
  separator: () => true,
};

export type BreadcrumbSlots = typeof useBreadcrumbSlots;

export const useBreadcrumbItemSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
  /**
   * 分隔符
   */
  separator: () => true,
};

export type BreadcrumbItemSlots = typeof useBreadcrumbItemSlots;
