import { createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Rate } from '../../../index';
import type { RateHandle } from '../../../index';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';

describe('React Rate', () => {
  it('supports controlled pointer and keyboard changes', async () => {
    const onChange = vi.fn();
    await render(h(Rate, { count: 5, onChange, value: 2 }));
    const root = getContainer().querySelector('[role="slider"]') as HTMLElement;
    expect(root.getAttribute('aria-valuenow')).toBe('2');
    await dispatch(root, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }));
    expect(onChange).toHaveBeenLastCalledWith(3);
    await click(root.querySelectorAll<HTMLElement>('.h-rate__icon')[3]);
    expect(onChange).toHaveBeenLastCalledWith(4);
  });

  it('supports uncontrolled half steps, tooltip labels and icon renderers', async () => {
    const onChange = vi.fn();
    await render(
      h(Rate, {
        count: 3,
        defaultValue: 1.5,
        half: true,
        onChange,
        renderIcon: ({ status }) => h('span', { 'data-status': status }, '◆'),
        showTooltip: true,
        tooltip: ['Low', 'Medium', 'High'],
      }),
    );
    const root = getContainer().querySelector('[role="slider"]') as HTMLElement;
    expect(root.querySelector('.h-rate__tooltip')?.textContent).toBe('Medium');
    expect(root.querySelectorAll('[data-status="half"]')).toHaveLength(2);
    await dispatch(root, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }));
    expect(root.getAttribute('aria-valuenow')).toBe('2');
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('blocks disabled and readonly changes and exposes focus', async () => {
    const onChange = vi.fn();
    const ref = createRef<RateHandle>();
    await render(h(Rate, { disabled: true, onChange, ref, value: 2 }));
    const root = getContainer().querySelector('[role="slider"]') as HTMLElement;
    await dispatch(root, new KeyboardEvent('keydown', { bubbles: true, key: 'End' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(root.tabIndex).toBe(-1);

    await render(h(Rate, { readOnly: true, ref, value: 2 }));
    ref.current?.focus();
    expect(document.activeElement).toBe(getContainer().querySelector('[role="slider"]'));
  });

  it('applies presentation props and emits a native blur event', async () => {
    const onBlur = vi.fn();
    await render(
      h(Rate, {
        color: 'rgb(1, 2, 3)',
        count: 2,
        gutter: 7,
        onBlur,
        size: 24,
        value: 1,
        voidColor: 'rgb(4, 5, 6)',
      }),
    );
    const root = getContainer().querySelector('[role="slider"]') as HTMLElement;
    const icons = root.querySelectorAll<HTMLElement>('.h-rate__icon');
    expect(icons).toHaveLength(2);
    expect(icons[0].style.color).toBe('rgb(1, 2, 3)');
    expect(icons[1].style.color).toBe('rgb(4, 5, 6)');
    expect(icons[0].style.fontSize).toBe('24px');
    expect(icons[0].style.marginRight).toBe('7px');
    await dispatch(root, new FocusEvent('focusout', { bubbles: true }));
    expect(onBlur).toHaveBeenCalledOnce();
    expect(onBlur.mock.calls[0][0].nativeEvent).toBeInstanceOf(FocusEvent);
  });
});
