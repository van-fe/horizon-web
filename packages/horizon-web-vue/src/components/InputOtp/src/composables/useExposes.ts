import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useInputOtpExposes = {
  /**
   * 原生 input 元素
   * @en Native input element.
   */
  input: Object as ExposeType<HTMLInputElement>,

  /**
   * 使输入框获取焦点
   * @en Focuses the input.
   */
  focus: Function as ExposeType<() => void>,

  /**
   * 使输入框失去焦点
   * @en Blurs the input.
   */
  blur: Function as ExposeType<() => void>,

  /**
   * 选中当前验证码
   * @en Selects the current code.
   */
  select: Function as ExposeType<() => void>,

  /**
   * 清空当前验证码
   * @en Clears the current code.
   */
  clear: Function as ExposeType<() => void>,
};

export type InputOtpExposes = ExtractExposeTypes<typeof useInputOtpExposes>;
