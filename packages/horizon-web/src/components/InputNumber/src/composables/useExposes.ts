import type { ExposeType, ExtractExposeTypes } from '@aurora/shared';

export const useInputNumberExposes = {
  /**
   * 获取到内部的 `input` 原生元素
   */
  inputNumber: Object as ExposeType<HTMLInputElement>,
  /**
   * 增加值
   */
  increase: Function as ExposeType<() => void>,
  /**
   * 减少值
   */
  decrease: Function as ExposeType<() => void>,
  /**
   * 清空
   * @version 2.1.1
   */
  clear: Function as ExposeType<() => void>,
};

export type InputNumberExposes = ExtractExposeTypes<typeof useInputNumberExposes>;
