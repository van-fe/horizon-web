import type { SlotsType } from 'vue';

export const useLicensePlateInputSlots = Object as SlotsType<{
  /**
   * 车牌输入区域尾部内容
   * @en Custom content at the end of the license plate field.
   */
  suffix?: {};
}>;

export type LicensePlateInputSlots = typeof useLicensePlateInputSlots;
