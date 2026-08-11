import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const SKELETON_SHAPES = ['avatar', 'text', 'operate', 'image', 'picture'] as const;

export type SkeletonShape = (typeof SKELETON_SHAPES)[number];

export interface SkeletonCommonProps {
  /** 是否显示骨架内容。@en Whether placeholder content is shown. */
  loading?: boolean;
  /** 是否播放骨架动画。@en Whether placeholder animation is enabled. */
  animated?: boolean;
}

export interface SkeletonItemCommonProps {
  /** 骨架原子形状。@en Placeholder item shape. */
  shape?: SkeletonShape;
}

export type SkeletonEventMap = EmptyComponentApi;

export interface SkeletonRegionMap {
  /** 加载完成后的内容。@en Loaded content. */
  content: EmptyComponentApi;
  /** 自定义骨架模板。@en Custom placeholder template. */
  placeholder: EmptyComponentApi;
}

export type SkeletonCommandMap = EmptyComponentApi;

export const SKELETON_DEFAULTS = Object.freeze({
  loading: true,
  animated: true,
} as const satisfies Required<SkeletonCommonProps>);

export const SKELETON_ITEM_DEFAULTS = Object.freeze({
  shape: 'text',
} as const satisfies Required<SkeletonItemCommonProps>);

export function isSkeletonShape(value: unknown): value is SkeletonShape {
  return SKELETON_SHAPES.includes(value as SkeletonShape);
}

export const skeletonApiContract = defineComponentApiContract<
  SkeletonCommonProps,
  SkeletonEventMap,
  SkeletonRegionMap,
  SkeletonCommandMap
>({ defaults: SKELETON_DEFAULTS });

export const skeletonItemApiContract = defineComponentApiContract<SkeletonItemCommonProps>({
  defaults: SKELETON_ITEM_DEFAULTS,
  validators: { shape: isSkeletonShape },
});
