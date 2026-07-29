import type { SlotsType } from 'vue';
import type { HUploadFileType } from '../utils/fileDefines';

export const useUploadSlots = Object as SlotsType<{
  /**
   * 上传区域的内部渲染
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 上传 `Icon`
    * @en Custom content for the icon slot.
   */
  icon?: {};
  /**
   * 上传说明
   * `type = 'button'` 时，是"上传"文字
   * `type = 'drop'` 时，是"点击上传或将文件拖拽至此区域"文字
    * @en Custom content for the text slot.
   */
  text?: {};
  /**
   * 上传内容触发区域，会覆盖 `icon` 和 `text` 区域
    * @en Custom content for the trigger slot.
   */
  trigger?: {};
  /**
   * 上传提示
    * @en Custom content for the tips slot.
   */
  tips?: {};
  /**
   * 已上传列表，可以自定义列表的整体展示
   * @param files 已上传的文件对象数组
   * @paramEn files The files value.
    * @en Custom content for the uploaded files slot.
   */
  uploadedFiles?: HUploadFileType[];
  /**
   * 单个已上传文件的自定义展示
   * @param file 对应的文件对象
   * @paramEn file The file value.
    * @en Custom content for the file slot.
   */
  file?: HUploadFileType;
}>;

export type UploadSlots = typeof useUploadSlots;
