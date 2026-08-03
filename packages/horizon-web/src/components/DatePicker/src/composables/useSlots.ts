import type { SlotsType } from 'vue';
import type { HDatePickerDateCellType } from '../utils/types';

export const useDatePickerSlots = Object as SlotsType<{
  /**
   * 自定义日单元格内容
   * @param grid 内容请参考【类型定义】
   * @paramEn grid The grid value.
    * @en Custom content for the default slot.
   */
  default?: { grid: HDatePickerDateCellType };
  /**
   * 自定义月单元格内容
   * @param grid 内容请参考【类型定义】
   * @paramEn grid The grid value.
    * @en Custom content for the month slot.
   */
  month?: { grid: HDatePickerDateCellType };
  /**
   * 自定义年单元格内容
   * @param grid 内容请参考【类型定义】
   * @paramEn grid The grid value.
    * @en Custom content for the year slot.
   */
  year?: { grid: HDatePickerDateCellType };
  /**
   * 时间范围分隔符
    * @en Custom content for the range separator slot.
   */
  rangeSeparator?: {};
  /**
   * 时间范围面板分隔符
    * @en Custom content for the range panel separator slot.
   */
  rangePanelSeparator?: {};
  /**
   * 此刻插槽，可以自定义其他的功能
    * @en Custom content for the show now slot.
   */
  showNow?: {};
  /**
   * 自定义 `option` 面板中的顶部内容
    * @en Custom content for the panel header render slot.
   */
  panelHeaderRender?: {};
  /**
   * 自定义 `option` 面板中的底部内容
    * @en Custom content for the panel footer render slot.
   */
  panelFooterRender?: {};
  /**
   * 自定义 `dropConfirm` 渲染内容，只有在传入 `needDropdownConfirm` 为 `true` 时生效
    * @en Custom content for the drop confirm render slot.
   */
  dropConfirmRender?: {};
  /**
   * 自定义选择器渲染
    * @en Custom content for the picker slot.
   */
  picker?: {};
  /**
   * 自定义选择器内部渲染
    * @en Custom content for the picker inner slot.
   */
  pickerInner?: {};
  /**
   * 自定义选择器容器渲染
    * @en Custom content for the picker container slot.
   */
  pickerContainer?: {};
  /**
   * 选择器整体自定义渲染
    * @en Custom content for the picker outer slot.
   */
  pickerOuter?: {};
  /**
   * 前缀插槽
    * @en Custom content for the prefix slot.
   */
  prefix?: {};
  /**
   * 后缀插槽
    * @en Custom content for the suffix slot.
   */
  suffix?: {};
}>;

export type DatePickerSlots = typeof useDatePickerSlots;
