import { createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Segmented, SegmentedItem } from '../../../index';
import type { SegmentedHandle } from '../../../index';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';

describe('React Segmented', () => {
  it('supports uncontrolled selection and item callbacks', async () => {
    const onChange = vi.fn();
    const onClick = vi.fn();
    await render(
      h(
        Segmented,
        { defaultValue: 'overview', onChange },
        h(SegmentedItem, { value: 'overview' }, 'Overview'),
        h(SegmentedItem, { onClick, value: 'tasks' }, 'Tasks'),
      ),
    );
    const tabs = getContainer().querySelectorAll<HTMLElement>('[role="tab"]');
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    await click(tabs[1]);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(onChange).toHaveBeenCalledWith('tasks');
    expect(onClick).toHaveBeenCalledWith('tasks');
  });

  it('supports controlled values, disabled items and keyboard navigation', async () => {
    const onChange = vi.fn();
    await render(
      h(
        Segmented,
        { onChange, value: 1 },
        h(SegmentedItem, { value: 1 }, 'One'),
        h(SegmentedItem, { disabled: true, value: 2 }, 'Two'),
        h(SegmentedItem, { value: 3 }, 'Three'),
      ),
    );
    const tabs = getContainer().querySelectorAll<HTMLElement>('[role="tab"]');
    tabs[0].focus();
    await dispatch(tabs[0], new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }));
    expect(document.activeElement).toBe(tabs[2]);
    expect(onChange).toHaveBeenCalledWith(3);
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
  });

  it('renders item regions, block mode and exposes focus', async () => {
    const ref = createRef<SegmentedHandle>();
    await render(
      h(
        Segmented,
        { block: true, defaultValue: 'a', ref },
        h(SegmentedItem, { icon: '◆', value: 'a' }, ({ selected }) =>
          h('span', { 'data-selected': selected }, 'A'),
        ),
        h(SegmentedItem, { value: 'b' }, 'B'),
      ),
    );
    const root = getContainer().querySelector('.h-segmented') as HTMLElement;
    expect(root.classList.contains('h-segmented--block')).toBe(true);
    expect(root.querySelector('[data-selected="true"]')?.textContent).toBe('A');
    ref.current?.focus();
    expect(document.activeElement).toBe(root.querySelector('[role="tab"]'));
  });

  it('supports overflow controls, focus tracking, sizes and label fallbacks', async () => {
    const scrollIntoView = vi.fn();
    const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });
    try {
      await render(
        h(
          Segmented,
          { arrow: true, defaultValue: 'a', focusable: true, scrollable: true, size: 'huge' },
          h(SegmentedItem, { icon: '◆', label: 'Alpha', value: 'a' }),
          h(SegmentedItem, { label: 'Beta', value: 'b' }),
        ),
      );
      const root = getContainer().querySelector('.h-segmented') as HTMLElement;
      const wrapper = root.querySelector('.h-segmented__nav-wrap') as HTMLElement;
      const scrollBy = vi.fn();
      Object.defineProperty(wrapper, 'scrollBy', { configurable: true, value: scrollBy });
      expect(root.classList.contains('h-segmented--huge')).toBe(true);
      expect(root.textContent).toContain('Alpha');
      expect(scrollIntoView).toHaveBeenCalled();
      await click(root.querySelector('[aria-label="Scroll forward"]') as HTMLElement);
      expect(scrollBy).toHaveBeenCalledWith({ behavior: 'smooth', left: 160 });
    } finally {
      Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
        configurable: true,
        value: originalScrollIntoView,
      });
    }
  });
});
