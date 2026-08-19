import type { ExtractPropTypes, PropType } from 'vue';
import type { SkeletonShape } from '@aurora/core';
import { isSkeletonShape, SKELETON_DEFAULTS, SKELETON_ITEM_DEFAULTS } from '@aurora/core';
import { declarePropType } from '@aurora/utils';

export const useSkeletonProps = declarePropType({
  /** 骨架屏是否显示
   * @en Configuration for loading.
   */
  loading: {
    type: Boolean,
    required: false,
    default: SKELETON_DEFAULTS.loading,
  },
  /** 骨架屏是否以动画形式显示
   * @en Configuration for animated.
   */
  animated: {
    type: Boolean,
    required: false,
    default: SKELETON_DEFAULTS.animated,
  },
});

export const useSkeletonItemProps = declarePropType({
  /** 原子骨架屏形状
   * @en Configuration for shape.
   */
  shape: {
    type: String as PropType<SkeletonShape>,
    required: true,
    default: SKELETON_ITEM_DEFAULTS.shape,
    validator: isSkeletonShape,
  },
});

export type SkeletonProps = ExtractPropTypes<typeof useSkeletonProps>;
export type SkeletonItemProps = ExtractPropTypes<typeof useSkeletonItemProps>;
