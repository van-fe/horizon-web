import { isNumber, isString, isUndefined } from '@aurora/utils';

export const usePickerEmits = {
  'update:modelValue': (value: string) => isString(value),
  /**
   * 显示时通知
    * @en Emitted when show changes.
   */
  show: () => true,
  /**
   * 隐藏时通知
    * @en Emitted when hide changes.
   */
  hide: () => true,
  /**
   * 输入时通知
   * @param evt 事件
   * @paramEn evt The evt value.
    * @en Emitted when input changes.
   */
  input: (evt: Event) => evt instanceof Event,
  /**
   * 点击 `Input` 时通知
   * @param evt
    * @en Emitted when click changes.
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 点击确定时通知
   * @param evt 鼠标点击事件
   * @paramEn evt The evt value.
    * @en Emitted when confirm changes.
   */
  confirm: (evt?: MouseEvent) => evt instanceof MouseEvent || isUndefined(evt),
  /**
   * 点击取消时通知
   * @param evt 鼠标点击事件
   * @paramEn evt The evt value.
    * @en Emitted when cancel changes.
   */
  cancel: (evt?: MouseEvent) => evt instanceof MouseEvent || isUndefined(evt),
  /**
   * 点击清空时通知
   * @param evt 鼠标点击事件
   * @paramEn evt The evt value.
    * @en Emitted when clear changes.
   */
  clear: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 聚焦时通知
    * @en Emitted when focus changes.
   */
  focus: () => true,
  /**
   * 失焦时通知
    * @en Emitted when blur changes.
   */
  blur: () => true,
  /**
   * 输入框聚焦时通知
    * @en Emitted when input focus changes.
   */
  inputFocus: (evt: FocusEvent) => evt instanceof Event,
  /**
   * 输入框失焦时通知
    * @en Emitted when input blur changes.
   */
  inputBlur: (evt: FocusEvent) => evt instanceof Event,
  /**
   * 键盘按下事件
   * @param evt 键盘事件
   * @paramEn evt The evt value.
    * @en Emitted when keydown changes.
   */
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  /**
   * 组合输入法开始输入事件
   * @param evt 输入法输入事件
   * @paramEn evt The evt value.
    * @en Emitted when composition start changes.
   */
  compositionStart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  /**
   * 组合输入法输入过程事件
   * @param evt 输入法输入事件
   * @paramEn evt The evt value.
    * @en Emitted when composition update changes.
   */
  compositionUpdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  /**
   * 组合输入法结束输入事件
   * @param evt 输入法输入事件
   * @paramEn evt The evt value.
    * @en Emitted when composition end changes.
   */
  compositionEnd: (evt: CompositionEvent) => evt instanceof CompositionEvent,
};

export const usePickerPureInputEmits = {
  'update:modelValue': (val: string | number) => isString(val) || isNumber(val),
  /**
   * 输入事件
   * @param evt 输入事件
   * @paramEn evt The evt value.
    * @en Emitted when input changes.
   */
  input: (evt: Event) => evt instanceof Event,
  /**
   * 聚焦事件
   * @param evt 聚焦事件
   * @paramEn evt The evt value.
    * @en Emitted when focus changes.
   */
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 失焦事件
   * @param evt 聚焦事件
   * @paramEn evt The evt value.
    * @en Emitted when blur changes.
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 键盘按下事件
   * @param evt 键盘事件
   * @paramEn evt The evt value.
    * @en Emitted when keydown changes.
   */
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  /**
   * 组合输入法开始输入事件
   * @param evt 输入法输入事件
   * @paramEn evt The evt value.
    * @en Emitted when composition start changes.
   */
  compositionStart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  /**
   * 组合输入法输入过程事件
   * @param evt 输入法输入事件
   * @paramEn evt The evt value.
    * @en Emitted when composition update changes.
   */
  compositionUpdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  /**
   * 组合输入法结束输入事件
   * @param evt 输入法输入事件
   * @paramEn evt The evt value.
    * @en Emitted when composition end changes.
   */
  compositionEnd: (evt: CompositionEvent) => evt instanceof CompositionEvent,
};

export type PickerEmits = typeof usePickerEmits;
export type PickerPureInputEmits = typeof usePickerPureInputEmits;
