import type { RateCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useRateExposes = {
  /**
   * 聚焦评分控件
   * @en Focuses the rating control.
   */
  focus: Function as ExposeType<RateCommandMap['focus']>,
};

export type RateExposes = ExtractExposeTypes<typeof useRateExposes>;
