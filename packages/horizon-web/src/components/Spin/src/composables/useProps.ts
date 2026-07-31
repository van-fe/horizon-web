import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

export const useSpinProps = declarePropType({
  /**
   * 是否处于加载状态
   * @en Whether the component is loading.
   */
  spinning: {
    type: Boolean,
    default: true,
  },
  /**
   * 加载指示器尺寸
   * @en Loading indicator size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
    values: ['small', 'medium', 'large'],
  },
  /**
   * 延迟显示时间，单位毫秒
   * @en Delay before showing the indicator, in milliseconds.
   */
  delay: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0,
  },
  /**
   * 加载提示文字
   * @en Loading tip text.
   */
  tip: {
    type: String,
  },
  /**
   * 包裹内容时是否显示半透明遮罩
   * @en Whether to show a translucent mask over wrapped content.
   */
  mask: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否固定覆盖整个视口
   * @en Whether to cover the entire viewport.
   */
  fullscreen: {
    type: Boolean,
    default: false,
  },
});

export type SpinProps = ExtractPropTypes<typeof useSpinProps>;
