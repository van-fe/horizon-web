import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const QR_CODE_LEVELS = ['L', 'M', 'Q', 'H'] as const;

export type QRCodeLevel = (typeof QR_CODE_LEVELS)[number];

export interface QRCodeCommonProps {
  /** 二维码内容。@en QR code content. */
  value: string;
  /** 二维码边长。@en QR code side length. */
  size?: number;
  /** 纠错等级。@en Error correction level. */
  level?: QRCodeLevel;
  /** 前景色。@en Foreground color. */
  color?: string;
  /** 背景色。@en Background color. */
  background?: string;
  /** 静区模块数量。@en Quiet-zone margin in modules. */
  margin?: number;
  /** 中央图标地址。@en Center icon URL. */
  icon?: string;
  /** 中央图标尺寸。@en Center icon size. */
  iconSize?: number;
  /** 二维码是否失效。@en Whether the QR code is expired. */
  expired?: boolean;
  /** 自定义失效提示。@en Custom expired message. */
  expiredText?: string;
  /** 二维码可访问名称。@en Accessible name for the QR code. */
  ariaLabel?: string;
}

export interface QRCodeEventMap<RefreshEvent = unknown> {
  /** 请求刷新失效二维码。@en Requests a refresh for an expired QR code. */
  refresh: [event: RefreshEvent];
  /** 二维码生成失败。@en QR code generation failed. */
  error: [error: unknown];
}

export interface QRCodeRegionMap {
  /** 自定义失效遮罩。@en Custom expired overlay. */
  expired: EmptyComponentApi;
}

export type QRCodeCommandMap = EmptyComponentApi;

export interface QRCodeRenderOptions {
  value: string;
  size: number;
  level: QRCodeLevel;
  color: string;
  background: string;
  margin: number;
}

export const QR_CODE_DEFAULTS = Object.freeze({
  size: 160,
  level: 'M',
  color: '#000000',
  background: '#ffffff',
  margin: 1,
  iconSize: 32,
  expired: false,
  expiredText: '',
  ariaLabel: '',
} as const satisfies Required<Omit<QRCodeCommonProps, 'icon' | 'value'>>);

export function isQRCodeLevel(value: unknown): value is QRCodeLevel {
  return QR_CODE_LEVELS.includes(value as QRCodeLevel);
}

export function isQRCodeSize(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

export function isQRCodeMargin(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

export function resolveQRCodeRenderOptions(
  props: Pick<QRCodeCommonProps, 'background' | 'color' | 'level' | 'margin' | 'size' | 'value'>,
): QRCodeRenderOptions {
  return {
    value: props.value || ' ',
    size: props.size ?? QR_CODE_DEFAULTS.size,
    level: props.level ?? QR_CODE_DEFAULTS.level,
    color: props.color ?? QR_CODE_DEFAULTS.color,
    background: props.background ?? QR_CODE_DEFAULTS.background,
    margin: props.margin ?? QR_CODE_DEFAULTS.margin,
  };
}

export const qrCodeApiContract = defineComponentApiContract<
  QRCodeCommonProps,
  QRCodeEventMap,
  QRCodeRegionMap,
  QRCodeCommandMap
>({
  defaults: QR_CODE_DEFAULTS,
  validators: {
    level: isQRCodeLevel,
    size: isQRCodeSize,
    margin: isQRCodeMargin,
    iconSize: isQRCodeSize,
  },
});
