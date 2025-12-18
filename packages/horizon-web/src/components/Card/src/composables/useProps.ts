import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/shared';

export const useCardProps = declarePropType({
  /** 默认文字标题 */
  title: {
    type: String,
    default: '',
  },
  /** 是否有上分割线 */
  topDivider: {
    type: Boolean,
    default: false,
  },
  /** 是否有下分割线 */
  bottomDivider: {
    type: Boolean,
    default: false,
  },
  /** 卡片圆角尺寸 */
  radius: {
    type: String as PropType<'small' | 'medium' | 'large' | 'none'>,
    default: 'medium',
  },
  /** 是否有边框 */
  border: {
    type: Boolean,
    default: true,
  },
});

export type CardProps = ExtractPropTypes<typeof useCardProps>;
