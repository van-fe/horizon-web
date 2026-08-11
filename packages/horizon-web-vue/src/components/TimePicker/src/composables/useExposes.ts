import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { Dayjs } from 'dayjs';

export const useTimePickerExposes = {
  /**
   * @invisible
   * 点击时间格子
   * @param value 时间
   * @paramEn value The value value.
   * @param triggerType 触发方式
   * @paramEn triggerType The trigger type value.
   * @param type 设置的面板类型
   * @paramEn type The type value.
    * @en Controls click time cell.
   */
  clickTimeCell: Function as ExposeType<
    (
      value: Dayjs,
      triggerType?: 'click' | 'input' | 'confirmable-input',
      type?: 'start' | 'end',
    ) => boolean
  >,
  /**
   * 更改面板隐藏
    * @en Controls change panel visible.
   */
  changePanelVisible: Function as ExposeType<(visible: boolean) => void>,
  /**
   * 确认方法
    * @en Controls confirm handle.
   */
  confirmHandle: Function as ExposeType<() => void>,
  /**
   * 取消方法
    * @en Controls cancel handle.
   */
  cancelHandle: Function as ExposeType<() => void>,
  /**
   * 清除方法
    * @en Controls clear handle.
   */
  clearHandle: Function as ExposeType<() => void>,
  /**
   * 聚焦方法
    * @en Controls focus.
   */
  focus: Function as ExposeType<() => void>,
  /**
   * 失焦方法
    * @en Controls blur.
   */
  blur: Function as ExposeType<() => void>,
  /**
   * 清除方法
    * @en Controls clear.
   */
  clear: Function as ExposeType<() => void>,
};

export const useTimePickerTimePanelExposes = {
  /**
   * 从 `model-value` 更新当前面板时间
    * @en Controls update current time from model value.
   */
  updateCurrentTimeFromModelValue: Function as ExposeType<() => void>,
  /**
   * 点击时间格子
   * @param value 时间
   * @paramEn value The value value.
   * @param triggerType 触发方式
   * @paramEn triggerType The trigger type value.
    * @en Controls click time cell.
   */
  clickTimeCell: Function as ExposeType<
    (value: Dayjs, triggerType: 'click' | 'input' | 'confirmable-input') => void
  >,
};

export const useTimePickerTimeColumnPanelExposes = {
  /**
   * 点击时间格子
   * @param value 时间
   * @paramEn value The value value.
   * @param triggerType 触发方式
   * @paramEn triggerType The trigger type value.
    * @en Controls click time cell.
   */
  clickTimeCell: Function as ExposeType<
    (value: Dayjs, triggerType: 'click' | 'input' | 'confirmable-input') => boolean
  >,
};

export type TimePickerExposes = ExtractExposeTypes<typeof useTimePickerExposes>;
export type TimePickerTimePanelExposes = ExtractExposeTypes<
  typeof useTimePickerTimePanelExposes
>;
export type TimePickerTimeColumnPanelExposes = ExtractExposeTypes<
  typeof useTimePickerTimeColumnPanelExposes
>;
