import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@nio-fe/shared';

export const useSkeletonProps = declarePropType({
  /** 骨架屏是否显示 */
  loading: {
    type: Boolean,
    required: false,
    default: true,
  },
  /** 骨架屏是否以动画形式显示 */
  animated: {
    type: Boolean,
    required: false,
    default: true,
  },
});

export const useSkeletonItemProps = declarePropType({
  /** 原子骨架屏形状 */
  shape: {
    type: String as PropType<'avatar' | 'text' | 'operate' | 'image' | 'picture'>,
    required: true,
    default: 'text',
  },
});

export type SkeletonProps = ExtractPropTypes<typeof useSkeletonProps>;
export type SkeletonItemProps = ExtractPropTypes<typeof useSkeletonItemProps>;
