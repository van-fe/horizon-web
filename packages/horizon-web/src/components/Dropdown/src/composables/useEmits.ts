import { isBoolean, isDefined } from '@aurora/utils';

export const useDropdownEmits = {
  /**
   * 当 `dropdown` 显隐时触发
   * @param isVisible 是否显示
   * @paramEn isVisible The is visible value.
    * @en Emitted when visible change changes.
   */
  visibleChange: (isVisible: boolean) => isBoolean(isVisible),
  /**
   * 指令
   * @param value 由 `dropdown-item` 的 `props.command` 传递
   * @paramEn value The value value.
    * @en Emitted when command changes.
   */
  command: (value: unknown) => isDefined(value),
  /**
   * `visible` 变化时的通知
   * @param status 是否显示
   * @paramEn status The status value.
    * @en Emitted when update:visible changes.
   */
  'update:visible': (status: boolean) => isBoolean(status),
};

export const useDropdownItemEmits = {
  /**
   * 当点击子元素时触发
   * @param evt 鼠标事件或键盘事件
   * @paramEn evt The evt value.
    * @en Emitted when click changes.
   */
  click: (evt: MouseEvent | KeyboardEvent) =>
    evt instanceof MouseEvent || evt instanceof KeyboardEvent,
};

export const useDropdownMenuEmits = {};

export const useDropdownSubmenuEmits = {
  /**
   * 当点击时触发
   * @param evt 鼠标事件或键盘事件
   * @paramEn evt The evt value.
    * @en Emitted when click changes.
   */
  click: (evt: MouseEvent | KeyboardEvent) =>
    evt instanceof MouseEvent || evt instanceof KeyboardEvent,
};

export const useDropdownGroupEmits = {};

export type DropdownEmits = typeof useDropdownEmits;
export type DropdownItemEmits = typeof useDropdownItemEmits;
export type DropdownMenuEmits = typeof useDropdownMenuEmits;
export type DropdownGroupEmits = typeof useDropdownGroupEmits;
export type DropdownSubmenuEmits = typeof useDropdownSubmenuEmits;
