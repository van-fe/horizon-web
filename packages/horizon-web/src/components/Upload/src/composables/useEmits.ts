import type { Data } from '@aurora/utils';
import { isObject, isBoolean, isDefined, isNumber, isString, isUndefined } from '@aurora/utils';
import type { HUploadFileType } from '../utils/fileDefines';
import { isUploadFile } from '../utils/helper';

export const useUploadEmits = {
  /**
   * 选择文件后通知
   * @param files 选择的文件
   * @paramEn files The files value.
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (files: HUploadFileType[]) => Array.isArray(files),
  /**
   * 在 `useBackground` 变化时通知
   * @param value 变化后的值，
   * @paramEn value The value value.
    * @en Emitted when update:use background changes.
   */
  'update:useBackground': (value: boolean | 'popover') =>
    isBoolean(value) || (isString(value) && value === 'popover'),
  /**
   * 文件预览的通知
   * @param file 即将开始预览的文件，由 `props.beforePreview` 过滤后的文件列表
   * @paramEn file The file value.
    * @en Emitted when preview changes.
   */
  preview: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 在文件添加、上传成功、失败时会通知
   * @param file 改变的文件
   * @paramEn file The file value.
   * @param response 服务器返回信息
   * @paramEn response The response value.
    * @en Emitted when change changes.
   */
  change: (file: HUploadFileType, response?: Data) =>
    isUploadFile(file) && (isDefined(response) || isUndefined(response)),
  /**
   * 文件刚添加的通知
   * @param file 刚刚添加到上传队列的文件
   * @paramEn file The file value.
    * @en Emitted when add changes.
   */
  add: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 开始文件上传的通知
   * @param file 即将上传的文件
   * @paramEn file The file value.
    * @en Emitted when upload changes.
   */
  upload: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 文件删除的通知
   * @param file 删除的文件
   * @paramEn file The file value.
    * @en Emitted when remove changes.
   */
  remove: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 上传中的通知
   * @param file 正在上传的文件
   * @paramEn file The file value.
   * @param process 上传进度
   * @paramEn process The process value.
   * @param response 服务器返回信息
   * @paramEn response The response value.
    * @en Emitted when uploading changes.
   */
  uploading: (file: HUploadFileType, process: number, response: Data | undefined) =>
    isUploadFile(file) && isNumber(process) && (isObject(response) || isUndefined(response)),
  /**
   * 上传成功的通知
   * @param file 已上传的文件
   * @paramEn file The file value.
   * @param response 服务器返回信息
   * @paramEn response The response value.
    * @en Emitted when uploaded changes.
   */
  uploaded: (file: HUploadFileType, response: Data) =>
    isUploadFile(file) && isDefined(response),
  /**
   * 上传暂停的通知
   * @param file 暂停上传的文件
   * @paramEn file The file value.
    * @en Emitted when pause changes.
   */
  pause: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 上传继续时的通知
   * @param file 继续上传的文件
   * @paramEn file The file value.
    * @en Emitted when continue changes.
   */
  continue: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 重试时的通知
   * @param file 重试上传的文件
   * @paramEn file The file value.
    * @en Emitted when retry changes.
   */
  retry: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 上传失败的通知
   * @param file 失败的文件
   * @paramEn file The file value.
   * @param reason 失败原因
   * @paramEn reason The reason value.
   * @param response 服务器返回信息
   * @paramEn response The response value.
    * @en Emitted when fail changes.
   */
  fail: (file: HUploadFileType, reason: string, response: Data | undefined) =>
    isUploadFile(file) && isString(reason) && (isDefined(response) || isUndefined(response)),
  /**
   * 选择超出 `limit` 时触发，或 `multiple = false` 时粘贴或拖拽多个文件时触发
   * @param pickedFiles 当前选择的文件列表
   * @paramEn pickedFiles The picked files value.
   * @param existedFiles 已存在的文件
   * @paramEn existedFiles The existed files value.
    * @en Emitted when exceed changes.
   */
  exceed: (pickedFiles: HUploadFileType[], existedFiles: HUploadFileType[]) =>
    Array.isArray(pickedFiles) && Array.isArray(existedFiles),
  /**
   * 文件大小超出 `fileSizeLimit` 时
   * @param files 超出大小的文件
   * @paramEn files The files value.
    * @en Emitted when file size exceed changes.
   */
  fileSizeExceed: (files: HUploadFileType[]) => Array.isArray(files),
  /**
   * `accept` 验证失败
   * @param files 验证失败的文件
   * @paramEn files The files value.
    * @en Emitted when accept error changes.
   */
  acceptError: (files: HUploadFileType[]) => Array.isArray(files),
};

export const useUploadBackgroundEmits = {
  /**
   * 后台上传是否收起的通知
   * @param isCollapsed 是否收起
   * @paramEn isCollapsed The is collapsed value.
    * @en Emitted when update:collapsed changes.
   */
  'update:collapsed': (isCollapsed: boolean) => isBoolean(isCollapsed),
  /**
   * 用户关闭后台上传的通知
    * @en Emitted when close changes.
   */
  close: () => true,
  /**
   * 销毁时通知
    * @en Emitted when destroy changes.
   */
  destroy: () => true,
  /**
   * 文件预览的通知
   * @param file 即将开始预览的文件，由 `props.beforePreview` 过滤后的文件列表
   * @paramEn file The file value.
    * @en Emitted when preview changes.
   */
  preview: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 在文件添加、上传成功、失败时会通知
   * @param file 改变的文件
   * @paramEn file The file value.
   * @param response 服务器返回信息
   * @paramEn response The response value.
    * @en Emitted when change changes.
   */
  change: (file: HUploadFileType, response?: Data) =>
    isUploadFile(file) && (isDefined(response) || isUndefined(response)),
  /**
   * 文件刚添加的通知
   * @param file 刚刚添加到上传队列的文件
   * @paramEn file The file value.
    * @en Emitted when add changes.
   */
  add: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 开始文件上传的通知
   * @param file 即将上传的文件
   * @paramEn file The file value.
    * @en Emitted when upload changes.
   */
  upload: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 文件删除的通知
   * @param file 删除的文件
   * @paramEn file The file value.
    * @en Emitted when remove changes.
   */
  remove: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 上传中的通知
   * @param file 正在上传的文件
   * @paramEn file The file value.
   * @param process 上传进度
   * @paramEn process The process value.
   * @param response 服务器返回信息
   * @paramEn response The response value.
    * @en Emitted when uploading changes.
   */
  uploading: (file: HUploadFileType, process: number, response: Data | undefined) =>
    isUploadFile(file) && isNumber(process) && (isObject(response) || isUndefined(response)),
  /**
   * 上传成功的通知
   * @param file 已上传的文件
   * @paramEn file The file value.
   * @param response 服务器返回信息
   * @paramEn response The response value.
    * @en Emitted when uploaded changes.
   */
  uploaded: (file: HUploadFileType, response: Data) =>
    isUploadFile(file) && isDefined(response),
  /**
   * 上传暂停的通知
   * @param file 暂停上传的文件
   * @paramEn file The file value.
    * @en Emitted when pause changes.
   */
  pause: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 上传继续时的通知
   * @param file 继续上传的文件
   * @paramEn file The file value.
    * @en Emitted when continue changes.
   */
  continue: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 重试时的通知
   * @param file 重试上传的文件
   * @paramEn file The file value.
    * @en Emitted when retry changes.
   */
  retry: (file: HUploadFileType) => isUploadFile(file),
  /**
   * 上传失败的通知
   * @param file 失败的文件
   * @paramEn file The file value.
   * @param reason 失败原因
   * @paramEn reason The reason value.
   * @param response 服务器返回信息
   * @paramEn response The response value.
    * @en Emitted when fail changes.
   */
  fail: (file: HUploadFileType, reason: string, response: Data | undefined) =>
    isUploadFile(file) && isString(reason) && (isDefined(response) || isUndefined(response)),
};

export type UploadEmits = typeof useUploadEmits;
export type UploadBackgroundEmits = typeof useUploadBackgroundEmits;
