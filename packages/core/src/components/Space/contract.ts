import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const SPACE_PRESET_SIZES = ['small', 'medium', 'large'] as const;
export const SPACE_DIRECTIONS = ['horizontal', 'vertical'] as const;
export const SPACE_ALIGNS = ['start', 'end', 'center', 'baseline'] as const;

export type SpacePresetSize = (typeof SPACE_PRESET_SIZES)[number];
export type SpaceSize = SpacePresetSize | number | string | [number, number] | [string, string];
export type SpaceDirection = (typeof SPACE_DIRECTIONS)[number];
export type SpaceAlign = (typeof SPACE_ALIGNS)[number];

export interface SpaceCommonProps {
  /** 是否占满父级宽度。@en Whether the layout fills its parent width. */
  block?: boolean;
  /** 交叉轴对齐方式。@en Cross-axis alignment. */
  align?: SpaceAlign;
  /** 预设或自定义间距。@en Preset or custom gap. */
  size?: SpaceSize;
  /** 排列方向。@en Layout direction. */
  direction?: SpaceDirection;
  /** 水平排列时是否换行。@en Whether a horizontal layout may wrap. */
  wrap?: boolean;
}

export type SpaceEventMap = EmptyComponentApi;

export interface SpaceRegionMap {
  /** 被排列的内容。@en Arranged content. */
  content: EmptyComponentApi;
  /** 项目之间的分隔内容。@en Separator content between items. */
  separator: EmptyComponentApi;
}

export type SpaceCommandMap = EmptyComponentApi;

export const SPACE_DEFAULTS = Object.freeze({
  block: false,
  size: 'medium',
  direction: 'horizontal',
  wrap: false,
} as const satisfies Required<Omit<SpaceCommonProps, 'align'>>);

export function isSpacePresetSize(value: unknown): value is SpacePresetSize {
  return SPACE_PRESET_SIZES.includes(value as SpacePresetSize);
}

export function isSpaceDirection(value: unknown): value is SpaceDirection {
  return SPACE_DIRECTIONS.includes(value as SpaceDirection);
}

export function isSpaceAlign(value: unknown): value is SpaceAlign {
  return SPACE_ALIGNS.includes(value as SpaceAlign);
}

export function isSpaceSize(value: unknown): value is SpaceSize {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    (Array.isArray(value) &&
      value.length === 2 &&
      value.every(item => typeof item === 'string' || typeof item === 'number'))
  );
}

export const spaceApiContract = defineComponentApiContract<
  SpaceCommonProps,
  SpaceEventMap,
  SpaceRegionMap,
  SpaceCommandMap
>({
  defaults: SPACE_DEFAULTS,
  validators: {
    align: isSpaceAlign,
    size: isSpaceSize,
    direction: isSpaceDirection,
  },
});
