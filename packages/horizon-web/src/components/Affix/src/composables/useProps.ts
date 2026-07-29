import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useAffixProps = declarePropType({
  /**
   * 偏移距离
    * @en Configuration for offset.
   */
  offset: {
    type: Number,
    default: 0,
  },
  /**
   * 固钉位置
    * @en Configuration for position.
   */
  position: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'top',
  },
  /**
   * 判断偏移的容器
    * @en Configuration for target.
   */
  target: {
    type: [String, Object] as PropType<string | HTMLElement>,
  },
  /**
   * 层级
    * @en Configuration for z index.
   */
  zIndex: {
    type: Number,
  },
});

export type AffixProps = ExtractPropTypes<typeof useAffixProps>;
