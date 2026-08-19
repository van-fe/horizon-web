import type { SlotsType } from 'vue';
export const useQRCodeSlots = Object as SlotsType<{
  /** 自定义失效遮罩 @en Custom expired overlay. */ expired?: {};
}>;
export type QRCodeSlots = typeof useQRCodeSlots;
