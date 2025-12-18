import type { ExtractPropTypes } from 'vue';
import { declarePropType } from '@nio-fe/shared';

export const useBacktopProps = declarePropType({
  /** 滚动高度达到此参数值才出现 */
  visibilityHeight: {
    type: Number,
    default: 400,
  },
  /** 控制其显示位置, 距离页面底部距离 */
  bottom: {
    type: Number,
    default: 120,
  },
  /** 控制其显示位置, 距离页面右边距 */
  right: {
    type: Number,
    default: 24,
  },
  /** 监听其滚动事件的元素 */
  target: {
    type: String,
  },
});

export type BacktopProps = ExtractPropTypes<typeof useBacktopProps>;
