import type { RendererElement } from 'vue';
import { isDefined } from '@aurora/utils';

export const useTransitionEmits = {
  /**
   * 动画进入前调用
   * @param el 渲染的元素对象
   * @paramEn el The el value.
    * @en Emitted when before enter changes.
   */
  beforeEnter: (el: RendererElement) => isDefined(el),
  /**
   * 动画进入时调用
   * @param el 渲染的元素对象
   * @paramEn el The el value.
    * @en Emitted when enter changes.
   */
  enter: (el: RendererElement) => isDefined(el),
  /**
   * 动画进入后调用
   * @param el 渲染的元素对象
   * @paramEn el The el value.
    * @en Emitted when after enter changes.
   */
  afterEnter: (el: RendererElement) => isDefined(el),
  /**
   * 动画离开前调用
   * @param el 渲染的元素对象
   * @paramEn el The el value.
    * @en Emitted when before leave changes.
   */
  beforeLeave: (el: RendererElement) => isDefined(el),
  /**
   * 动画离开时调用
   * @param el 渲染的元素对象
   * @paramEn el The el value.
    * @en Emitted when leave changes.
   */
  leave: (el: RendererElement) => isDefined(el),
  /**
   * 动画离开后调用
   * @param el 渲染的元素对象
   * @paramEn el The el value.
    * @en Emitted when after leave changes.
   */
  afterLeave: (el: RendererElement) => isDefined(el),
};

export type TransitionEmits = typeof useTransitionEmits;
