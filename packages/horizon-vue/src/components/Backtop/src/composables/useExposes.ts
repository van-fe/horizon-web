import type { BacktopCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useBacktopExposes = {
  /** 平滑滚动到顶部。 @en Smoothly scrolls to the top. */
  scrollToTop: Function as ExposeType<BacktopCommandMap['scrollToTop']>,
  /** 聚焦返回顶部按钮。 @en Focuses the return-to-top action. */
  focus: Function as ExposeType<BacktopCommandMap['focus']>,
};

export type BacktopExposes = ExtractExposeTypes<typeof useBacktopExposes>;
