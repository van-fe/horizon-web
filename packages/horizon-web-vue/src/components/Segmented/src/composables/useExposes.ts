import type { SegmentedCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useSegmentedExposes = {
  /**
   * 聚焦当前选项
   * @en Focuses the current option.
   */
  focus: Function as ExposeType<SegmentedCommandMap['focus']>,
};

export type SegmentedExposes = ExtractExposeTypes<typeof useSegmentedExposes>;
