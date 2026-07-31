import { onBeforeUnmount } from 'vue';

/**
 * 动态尺寸观察能力。
 * 兼容数组与单对象两种 borderBoxSize 实现，并在卸载时取消待执行任务。
 */
export default function useVirtualScrollerResizeObserver(): ResizeObserver | undefined {
  if (typeof ResizeObserver === 'undefined') return undefined;

  let animationFrame: number | undefined;
  let pendingEntries: ResizeObserverEntry[] = [];

  const observer = new ResizeObserver(entries => {
    pendingEntries.push(...entries);

    if (typeof animationFrame !== 'undefined') return;

    animationFrame = requestAnimationFrame(() => {
      const currentEntries = pendingEntries;
      pendingEntries = [];
      animationFrame = undefined;

      for (const entry of currentEntries) {
        if (!entry.target.$_vs_onResize || typeof entry.target.$_vs_id === 'undefined') {
          continue;
        }

        const borderBoxSize = entry.borderBoxSize as
          | readonly ResizeObserverSize[]
          | ResizeObserverSize
          | undefined;
        const resizeObserverSize = Array.isArray(borderBoxSize) ? borderBoxSize[0] : borderBoxSize;
        const width = resizeObserverSize?.inlineSize ?? entry.contentRect.width;
        const height = resizeObserverSize?.blockSize ?? entry.contentRect.height;

        entry.target.$_vs_onResize(entry.target.$_vs_id, width, height);
      }
    });
  });

  onBeforeUnmount(() => {
    observer.disconnect();
    pendingEntries = [];

    if (typeof animationFrame !== 'undefined') {
      cancelAnimationFrame(animationFrame);
    }
  });

  return observer;
}
