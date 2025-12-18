import type { SlotsType } from 'vue';
import type { UploadHelperFile } from '@nio-fe/upload-helper';

export const useUploadSlots = Object as SlotsType<{
  /**
   * 自定义渲染内容
   * @param onClick: 点击事件
   * @param disabled: 是否禁用
   */
  default?: { onClick: () => void; disabled: boolean },
  /**
   * 透传给 `NUploadPreviewFileItem` 和 `NUploadPreviewImgItem`
   */
  content?: {},
  /**
   * 自定义 Icon
   */
  icon?: {},
  /**
   * 自定义文本
   */
  text?: {},
  /**
   * 自定义操作，作用域插槽
   */
  operators?: {},
}>

export type UploadSlots = typeof useUploadSlots;

export const useUploadImageSlots = Object as SlotsType<{
  /**
   * 自定义渲染内容
   */
  default?: {},
  /**
   * 透传给 `NUploadPreviewFileItem` 和 `NUploadPreviewImgItem`
   */
  content?: {},
  /**
   * 自定义操作，作用域插槽
   */
  operators?: {},
}>

export type UploadImageSlots = typeof useUploadImageSlots;

export const useUploadAreaSlots = Object as SlotsType<{
  /**
   * 自定义 Icon
   */
  icon?: {},
  /**
   * 自定义文本
   */
  text?: {},
}>

export type UploadAreaSlots = typeof useUploadAreaSlots;

export const useUploadPreviewFileItemSlots = Object as SlotsType<{
  /**
   * 渲染内容
   */
  content?: UploadHelperFile,
  /**
   * 自定义操作，作用域插槽
   * @param file 渲染当前文件
   */
  operators?: UploadHelperFile,
}>

export type UploadPreviewFileItemSlots = typeof useUploadPreviewFileItemSlots;

export const useUploadPreviewImgItemSlots = Object as SlotsType<{
  /**
   * 渲染内容
   */
  content?: UploadHelperFile,
  /**
   * 自定义操作，作用域插槽
   * @param file 渲染当前文件
   */
  operators?: UploadHelperFile,
}>

export type UploadPreviewImgItemSlots = typeof useUploadPreviewImgItemSlots;
