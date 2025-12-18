import { isString } from '@aurora/shared';

export const useInputEmits = {
  /**
   *  更新 `modelValue`
   */
  'update:modelValue': (value: string) => isString(value),
  /**
   * 鼠标点击时触发
   * @param evt 鼠标事件
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 在 Input 值改变时触发
   * @param value input值
   * @param evt 输入事件
   */
  input: (value: string, evt: Event) => isString(value) && evt instanceof Event,
  /**
   * 在 Input 失去焦点且值发生变化时触发
   * @param value input值
   */
  change: (value: string) => isString(value),
  /**
   * 在 Input 获得焦点时触发
   * @param evt 聚焦事件
   */
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 在 Input 失去焦点时触发
   * @param evt 失焦事件
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 在点击由 clearable 属性生成的清空按钮时触发
   */
  clear: () => true,
  /**
   * 键盘按键按下事件
   * @param evt 键盘事件
   */
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  /**
   * 键盘按键事件
   * @param evt 键盘事件
   */
  keypress: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  /**
   * 键盘按键按下后抬起事件
   * @param evt 键盘事件
   */
  keyup: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  /**
   * 组合输入事件开始时触发，如中文拼音
   * @param evt 组合输入事件
   */
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  /**
   * 组合输入事件结束时触发，如中文拼音
   * @param evt 组合输入事件
   */
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  /**
   * 组合输入事件变化时触发，如中文拼音
   * @param evt 组合输入事件
   */
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent,
};

export type InputEmits = typeof useInputEmits;
