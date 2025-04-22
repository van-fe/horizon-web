export const useDrawerSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
  /**
   * 标题 slot
   **/
  title: () => true,

  /**
   * 顶部 slot
   * @version 2.0.4
   **/
  header: () => true,

  /**
   * 底部 slot
   */
  footer: () => true,
};

export type DrawerSlots = typeof useDrawerSlots;
