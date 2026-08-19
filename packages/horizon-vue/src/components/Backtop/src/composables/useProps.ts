import type {
  AdaptComponentApiShape,
  BacktopCommonProps,
  ComponentRendererPropDefinitions,
} from '@aurora/core';
import { BACKTOP_DEFAULTS, isBacktopDistance } from '@aurora/core';
import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes } from 'vue';

type BacktopVueProps = AdaptComponentApiShape<
  BacktopCommonProps<string>,
  {},
  never,
  { ariaLabel?: string }
>;

export const useBacktopProps = declarePropType({
  /** 滚动高度达到此参数值才出现
   * @en Configuration for visibility height.
   */
  visibilityHeight: {
    type: Number,
    default: BACKTOP_DEFAULTS.visibilityHeight,
    validator: isBacktopDistance,
  },
  /** 控制其显示位置, 距离页面底部距离
   * @en Configuration for bottom.
   */
  bottom: {
    type: Number,
    default: BACKTOP_DEFAULTS.bottom,
    validator: isBacktopDistance,
  },
  /** 控制其显示位置, 距离页面右边距
   * @en Configuration for right.
   */
  right: {
    type: Number,
    default: BACKTOP_DEFAULTS.right,
    validator: isBacktopDistance,
  },
  /** 监听其滚动事件的元素
   * @en Configuration for target.
   */
  target: {
    type: String,
  },
  /** 无文字内容时的可访问名称。 @en Accessible name when no text is shown. */
  ariaLabel: { type: String, required: false },
} satisfies ComponentRendererPropDefinitions<BacktopVueProps>);

export type BacktopProps = ExtractPropTypes<typeof useBacktopProps>;
