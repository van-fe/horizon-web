export const useImageCropperExposes = ['crop', 'reset', 'rotate', 'canvas'] as const;
export type ImageCropperExposes = {
  /** 导出裁剪结果 @en Export the cropped image. */ crop: () => Promise<{
    blob: Blob;
    dataUrl: string;
  }>;
  /** 重置变换 @en Reset the image transform. */ reset: () => void;
  /** 旋转图片 @en Rotate the image. @param degrees 旋转角度 @paramEn degrees Rotation in degrees. */ rotate: (
    degrees?: number,
  ) => void;
  /** 画布元素 @en Canvas element. */ canvas: HTMLCanvasElement | undefined;
};
