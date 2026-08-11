import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';
export const useImageCropperProps = declarePropType({
  /** 图片地址 @en Image URL. */ src: { type: String, required: true },
  /** 裁剪区宽度 @en Crop viewport width. */ width: { type: Number, default: 400 },
  /** 裁剪区高度 @en Crop viewport height. */ height: { type: Number, default: 300 },
  /** 最小缩放倍数 @en Minimum zoom. */ minZoom: { type: Number, default: 1 },
  /** 最大缩放倍数 @en Maximum zoom. */ maxZoom: { type: Number, default: 3 },
  /** 缩放步长 @en Zoom step. */ zoomStep: { type: Number, default: 0.05 },
  /** 输出格式 @en Output image format. */ outputType: {
    type: String as PropType<'image/png' | 'image/jpeg' | 'image/webp'>,
    default: 'image/png',
  },
  /** 输出质量 @en Output image quality. */ quality: { type: Number, default: 0.92 },
  /** 跨域模式 @en Image cross-origin mode. */ crossOrigin: {
    type: String as PropType<'anonymous' | 'use-credentials'>,
    default: 'anonymous',
  },
  /** 是否允许拖动 @en Whether panning is enabled. */ movable: { type: Boolean, default: true },
  /** 是否允许滚轮缩放 @en Whether wheel zoom is enabled. */ wheelZoom: {
    type: Boolean,
    default: true,
  },
});
export type ImageCropperProps = ExtractPropTypes<typeof useImageCropperProps>;
