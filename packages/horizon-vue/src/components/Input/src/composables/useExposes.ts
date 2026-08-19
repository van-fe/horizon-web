import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { InputCommandMap } from '@aurora/core';

export const useInputExposes = {
  /**
   * input HTMLInput
   * 如果 `type=textarea`，则返回的是textarea HTMLElement
   * @en Controls input.
   */
  input: Object as ExposeType<HTMLInputElement>,
  /**
   * 使 Input 失去焦点
   * @en Controls blur.
   */
  blur: Function as ExposeType<InputCommandMap['blur']>,
  /**
   * 使 Input 获取焦点
   * @en Controls focus.
   */
  focus: Function as ExposeType<InputCommandMap['focus']>,
  /**
   * 选中 Input 的内容
   * @en Controls select.
   */
  select: Function as ExposeType<InputCommandMap['select']>,
};

export type InputExposes = ExtractExposeTypes<typeof useInputExposes>;
