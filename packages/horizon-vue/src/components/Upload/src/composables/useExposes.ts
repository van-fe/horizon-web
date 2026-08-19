import type { Arrayable, ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type {
  HUploadFileStatusEnum,
  HUploadFileType,
  HUploadRawFileType,
} from '../utils/fileDefines';

export const useUploadExposes = {
  /**
   * 手动添加上传文件，并开始上传
   * 添加的数据仍会受 `limit` 的限制
   * @param files 手动上传的文件列表，如果不传即立刻开始上传
   * @paramEn files The files value.
    * @en Controls upload.
   */
  upload: Function as ExposeType<(files?: HUploadRawFileType[]) => Promise<void>>,
  /**
   * 手动取消上传
   * @param files 手动取消上传的文件列表，如果不传即全部取消
   * @paramEn files The files value.
    * @en Controls abort.
   */
  abort: Function as ExposeType<(files?: HUploadFileType[]) => Promise<void>>,
  /**
   * 清空选定状态的文件
   * @param status 待清空文件的状态，如果没有指定状态，则全部清空
   * @paramEn status The status value.
    * @en Controls clear files.
   */
  clearFiles: Function as ExposeType<(status?: HUploadFileStatusEnum[]) => Promise<void>>,
  /**
   * 手动选择文件，调用后直接打开文件选择器
    * @en Controls handle select.
   */
  handleSelect: Function as ExposeType<() => void>,
  /**
   * 手动删除文件
   * @param rawFiles 待删除的文件，如果为空则全部删除
   * @paramEn rawFiles The raw files value.
    * @en Controls handle remove.
   */
  handleRemove: Function as ExposeType<(rawFiles?: HUploadRawFileType[]) => Promise<void>>,
  /**
   * 销毁和当前上传组件绑定的后台上传组件
    * @en Controls destroy background uploader.
   */
  destroyBackgroundUploader: Function as ExposeType<() => void>,
};

export const useUploadBackgroundExposes = {
  /**
   * 增加文件
    * @en Controls add file.
   */
  addFile: Function as ExposeType<(file: Arrayable<HUploadFileType>) => void>,
  /**
   * 移除文件
    * @en Controls remove file.
   */
  removeFile: Function as ExposeType<(file: HUploadFileType) => void>,
  /**
   * 切换显隐
    * @en Controls switch visible.
   */
  switchVisible: Function as ExposeType<(visible: boolean) => void>,
};

export type UploadExposes = ExtractExposeTypes<typeof useUploadExposes>;
export type UploadBackgroundExposes = ExtractExposeTypes<typeof useUploadBackgroundExposes>;
