import type { Data } from '@aurora/utils';
import { isObject, isBoolean, isDefined, isNumber, isString, isUndefined } from '@aurora/utils';
import type { NUploadFileType } from '../utils/fileDefines';
import { isUploadFile } from '../utils/helper';

export const useUploadEmits = {
  /**
   * 选择文件后通知
   * @param files 选择的文件
   */
  'update:modelValue': (files: NUploadFileType[]) => Array.isArray(files),
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
  preview: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 在文件添加、上传成功、失败时会通知
   * @param file 改变的文件
   * @param response 服务器返回信息
   */
  change: (file: NUploadFileType, response?: Data) =>
    isUploadFile(file) && (isDefined(response) || isUndefined(response)),
  /**
   * 文件刚添加的通知
   * @param file 刚刚添加到上传队列的文件
   */
  add: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 开始文件上传的通知
   * @param file 即将上传的文件
   */
  upload: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 文件删除的通知
   * @param file 删除的文件
   */
  remove: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 上传中的通知
   * @param file 正在上传的文件
   * @param process 上传进度
   * @param response 服务器返回信息
   */
  uploading: (file: NUploadFileType, process: number, response: Data | undefined) =>
    isUploadFile(file) && isNumber(process) && (isObject(response) || isUndefined(response)),
  /**
   * 上传成功的通知
   * @param file 已上传的文件
   * @param response 服务器返回信息
   */
  uploaded: (file: NUploadFileType, response: Data) =>
    isUploadFile(file) && isDefined(response),
  /**
   * 上传暂停的通知
   * @param file 暂停上传的文件
   */
  pause: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 上传继续时的通知
   * @param file 继续上传的文件
   */
  continue: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 重试时的通知
   * @param file 重试上传的文件
   */
  retry: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 上传失败的通知
   * @param file 失败的文件
   * @param reason 失败原因
   * @param response 服务器返回信息
   */
  fail: (file: NUploadFileType, reason: string, response: Data | undefined) =>
    isUploadFile(file) && isString(reason) && (isDefined(response) || isUndefined(response)),
  /**
   * 选择超出 `limit` 时触发，或 `multiple = false` 时粘贴或拖拽多个文件时触发
   * @param pickedFiles 当前选择的文件列表
   * @param existedFiles 已存在的文件
   */
  exceed: (pickedFiles: NUploadFileType[], existedFiles: NUploadFileType[]) =>
    Array.isArray(pickedFiles) && Array.isArray(existedFiles),
  /**
   * 文件大小超出 `fileSizeLimit` 时
   * @param files 超出大小的文件
   * @version 2.9.4
   */
  fileSizeExceed: (files: NUploadFileType[]) => Array.isArray(files),
  /**
   * `accept` 验证失败
   * @param files 验证失败的文件
   * @version 2.9.4
   */
  acceptError: (files: NUploadFileType[]) => Array.isArray(files),
};

export const useUploadBackgroundEmits = {
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
  preview: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 在文件添加、上传成功、失败时会通知
   * @param file 改变的文件
   * @param response 服务器返回信息
   * @version 2.11.6
   */
  change: (file: NUploadFileType, response?: Data) =>
    isUploadFile(file) && (isDefined(response) || isUndefined(response)),
  /**
   * 文件刚添加的通知
   * @param file 刚刚添加到上传队列的文件
   * @version 2.11.6
   */
  add: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 开始文件上传的通知
   * @param file 即将上传的文件
   * @version 2.11.6
   */
  upload: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 文件删除的通知
   * @param file 删除的文件
   * @version 2.11.6
   */
  remove: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 上传中的通知
   * @param file 正在上传的文件
   * @param process 上传进度
   * @param response 服务器返回信息
   * @version 2.11.6
   */
  uploading: (file: NUploadFileType, process: number, response: Data | undefined) =>
    isUploadFile(file) && isNumber(process) && (isObject(response) || isUndefined(response)),
  /**
   * 上传成功的通知
   * @param file 已上传的文件
   * @param response 服务器返回信息
   * @version 2.11.6
   */
  uploaded: (file: NUploadFileType, response: Data) =>
    isUploadFile(file) && isDefined(response),
  /**
   * 上传暂停的通知
   * @param file 暂停上传的文件
   * @version 2.11.6
   */
  pause: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 上传继续时的通知
   * @param file 继续上传的文件
   * @version 2.11.6
   */
  continue: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 重试时的通知
   * @param file 重试上传的文件
   * @version 2.11.6
   */
  retry: (file: NUploadFileType) => isUploadFile(file),
  /**
   * 上传失败的通知
   * @param file 失败的文件
   * @param reason 失败原因
   * @param response 服务器返回信息
   * @version 2.11.6
   */
  fail: (file: NUploadFileType, reason: string, response: Data | undefined) =>
    isUploadFile(file) && isString(reason) && (isDefined(response) || isUndefined(response)),
};

export type UploadEmits = typeof useUploadEmits;
export type UploadBackgroundEmits = typeof useUploadBackgroundEmits;
