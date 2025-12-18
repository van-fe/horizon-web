import type { Data } from '@nio-fe/shared';
import { isObject, isBoolean, isDefined, isNumber, isString, isUndefined } from '@nio-fe/shared';
import type { NUploadV2FileType } from '../utils/fileDefines';
import { isUploadV2File } from '../utils/helper';

export const useUploadV2Emits = {
  /**
   * 选择文件后通知
   * @param files 选择的文件
   */
  'update:modelValue': (files: NUploadV2FileType[]) => Array.isArray(files),
  /**
   * 在 `useBackground` 变化时通知
   * @param value 变化后的值，
   */
  'update:useBackground': (value: boolean | 'popover') =>
    isBoolean(value) || (isString(value) && value === 'popover'),
  /**
   * 文件预览的通知
   * @param file 即将开始预览的文件，由 `props.beforePreview` 过滤后的文件列表
   */
  preview: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 在文件添加、上传成功、失败时会通知
   * @param file 改变的文件
   * @param response 服务器返回信息
   */
  change: (file: NUploadV2FileType, response?: Data) =>
    isUploadV2File(file) && (isDefined(response) || isUndefined(response)),
  /**
   * 文件刚添加的通知
   * @param file 刚刚添加到上传队列的文件
   */
  add: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 开始文件上传的通知
   * @param file 即将上传的文件
   */
  upload: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 文件删除的通知
   * @param file 删除的文件
   */
  remove: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 上传中的通知
   * @param file 正在上传的文件
   * @param process 上传进度
   * @param response 服务器返回信息
   */
  uploading: (file: NUploadV2FileType, process: number, response: Data | undefined) =>
    isUploadV2File(file) && isNumber(process) && (isObject(response) || isUndefined(response)),
  /**
   * 上传成功的通知
   * @param file 已上传的文件
   * @param response 服务器返回信息
   */
  uploaded: (file: NUploadV2FileType, response: Data) =>
    isUploadV2File(file) && isDefined(response),
  /**
   * 上传暂停的通知
   * @param file 暂停上传的文件
   */
  pause: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 上传继续时的通知
   * @param file 继续上传的文件
   */
  continue: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 重试时的通知
   * @param file 重试上传的文件
   */
  retry: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 上传失败的通知
   * @param file 失败的文件
   * @param reason 失败原因
   * @param response 服务器返回信息
   */
  fail: (file: NUploadV2FileType, reason: string, response: Data | undefined) =>
    isUploadV2File(file) && isString(reason) && (isDefined(response) || isUndefined(response)),
  /**
   * 选择超出 `limit` 时触发，或 `multiple = false` 时粘贴或拖拽多个文件时触发
   * @param pickedFiles 当前选择的文件列表
   * @param existedFiles 已存在的文件
   */
  exceed: (pickedFiles: NUploadV2FileType[], existedFiles: NUploadV2FileType[]) =>
    Array.isArray(pickedFiles) && Array.isArray(existedFiles),
  /**
   * 文件大小超出 `fileSizeLimit` 时
   * @param files 超出大小的文件
   * @version 2.9.4
   */
  fileSizeExceed: (files: NUploadV2FileType[]) => Array.isArray(files),
  /**
   * `accept` 验证失败
   * @param files 验证失败的文件
   * @version 2.9.4
   */
  acceptError: (files: NUploadV2FileType[]) => Array.isArray(files),
};

export const useUploadV2BackgroundEmits = {
  /**
   * 后台上传是否收起的通知
   * @param isCollapsed 是否收起
   */
  'update:collapsed': (isCollapsed: boolean) => isBoolean(isCollapsed),
  /**
   * 用户关闭后台上传的通知
   */
  close: () => true,
  /**
   * 销毁时通知
   */
  destroy: () => true,
  /**
   * 文件预览的通知
   * @param file 即将开始预览的文件，由 `props.beforePreview` 过滤后的文件列表
   * @version 2.11.6
   */
  preview: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 在文件添加、上传成功、失败时会通知
   * @param file 改变的文件
   * @param response 服务器返回信息
   * @version 2.11.6
   */
  change: (file: NUploadV2FileType, response?: Data) =>
    isUploadV2File(file) && (isDefined(response) || isUndefined(response)),
  /**
   * 文件刚添加的通知
   * @param file 刚刚添加到上传队列的文件
   * @version 2.11.6
   */
  add: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 开始文件上传的通知
   * @param file 即将上传的文件
   * @version 2.11.6
   */
  upload: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 文件删除的通知
   * @param file 删除的文件
   * @version 2.11.6
   */
  remove: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 上传中的通知
   * @param file 正在上传的文件
   * @param process 上传进度
   * @param response 服务器返回信息
   * @version 2.11.6
   */
  uploading: (file: NUploadV2FileType, process: number, response: Data | undefined) =>
    isUploadV2File(file) && isNumber(process) && (isObject(response) || isUndefined(response)),
  /**
   * 上传成功的通知
   * @param file 已上传的文件
   * @param response 服务器返回信息
   * @version 2.11.6
   */
  uploaded: (file: NUploadV2FileType, response: Data) =>
    isUploadV2File(file) && isDefined(response),
  /**
   * 上传暂停的通知
   * @param file 暂停上传的文件
   * @version 2.11.6
   */
  pause: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 上传继续时的通知
   * @param file 继续上传的文件
   * @version 2.11.6
   */
  continue: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 重试时的通知
   * @param file 重试上传的文件
   * @version 2.11.6
   */
  retry: (file: NUploadV2FileType) => isUploadV2File(file),
  /**
   * 上传失败的通知
   * @param file 失败的文件
   * @param reason 失败原因
   * @param response 服务器返回信息
   * @version 2.11.6
   */
  fail: (file: NUploadV2FileType, reason: string, response: Data | undefined) =>
    isUploadV2File(file) && isString(reason) && (isDefined(response) || isUndefined(response)),
};

export type UploadV2Emits = typeof useUploadV2Emits;
export type UploadV2BackgroundEmits = typeof useUploadV2BackgroundEmits;
