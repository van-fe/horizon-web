export interface SelectComboboxAriaOptions {
  listboxId: string;
  open: boolean;
  activeOptionId?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  labelledBy?: string;
}

export interface SelectOptionAriaOptions {
  selected: boolean;
  disabled?: boolean;
}

export type SelectNavigationIntent = 'next' | 'previous' | 'first' | 'last';

export interface SelectDomAdapterOptions {
  trigger: HTMLElement;
  listbox: HTMLElement;
  getOpen: () => boolean;
  getActiveOptionId: () => string | undefined;
  onOpen: () => void;
  onClose: (reason: 'escape') => void;
  onNavigate: (intent: SelectNavigationIntent) => void;
  onSelect: () => void;
}

export interface SelectDomAdapter {
  sync(): void;
  destroy(): void;
}

export function getSelectComboboxAria(options: SelectComboboxAriaOptions) {
  return {
    role: 'combobox' as const,
    'aria-activedescendant': options.open ? options.activeOptionId : undefined,
    'aria-controls': options.listboxId,
    'aria-disabled': options.disabled || undefined,
    'aria-expanded': options.open,
    'aria-haspopup': 'listbox' as const,
    'aria-invalid': options.invalid || undefined,
    'aria-labelledby': options.labelledBy,
    'aria-required': options.required || undefined,
  };
}

export function getSelectListboxAria(id: string, labelledBy?: string) {
  return { id, role: 'listbox' as const, 'aria-labelledby': labelledBy };
}

export function getSelectOptionAria(options: SelectOptionAriaOptions) {
  return {
    role: 'option' as const,
    'aria-disabled': options.disabled || undefined,
    'aria-selected': options.selected,
  };
}

export function scrollSelectOptionIntoView(
  listbox: HTMLElement,
  activeOptionId: string | undefined,
): void {
  if (!activeOptionId) return;
  const option = listbox.ownerDocument.getElementById(activeOptionId);
  if (option && listbox.contains(option)) option.scrollIntoView({ block: 'nearest' });
}

/** DOM-only keyboard and ARIA adapter. State transitions stay in `@aurora/core`. */
export function createSelectDomAdapter(options: SelectDomAdapterOptions): SelectDomAdapter {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!options.getOpen()) options.onOpen();
      options.onNavigate(event.key === 'ArrowDown' ? 'next' : 'previous');
    } else if (event.key === 'Home' || event.key === 'End') {
      if (!options.getOpen()) return;
      event.preventDefault();
      options.onNavigate(event.key === 'Home' ? 'first' : 'last');
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (options.getOpen()) options.onSelect();
      else options.onOpen();
    } else if (event.key === 'Escape' && options.getOpen()) {
      event.preventDefault();
      options.onClose('escape');
    }
  };

  options.trigger.addEventListener('keydown', onKeyDown);

  return {
    sync() {
      const open = options.getOpen();
      const activeOptionId = open ? options.getActiveOptionId() : undefined;
      options.trigger.setAttribute('aria-expanded', String(open));
      if (activeOptionId) options.trigger.setAttribute('aria-activedescendant', activeOptionId);
      else options.trigger.removeAttribute('aria-activedescendant');
      if (open) scrollSelectOptionIntoView(options.listbox, activeOptionId);
    },
    destroy() {
      options.trigger.removeEventListener('keydown', onKeyDown);
    },
  };
}
