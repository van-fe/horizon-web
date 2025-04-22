import { isUndefined, isString } from '@nio-fe/shared';

export const useImageEmits = {
  /**
   * 图片加载成功后的回调
   * @param path 图片路径
   */
  load: (path: string | undefined) => isString(path) || isUndefined(path),
  /**
   * 图片加载失败后的回调
   * @param path 图片路径
   */
  error: (path: string | undefined) => isString(path) || isUndefined(path),
};

export type ImageEmits = typeof useImageEmits;
