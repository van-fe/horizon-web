import type { ExposeType, ExtractExposeTypes } from '@aurora/shared';

export const useInputExposes = {
  /**
   * input HTMLInput
   * 如果 `type=textarea`，则返回的是textarea HTMLElement
   */
  input: Object as ExposeType<HTMLInputElement>,
  /**
   * 使 Input 失去焦点
   */
  blur: Function as ExposeType<() => void>,
  /**
   * 使 Input 获取焦点
   */
  focus: Function as ExposeType<() => void>,
  /**
   * 选中 Input 的内容
   */
  select: Function as ExposeType<() => void>,
};

export type InputExposes = ExtractExposeTypes<typeof useInputExposes>;
