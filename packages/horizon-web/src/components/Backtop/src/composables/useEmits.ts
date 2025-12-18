export const useBacktopEmits = {
  /**
   * 点击按钮触发的事件
   * @param event 鼠标事件
   */
  click: (event: MouseEvent) => event instanceof MouseEvent,
};

export type BacktopEmits = typeof useBacktopEmits;
