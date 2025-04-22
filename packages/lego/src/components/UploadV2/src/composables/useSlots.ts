import type { NUploadV2FileType } from '../utils/fileDefines';
import { isUploadV2File } from '../utils/helper';

export const useUploadV2Slots = {
  /**
   * 上传区域的内部渲染
   */
  default: () => true,
  /**
   * 上传 `Icon`
   */
  icon: () => true,
  /**
   * 上传说明
   * `type = 'button'` 时，是"上传"文字
   * `type = 'drop'` 时，是"点击上传或将文件拖拽至此区域"文字
   */
  text: () => true,
  /**
   * 上传内容触发区域，会覆盖 `icon` 和 `text` 区域
   */
  trigger: () => true,
  /**
   * 上传提示
   */
  tips: () => true,
  /**
   * 已上传列表，可以自定义列表的整体展示
   * @param files 已上传的文件对象数组
   */
  uploadedFiles: (files: NUploadV2FileType[]) => Array.isArray(files),
  /**
   * 单个已上传文件的自定义展示
   * @param file 对应的文件对象
   */
  file: (file: NUploadV2FileType) => isUploadV2File(file),
};

export type UploadV2Slots = typeof useUploadV2Slots;
