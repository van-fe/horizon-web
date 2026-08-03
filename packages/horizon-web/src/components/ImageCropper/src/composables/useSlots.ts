import type { SlotsType } from 'vue';
export const useImageCropperSlots = Object as SlotsType<{
  /** 自定义操作栏 @en Custom toolbar. */ actions?: {
    reset: () => void;
    rotate: (degrees?: number) => void;
    crop: () => Promise<void>;
  };
}>;
export type ImageCropperSlots = typeof useImageCropperSlots;
