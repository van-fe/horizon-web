import type { ExtractExposeTypes, ExposeType } from '@aurora/shared';

export const useHoverExposes = {
  /**
   * 显示
   */
  show: Function as ExposeType<() => void>,
  /**
   * 隐藏
   */
  hide: Function as ExposeType<() => void>,
};

export type HoverExposes = ExtractExposeTypes<typeof useHoverExposes>;
