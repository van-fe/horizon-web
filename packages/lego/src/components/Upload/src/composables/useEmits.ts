import type { UploadHelperFile } from '@nio-fe/upload-helper';
import { isObject } from '@nio-fe/shared';

const uploadEmits = {
  /**
   *  更新 `modelValue`
   */
  'update:modelValue': (value: UploadHelperFile[]) => Array.isArray(value),
  /**
   * 选择的上传文件变更
   * @param files 变更的文件列表
   */
  change: (files: FileList | File[] | null) =>
    files instanceof FileList || Array.isArray(files) || files === null,
  /**
   * 选择的文件超过上传数量限制
   * @param files 超出上限的文件
   */
  overLimited: (files: FileList | File[]) => files instanceof FileList || Array.isArray(files),
  /**
   * 失焦时触发
   * @param evt 失焦事件
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
};

export const useUploadPreviewItemEmits = {
  /**
   * 预览
   * @param file 文件信息
   */
  preview: (file: UploadHelperFile) => isObject(file),
  /**
   * 下载
   * @param file 文件信息
   */
  download: (file: UploadHelperFile) => isObject(file),
  /**
   * 恢复下载
   * @param file 文件信息
   */
  resume: (file: UploadHelperFile) => isObject(file),
  /**
   * 暂停下载
   * @param file 文件信息
   */
  pause: (file: UploadHelperFile) => isObject(file),
  /**
   * 文件删除
   * @param file 文件信息
   */
  delete: (file: UploadHelperFile) => isObject(file),
  /**
   * 重试上传
   * @param file 文件信息
   */
  retry: (file: UploadHelperFile) => isObject(file),
};

export const useUploadAreaEmits = {
  /**
   * 选择的上传文件变更
   * @param files 上传的文件
   */
  change: (files: FileList | File[] | null) =>
    files instanceof FileList || Array.isArray(files) || files === null,
};

export const useUploadEmits = { ...uploadEmits, ...useUploadPreviewItemEmits };

export type UploadEmits = typeof useUploadEmits;
export type UploadPreviewItemEmits = typeof useUploadPreviewItemEmits;
export type UploadAreaEmits = typeof useUploadAreaEmits;
