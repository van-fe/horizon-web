import type { ComponentEventValidators, TimeSelectEventMap } from '@aurora/core';
import { isTimeSelectValue } from '@aurora/core';
import { isBoolean } from '@aurora/utils';
import type { TimeSelectModelValue } from './useProps';

export const useTimeSelectEmits = {
  /**
   * 绑定值变更时触发
   * @param value 当前时间值
   * @paramEn value The current time value.
   * @en Emitted when the binding value changes.
   */
  'update:modelValue': (value: TimeSelectModelValue) => isTimeSelectValue(value),
  /**
   * 用户选择或清空时间后触发
   * @param value 当前时间值
   * @paramEn value The current time value.
   * @en Emitted after the user selects or clears a time.
   */
  change: (value: TimeSelectModelValue) => isTimeSelectValue(value),
  /**
   * 聚焦时触发
   * @en Emitted when the component receives focus.
   */
  focus: () => true,
  /**
   * 失焦时触发
   * @en Emitted when the component loses focus.
   */
  blur: () => true,
  /**
   * 清空时触发
   * @en Emitted when the value is cleared.
   */
  clear: () => true,
  /**
   * 下拉面板显隐变化时触发
   * @param visible 是否显示
   * @paramEn visible Whether the dropdown is visible.
   * @en Emitted when dropdown visibility changes.
   */
  dropdownVisibleChange: (visible: boolean) => isBoolean(visible),
} satisfies ComponentEventValidators<
  Omit<TimeSelectEventMap, 'openChange' | 'valueChange'> & {
    'update:modelValue': [value: TimeSelectModelValue];
    change: [value: TimeSelectModelValue];
    dropdownVisibleChange: [visible: boolean];
  }
>;

export type TimeSelectEmits = typeof useTimeSelectEmits;
