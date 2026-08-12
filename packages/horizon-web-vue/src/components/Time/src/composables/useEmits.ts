import type { ComponentEventValidators, TimeEventMap } from '@aurora/core';

export const useTimeEmits: ComponentEventValidators<TimeEventMap> = {
  /**
   * 计时结束后的事件
   * @en Emitted when finished changes.
   */
  finished: () => true,
};

export type TimeEmits = typeof useTimeEmits;
