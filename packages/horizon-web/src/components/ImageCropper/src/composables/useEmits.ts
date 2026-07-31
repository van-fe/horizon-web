export interface CropperTransform {
  zoom: number;
  rotation: number;
  x: number;
  y: number;
}
export const useImageCropperEmits = {
  /** 变换变化 @en Emitted when the transform changes. @param transform 变换状态 @paramEn transform Current transform. */ change:
    (transform: CropperTransform) => Boolean(transform),
  /** 图片加载完成 @en Emitted after the image loads. */ load: () => true,
  /** 图片加载失败 @en Emitted when image loading fails. @param error 错误事件 @paramEn error Error event. */ error:
    (error: Event) => error instanceof Event,
  /** 完成裁剪 @en Emitted after cropping. @param blob 图片二进制 @paramEn blob Cropped image blob. @param dataUrl 图片地址 @paramEn dataUrl Cropped data URL. */ crop: (
    blob: Blob,
    dataUrl: string,
  ) => blob instanceof Blob && typeof dataUrl === 'string',
};
export type ImageCropperEmits = typeof useImageCropperEmits;
