import type { BaseTransitionProps, ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@nio-fe/shared';

export const useTransitionProps = declarePropType({
  /**
   * 动画名称
   * @version 2.0.5 支持 collapse-horizontal zoom-in-left; \n 2.5.4 支持 slide-*; \n 2.12.3 支持 dropdown
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
   */
  group: {
    type: Boolean,
    default: false,
  },
  /**
   * 动画速度
   * `dropdown` 有自带速度控制，无法自定义
   * @version 2.0.5
   */
  speed: {
    type: String as PropType<'normal' | 'fast' | 'slow' | 'extra-fast'>,
    default: 'normal',
  },
  /**
   * 出现时过渡
   */
  appear: {
    type: Boolean,
  },
  /**
   * 是否显式地向 `Vue` 表明可以跳过对 `CSS` 过渡的自动探测
   */
  css: {
    type: Boolean,
  },
  /**
   * 模式
   * `group = true` 下无效
   * @version 2.5.4
   */
  mode: {
    type: String as PropType<BaseTransitionProps['mode']>,
  },
  /**
   * 持久化
   * @version 2.5.4
   */
  persisted: {
    type: Boolean as PropType<BaseTransitionProps['persisted']>,
  },
});

export type TransitionProps = ExtractPropTypes<typeof useTransitionProps>;
