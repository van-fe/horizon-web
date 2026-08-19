import { isQRCodeLevel, isQRCodeMargin, isQRCodeSize, QR_CODE_DEFAULTS } from '@aurora/core';
import type { QRCodeCommonProps } from '@aurora/core';
import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';
export const useQRCodeProps = declarePropType({
  /** 二维码内容 @en QR code content. */ value: { type: String, required: true },
  /** 尺寸 @en QR code size. */ size: {
    type: Number,
    default: QR_CODE_DEFAULTS.size,
    validator: isQRCodeSize,
  },
  /** 纠错等级 @en Error correction level. */ level: {
    type: String as PropType<QRCodeCommonProps['level']>,
    default: QR_CODE_DEFAULTS.level,
    validator: isQRCodeLevel,
  },
  /** 前景色 @en Foreground color. */ color: { type: String, default: QR_CODE_DEFAULTS.color },
  /** 背景色 @en Background color. */ background: {
    type: String,
    default: QR_CODE_DEFAULTS.background,
  },
  /** 边距模块数 @en Quiet-zone margin in modules. */ margin: {
    type: Number,
    default: QR_CODE_DEFAULTS.margin,
    validator: isQRCodeMargin,
  },
  /** 中央图标地址 @en Center logo URL. */ icon: { type: String },
  /** 中央图标尺寸 @en Center logo size. */ iconSize: {
    type: Number,
    default: QR_CODE_DEFAULTS.iconSize,
    validator: isQRCodeSize,
  },
  /** 是否失效 @en Whether the code is expired. */ expired: {
    type: Boolean,
    default: QR_CODE_DEFAULTS.expired,
  },
  /** 失效提示 @en Expired message. */ expiredText: {
    type: String,
    default: QR_CODE_DEFAULTS.expiredText,
  },
  /** 二维码可访问名称 @en Accessible name for the QR code. */ ariaLabel: {
    type: String,
    default: QR_CODE_DEFAULTS.ariaLabel,
  },
});
export type QRCodeProps = ExtractPropTypes<typeof useQRCodeProps>;
