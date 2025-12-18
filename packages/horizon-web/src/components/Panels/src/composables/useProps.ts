import type { ExtractPropTypes } from 'vue';
import { declarePropType } from '@aurora/utils';

export const usePanelsProps = declarePropType({
  /** 绑定值 */
  modelValue: {
    type: [String, Number],
    required: true,
  },
  /** 是否开启动画效果 */
  animated: {
    type: Boolean,
    default: false,
  },
  /** 动画是否垂直方向 */
  vertical: {
    type: Boolean,
    default: false,
  },
});

export type PanelsProps = ExtractPropTypes<typeof usePanelsProps>;

export const usePanelProps = declarePropType({
  /** 面板的名称，必须是唯一的 */
  name: {
    type: [String, Number],
    required: true,
  },
  /** 面板是否禁用（不显示） */
  disabled: {
    type: Boolean,
    default: false,
  },
});

export type PanelProps = ExtractPropTypes<typeof usePanelProps>;
