export const useTimePickerSlots = {
  /**
   * 前缀
   */
  prefix: () => true,
  /**
   * 后缀
   */
  suffix: () => true,
};

export type TimePickerSlots = typeof useTimePickerSlots;
