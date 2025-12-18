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

  const executeCbAfterScrollDone = debounce(() => {
    scrollContainer?.removeEventListener('scroll', executeCbAfterScrollDone);
    callback && callback();
  }, 50);

  scrollContainer?.addEventListener('scroll', executeCbAfterScrollDone);

  const originalTop = getScrollTop(scrollContainer);

  requestAnimationFrame(() => {
    scrollContainer?.scrollTo({ top: originalTop });
    requestAnimationFrame(() => {
      scrollContainer?.scrollTo({ top: y, behavior });
    });
  });
}

/** 获取“当前DOM元素的顶部”距离“滚动容器顶部”的距离 */
export function getOffsetTop(
  currDom: HTMLElement,
  scrollContainer: HTMLElement | Window | null,
): number {
  const curTop = currDom.getBoundingClientRect().top;
  if (scrollContainer instanceof HTMLElement) {
    return curTop - scrollContainer.getBoundingClientRect().top;
  }
  return curTop - document.documentElement.clientTop;
}

/** 获取“滚动容器”当前已滚动的距离 */
export function getScrollTop(scrollContainer: HTMLElement | Window | null): number {
  if (scrollContainer instanceof HTMLElement) {
    return scrollContainer.scrollTop;
  }
  return document.documentElement.scrollTop;
}

/** 获取“当前DOM元素”需要的偏移位置（相对于“滚动容器”的视口） */
export function getCustomOffset(
  curOffset: 'start' | 'center' | 'end' | number,
  curDom: HTMLElement,
  scrollContainer: HTMLElement | Window | null,
): number {
  if (typeof curOffset === 'number') {
    return curOffset;
  }
  const curDomHeight = curDom.getBoundingClientRect().height;
  let containerHeight;
  if (scrollContainer instanceof HTMLElement) {
    containerHeight = scrollContainer.getBoundingClientRect().height;
  } else {
    containerHeight = window.innerHeight;
  }
  switch (curOffset) {
    case 'start':
      return 0;
    case 'center':
      return containerHeight / 2 - curDomHeight / 2;
    case 'end':
      return containerHeight - curDomHeight;
    default:
      return 0;
  }
}
