import { isBoolean, isDefined } from '@nio-fe/shared';

export const useDropdownEmits = {
  /**
   * 当 `dropdown` 显隐时触发
   * @param isVisible 是否显示
   */
  visibleChange: (isVisible: boolean) => isBoolean(isVisible),
  /**
   * 指令
   * @param value 由 `dropdown-item` 的 `props.command` 传递
   * @version 2.0.5
   */
  command: (value: unknown) => isDefined(value),
  /**
   * `visible` 变化时的通知
   * @param status 是否显示
   * @version 2.0.5
   */
  'update:visible': (status: boolean) => isBoolean(status),
};

export const useDropdownItemEmits = {
  /**
   * 当点击子元素时触发
   * @param evt 鼠标事件或键盘事件
   */
  click: (evt: MouseEvent | KeyboardEvent) =>
    evt instanceof MouseEvent || evt instanceof KeyboardEvent,
};

export const useDropdownMenuEmits = {};

export const useDropdownSubmenuEmits = {
  /**
   * 当点击时触发
   * @param evt 鼠标事件或键盘事件
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
