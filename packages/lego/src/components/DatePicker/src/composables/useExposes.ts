import type { ExposeType, ExtractExposeTypes } from '@nio-fe/shared';
import type { Dayjs } from 'dayjs';

export const useDatePickerExposes = {
  /**
   * 更改面板隐藏
   */
  changePanelVisible: Function as ExposeType<(visible: boolean) => void>,
  /**
   * 增加年份
   * @param amount 增加的年份，如果需要减少，则传入负数
   */
  increaseYear: Function as ExposeType<(amount: number) => void>,
  /**
   * 增加月份
   * @param amount 增加的月份，如果需要减少，则传入负数
   */
  increaseMonth: Function as ExposeType<(amount: number) => void>,
  /**
   * 确认方法
   * @version 2.12.10
   */
  confirmHandle: Function as ExposeType<() => void>,
  /**
   * 取消方法
   * @version 2.12.10
   */
  cancelHandle: Function as ExposeType<() => void>,
  /**
   * 清除方法
   * @version 2.12.10
   */
  clearHandle: Function as ExposeType<() => void>,
  /**
   * 刷新面板显示时间
   * @version 2.12.17
   */
  refreshPanelShowDate: Function as ExposeType<() => void>,
};

export const useDatePickerDatePanelExposes = {
  /**
   * 从 `model-value` 更新当前面板时间
   */
  updateCurrentTimeFromModelValue: Function as ExposeType<() => void>,
  /**
   * 点击日期格子
   */
  clickDateCell: Function as ExposeType<
    (value: Dayjs, triggerType?: 'click' | 'input', type?: 'start' | 'end') => void
  >,
  /**
   * 点击时间格子
   */
  clickTimeCell: Function as ExposeType<
    (value: Dayjs, triggerType?: 'click' | 'input' | 'confirmable-input') => void
  >,
};

export const useDatePickerDatePanelBodyExposes = {
  /**
   * 点击时间格子
   */
  clickDateCell: Function as ExposeType<
    (value: Dayjs, triggerType?: 'click' | 'input', type?: 'start' | 'end') => boolean
  >,
  /**
   * 点击时间格子
   */
  clickTimeCell: Function as ExposeType<
    (value: Dayjs, triggerType?: 'click' | 'input' | 'confirmable-input') => boolean
  >,
};

export const useDatePickerDatePanelHeaderExposes = {
  /**
   * 点击时间格子
   */
  clickTimeCell: Function as ExposeType<
    (value: Dayjs, triggerType?: 'click' | 'input' | 'confirmable-input') => boolean
  >,
};

export const useDatePickerDatePanelComponentExposes = {
  /**
   * 点击时间格子
   */
  clickDateCell: Function as ExposeType<
    (value: Dayjs, triggerType?: 'click' | 'input', type?: 'start' | 'end') => boolean
  >,
  /**
   * 点击时间格子
   */
  clickTimeCell: Function as ExposeType<
    (value: Dayjs, triggerType?: 'click' | 'input' | 'confirmable-input') => boolean
  >,
};

export type DatePickerExposes = ExtractExposeTypes<typeof useDatePickerExposes>;
export type DatePickerDatePanelExposes = ExtractExposeTypes<
  typeof useDatePickerDatePanelExposes
>;
export type DatePickerDatePanelBodyExposes = ExtractExposeTypes<
  typeof useDatePickerDatePanelBodyExposes
>;
export type DatePickerDatePanelHeaderExposes = ExtractExposeTypes<
  typeof useDatePickerDatePanelHeaderExposes
>;
export type DatePickerDatePanelComponentExposes = ExtractExposeTypes<
  typeof useDatePickerDatePanelComponentExposes
>;
