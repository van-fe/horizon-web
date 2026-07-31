import type { SlotsType } from 'vue';

export const useTypographySlots = Object as SlotsType<{
  /**
   * 文本内容
   * @en Text content.
   */
  default?: {};
  /**
   * 文本前置内容
   * @en Content before the text.
   */
  prefix?: {};
  /**
   * 文本后置内容
   * @en Content after the text.
   */
  suffix?: {};
}>;

export type TypographySlots = typeof useTypographySlots;
