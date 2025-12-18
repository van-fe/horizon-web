import type { SlotsType } from 'vue';
import { ModelValueType } from './useProps';
export const useTimePickerSlots = Object as SlotsType<{
  /**
   * 默认的渲染
   */
  default?: {},
  /**
   * 前缀
   */
  prefix?: {},
  /**
   * 后缀
   */
  suffix?: {},
  /**
   * 触发器
   */
  reference?: { reference: ModelValueType },
  /**
   * 范围分隔符
   */
  rangeSeparator?: {},
  /**
   * 底部
   */
  footer?: {},
}>

export type TimePickerSlots = typeof useTimePickerSlots;
