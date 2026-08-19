import type {
  AdaptComponentApiShape,
  ComponentRendererPropDefinitions,
  PanelCommonProps,
  PanelsCommonProps,
} from '@aurora/core';
import { isPanelsKey, PANEL_DEFAULTS, PANELS_DEFAULTS } from '@aurora/core';
import type { ExtractPropTypes } from 'vue';
import { declarePropType } from '@aurora/utils';

type PanelsVueProps = AdaptComponentApiShape<PanelsCommonProps, { value: 'modelValue' }>;

export const usePanelsProps = declarePropType({
  /**
   * 绑定值
   * @en Currently displayed panel.
   */
  modelValue: {
    type: [String, Number],
    required: true,
    validator: isPanelsKey,
  },
  /**
   * 是否开启动画效果
   * @en Whether panel switching is animated.
   */
  animated: {
    type: Boolean,
    default: PANELS_DEFAULTS.animated,
  },
  /**
   * 动画是否垂直方向
   * @en Whether switching uses vertical motion.
   */
  vertical: {
    type: Boolean,
    default: PANELS_DEFAULTS.vertical,
  },
} satisfies ComponentRendererPropDefinitions<PanelsVueProps>);

export type PanelsProps = ExtractPropTypes<typeof usePanelsProps>;

export const usePanelProps = declarePropType({
  /**
   * 面板的名称，必须是唯一的
   * @en Unique panel key.
   */
  name: {
    type: [String, Number],
    required: true,
    validator: isPanelsKey,
  },
  /**
   * 面板是否禁用（不显示）
   * @en Whether the panel is disabled and hidden.
   */
  disabled: {
    type: Boolean,
    default: PANEL_DEFAULTS.disabled,
  },
} satisfies ComponentRendererPropDefinitions<PanelCommonProps>);

export type PanelProps = ExtractPropTypes<typeof usePanelProps>;
