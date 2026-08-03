export const useTimeEmits = {
  /**
   * 计时结束后的事件
    * @en Emitted when finished changes.
   */
  finished: () => true,
};

export type TimeEmits = typeof useTimeEmits;
