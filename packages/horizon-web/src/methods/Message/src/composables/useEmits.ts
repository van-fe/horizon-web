export const useMessageEmits = {
  /**
   * 关闭回调
   */
  close: () => true,
  /**
   * 销毁回调
   */
  destroy: () => true,
  /**
   * 打开后回调
   * @version 2.12.12
   */
  open: () => true,

  /**
   * 完全展示后回调
   * @version 2.12.12
   */
  opened: () => true,
};

export type MessageEmits = typeof useMessageEmits;
