import type { ReactElement } from 'react';
import { act, createElement as h, createRef, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { AutoCompleteHandle } from '..';
import { AutoComplete } from '..';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

const options = [
  { label: 'Alpha', value: 'a', description: 'First option' },
  { label: 'Beta', value: 'b', description: 'Second option' },
];

async function render(element: ReactElement): Promise<void> {
  await act(async () => root.render(element));
}

async function dispatch(target: EventTarget, event: Event): Promise<void> {
  await act(async () => target.dispatchEvent(event));
}

async function setInputValue(input: HTMLInputElement, value: string): Promise<void> {
  const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!;
  descriptor.set!.call(input, value);
  await dispatch(input, new Event('input', { bubbles: true }));
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  document.querySelectorAll('.h-auto-complete__panel').forEach(element => element.remove());
  vi.useRealTimers();
});

describe('React AutoComplete', () => {
  it('debounces uncontrolled input while preserving immediate draft text', async () => {
    vi.useFakeTimers();
    const onValueChange = vi.fn();
    const onSearch = vi.fn();
    await render(
      h(AutoComplete, {
        hidePanelWhenEmptyList: false,
        inputEmitFrequency: 20,
        onSearch,
        onValueChange,
      }),
    );
    const input = container.querySelector('[role="combobox"]') as HTMLInputElement;
    await setInputValue(input, 'Al');
    expect(input.value).toBe('Al');
    expect(onSearch).not.toHaveBeenCalled();
    await act(async () => vi.advanceTimersByTime(20));
    expect(onValueChange).toHaveBeenLastCalledWith('Al');
    expect(onSearch).toHaveBeenLastCalledWith('Al');
  });

  it('opens an accessible listbox and selects by keyboard and pointer', async () => {
    const onChange = vi.fn();
    const onSelect = vi.fn();
    await render(h(AutoComplete, { onChange, onSelect, options }));
    const input = container.querySelector('[role="combobox"]') as HTMLInputElement;
    await dispatch(input, new FocusEvent('focusin', { bubbles: true }));
    expect(input.getAttribute('aria-expanded')).toBe('true');
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
    await dispatch(input, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }));
    expect(input.getAttribute('aria-activedescendant')).toContain('option-0');
    await dispatch(input, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }));
    await dispatch(input, new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));
    expect(onChange).toHaveBeenCalledWith('b', expect.objectContaining({ index: 1 }));
    expect(onSelect).toHaveBeenCalledWith('b', expect.objectContaining({ index: 1 }));
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(document.querySelector('.h-auto-complete__panel')?.hasAttribute('hidden')).toBe(true);

    await dispatch(input, new FocusEvent('focusin', { bubbles: true }));
    const alpha = Array.from(document.querySelectorAll('[role="option"]')).find(option =>
      option.textContent?.includes('Alpha'),
    )!;
    await dispatch(alpha, new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    expect(onSelect).toHaveBeenLastCalledWith('a', expect.objectContaining({ index: 0 }));
  });

  it('supports controlled value and open state without speculative ownership', async () => {
    const onValueChange = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      h(AutoComplete, {
        onOpenChange,
        onValueChange,
        open: true,
        options,
        value: 'a',
      }),
    );
    const input = container.querySelector('input[role="combobox"]') as HTMLInputElement;
    const beta = Array.from(document.querySelectorAll('[role="option"]')).find(option =>
      option.textContent?.includes('Beta'),
    )!;
    await dispatch(beta, new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    expect(onValueChange).toHaveBeenCalledWith('b');
    expect(onOpenChange).toHaveBeenCalledWith(false, { reason: 'select' });
    expect(input.value).toBe('a');
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
  });

  it('suppresses search during IME composition and commits after composition ends', async () => {
    const onSearch = vi.fn();
    await render(
      h(AutoComplete, {
        hidePanelWhenEmptyList: false,
        inputEmitFrequency: 0,
        onSearch,
      }),
    );
    const input = container.querySelector('input')!;
    await dispatch(input, new CompositionEvent('compositionstart', { bubbles: true, data: '中' }));
    await setInputValue(input, '中');
    expect(onSearch).not.toHaveBeenCalledWith('中');
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, '中');
    await dispatch(input, new CompositionEvent('compositionend', { bubbles: true, data: '中' }));
    expect(onSearch).toHaveBeenLastCalledWith('中');
  });

  it('handles selected-first ordering, reach-end, disabled and clear behavior', async () => {
    const onReachEnd = vi.fn();
    const onClear = vi.fn();
    await render(
      h(
        StrictMode,
        null,
        h(AutoComplete, {
          clearable: true,
          defaultValue: 'b',
          onClear,
          onOptionListReachBottom: onReachEnd,
          options,
          selectedOptionOrderToTop: true,
        }),
      ),
    );
    const input = container.querySelector('input[role="combobox"]')!;
    await dispatch(input, new FocusEvent('focusin', { bubbles: true }));
    expect(document.querySelector('[role="option"]')?.textContent).toContain('Beta');
    for (let index = 0; index < 3; index += 1) {
      await dispatch(input, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }));
    }
    expect(onReachEnd).toHaveBeenCalled();
    const clear = container.querySelector('[aria-label="Clear input"]')!;
    await dispatch(clear, new MouseEvent('click', { bubbles: true }));
    expect(onClear).toHaveBeenCalledOnce();

    await render(h(AutoComplete, { disabled: true, options }));
    expect((container.querySelector('input') as HTMLInputElement).disabled).toBe(true);
    expect(
      (container.querySelector('input') as HTMLInputElement).getAttribute('aria-expanded'),
    ).toBe('false');
  });

  it('opens after asynchronous options arrive and exposes focus/open/close/clear', async () => {
    const ref = createRef<AutoCompleteHandle>();
    const onClear = vi.fn();
    await render(
      h(AutoComplete, {
        clearable: true,
        defaultValue: 'a',
        hidePanelWhenEmptyList: true,
        onClear,
        options: [],
        ref,
      }),
    );
    const input = container.querySelector('input') as HTMLInputElement;
    await dispatch(input, new FocusEvent('focusin', { bubbles: true }));
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(document.querySelector('.h-auto-complete__panel')?.hasAttribute('hidden')).toBe(true);
    await render(
      h(AutoComplete, {
        clearable: true,
        defaultValue: 'a',
        hidePanelWhenEmptyList: true,
        onClear,
        options,
        ref,
      }),
    );
    await act(async () => ref.current?.open());
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
    await act(async () => ref.current?.close());
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(document.querySelector('.h-auto-complete__panel')?.hasAttribute('hidden')).toBe(true);
    await act(async () => ref.current?.focus());
    expect(document.activeElement).toBe(ref.current?.input);
    await act(async () => ref.current?.clear());
    expect(onClear).toHaveBeenCalledOnce();
  });

  it('renders custom regions and remains within a 390px container', async () => {
    await render(
      h(
        'div',
        { style: { width: '390px' } },
        h(AutoComplete, {
          emptyContent: 'Nothing found',
          panelFooter: 'Keyboard help',
          panelHeader: 'Suggestions',
          portal: false,
          renderOption: option => h('strong', null, option.label.repeat(20)),
          options,
          prefix: '⌕',
        }),
      ),
    );
    const input = container.querySelector('input')!;
    await dispatch(input, new FocusEvent('focusin', { bubbles: true }));
    expect(container.textContent).toContain('Suggestions');
    expect(container.textContent).toContain('Keyboard help');
    const rootElement = container.querySelector('.h-auto-complete') as HTMLElement;
    expect(rootElement.scrollWidth).toBeLessThanOrEqual(rootElement.clientWidth);
  });
});
