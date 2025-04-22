import type { UploadHelperFile } from '@nio-fe/upload-helper';
import { isObject } from '@nio-fe/shared';

export const useUploadSlots = {
  /**
   * 自定义渲染内容
   */
  default: (params: { onClick: Function; disabled: boolean }) => isObject(params),
  /**
   * 透传给 `NUploadPreviewFileItem` 和 `NUploadPreviewImgItem`
   */
  content: () => true,
  /**
   * 自定义 Icon
   */
  icon: () => true,
  /**
   * 自定义文本
   */
  text: () => true,
  /**
   * 自定义操作，作用域插槽
   */
  operators: () => true,
};

export type UploadSlots = typeof useUploadSlots;

export const useUploadImageSlots = {
  /**
   * 自定义渲染内容
   */
  default: () => true,
  /**
   * 透传给 `NUploadPreviewFileItem` 和 `NUploadPreviewImgItem`
   */
  content: () => true,
  /**
   * 自定义操作，作用域插槽
   */
  operators: () => true,
};

export type UploadImageSlots = typeof useUploadImageSlots;

export const useUploadAreaSlots = {
  /**
   * 自定义 Icon
   */
  icon: () => true,
  /**
   * 自定义文本
   */
  text: () => true,
};

export type UploadAreaSlots = typeof useUploadAreaSlots;

export const useUploadPreviewFileItemSlots = {
  /**
   * 渲染内容
   */
  content: (file: UploadHelperFile) => isObject(file),
  /**
   * 自定义操作，作用域插槽
   * @param file 渲染当前文件
   */
  operators: (file: UploadHelperFile) => isObject(file),
};

export type UploadPreviewFileItemSlots = typeof useUploadPreviewFileItemSlots;

export const useUploadPreviewImgItemSlots = {
  /**
   * 渲染内容
   */
  content: (file: UploadHelperFile) => isObject(file),
  /**
   * 自定义操作，作用域插槽
   * @param file 渲染当前文件
   */
  operators: (file: UploadHelperFile) => isObject(file),
};

export type UploadPreviewImgItemSlots = typeof useUploadPreviewImgItemSlots;
