export interface CascaderPanelNavigationOptions {
  container: HTMLElement;
  optionSelector?: string;
  activeAttribute?: string;
}

export interface CascaderPanelNavigation {
  focusOption(id: string): boolean;
  scrollOptionIntoView(id: string): boolean;
  getOption(id: string): HTMLElement | null;
  destroy(): void;
}

/** DOM-only option focus and scroll adapter shared by Cascader renderers. */
export function createCascaderPanelNavigation(
  options: CascaderPanelNavigationOptions,
): CascaderPanelNavigation {
  const optionSelector = options.optionSelector ?? '[data-cascader-option-id]';
  const activeAttribute = options.activeAttribute ?? 'data-active';
  let destroyed = false;

  const getOption = (id: string): HTMLElement | null => {
    if (destroyed) return null;
    return (
      Array.from(options.container.querySelectorAll<HTMLElement>(optionSelector)).find(
        option => option.dataset.cascaderOptionId === id,
      ) ?? null
    );
  };

  const scrollOptionIntoView = (id: string): boolean => {
    const option = getOption(id);
    if (!option) return false;
    option.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    return true;
  };

  return {
    getOption,
    focusOption(id) {
      const option = getOption(id);
      if (!option) return false;
      for (const current of options.container.querySelectorAll<HTMLElement>(optionSelector)) {
        if (current === option) current.setAttribute(activeAttribute, '');
        else current.removeAttribute(activeAttribute);
      }
      option.focus({ preventScroll: true });
      option.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      return true;
    },
    scrollOptionIntoView,
    destroy() {
      destroyed = true;
      for (const option of options.container.querySelectorAll<HTMLElement>(optionSelector)) {
        option.removeAttribute(activeAttribute);
      }
    },
  };
}
