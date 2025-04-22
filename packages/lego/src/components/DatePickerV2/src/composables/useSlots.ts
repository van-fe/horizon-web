import type { NDatePickerV2DateCellType } from '../utils/types';
import { isObject } from '@nio-fe/shared';

export const useDatePickerV2Slots = {
  /**
   * 自定义日单元格内容
   * @param value 仅包括 `grid` 一个参数，内容请参考【类型定义】
   */
  default: (value: { grid: NDatePickerV2DateCellType }) => isObject(value.grid),
  /**
   * 自定义月单元格内容
   * @param value 仅包括 `grid` 一个参数，内容请参考【类型定义】
   */
  month: (value: { grid: NDatePickerV2DateCellType }) => isObject(value.grid),
  /**
   * 自定义年单元格内容
   * @param value 仅包括 `grid` 一个参数，内容请参考【类型定义】
   */
  year: (value: { grid: NDatePickerV2DateCellType }) => isObject(value.grid),
  /**
   * 时间范围分隔符
   */
  rangeSeparator: () => true,
  /**
   * 时间范围面板分隔符
   */
  rangePanelSeparator: () => true,
  /**
   * 此刻插槽，可以自定义其他的功能
   */
  showNow: () => true,
  /**
   * 自定义 `option` 面板中的顶部内容
   */
  panelHeaderRender: () => true,
  /**
   * 自定义 `option` 面板中的底部内容
   */
  panelFooterRender: () => true,
  /**
   * 自定义 `dropConfirm` 渲染内容，只有在传入 `needDropdownConfirm` 为 `true` 时生效
   */
  dropConfirmRender: () => true,
  /**
   * 自定义选择器渲染
   */
  picker: () => true,
  /**
   * 自定义选择器内部渲染
   */
  pickerInner: () => true,
  /**
   * 自定义选择器容器渲染
   */
  pickerContainer: () => true,
  /**
   * 选择器整体自定义渲染
   */
  pickerOuter: () => true,
  /**
   * 前缀插槽
   */
  prefix: () => true,
  /**
   * 后缀插槽
   */
  suffix: () => true,
};

export type DatePickerV2Slots = typeof useDatePickerV2Slots;
