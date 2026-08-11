import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

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
  blur: Function as ExposeType<() => void>,
  /**
   * 使 Input 获取焦点
    * @en Controls focus.
   */
  focus: Function as ExposeType<() => void>,
  /**
   * 选中 Input 的内容
    * @en Controls select.
   */
  select: Function as ExposeType<() => void>,
};

export type InputExposes = ExtractExposeTypes<typeof useInputExposes>;
