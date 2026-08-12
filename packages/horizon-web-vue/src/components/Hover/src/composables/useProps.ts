import type { ExtractPropTypes } from 'vue';
import type {
  AdaptComponentApiShape,
  ComponentRendererPropDefinitions,
  HoverCommonProps,
} from '@aurora/core';
import { HOVER_DEFAULTS, isHoverDelay } from '@aurora/core';

export type HoverVueProps = AdaptComponentApiShape<
  HoverCommonProps,
  { showDelay: 'hoverShowDelay'; hideDelay: 'hoverHideDelay' }
>;

export const useHoverProps = {
  /**
   * 是否禁用
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: HOVER_DEFAULTS.disabled,
  },
  /**
   * 鼠标进入后，hover 延迟出现的时长
   * @en Configuration for hover show delay.
   */
  hoverShowDelay: {
    type: Number,
    default: HOVER_DEFAULTS.showDelay,
    validator: isHoverDelay,
  },
  /**
   * 鼠标离开后，hover 延迟隐藏的时长
   * @en Configuration for hover hide delay.
   */
  hoverHideDelay: {
    type: Number,
    default: HOVER_DEFAULTS.hideDelay,
    validator: isHoverDelay,
  },
} satisfies ComponentRendererPropDefinitions<HoverVueProps>;

export type HoverProps = ExtractPropTypes<typeof useHoverProps>;
