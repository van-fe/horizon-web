import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const AVATAR_PRESET_SIZES = ['mini', 'small', 'smedium', 'medium', 'large'] as const;
export const AVATAR_FITS = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const;
export const AVATAR_TYPES = ['normal', 'work'] as const;

export type AvatarPresetSize = (typeof AVATAR_PRESET_SIZES)[number];
export type AvatarSize = AvatarPresetSize | number;
export type AvatarFit = (typeof AVATAR_FITS)[number];
export type AvatarType = (typeof AVATAR_TYPES)[number];

export interface AvatarCommonProps {
  /** 头像尺寸。@en Avatar size. */
  size?: AvatarSize;
  /** 图片、文字或组合图片来源。@en Image, text, or group-image source. */
  src?: string | readonly string[];
  /** 图片适应方式。@en Image fitting mode. */
  fit?: AvatarFit;
  /** 头像展示类型。@en Avatar presentation type. */
  type?: AvatarType;
  /** 图片失败后的兜底地址。@en Fallback URL after an image error. */
  fallbackSrc?: string;
}

export interface AvatarEventMap<NativeErrorEvent = unknown> {
  /** 图片加载失败事件。@en Image loading error event. */
  error: [event: NativeErrorEvent];
}

export interface AvatarRegionMap {
  /** 自定义主体内容。@en Custom primary content. */
  content: EmptyComponentApi;
  /** 图片失败后的内容。@en Content shown after an image error. */
  fallback: EmptyComponentApi;
}

export type AvatarCommandMap = EmptyComponentApi;

export const AVATAR_DEFAULTS = Object.freeze({
  size: 'medium',
  fit: 'cover',
  type: 'normal',
  fallbackSrc: 'https://cdn-app.example.com/horizon-web/defaultAvatar.jpg',
} as const satisfies Required<Omit<AvatarCommonProps, 'src'>>);

export function isAvatarSize(value: unknown): value is AvatarSize {
  return typeof value === 'number' || AVATAR_PRESET_SIZES.includes(value as AvatarPresetSize);
}

export function isAvatarFit(value: unknown): value is AvatarFit {
  return AVATAR_FITS.includes(value as AvatarFit);
}

export function isAvatarType(value: unknown): value is AvatarType {
  return AVATAR_TYPES.includes(value as AvatarType);
}

export const avatarApiContract = defineComponentApiContract<
  AvatarCommonProps,
  AvatarEventMap,
  AvatarRegionMap,
  AvatarCommandMap
>({
  defaults: AVATAR_DEFAULTS,
  validators: {
    size: isAvatarSize,
    fit: isAvatarFit,
    type: isAvatarType,
  },
});
