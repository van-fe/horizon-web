import type { RendererElement } from 'vue';
import { isDefined } from '@nio-fe/shared';

export const useTransitionEmits = {
  /**
   * 动画进入前调用
   * @param el 渲染的元素对象
   * @version 2.0.1
   */
  beforeEnter: (el: RendererElement) => isDefined(el),
  /**
   * 动画进入时调用
   * @param el 渲染的元素对象
   * @version 2.0.1
   */
  enter: (el: RendererElement) => isDefined(el),
  /**
   * 动画进入后调用
   * @param el 渲染的元素对象
   * @version 2.0.1
   */
  afterEnter: (el: RendererElement) => isDefined(el),
  /**
   * 动画离开前调用
   * @param el 渲染的元素对象
   * @version 2.0.1
   */
  beforeLeave: (el: RendererElement) => isDefined(el),
  /**
   * 动画离开时调用
   * @param el 渲染的元素对象
   * @version 2.0.1
   */
  leave: (el: RendererElement) => isDefined(el),
  /**
   * 动画离开后调用
   * @param el 渲染的元素对象
   * @version 2.0.1
   */
  afterLeave: (el: RendererElement) => isDefined(el),
};

export type TransitionEmits = typeof useTransitionEmits;
