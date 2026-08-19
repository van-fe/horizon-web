import type { ExtractPropTypes, PropType } from 'vue';
import type { CardCommonProps, CardRadius } from '@aurora/core';
import { CARD_DEFAULTS, isCardRadius } from '@aurora/core';
import { declarePropType } from '@aurora/utils';

export const useCardProps = declarePropType({
  /** 默认文字标题
   * @en Configuration for title.
   */
  title: {
    type: String as PropType<CardCommonProps['title']>,
    default: CARD_DEFAULTS.title,
  },
  /** 是否有上分割线
   * @en Configuration for top divider.
   */
  topDivider: {
    type: Boolean,
    default: CARD_DEFAULTS.topDivider,
  },
  /** 是否有下分割线
   * @en Configuration for bottom divider.
   */
  bottomDivider: {
    type: Boolean,
    default: CARD_DEFAULTS.bottomDivider,
  },
  /** 卡片圆角尺寸
   * @en Configuration for radius.
   */
  radius: {
    type: String as PropType<CardRadius>,
    default: CARD_DEFAULTS.radius,
    validator: isCardRadius,
  },
  /** 是否有边框
   * @en Configuration for border.
   */
  border: {
    type: Boolean,
    default: CARD_DEFAULTS.border,
  },
});

export type CardProps = ExtractPropTypes<typeof useCardProps>;
