import { isNumber, isString, isUndefined } from '@aurora/shared';

export const usePickerEmits = {
  'update:modelValue': (value: string) => isString(value),
  /**
   * 显示时通知
   */
  show: () => true,
  /**
   * 隐藏时通知
   */
  hide: () => true,
  /**
   * 输入时通知
   * @param evt 事件
   */
  input: (evt: Event) => evt instanceof Event,
  /**
   * 点击 `Input` 时通知
   * @param evt
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 点击确定时通知
   * @param evt 鼠标点击事件
   */
  confirm: (evt?: MouseEvent) => evt instanceof MouseEvent || isUndefined(evt),
  /**
   * 点击取消时通知
   * @param evt 鼠标点击事件
   */
  cancel: (evt?: MouseEvent) => evt instanceof MouseEvent || isUndefined(evt),
  /**
   * 点击清空时通知
   * @param evt 鼠标点击事件
   */
  clear: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 聚焦时通知
   */
  focus: () => true,
  /**
   * 失焦时通知
   */
  blur: () => true,
  /**
   * 输入框聚焦时通知
   */
  inputFocus: (evt: FocusEvent) => evt instanceof Event,
  /**
   * 输入框失焦时通知
   */
  inputBlur: (evt: FocusEvent) => evt instanceof Event,
  /**
   * 键盘按下事件
   * @param evt 键盘事件
   */
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  /**
   * 组合输入法开始输入事件
   * @param evt 输入法输入事件
   */
  compositionStart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  /**
   * 组合输入法输入过程事件
   * @param evt 输入法输入事件
   */
  compositionUpdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  /**
   * 组合输入法结束输入事件
   * @param evt 输入法输入事件
   */
  compositionEnd: (evt: CompositionEvent) => evt instanceof CompositionEvent,
};

export const usePickerPureInputEmits = {
  'update:modelValue': (val: string | number) => isString(val) || isNumber(val),
  /**
   * 输入事件
   * @param evt 输入事件
   */
  input: (evt: Event) => evt instanceof Event,
  /**
   * 聚焦事件
   * @param evt 聚焦事件
   */
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 失焦事件
   * @param evt 聚焦事件
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 键盘按下事件
   * @param evt 键盘事件
   */
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  /**
   * 组合输入法开始输入事件
   * @param evt 输入法输入事件
   */
  compositionStart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  /**
   * 组合输入法输入过程事件
   * @param evt 输入法输入事件
   */
  compositionUpdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  /**
   * 组合输入法结束输入事件
   * @param evt 输入法输入事件
   */
  compositionEnd: (evt: CompositionEvent) => evt instanceof CompositionEvent,
};

export type PickerEmits = typeof usePickerEmits;
export type PickerPureInputEmits = typeof usePickerPureInputEmits;
