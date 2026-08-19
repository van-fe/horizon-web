import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { SliderCommandMap } from '@aurora/core';

export const useSliderExposes = {
  /** 聚焦第一个滑块。@en Focuses the first slider thumb. */
  focus: Function as ExposeType<SliderCommandMap['focus']>,
};

export type SliderExposes = ExtractExposeTypes<typeof useSliderExposes>;

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
  /** 聚焦游标。@en Focuses the slider thumb. */
  focus: Function as ExposeType<SliderCommandMap['focus']>,
};

export type SliderCursorExposes = ExtractExposeTypes<typeof useSliderCursorExposes>;
