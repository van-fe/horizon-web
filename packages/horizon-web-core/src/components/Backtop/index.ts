import { resolveBacktopScrollOffset, resolveBacktopVisibility } from '@aurora/core';

export type BacktopScrollTarget = Window | HTMLElement;

export interface BacktopScrollControllerOptions {
  /** 返回当前显示阈值。 @en Returns the current visibility threshold. */
  getVisibilityHeight: () => number;
  /** 可见状态变化。 @en Called when visibility changes. */
  onVisibilityChange: (visible: boolean) => void;
  /** 滚动监听防抖时长。 @en Scroll-listener debounce duration. */
  debounce?: number;
  /** 返回顶部动画时长。 @en Return-to-top animation duration. */
  duration?: number;
}

export interface BacktopScrollController {
  /** 立即同步可见状态。 @en Immediately synchronizes visibility. */
  sync(): void;
  /** 平滑滚动到顶部。 @en Smoothly scrolls to the top. */
  scrollToTop(): void;
  /** 取消动画并清理监听。 @en Cancels animation and removes listeners. */
  destroy(): void;
}

function isWindowTarget(target: BacktopScrollTarget): target is Window {
  return 'window' in target && target.window === target;
}

function ownerWindow(target: BacktopScrollTarget): Window | undefined {
  return isWindowTarget(target) ? target : (target.ownerDocument.defaultView ?? undefined);
}

/** 读取滚动目标的垂直偏移。 @en Reads the vertical offset of a scroll target. */
export function getBacktopScrollOffset(target: BacktopScrollTarget): number {
  return isWindowTarget(target) ? target.scrollY : target.scrollTop;
}

/** 写入滚动目标的垂直偏移。 @en Writes the vertical offset of a scroll target. */
export function setBacktopScrollOffset(target: BacktopScrollTarget, offset: number): void {
  if (isWindowTarget(target)) target.scrollTo(0, offset);
  else target.scrollTop = offset;
}

/** 解析选择器目标，找不到或选择器无效时回退到窗口。 @en Resolves a selector target and falls back to the window when absent or invalid. */
export function resolveBacktopTarget(
  selector: string | undefined,
  document: Document,
): BacktopScrollTarget {
  if (selector) {
    try {
      const target = document.querySelector<HTMLElement>(selector);
      if (target) return target;
    } catch {
      // Invalid selectors use the documented window fallback.
    }
  }
  return document.defaultView ?? window;
}

/** 创建返回顶部滚动交互控制器。 @en Creates a return-to-top scroll interaction controller. */
export function createBacktopScrollController(
  target: BacktopScrollTarget,
  options: BacktopScrollControllerOptions,
): BacktopScrollController {
  const debounce = Math.max(0, options.debounce ?? 300);
  const duration = Math.max(0, options.duration ?? 500);
  const win = ownerWindow(target);
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let animationFrame: number | undefined;
  let destroyed = false;
  let lastVisible: boolean | undefined;

  const cancelAnimation = () => {
    if (animationFrame !== undefined) win?.cancelAnimationFrame(animationFrame);
    animationFrame = undefined;
  };
  const sync = () => {
    if (destroyed) return;
    const visible = resolveBacktopVisibility(
      getBacktopScrollOffset(target),
      options.getVisibilityHeight(),
    );
    if (visible !== lastVisible) {
      lastVisible = visible;
      options.onVisibilityChange(visible);
    }
  };
  const onScroll = () => {
    if (timeout !== undefined) clearTimeout(timeout);
    timeout = setTimeout(sync, debounce);
  };
  const scrollToTop = () => {
    cancelAnimation();
    const startOffset = getBacktopScrollOffset(target);
    const prefersReducedMotion = win?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!win || duration === 0 || prefersReducedMotion || startOffset <= 0) {
      setBacktopScrollOffset(target, 0);
      sync();
      return;
    }
    const startTime = win.performance.now();
    const frame = (timestamp: number) => {
      if (destroyed) return;
      const progress = Math.min(1, (timestamp - startTime) / duration);
      setBacktopScrollOffset(target, resolveBacktopScrollOffset(startOffset, progress));
      if (progress < 1) animationFrame = win.requestAnimationFrame(frame);
      else {
        animationFrame = undefined;
        sync();
      }
    };
    animationFrame = win.requestAnimationFrame(frame);
  };

  target.addEventListener('scroll', onScroll, { passive: true });
  sync();
  return {
    sync,
    scrollToTop,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      target.removeEventListener('scroll', onScroll);
      if (timeout !== undefined) clearTimeout(timeout);
      timeout = undefined;
      cancelAnimation();
    },
  };
}
