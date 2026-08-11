import type { CollapseKey } from '@aurora/core';

const COLLAPSE_HEADER_SELECTOR = [
  'button:not(:disabled):not([aria-disabled="true"])',
  '[role="button"]:not([aria-disabled="true"]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])',
].join(', ');

function getFocusableCollapseHeader(element: HTMLElement): HTMLElement | null {
  if (element.matches(COLLAPSE_HEADER_SELECTOR)) return element;
  return element.querySelector<HTMLElement>(COLLAPSE_HEADER_SELECTOR);
}

/** 聚焦首个或指定面板标题。 @en Focuses the first or requested collapse header. */
export function focusCollapseHeader(root: HTMLElement | null, key?: CollapseKey): boolean {
  if (!root) return false;

  let target: HTMLElement | null = null;
  if (key === undefined) {
    target = root.querySelector<HTMLElement>(COLLAPSE_HEADER_SELECTOR);
  } else {
    const item = Array.from(root.querySelectorAll<HTMLElement>('[data-collapse-key]')).find(
      element => element.dataset.collapseKey === String(key),
    );
    target = item ? getFocusableCollapseHeader(item) : null;
  }

  target?.focus();
  return target !== null && target.ownerDocument.activeElement === target;
}
