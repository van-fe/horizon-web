import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const MASK_VARIANTS = [
  'default',
  'weak',
  'strong',
  'inverse',
  'transparent',
  'customize',
] as const;

export type MaskVariant = (typeof MASK_VARIANTS)[number];
export type MaskOpacity = number | string;

export interface MaskCommonProps {
  /** 遮罩视觉类型。 @en Mask visual variant. */
  variant?: MaskVariant;
  /** 是否显示遮罩。 @en Whether the mask is visible. */
  visible?: boolean;
  /** 使用绝对定位覆盖最近的定位容器。 @en Uses absolute positioning within the nearest positioned container. */
  absolute?: boolean;
  /** 遮罩透明度。 @en Scrim opacity. */
  opacity?: MaskOpacity;
  /** 自定义遮罩颜色；设置后覆盖类型颜色。 @en Custom scrim color that overrides the variant color. */
  color?: string;
  /** 根层级。 @en Root stacking level. */
  zIndex?: number;
  /** 使用半透明模糊效果。 @en Uses the translucent blur treatment. */
  fuzzified?: boolean;
  /** 让内容区域占满遮罩。 @en Makes the content region fill the mask. */
  contentFullSize?: boolean;
}

export interface MaskEventMap<Event = unknown> {
  /** 点击遮罩背景。 @en Presses the scrim background. */
  maskClick: [event: Event];
}

export interface MaskRegionMap {
  /** 遮罩上方内容。 @en Content rendered above the scrim. */
  content: EmptyComponentApi;
}

export type MaskCommandMap = EmptyComponentApi;

export const MASK_DEFAULTS = Object.freeze({
  variant: 'default',
  visible: true,
  absolute: false,
  opacity: 1,
  zIndex: 1,
  fuzzified: false,
  contentFullSize: false,
} as const satisfies Required<Omit<MaskCommonProps, 'color'>>);

export function isMaskVariant(value: unknown): value is MaskVariant {
  return MASK_VARIANTS.includes(value as MaskVariant);
}

export function isMaskOpacity(value: unknown): value is MaskOpacity {
  return (
    (typeof value === 'number' && Number.isFinite(value)) ||
    (typeof value === 'string' && value.trim().length > 0)
  );
}

export function isMaskColor(value: unknown): value is string {
  return typeof value === 'string';
}

export function isMaskZIndex(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export const maskApiContract = defineComponentApiContract<
  MaskCommonProps,
  MaskEventMap,
  MaskRegionMap,
  MaskCommandMap
>({
  defaults: MASK_DEFAULTS,
  validators: {
    variant: isMaskVariant,
    opacity: isMaskOpacity,
    color: isMaskColor,
    zIndex: isMaskZIndex,
  },
});
