const PAGINATION_FOCUSABLE_SELECTOR = [
  'button:not(:disabled):not([aria-disabled="true"])',
  'input:not(:disabled):not([aria-disabled="true"])',
  'select:not(:disabled):not([aria-disabled="true"])',
  '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])',
].join(', ');

function getFocusablePaginationAction(element: HTMLElement): HTMLElement | null {
  if (element.matches(PAGINATION_FOCUSABLE_SELECTOR)) return element;
  return element.querySelector<HTMLElement>(PAGINATION_FOCUSABLE_SELECTOR);
}

/** 聚焦首个或指定页码的分页操作。 @en Focuses the first or requested page action. */
export function focusPaginationItem(root: HTMLElement | null, page?: number): boolean {
  if (!root) return false;

  let target: HTMLElement | null = null;
  if (page === undefined) {
    target = root.querySelector<HTMLElement>(PAGINATION_FOCUSABLE_SELECTOR);
  } else {
    const pageItem = Array.from(root.querySelectorAll<HTMLElement>('[data-page]')).find(
      item => Number(item.dataset.page) === page,
    );
    target = pageItem ? getFocusablePaginationAction(pageItem) : null;
  }

  target?.focus();
  return target !== null && target.ownerDocument.activeElement === target;
}
