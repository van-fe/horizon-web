import type {
  AdaptComponentApiShape,
  AffixCommonProps,
  ComponentRendererPropDefinitions,
} from '@aurora/core';
import { AFFIX_DEFAULTS, isAffixOffset, isAffixPosition, isAffixZIndex } from '@aurora/core';
import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

type AffixVueProps = AdaptComponentApiShape<AffixCommonProps<string | HTMLElement>>;

export const useAffixProps = declarePropType({
  /**
   * 与目标边界之间的偏移距离，单位为像素
   * @en Offset from the target boundary in pixels.
   */
  offset: {
    type: Number,
    default: AFFIX_DEFAULTS.offset,
    validator: isAffixOffset,
  },
  /**
   * 固钉位置
   * @en Edge where the content is affixed.
   */
  position: {
    type: String as PropType<AffixVueProps['position']>,
    default: AFFIX_DEFAULTS.position,
    validator: isAffixPosition,
  },
  /**
   * 用于判断固定边界的滚动容器或选择器；选择器无匹配时回退到窗口
   * @en Scroll container or selector used as the affix boundary; unmatched selectors fall back to the window.
   */
  target: {
    type: [String, Object] as PropType<string | HTMLElement>,
  },
  /**
   * 固定状态下的层级
   * @en Z-index applied while the content is affixed.
   */
  zIndex: {
    type: Number,
    validator: isAffixZIndex,
  },
} satisfies ComponentRendererPropDefinitions<AffixVueProps>);

export type AffixProps = ExtractPropTypes<typeof useAffixProps>;
