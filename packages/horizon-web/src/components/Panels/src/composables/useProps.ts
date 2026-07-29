import type { ExtractPropTypes } from 'vue';
import { declarePropType } from '@aurora/utils';

export const usePanelsProps = declarePropType({
  /** 绑定值
   * @en Configuration for model value.
 */
  modelValue: {
    type: [String, Number],
    required: true,
  },
  /** 是否开启动画效果
   * @en Configuration for animated.
 */
  animated: {
    type: Boolean,
    default: false,
  },
  /** 动画是否垂直方向
   * @en Configuration for vertical.
 */
  vertical: {
    type: Boolean,
    default: false,
  },
});

export type PanelsProps = ExtractPropTypes<typeof usePanelsProps>;

export const usePanelProps = declarePropType({
  /** 面板的名称，必须是唯一的
   * @en Configuration for name.
 */
  name: {
    type: [String, Number],
    required: true,
  },
  /** 面板是否禁用（不显示）
   * @en Configuration for disabled.
 */
  disabled: {
    type: Boolean,
    default: false,
  },
});

export type PanelProps = ExtractPropTypes<typeof usePanelProps>;
