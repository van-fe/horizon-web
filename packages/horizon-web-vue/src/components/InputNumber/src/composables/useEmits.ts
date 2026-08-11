import { isNumber, isNil, isNull, isString } from '@aurora/utils';

export const useInputNumberEmits = {
  /**
   *  更新 `modelValue`
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (value: number | string | null | undefined) =>
    isNumber(value) || isString(value) || isNil(value),
  /**
   * 在 Input 值改变时触发
   * @param value input值
   * @paramEn value The value value.
    * @en Emitted when input changes.
   */
  input: (value: number | string | null) => isNumber(value) || isString(value) || isNull(value),
  /**
   * 在 Input 失去焦点且值发生变化时触发
   * @param value input值
   * @paramEn value The value value.
    * @en Emitted when change changes.
   */
  change: (value: number | string | null | undefined) =>
    isNumber(value) || isString(value) || isNil(value),
  /**
   * 在 Input 获得焦点时触发
   * @param evt 聚焦事件
   * @paramEn evt The evt value.
    * @en Emitted when focus changes.
   */
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 在 Input 失去焦点时触发
   * @param evt 失焦事件
   * @paramEn evt The evt value.
    * @en Emitted when blur changes.
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 在点击由 clearable 属性生成的清空按钮时触发
    * @en Emitted when clear changes.
   */
  clear: () => true,
  /**
   * 键盘按键按下事件
   * @param evt 键盘事件
   * @paramEn evt The evt value.
    * @en Emitted when keydown changes.
   */
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  /**
   * 键盘按键事件
   * @param evt 键盘事件
   * @paramEn evt The evt value.
    * @en Emitted when keypress changes.
   */
  keypress: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  /**
   * 键盘按键按下后抬起事件
   * @param evt 键盘事件
   * @paramEn evt The evt value.
    * @en Emitted when keyup changes.
   */
  keyup: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  /**
   * 鼠标滚轮事件
   * @param evt 滚轮事件
   * @paramEn evt The evt value.
    * @en Emitted when wheel changes.
   */
  wheel: (evt: WheelEvent) => evt instanceof WheelEvent,
};

export type InputNumberEmits = typeof useInputNumberEmits;
