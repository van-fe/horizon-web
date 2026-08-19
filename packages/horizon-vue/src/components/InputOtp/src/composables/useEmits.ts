import { isString } from '@aurora/utils';

export const useInputOtpEmits = {
  /**
   * 更新绑定的验证码
   * @param value 更新后的验证码
   * @paramEn value Updated verification code.
   * @en Emitted to update the bound verification code.
   */
  'update:modelValue': (value: string) => isString(value),

  /**
   * 输入内容时触发
   * @param value 更新后的验证码
   * @paramEn value Updated verification code.
   * @param evt 原生输入事件
   * @paramEn evt Native input event.
   * @en Emitted when the user enters content.
   */
  input: (value: string, evt: Event) => isString(value) && evt instanceof Event,

  /**
   * 原生 change 事件触发时触发
   * @param value 当前验证码
   * @paramEn value Current verification code.
   * @en Emitted when the native change event fires.
   */
  change: (value: string) => isString(value),

  /**
   * 验证码填满时触发
   * @param value 完整验证码
   * @paramEn value Complete verification code.
   * @en Emitted once when all character cells are filled.
   */
  complete: (value: string) => isString(value),

  /**
   * 粘贴内容时触发
   * @param value 经过过滤的粘贴内容
   * @paramEn value Filtered pasted content.
   * @param evt 原生粘贴事件
   * @paramEn evt Native paste event.
   * @en Emitted when content is pasted.
   */
  paste: (value: string, evt: ClipboardEvent) => isString(value) && evt instanceof Event,

  /**
   * 获得焦点时触发
   * @param evt 原生聚焦事件
   * @paramEn evt Native focus event.
   * @en Emitted when the input receives focus.
   */
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,

  /**
   * 失去焦点时触发
   * @param evt 原生失焦事件
   * @paramEn evt Native blur event.
   * @en Emitted when the input loses focus.
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
};

export type InputOtpEmits = typeof useInputOtpEmits;
