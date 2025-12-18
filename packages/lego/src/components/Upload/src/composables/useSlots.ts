import type { SlotsType } from 'vue';
import type { NUploadFileType } from '../utils/fileDefines';

export const useUploadSlots = Object as SlotsType<{
  /**
   * 上传区域的内部渲染
   */
  default?: {};
  /**
   * 上传 `Icon`
   */
  icon?: {};
  /**
   * 上传说明
   * `type = 'button'` 时，是"上传"文字
   * `type = 'drop'` 时，是"点击上传或将文件拖拽至此区域"文字
   */
  text?: {};
  /**
   * 上传内容触发区域，会覆盖 `icon` 和 `text` 区域
   */
  trigger?: {};
  /**
   * 上传提示
   */
  tips?: {};
  /**
   * 已上传列表，可以自定义列表的整体展示
   * @param files 已上传的文件对象数组
   */
  uploadedFiles?: NUploadFileType[];
  /**
   * 单个已上传文件的自定义展示
   * @param file 对应的文件对象
   */
  file?: NUploadFileType;
}>;

export type UploadSlots = typeof useUploadSlots;
