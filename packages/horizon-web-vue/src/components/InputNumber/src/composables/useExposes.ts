import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useInputNumberExposes = {
  /**
   * 获取到内部的 `input` 原生元素
    * @en Controls input number.
   */
  inputNumber: Object as ExposeType<HTMLInputElement>,
  /**
   * 增加值
    * @en Controls increase.
   */
  increase: Function as ExposeType<() => void>,
  /**
   * 减少值
    * @en Controls decrease.
   */
  decrease: Function as ExposeType<() => void>,
  /**
   * 清空
    * @en Controls clear.
   */
  clear: Function as ExposeType<() => void>,
};

export type InputNumberExposes = ExtractExposeTypes<typeof useInputNumberExposes>;
