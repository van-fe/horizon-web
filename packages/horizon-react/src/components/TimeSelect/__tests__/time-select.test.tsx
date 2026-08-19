import { act, createElement as h, createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { TimeSelectHandle } from '..';
import { TimeSelect } from '..';
import { getContainer, render } from '../../../__tests__/harness';

afterEach(() => {
  document.querySelectorAll('[role="listbox"]').forEach(node => node.parentElement?.remove());
});

async function dispatch(target: EventTarget, event: Event) {
  await act(async () => target.dispatchEvent(event));
}

describe('React TimeSelect', () => {
  it('renders formatted fixed options and disables values outside the bounds', async () => {
    await render(
      h(TimeSelect, {
        defaultValue: '09:00',
        start: '08:30',
        end: '09:20',
        step: '00:30',
        includeEndTime: true,
        minTime: '09:00',
        format: 'hh:mm A',
        portal: false,
      }),
    );
    const trigger = getContainer().querySelector('[role="combobox"]')!;
    expect((trigger as HTMLInputElement).value).toBe('09:00 AM');
    await dispatch(trigger, new MouseEvent('click', { bubbles: true }));
    const options = Array.from(document.querySelectorAll('[role="option"]'));
    expect(options.map(option => option.textContent)).toEqual(['08:30 AM', '09:00 AM', '09:20 AM']);
    expect(options[0].getAttribute('aria-disabled')).toBe('true');
  });

  it('selects, filters and preserves the HH:mm value', async () => {
    const onChange = vi.fn();
    await render(
      h(TimeSelect, { editable: true, onChange, portal: false, start: '09:00', end: '10:00' }),
    );
    const input = getContainer().querySelector('input[role="combobox"]') as HTMLInputElement;
    await dispatch(input, new MouseEvent('click', { bubbles: true }));
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, '09:30');
    await dispatch(input, new Event('input', { bubbles: true }));
    const option = document.querySelector('[role="option"]')!;
    expect(option.textContent).toContain('09:30');
    await dispatch(option, new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    expect(onChange).toHaveBeenCalledWith('09:30');
  });

  it('supports controlled rollback, custom regions and renderOption', async () => {
    const onChange = vi.fn();
    await render(
      h(TimeSelect, {
        value: '09:00',
        open: true,
        onChange,
        portal: false,
        panelHeader: h('header', { 'data-header': true }, 'Morning'),
        panelFooter: h('footer', { 'data-footer': true }, 'UTC'),
        renderOption: option => h('strong', null, `Time ${option.label}`),
      }),
    );
    expect(document.querySelector('[data-header]')?.textContent).toBe('Morning');
    expect(document.querySelector('[data-footer]')?.textContent).toBe('UTC');
    expect(document.querySelector('[role="option"]')?.textContent).toContain('Time 09:00');
    const later = Array.from(document.querySelectorAll('[role="option"]')).find(node =>
      node.textContent?.includes('09:30'),
    )!;
    await dispatch(later, new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    expect(onChange).toHaveBeenCalledWith('09:30');
    const committed = Array.from(document.querySelectorAll('[role="option"]')).find(node =>
      node.textContent?.includes('09:00'),
    );
    expect(committed?.getAttribute('aria-selected')).toBe('true');
  });

  it('forwards focus, blur, open, close, clear and positioning commands', async () => {
    const ref = createRef<TimeSelectHandle>();
    const onChange = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    await render(
      h(TimeSelect, {
        clearable: true,
        defaultValue: '09:00',
        onBlur,
        onChange,
        onFocus,
        portal: false,
        ref,
      }),
    );
    await act(async () => ref.current?.focus());
    expect(onFocus).toHaveBeenCalledOnce();
    await act(async () => ref.current?.blur());
    expect(onBlur).toHaveBeenCalledOnce();
    await act(async () => ref.current?.open());
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
    await act(async () => ref.current?.close());
    expect(document.querySelector('[role="listbox"]')).toBeNull();
    await act(async () => ref.current?.clear());
    expect(onChange).toHaveBeenCalledWith(undefined);
    await expect(ref.current?.updatePosition()).resolves.toBeUndefined();
  });

  it('shows custom empty content for invalid runtime ranges', async () => {
    await render(
      h(TimeSelect, {
        emptyContent: 'No times',
        open: true,
        portal: false,
        start: '10:00',
        end: '09:00',
      }),
    );
    expect(document.querySelector('[role="listbox"]')?.textContent).toContain('No times');
  });

  it('uses the default option renderer and updates the floating position through the ref', async () => {
    const ref = createRef<TimeSelectHandle>();
    await render(h(TimeSelect, { open: true, portal: false, ref }));
    expect(document.querySelector('[role="option"]')?.textContent).toBe('09:00');
    await act(async () => ref.current?.updatePosition());
  });
});
