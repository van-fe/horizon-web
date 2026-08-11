import type { ExtractPropTypes } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useBacktopProps = declarePropType({
  /** 滚动高度达到此参数值才出现
   * @en Configuration for visibility height.
 */
  visibilityHeight: {
    type: Number,
    default: 400,
  },
  /** 控制其显示位置, 距离页面底部距离
   * @en Configuration for bottom.
 */
  bottom: {
    type: Number,
    default: 120,
  },
  /** 控制其显示位置, 距离页面右边距
   * @en Configuration for right.
 */
  right: {
    type: Number,
    default: 24,
  },
  /** 监听其滚动事件的元素
   * @en Configuration for target.
 */
  target: {
    type: String,
  },
});

export type BacktopProps = ExtractPropTypes<typeof useBacktopProps>;
