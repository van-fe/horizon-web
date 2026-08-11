export const useMessageEmits = {
  /**
   * 关闭回调
   * @en Closecallback
   */
  close: () => true,
  /**
   * 销毁回调
   * @en Destroy callback
   */
  destroy: () => true,
  /**
   * 打开后回调
   * @en Description
   */
  open: () => true,

  /**
   * 完全展示后回调
   * @en Description
   */
  opened: () => true,
};

export type MessageEmits = typeof useMessageEmits;
