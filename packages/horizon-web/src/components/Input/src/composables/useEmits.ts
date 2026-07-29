import { isString } from '@aurora/utils';

export const useInputEmits = {
  /**
   *  更新 `modelValue`
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (value: string) => isString(value),
  /**
   * 鼠标点击时触发
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
    * @en Emitted when click changes.
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 在 Input 值改变时触发
   * @param value input值
   * @paramEn value The value value.
   * @param evt 输入事件
   * @paramEn evt The evt value.
    * @en Emitted when input changes.
   */
  input: (value: string, evt: Event) => isString(value) && evt instanceof Event,
  /**
   * 在 Input 失去焦点且值发生变化时触发
   * @param value input值
   * @paramEn value The value value.
    * @en Emitted when change changes.
   */
  change: (value: string) => isString(value),
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
   * 组合输入事件开始时触发，如中文拼音
   * @param evt 组合输入事件
   * @paramEn evt The evt value.
    * @en Emitted when compositionstart changes.
   */
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  /**
   * 组合输入事件结束时触发，如中文拼音
   * @param evt 组合输入事件
   * @paramEn evt The evt value.
    * @en Emitted when compositionupdate changes.
   */
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  /**
   * 组合输入事件变化时触发，如中文拼音
   * @param evt 组合输入事件
   * @paramEn evt The evt value.
    * @en Emitted when compositionend changes.
   */
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent,
};

export type InputEmits = typeof useInputEmits;
