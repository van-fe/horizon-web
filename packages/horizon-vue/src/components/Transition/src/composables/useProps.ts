import type { BaseTransitionProps, ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useTransitionProps = declarePropType({
  /**
   * 动画名称
    * @en Configuration for name.
   */
  name: {
    type: String as PropType<
      | 'fade-in'
      | 'fade-in-linear'
      | 'zoom-in-center'
      | 'zoom-in-top'
      | 'zoom-in-bottom'
      | 'zoom-in-left'
      | 'collapse'
      | 'collapse-horizontal'
      | 'float'
      | 'slide-up'
      | 'slide-right'
      | 'slide-down'
      | 'slide-left'
      | 'dropdown'
      | 'tooltip'
      | 'none'
    >,
    default: 'fade-in',
  },
  /**
   * 是否是群组动画
    * @en Configuration for group.
   */
  group: {
    type: Boolean,
    default: false,
  },
  /**
   * 动画速度
   * `dropdown` 有自带速度控制，无法自定义
    * @en Configuration for speed.
   */
  speed: {
    type: String as PropType<'normal' | 'fast' | 'slow' | 'extra-fast'>,
    default: 'normal',
  },
  /**
   * 出现时过渡
    * @en Configuration for appear.
   */
  appear: {
    type: Boolean,
  },
  /**
   * 是否显式地向 `Vue` 表明可以跳过对 `CSS` 过渡的自动探测
    * @en Configuration for css.
   */
  css: {
    type: Boolean,
  },
  /**
   * 模式
   * `group = true` 下无效
    * @en Configuration for mode.
   */
  mode: {
    type: String as PropType<BaseTransitionProps['mode']>,
  },
  /**
   * 持久化
    * @en Configuration for persisted.
   */
  persisted: {
    type: Boolean as PropType<BaseTransitionProps['persisted']>,
  },
});

export type TransitionProps = ExtractPropTypes<typeof useTransitionProps>;
