import type { QRCodeRenderOptions } from '@aurora/core';
import QRCode from 'qrcode';

/** 生成 Web renderer 使用的 SVG 二维码。@en Generates SVG markup for Web renderers. */
export function generateQRCodeSvg(options: QRCodeRenderOptions): Promise<string> {
  return QRCode.toString(options.value, {
    type: 'svg',
    width: options.size,
    margin: options.margin,
    errorCorrectionLevel: options.level,
    color: { dark: options.color, light: options.background },
  });
}
