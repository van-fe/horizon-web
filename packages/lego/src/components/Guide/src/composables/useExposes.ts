import type { ExposeType, ExtractExposeTypes } from '@nio-fe/shared';

export const useGuideExposes = {
  /**
   * 下一步
   */
  next: Function as ExposeType<() => void>,
  /**
   * 上一步
   */
  prev: Function as ExposeType<() => void>,
  /**
   * 关闭
   */
  close: Function as ExposeType<() => void>,
  /**
   * 隐藏
   */
  hide: Function as ExposeType<() => void>,
  /**
   * 显示
   * @param startFromFirst 是否从第一步开始，默认 `false`
   */
  show: Function as ExposeType<(startFromFirst?: boolean) => void>,
};

export const useGuideItemExposes = {
  /**
   * 关闭
   */
  close: Function as ExposeType<() => void>,
};

export type GuideExposes = ExtractExposeTypes<typeof useGuideExposes>;
export type GuideItemExposes = ExtractExposeTypes<typeof useGuideItemExposes>;
