function getFocusableStepItem(item: HTMLElement): HTMLElement | null {
  if (item.matches('[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])')) return item;
  return item.querySelector<HTMLElement>(
    'button:not(:disabled), [tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])',
  );
}

/** 聚焦首个或指定索引的可交互步骤。 @en Focuses the first or indexed interactive step. */
export function focusStepsItem(root: HTMLElement | null, index?: number): boolean {
  if (!root) return false;
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-index]'));
  const item =
    index === undefined
      ? items.find(candidate => getFocusableStepItem(candidate))
      : items.find(candidate => Number(candidate.dataset.index) === index);
  const target = item ? getFocusableStepItem(item) : null;
  target?.focus();
  return target !== null && document.activeElement === target;
}
