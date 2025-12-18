import type { ExposeType, ExtractExposeTypes } from '@nio-fe/shared';
import type { Dayjs } from 'dayjs';

export const useTimePickerV2Exposes = {
  /**
   * @invisible
   * 点击时间格子
   * @param value 时间
   * @param triggerType 触发方式
   * @param type 设置的面板类型
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
   */
  changePanelVisible: Function as ExposeType<(visible: boolean) => void>,
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
   * 聚焦方法
   * @version 2.12.15-alpha.3
   */
  focus: Function as ExposeType<() => void>,
  /**
   * 失焦方法
   * @version 2.12.15-alpha.3
   */
  blur: Function as ExposeType<() => void>,
  /**
   * 清除方法
   * @version 2.12.15-alpha.3
   */
  clear: Function as ExposeType<() => void>,
};

export const useTimePickerV2TimePanelExposes = {
  /**
   * 从 `model-value` 更新当前面板时间
   */
  updateCurrentTimeFromModelValue: Function as ExposeType<() => void>,
  /**
   * 点击时间格子
   * @param value 时间
   * @param triggerType 触发方式
   */
  clickTimeCell: Function as ExposeType<
    (value: Dayjs, triggerType: 'click' | 'input' | 'confirmable-input') => void
  >,
};

export const useTimePickerV2TimeColumnPanelExposes = {
  /**
   * 点击时间格子
   * @param value 时间
   * @param triggerType 触发方式
   */
  clickTimeCell: Function as ExposeType<
    (value: Dayjs, triggerType: 'click' | 'input' | 'confirmable-input') => boolean
  >,
};

export type TimePickerV2Exposes = ExtractExposeTypes<typeof useTimePickerV2Exposes>;
export type TimePickerV2TimePanelExposes = ExtractExposeTypes<
  typeof useTimePickerV2TimePanelExposes
>;
export type TimePickerV2TimeColumnPanelExposes = ExtractExposeTypes<
  typeof useTimePickerV2TimeColumnPanelExposes
>;
