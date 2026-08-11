const TABBABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

export function getTabbableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(TABBABLE_SELECTOR)).filter(element => {
    const style = element.ownerDocument.defaultView?.getComputedStyle(element);
    return style?.display !== 'none' && style?.visibility !== 'hidden' && !element.hidden;
  });
}

export interface FocusScopeOptions {
  trap?: boolean;
  restoreFocus?: boolean;
  initialFocus?: HTMLElement | (() => HTMLElement | null) | null;
}

export interface FocusScope {
  activate(): void;
  deactivate(): void;
}

export function createFocusScope(
  container: HTMLElement,
  options: FocusScopeOptions = {},
): FocusScope {
  const ownerDocument = container.ownerDocument;
  let previouslyFocused: HTMLElement | null = null;
  let active = false;

  const focusFirst = () => {
    const configured =
      typeof options.initialFocus === 'function' ? options.initialFocus() : options.initialFocus;
    (configured ?? getTabbableElements(container)[0] ?? container).focus();
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (!active || options.trap === false || event.key !== 'Tab') return;
    const tabbable = getTabbableElements(container);
    if (tabbable.length === 0) {
      event.preventDefault();
      container.focus();
      return;
    }
    const first = tabbable[0];
    const last = tabbable.at(-1)!;
    if (event.shiftKey && ownerDocument.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && ownerDocument.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  const onFocusIn = (event: FocusEvent) => {
    if (!active || options.trap === false || container.contains(event.target as Node)) return;
    focusFirst();
  };

  return {
    activate() {
      if (active) return;
      active = true;
      previouslyFocused = ownerDocument.activeElement as HTMLElement | null;
      if (!container.hasAttribute('tabindex')) container.tabIndex = -1;
      ownerDocument.addEventListener('keydown', onKeyDown, true);
      ownerDocument.addEventListener('focusin', onFocusIn, true);
      focusFirst();
    },
    deactivate() {
      if (!active) return;
      active = false;
      ownerDocument.removeEventListener('keydown', onKeyDown, true);
      ownerDocument.removeEventListener('focusin', onFocusIn, true);
      if (options.restoreFocus !== false && previouslyFocused?.isConnected) previouslyFocused.focus();
    },
  };
}

export function moveRovingFocus(
  items: readonly HTMLElement[],
  currentIndex: number,
  direction: 'next' | 'previous' | 'first' | 'last',
): number {
  if (items.length === 0) return -1;
  if (direction === 'first') return 0;
  if (direction === 'last') return items.length - 1;
  const delta = direction === 'next' ? 1 : -1;
  return (Math.max(0, currentIndex) + delta + items.length) % items.length;
}

export function applyRovingTabIndex(items: readonly HTMLElement[], activeIndex: number): void {
  items.forEach((item, index) => {
    item.tabIndex = index === activeIndex ? 0 : -1;
  });
}
