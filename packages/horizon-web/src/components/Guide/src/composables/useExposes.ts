import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useGuideExposes = {
  /**
   * 下一步
    * @en Controls next.
   */
  next: Function as ExposeType<() => void>,
  /**
   * 上一步
    * @en Controls prev.
   */
  prev: Function as ExposeType<() => void>,
  /**
   * 关闭
    * @en Controls close.
   */
  close: Function as ExposeType<() => void>,
  /**
   * 隐藏
    * @en Controls hide.
   */
  hide: Function as ExposeType<() => void>,
  /**
   * 显示
   * @param startFromFirst 是否从第一步开始，默认 `false`
   * @paramEn startFromFirst The start from first value.
    * @en Controls show.
   */
  show: Function as ExposeType<(startFromFirst?: boolean) => void>,
};

export const useGuideItemExposes = {
  /**
   * 关闭
    * @en Controls close.
   */
  close: Function as ExposeType<() => void>,
};

export type GuideExposes = ExtractExposeTypes<typeof useGuideExposes>;
export type GuideItemExposes = ExtractExposeTypes<typeof useGuideItemExposes>;
