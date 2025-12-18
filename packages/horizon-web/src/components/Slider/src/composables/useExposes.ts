import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useSliderCursorExposes = {
  /**
   * 更新游标位置
   */
  updateCursorPosition: Function as ExposeType<() => void>,
  /**
   * 更新游标值
   * @param val 确定的值
   * @param enableCorrect 是否允许修正
   */
  updateCurrentValue: Function as ExposeType<(val: number, enableCorrect: boolean) => void>,
};

export type SliderCursorExposes = ExtractExposeTypes<typeof useSliderCursorExposes>;
