import type { Dayjs } from 'dayjs';
import { isDayjs } from 'dayjs';
import { isBoolean, isNil, isString } from '@aurora/utils';
import type { SingleOrArrayPickerDataType } from '../utils/types';

export const useTimePickerEmits = {
  /**
   * 更新日期
   * @param val 当前选择的日期或日期范围
   * @paramEn val The val value.
   * @param triggerType 触发方式
   * @paramEn triggerType The trigger type value.
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (
    val: SingleOrArrayPickerDataType<Dayjs | string | undefined | null>,
    triggerType: 'click' | 'input' | 'confirmable-input',
  ) =>
    (isDayjs(val) || isString(val) || Array.isArray(val) || isNil(val)) &&
    ['click', 'input', 'confirmable-input'].includes(triggerType),
  /**
   * 更新预览时间
   * @param val 预览时间
   * @paramEn val The val value.
   * @invisible
    * @en Emitted when update:preview time changes.
   */
  'update:previewTime': (val: Dayjs | undefined) => isNil(val) || isDayjs(val),
  /**
   * 当 `model-value` 变化时触发
   * @param val 变化的 `model-value` 值
   * @paramEn val The val value.
    * @en Emitted when change changes.
   */
  change: (val: SingleOrArrayPickerDataType<Dayjs | string | undefined | null>) =>
    isDayjs(val) || isString(val) || Array.isArray(val) || isNil(val),
  /**
   * 当用户选择时间时触发
   * @param val 选择的日期
   * @paramEn val The val value.
   * @param type 当前选择器类型
   * @paramEn type The type value.
    * @en Emitted when pick changes.
   */
  pick: (val: Dayjs, type: 'time' | 'hour' | 'minute' | 'second') =>
    isDayjs(val) && ['time', 'hour', 'minute', 'second'].includes(type),
  /**
   * 输入时触发
   * @param val 输入的文字
   * @paramEn val The val value.
   * @param evt 输入事件
   * @paramEn evt The evt value.
    * @en Emitted when input changes.
   */
  input: (val: string, evt: Event) => isString(val) && evt instanceof Event,
  /**
   * 聚焦时触发
    * @en Emitted when focus changes.
   */
  focus: () => true,
  /**
   * 失焦时触发
    * @en Emitted when blur changes.
   */
  blur: () => true,
  /**
   * 清空时触发
    * @en Emitted when clear changes.
   */
  clear: () => true,
  /**
   * 点击确定时触发
    * @en Emitted when confirm changes.
   */
  confirm: () => true,
  /**
   * 点击取消时触发
    * @en Emitted when cancel changes.
   */
  cancel: () => true,
  /**
   * 下拉面板显隐通知
   * @param visible 是否显示
   * @paramEn visible The visible value.
    * @en Emitted when dropdown visible change changes.
   */
  dropdownVisibleChange: (visible: boolean) => isBoolean(visible),
  /**
   * 点击时触发
   * @param evt 点击事件
   * @paramEn evt The evt value.
    * @en Emitted when click changes.
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export const useTimePickerTimePanelEmit = {
  /**
   * 更新日期
   * @param val 当前值
   * @paramEn val The val value.
   * @param triggerType 触发方式
   * @paramEn triggerType The trigger type value.
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (val: Dayjs, triggerType: 'click' | 'input' | 'confirmable-input') =>
    isDayjs(val) && ['click', 'input', 'confirmable-input'].includes(triggerType),
  /**
   * 更新预览时间
   * @param val 预览时间
   * @paramEn val The val value.
   * @invisible
    * @en Emitted when update:preview time changes.
   */
  'update:previewTime': (val: Dayjs | undefined) => isNil(val) || isDayjs(val),
};

export const useTimePickerTimeColumnPanelEmit = {
  /**
   * 更新值
   * @param val 当前值
   * @paramEn val The val value.
   * @param triggerType 触发方式
   * @paramEn triggerType The trigger type value.
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (val: Dayjs, triggerType: 'click' | 'input' | 'confirmable-input') =>
    isDayjs(val) && ['click', 'input', 'confirmable-input'].includes(triggerType),
  /**
   * 更新预览时间
   * @param val 预览时间
   * @paramEn val The val value.
   * @invisible
    * @en Emitted when update:preview time changes.
   */
  'update:previewTime': (val: Dayjs | undefined) => isNil(val) || isDayjs(val),
};

export type TimePickerEmits = typeof useTimePickerEmits;
export type TimePickerTimePanelEmits = typeof useTimePickerTimePanelEmit;
export type TimePickerTimeColumnPanelEmits = typeof useTimePickerTimeColumnPanelEmit;
