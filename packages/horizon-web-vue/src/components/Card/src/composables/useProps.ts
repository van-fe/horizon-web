import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useCardProps = declarePropType({
  /** 默认文字标题
   * @en Configuration for title.
 */
  title: {
    type: String,
    default: '',
  },
  /** 是否有上分割线
   * @en Configuration for top divider.
 */
  topDivider: {
    type: Boolean,
    default: false,
  },
  /** 是否有下分割线
   * @en Configuration for bottom divider.
 */
  bottomDivider: {
    type: Boolean,
    default: false,
  },
  /** 卡片圆角尺寸
   * @en Configuration for radius.
 */
  radius: {
    type: String as PropType<'small' | 'medium' | 'large' | 'none'>,
    default: 'medium',
  },
  /** 是否有边框
   * @en Configuration for border.
 */
  border: {
    type: Boolean,
    default: true,
  },
});

export type CardProps = ExtractPropTypes<typeof useCardProps>;
