import { describe, expect, it, vi } from 'vitest';
import { createSelectDomAdapter } from '..';

describe('Select DOM adapter', () => {
  it('coordinates keyboard navigation, selection, escape and cleanup', () => {
    const trigger = document.createElement('input');
    const listbox = document.createElement('div');
    const option = document.createElement('div');
    option.id = 'option-alpha';
    listbox.append(option);
    document.body.append(trigger, listbox);
    let open = false;
    let activeId: string | undefined;
    const navigate = vi.fn(() => {
      activeId = 'option-alpha';
    });
    const select = vi.fn();
    const adapter = createSelectDomAdapter({
      trigger,
      listbox,
      getOpen: () => open,
      getActiveOptionId: () => activeId,
      onOpen: () => {
        open = true;
      },
      onClose: () => {
        open = false;
      },
      onNavigate: navigate,
      onSelect: select,
    });

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    adapter.sync();
    expect(navigate).toHaveBeenCalledWith('next');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-activedescendant')).toBe('option-alpha');

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(select).toHaveBeenCalledOnce();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(open).toBe(false);

    adapter.destroy();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(navigate).toHaveBeenCalledOnce();
    trigger.remove();
    listbox.remove();
  });
});
