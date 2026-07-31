import type { SlotsType } from 'vue';

export const useLicensePlateInputSlots = Object as SlotsType<{
  /**
   * 号码输入框尾部内容
   * @en Custom content at the end of the number field.
   */
  suffix?: {};
}>;

export type LicensePlateInputSlots = typeof useLicensePlateInputSlots;
