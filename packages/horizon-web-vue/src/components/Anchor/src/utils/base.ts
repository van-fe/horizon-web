/** 防抖工具函数 */
export function debounce(fn: (...args: any[]) => void, delay: number) {
  let timer: any = null;
  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/** 自定义的滚动方法 */
export function customScrollTo(
  y: number,
  options: {
    behavior?: ScrollBehavior;
    scrollContainer?: HTMLElement | Window | null;
    callback?: () => void;
  } = {},
): void {
  const { behavior = 'smooth', scrollContainer = window, callback } = options;
  if (!scrollContainer) return;
  const controller = createAnchorScrollController(scrollContainer);
  controller.scrollTo(y, behavior === 'smooth' ? 'smooth' : 'auto', () => {
    controller.destroy();
    callback?.();
  });
}

/** 获取“当前DOM元素的顶部”距离“滚动容器顶部”的距离 */
export function getOffsetTop(
  currDom: HTMLElement,
  scrollContainer: HTMLElement | Window | null,
): number {
  return getAnchorOffsetTop(currDom, scrollContainer ?? window);
}

/** 获取“滚动容器”当前已滚动的距离 */
export function getScrollTop(scrollContainer: HTMLElement | Window | null): number {
  return getAnchorScrollTop(scrollContainer ?? window);
}

/** 获取“当前DOM元素”需要的偏移位置（相对于“滚动容器”的视口） */
export function getCustomOffset(
  curOffset: AnchorOffset,
  curDom: HTMLElement,
  scrollContainer: HTMLElement | Window | null,
): number {
  return getAnchorCustomOffset(curOffset, curDom, scrollContainer ?? window);
}
import type { AnchorOffset } from '@aurora/core';
import {
  createAnchorScrollController,
  getAnchorCustomOffset,
  getAnchorOffsetTop,
  getAnchorScrollTop,
} from '@aurora/horizon-web-core';
