import type { ExtractExposeTypes, ExposeType } from '@aurora/utils';

export const useHoverExposes = {
  /**
   * 显示
    * @en Controls show.
   */
  show: Function as ExposeType<() => void>,
  /**
   * 隐藏
    * @en Controls hide.
   */
  hide: Function as ExposeType<() => void>,
};

export type HoverExposes = ExtractExposeTypes<typeof useHoverExposes>;
