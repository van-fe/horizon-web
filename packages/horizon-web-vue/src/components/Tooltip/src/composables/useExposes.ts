import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useTooltipExposes = {
  /**
   * 更新 `tooltip` 位置
    * @en Controls update tooltip.
   */
  updateTooltip: Function as ExposeType<() => void>,
};

export type TooltipExposes = ExtractExposeTypes<typeof useTooltipExposes>;
