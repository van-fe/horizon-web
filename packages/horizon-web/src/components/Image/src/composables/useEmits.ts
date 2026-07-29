import { isUndefined, isString } from '@aurora/utils';

export const useImageEmits = {
  /**
   * 图片加载成功后的回调
   * @param path 图片路径
   * @paramEn path The path value.
    * @en Emitted when load changes.
   */
  load: (path: string | undefined) => isString(path) || isUndefined(path),
  /**
   * 图片加载失败后的回调
   * @param path 图片路径
   * @paramEn path The path value.
    * @en Emitted when error changes.
   */
  error: (path: string | undefined) => isString(path) || isUndefined(path),
};

export type ImageEmits = typeof useImageEmits;
