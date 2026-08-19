import { describe, expect, it, vi } from 'vitest';
import { createCascaderPanelNavigation } from '..';

describe('Cascader browser primitives', () => {
  it('focuses and scrolls options and clears active state on destroy', () => {
    const container = document.createElement('div');
    const first = document.createElement('button');
    const second = document.createElement('button');
    first.dataset.cascaderOptionId = 'first';
    second.dataset.cascaderOptionId = 'second';
    const scrollIntoView = vi.fn();
    const firstScrollIntoView = vi.fn();
    first.scrollIntoView = firstScrollIntoView;
    second.scrollIntoView = scrollIntoView;
    container.append(first, second);
    document.body.append(container);

    const navigation = createCascaderPanelNavigation({ container });
    expect(navigation.focusOption('second')).toBe(true);
    expect(document.activeElement).toBe(second);
    expect(second.hasAttribute('data-active')).toBe(true);
    expect(first.hasAttribute('data-active')).toBe(false);
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest', inline: 'nearest' });
    expect(navigation.scrollOptionIntoView('first')).toBe(true);
    expect(firstScrollIntoView).toHaveBeenCalledWith({ block: 'nearest', inline: 'nearest' });
    expect(navigation.scrollOptionIntoView('missing')).toBe(false);
    navigation.destroy();
    expect(navigation.getOption('second')).toBeNull();
    expect(navigation.focusOption('second')).toBe(false);
    expect(navigation.scrollOptionIntoView('second')).toBe(false);
    expect(second.hasAttribute('data-active')).toBe(false);
    container.remove();
  });

  it('respects custom selectors and active attributes', () => {
    const container = document.createElement('div');
    const ignored = document.createElement('button');
    const option = document.createElement('button');
    ignored.dataset.cascaderOptionId = 'ignored';
    option.dataset.cascaderOptionId = 'custom';
    option.className = 'cascader-option';
    container.append(ignored, option);
    document.body.append(container);

    const navigation = createCascaderPanelNavigation({
      activeAttribute: 'aria-selected',
      container,
      optionSelector: '.cascader-option',
    });
    expect(navigation.getOption('ignored')).toBeNull();
    expect(navigation.getOption('custom')).toBe(option);
    expect(navigation.focusOption('custom')).toBe(true);
    expect(option.getAttribute('aria-selected')).toBe('');
    expect(ignored.hasAttribute('aria-selected')).toBe(false);
    navigation.destroy();
    expect(option.hasAttribute('aria-selected')).toBe(false);
    container.remove();
  });
});
