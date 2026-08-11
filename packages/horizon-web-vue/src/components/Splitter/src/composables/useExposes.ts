import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useSplitterExposes = {
  /**
   * 调整指定面板尺寸
   * @param index 面板索引
   * @paramEn index Panel index.
   * @param size 目标百分比
   * @paramEn size Target percentage.
   * @en Resizes a panel to a percentage.
   */
  resizeTo: Function as ExposeType<(index: number, size: number) => void>,
  /**
   * 恢复初始尺寸
   * @en Restores the initial sizes.
   */
  reset: Function as ExposeType<() => void>,
};

export type SplitterExposes = ExtractExposeTypes<typeof useSplitterExposes>;
