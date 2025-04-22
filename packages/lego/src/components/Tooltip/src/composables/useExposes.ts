import type { ExposeType, ExtractExposeTypes } from '@nio-fe/shared';

export const useTooltipExposes = {
  /**
   * 更新 `tooltip` 位置
   */
  updateTooltip: Function as ExposeType<() => void>,
};

export type TooltipExposes = ExtractExposeTypes<typeof useTooltipExposes>;
