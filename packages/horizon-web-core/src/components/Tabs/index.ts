import type { TabsKey } from '@aurora/core';

const ENABLED_TAB_SELECTOR = '[role="tab"]:not([aria-disabled="true"]):not([tabindex="-1"])';
const ANY_ENABLED_TAB_SELECTOR = '[role="tab"]:not([aria-disabled="true"])';

/** 聚焦首个或指定页签。 @en Focuses the first or requested tab. */
export function focusTabsItem(root: HTMLElement | null, key?: TabsKey): boolean {
  if (!root) return false;
  let target: HTMLElement | null;
  if (key === undefined) {
    target =
      root.querySelector<HTMLElement>(ENABLED_TAB_SELECTOR) ??
      root.querySelector<HTMLElement>(ANY_ENABLED_TAB_SELECTOR);
  } else {
    target =
      Array.from(root.querySelectorAll<HTMLElement>(ANY_ENABLED_TAB_SELECTOR)).find(
        item => (item.dataset.tabKey ?? item.dataset.name) === String(key),
      ) ?? null;
  }
  target?.focus();
  return target !== null && target.ownerDocument.activeElement === target;
}

/** 将页签导航容器按一页宽度滚动。 @en Scrolls a tab viewport by one page. */
export function scrollTabsViewport(
  viewport: HTMLElement | null,
  direction: 'left' | 'right',
): boolean {
  if (!viewport) return false;
  const max = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  const next = Math.min(
    max,
    Math.max(0, viewport.scrollLeft + (direction === 'right' ? 1 : -1) * viewport.clientWidth),
  );
  if (next === viewport.scrollLeft) return false;
  viewport.scrollLeft = next;
  return true;
}
