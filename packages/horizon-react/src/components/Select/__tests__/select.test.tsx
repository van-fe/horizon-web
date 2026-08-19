import type { ReactElement } from 'react';
import { act, createElement as h, createRef, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { SelectHandle } from '..';
import { Option, OptionGroup, Select } from '..';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

async function render(element: ReactElement): Promise<void> {
  await act(async () => root.render(element));
}

async function dispatch(target: EventTarget, event: Event): Promise<void> {
  await act(async () => target.dispatchEvent(event));
}

const options = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'blocked', label: 'Blocked', disabled: true },
  { value: 'beta', label: 'Beta', description: 'Second option' },
];

beforeEach(() => {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  document.querySelectorAll('[role="listbox"]').forEach(element => element.parentElement?.remove());
});

describe('React Select', () => {
  it('selects data options through the shared controller and Web popup', async () => {
    const onChange = vi.fn();
    await render(h(Select, { onChange, options, placeholder: 'Choose' }));
    const trigger = container.querySelector('[role="combobox"]')!;
    expect(trigger.textContent).toContain('Choose');

    await dispatch(trigger, new MouseEvent('click', { bubbles: true, cancelable: true }));
    const listbox = document.querySelector('[role="listbox"]')!;
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(listbox.textContent).toContain('Second option');

    const beta = Array.from(document.querySelectorAll('[role="option"]')).find(
      option => option.textContent?.includes('Beta'),
    )!;
    await dispatch(beta, new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    expect(onChange).toHaveBeenCalledWith(
      'beta',
      expect.objectContaining({ reason: 'select', option: expect.objectContaining({ value: 'beta' }) }),
    );
    expect(container.querySelector('[role="combobox"]')?.textContent).toContain('Beta');
    expect(document.querySelector('[role="listbox"]')).toBeNull();
  });

  it('supports controlled state without rendering speculative values', async () => {
    const onChange = vi.fn();
    await render(h(Select, { onChange, open: true, options, value: 'alpha' }));
    const beta = Array.from(document.querySelectorAll('[role="option"]')).find(
      option => option.textContent?.includes('Beta'),
    )!;
    await dispatch(beta, new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    expect(onChange).toHaveBeenCalled();
    expect(container.querySelector('[role="combobox"]')?.textContent).toContain('Alpha');
  });

  it('filters options and renders declarative groups', async () => {
    await render(
      h(
        Select,
        { filterable: true },
        h(
          OptionGroup,
          { label: 'Letters' },
          h(Option, { value: 'alpha' }, 'Alpha'),
          h(Option, { value: 'beta' }, 'Beta'),
        ),
      ),
    );
    const input = container.querySelector('input[role="combobox"]')!;
    await dispatch(input, new MouseEvent('click', { bubbles: true }));
    const inputElement = input as HTMLInputElement;
    const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!;
    descriptor.set!.call(inputElement, 'bet');
    await dispatch(input, new Event('input', { bubbles: true }));
    expect(document.querySelectorAll('[role="option"]')).toHaveLength(1);
    expect(document.querySelector('[role="option"]')?.textContent).toContain('Beta');
  });

  it('supports keyboard selection, disabled skipping and Escape', async () => {
    const onChange = vi.fn();
    await render(h(StrictMode, null, h(Select, { onChange, options })));
    const trigger = container.querySelector('[role="combobox"]')!;
    await dispatch(trigger, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }));
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
    expect(trigger.getAttribute('aria-activedescendant')).toContain('option-0');
    await dispatch(trigger, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }));
    expect(trigger.getAttribute('aria-activedescendant')).toContain('option-2');
    await dispatch(trigger, new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));
    expect(onChange).toHaveBeenCalledWith('beta', expect.objectContaining({ reason: 'keyboard' }));

    await dispatch(trigger, new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
    await dispatch(trigger, new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    expect(document.querySelector('[role="listbox"]')).toBeNull();
  });

  it('exposes imperative control and clear behavior', async () => {
    const ref = createRef<SelectHandle>();
    const onChange = vi.fn();
    await render(
      h(Select, { clearable: true, defaultValue: 'alpha', onChange, options, ref }),
    );
    await act(async () => ref.current?.open());
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
    await act(async () => ref.current?.close());
    expect(document.querySelector('[role="listbox"]')).toBeNull();
    await act(async () => ref.current?.clear());
    expect(onChange).toHaveBeenLastCalledWith(undefined, { reason: 'imperative' });
  });
});
