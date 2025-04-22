import type { Arrayable, ExposeType, ExtractExposeTypes } from '@nio-fe/shared';
import type {
  NUploadV2FileStatusEnum,
  NUploadV2FileType,
  NUploadV2RawFileType,
} from '../utils/fileDefines';

export const useUploadV2Exposes = {
  /**
   * 手动添加上传文件，并开始上传
   * 添加的数据仍会受 `limit` 的限制
   * @param files 手动上传的文件列表，如果不传即立刻开始上传
   */
  upload: Function as ExposeType<(files?: NUploadV2FileType[]) => Promise<void>>,
  /**
   * 手动取消上传
   * @param files 手动取消上传的文件列表，如果不传即全部取消
   */
  abort: Function as ExposeType<(files?: NUploadV2FileType[]) => Promise<void>>,
  /**
   * 清空选定状态的文件
   * @param status 待清空文件的状态，如果没有指定状态，则全部清空
   */
  clearFiles: Function as ExposeType<(status?: NUploadV2FileStatusEnum[]) => Promise<void>>,
  /**
   * 手动选择文件，调用后直接打开文件选择器
   */
  handleSelect: Function as ExposeType<() => void>,
  /**
   * 手动删除文件
   * @param rawFiles 待删除的文件，如果为空则全部删除
   */
  handleRemove: Function as ExposeType<(rawFiles?: NUploadV2RawFileType[]) => Promise<void>>,
  /**
   * 销毁和当前上传组件绑定的后台上传组件
   */
  destroyBackgroundUploader: Function as ExposeType<() => void>,
};

export const useUploadV2BackgroundExposes = {
  /**
   * 增加文件
   */
  addFile: Function as ExposeType<(file: Arrayable<NUploadV2FileType>) => void>,
  /**
   * 移除文件
   */
  removeFile: Function as ExposeType<(file: NUploadV2FileType) => void>,
  /**
   * 切换显隐
   */
  switchVisible: Function as ExposeType<(visible: boolean) => void>,
};

export type UploadV2Exposes = ExtractExposeTypes<typeof useUploadV2Exposes>;
export type UploadV2BackgroundExposes = ExtractExposeTypes<typeof useUploadV2BackgroundExposes>;
