import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';
export const useQRCodeProps = declarePropType({
  /** 二维码内容 @en QR code content. */ value: { type: String, required: true },
  /** 尺寸 @en QR code size. */ size: { type: Number, default: 160 },
  /** 纠错等级 @en Error correction level. */ level: {
    type: String as PropType<'L' | 'M' | 'Q' | 'H'>,
    default: 'M',
  },
  /** 前景色 @en Foreground color. */ color: { type: String, default: '#000000' },
  /** 背景色 @en Background color. */ background: { type: String, default: '#ffffff' },
  /** 边距模块数 @en Quiet-zone margin in modules. */ margin: { type: Number, default: 1 },
  /** 中央图标地址 @en Center logo URL. */ icon: { type: String },
  /** 中央图标尺寸 @en Center logo size. */ iconSize: { type: Number, default: 32 },
  /** 是否失效 @en Whether the code is expired. */ expired: { type: Boolean, default: false },
  /** 失效提示 @en Expired message. */ expiredText: { type: String },
});
export type QRCodeProps = ExtractPropTypes<typeof useQRCodeProps>;
