import type {
  AnchorHeadingEntry,
  AnchorListItem,
  AnchorOffset,
  AnchorScrollBehavior,
} from '@aurora/core';
import { buildAnchorList, resolveAnchorOffset } from '@aurora/core';

export type AnchorScrollTarget = string | HTMLElement | Window | null | undefined;

function isWindow(target: HTMLElement | Window): target is Window {
  return 'window' in target && target.window === target;
}

/** 解析 Anchor 滚动容器，选择器无效时回退窗口。 @en Resolves the Anchor scroll container and falls back to the window. */
export function resolveAnchorScrollTarget(
  target: AnchorScrollTarget,
  document: Document,
  onWarning?: (selector: string) => void,
): HTMLElement | Window {
  const fallback = document.defaultView ?? window;
  if (!target) return fallback;
  if (typeof target !== 'string') return target;
  try {
    const element = document.querySelector<HTMLElement>(target);
    if (element) return element;
  } catch {
    // Invalid selectors use the same safe fallback.
  }
  onWarning?.(target);
  return fallback;
}

/** 从 hash 链接解析章节元素。 @en Resolves a section element from a hash link. */
export function resolveAnchorHashTarget(link: string, document: Document): HTMLElement | null {
  const hashIndex = link.lastIndexOf('#');
  if (hashIndex < 0 || hashIndex === link.length - 1) return null;
  const rawId = link.slice(hashIndex + 1);
  let id = rawId;
  try {
    id = decodeURIComponent(rawId);
  } catch {
    // Malformed URI sequences are still valid literal element ids.
  }
  return document.getElementById(id);
}

/** 获取章节顶部相对滚动容器可视边界的位置。 @en Returns a section's top relative to the scroll container viewport. */
export function getAnchorOffsetTop(element: HTMLElement, target: HTMLElement | Window): number {
  const top = element.getBoundingClientRect().top;
  if (!isWindow(target)) return top - target.getBoundingClientRect().top;
  return top - element.ownerDocument.documentElement.clientTop;
}

/** 读取滚动容器偏移。 @en Reads the scroll-container offset. */
export function getAnchorScrollTop(target: HTMLElement | Window): number {
  if (!isWindow(target)) return target.scrollTop;
  return target.scrollY || target.document.documentElement.scrollTop;
}

/** 计算命名滚动偏移。 @en Calculates a named scrolling offset. */
export function getAnchorCustomOffset(
  offset: AnchorOffset,
  element: HTMLElement,
  target: HTMLElement | Window,
): number {
  const targetHeight = element.getBoundingClientRect().height;
  const containerHeight = isWindow(target)
    ? target.innerHeight
    : target.getBoundingClientRect().height;
  return resolveAnchorOffset(offset, containerHeight, targetHeight);
}

export interface AnchorScrollController {
  scrollTo(top: number, behavior: AnchorScrollBehavior, onDone?: () => void): void;
  cancel(): void;
  destroy(): void;
}

/** 创建可取消的 Anchor 滚动控制器。 @en Creates a cancellable Anchor scrolling controller. */
export function createAnchorScrollController(target: HTMLElement | Window): AnchorScrollController {
  const document = isWindow(target) ? target.document : target.ownerDocument;
  const win = document.defaultView ?? window;
  let frameOne: number | undefined;
  let frameTwo: number | undefined;
  let settleTimer: ReturnType<typeof setTimeout> | undefined;
  let onScroll: (() => void) | undefined;
  let destroyed = false;

  const cancel = () => {
    if (frameOne !== undefined) win.cancelAnimationFrame(frameOne);
    if (frameTwo !== undefined) win.cancelAnimationFrame(frameTwo);
    frameOne = undefined;
    frameTwo = undefined;
    if (settleTimer !== undefined) win.clearTimeout(settleTimer);
    settleTimer = undefined;
    if (onScroll) target.removeEventListener('scroll', onScroll);
    onScroll = undefined;
  };

  return {
    scrollTo(top, behavior, onDone) {
      if (destroyed) return;
      cancel();
      const finish = () => {
        if (settleTimer !== undefined) win.clearTimeout(settleTimer);
        settleTimer = undefined;
        if (onScroll) target.removeEventListener('scroll', onScroll);
        onScroll = undefined;
        onDone?.();
      };
      onScroll = () => {
        if (settleTimer !== undefined) win.clearTimeout(settleTimer);
        settleTimer = win.setTimeout(finish, 50);
      };
      target.addEventListener('scroll', onScroll, { passive: true });
      const originalTop = getAnchorScrollTop(target);
      frameOne = win.requestAnimationFrame(() => {
        frameOne = undefined;
        target.scrollTo({ top: originalTop });
        frameTwo = win.requestAnimationFrame(() => {
          frameTwo = undefined;
          target.scrollTo({ top, behavior });
          settleTimer = win.setTimeout(finish, behavior === 'smooth' ? 500 : 50);
        });
      });
    },
    cancel,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cancel();
    },
  };
}

function normalizeRules(rules: readonly (string | readonly string[])[]): string[][] {
  return rules.map(rule => (typeof rule === 'string' ? [rule] : [...rule]));
}

/** 扫描 DOM 标题并生成分级目录。 @en Scans DOM headings and builds a levelled table of contents. */
export function scanAnchorHeadings(
  root: HTMLElement,
  rules: readonly (string | readonly string[])[],
): AnchorListItem[] {
  const normalized = normalizeRules(rules);
  const levelByElement = new Map<HTMLElement, number>();
  normalized.forEach((selectors, level) => {
    for (const selector of selectors) {
      try {
        root.querySelectorAll<HTMLElement>(selector).forEach(element => {
          if (!levelByElement.has(element)) levelByElement.set(element, level);
        });
      } catch {
        // Invalid author-provided selectors are ignored independently.
      }
    }
  });
  const entries: AnchorHeadingEntry[] = [];
  const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node = walker.nextNode();
  while (node) {
    const element = node as HTMLElement;
    const level = levelByElement.get(element);
    if (level !== undefined) {
      const title = element.innerText || element.textContent || '';
      if (!element.id && title) element.id = title;
      entries.push({ id: element.id || undefined, title: title || undefined, level });
    }
    node = walker.nextNode();
  }
  return buildAnchorList(entries);
}
