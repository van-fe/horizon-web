import type { ExtractPropTypes } from 'vue';

export const useHoverProps = {
  /** 是否禁用
   * @en Configuration for disabled.
 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 鼠标进入后，hover 延迟出现的时长
   * @en Configuration for hover show delay.
 */
  hoverShowDelay: {
    type: Number,
    default: 0,
  },
  /** 鼠标离开后，hover 延迟隐藏的时长
   * @en Configuration for hover hide delay.
 */
  hoverHideDelay: {
    type: Number,
    default: 0,
  },
};

export type HoverProps = ExtractPropTypes<typeof useHoverProps>;
