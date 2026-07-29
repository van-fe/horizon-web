import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useSliderCursorExposes = {
  /**
   * 更新游标位置
    * @en Controls update cursor position.
   */
  updateCursorPosition: Function as ExposeType<() => void>,
  /**
   * 更新游标值
   * @param val 确定的值
   * @paramEn val The val value.
   * @param enableCorrect 是否允许修正
   * @paramEn enableCorrect The enable correct value.
    * @en Controls update current value.
   */
  updateCurrentValue: Function as ExposeType<(val: number, enableCorrect: boolean) => void>,
};

export type SliderCursorExposes = ExtractExposeTypes<typeof useSliderCursorExposes>;
