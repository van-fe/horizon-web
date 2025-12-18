export const useTimeEmits = {
  /**
   * 计时结束后的事件
   */
  finished: () => true,
};

export type TimeEmits = typeof useTimeEmits;
