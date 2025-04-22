import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@nio-fe/shared';

export const useAffixProps = declarePropType({
  /**
   * 偏移距离
   */
  offset: {
    type: Number,
    default: 0,
  },
  /**
   * 固钉位置
   */
  position: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'top',
  },
  /**
   * 判断偏移的容器
   * @version 2.5.2 默认改为 window 对象
   */
  target: {
    type: [String, Object] as PropType<string | HTMLElement>,
  },
  /**
   * 层级
   */
  zIndex: {
    type: Number,
  },
});

export type AffixProps = ExtractPropTypes<typeof useAffixProps>;
