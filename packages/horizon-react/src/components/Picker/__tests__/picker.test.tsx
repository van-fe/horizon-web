import type { ReactElement } from 'react';
import { act, createElement as h, createRef, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { PickerHandle, PickerProps } from '..';
import { Picker } from '..';
import { HorizonWebProvider } from '../../../provider';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

async function render(element: ReactElement): Promise<void> {
  await act(async () => root.render(element));
}

async function dispatch(target: EventTarget, event: Event): Promise<void> {
  await act(async () => target.dispatchEvent(event));
}

async function setInputValue(input: HTMLInputElement, value: string): Promise<void> {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value);
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
  document.querySelectorAll('[id$="-picker-popup"]').forEach(element => element.remove());
  vi.useRealTimers();
});

describe('React Picker', () => {
  it('supports uncontrolled input, focus opening, clearing and ARIA', async () => {
    const onValueChange = vi.fn();
    const onOpenChange = vi.fn();
    const onClear = vi.fn();
    await render(
      h(
        Picker<string>,
        {
          clearable: true,
          defaultValue: 'before',
          inputable: true,
          onClear,
          onOpenChange,
          onValueChange,
        },
        h('div', null, 'Panel content'),
      ),
    );
    const input = container.querySelector('[role="combobox"]') as HTMLInputElement;
    await dispatch(input, new FocusEvent('focusin', { bubbles: true }));
    expect(input.getAttribute('aria-expanded')).toBe('true');
    expect(document.querySelector('[role="dialog"]')?.textContent).toContain('Panel content');
    await setInputValue(input, 'after');
    expect(onValueChange).toHaveBeenLastCalledWith('after');
    expect(input.value).toBe('after');
    await dispatch(
      container.querySelector('[aria-label="Clear selection"]')!,
      new MouseEvent('click', { bubbles: true }),
    );
    expect(onClear).toHaveBeenCalledOnce();
    expect(input.value).toBe('');
    expect(onOpenChange).toHaveBeenCalledWith(true, { reason: 'focus' });
  });

  it('preserves controlled ownership and reports requested changes', async () => {
    const onValueChange = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      h(Picker<string>, {
        inputable: true,
        onOpenChange,
        onValueChange,
        open: false,
        value: 'locked',
      }),
    );
    const input = container.querySelector('input')!;
    await dispatch(input, new FocusEvent('focusin', { bubbles: true }));
    await setInputValue(input, 'draft');
    expect(onOpenChange).toHaveBeenCalledWith(true, { reason: 'focus' });
    expect(onValueChange).toHaveBeenCalledWith('draft');
    expect(input.value).toBe('locked');
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders confirmation actions and provider labels', async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const onClear = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      h(
        HorizonWebProvider,
        { pickerLabels: { confirm: 'Apply', cancel: 'Dismiss' } },
        h(
          Picker<string>,
          {
            defaultOpen: true,
            defaultValue: 'selected',
            needConfirm: true,
            onCancel,
            onClear,
            onConfirm,
            onOpenChange,
            panelHeader: h('header', null, 'Header'),
            panelFooter: h('footer', null, 'Footer'),
            showClearAction: true,
          },
          h('div', null, 'Body'),
        ),
      ),
    );
    const dialog = document.querySelector('[role="dialog"]')!;
    expect(dialog.textContent).toContain('HeaderBody');
    expect(dialog.textContent).toContain('Footer');
    const buttons = Array.from(dialog.querySelectorAll('button'));
    expect(buttons.map(button => button.textContent)).toEqual([
      'Clear selection',
      'Dismiss',
      'Apply',
    ]);
    await dispatch(buttons[0], new MouseEvent('click', { bubbles: true }));
    expect(onClear).toHaveBeenCalledOnce();
    await dispatch(buttons[1], new MouseEvent('click', { bubbles: true }));
    expect(onCancel).toHaveBeenCalledOnce();

    await render(
      h(
        Picker,
        { defaultOpen: true, needConfirm: true, onConfirm, onOpenChange },
        h('div', null, 'Body'),
      ),
    );
    const confirm = Array.from(document.querySelectorAll('[role="dialog"] button')).at(-1)!;
    await dispatch(confirm, new MouseEvent('click', { bubbles: true }));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'confirm' });
  });

  it('handles outside, Escape and imperative ref commands', async () => {
    const pickerRef = createRef<PickerHandle>();
    const onOpenChange = vi.fn();
    await render(
      h(
        StrictMode,
        null,
        h(Picker, { defaultValue: 'value', onOpenChange, ref: pickerRef }, h('div', null, 'Panel')),
      ),
    );
    const input = container.querySelector('input')!;
    await act(async () => pickerRef.current?.focus());
    expect(document.activeElement).toBe(input);
    await act(async () => pickerRef.current?.open());
    expect(input.getAttribute('aria-expanded')).toBe('true');
    await pickerRef.current?.updatePosition();
    await dispatch(document.body, new MouseEvent('click', { bubbles: true }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'outside-pointer' });
    await act(async () => pickerRef.current?.open());
    await dispatch(document, new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'escape' });
    await act(async () => pickerRef.current?.clear());
    await act(async () => pickerRef.current?.blur());
  });

  it('supports hover timing, loading/empty content and disabled modes', async () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();
    await render(
      h(Picker, { hoverHideDelay: 20, hoverShowDelay: 10, onOpenChange, trigger: 'hover' }),
    );
    await dispatch(container.firstElementChild!, new MouseEvent('mouseover', { bubbles: true }));
    await act(async () => vi.advanceTimersByTime(10));
    expect(onOpenChange).toHaveBeenCalledWith(true, { reason: 'hover' });
    await dispatch(container.firstElementChild!, new MouseEvent('mouseout', { bubbles: true }));
    await act(async () => vi.advanceTimersByTime(20));
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'hover' });

    await render(h(Picker, { defaultOpen: true, loading: true, loadingContent: 'Fetching' }));
    expect(document.querySelector('[role="status"]')?.textContent).toBe('Fetching');
    await render(h(Picker, { defaultOpen: true, emptyContent: 'Nothing', panelStatus: 'empty' }));
    expect(document.querySelector('[role="dialog"]')?.textContent).toContain('Nothing');
    onOpenChange.mockClear();
    await render(h(Picker, { disabled: true, onOpenChange }));
    await dispatch(container.querySelector('input')!, new MouseEvent('click', { bubbles: true }));
    expect(onOpenChange).not.toHaveBeenCalled();
    await render(h(Picker, { onOpenChange, trigger: 'never' }));
    await dispatch(
      container.querySelector('input')!,
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    );
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('supports custom triggers, structured values, inline popup and action visibility', async () => {
    const pickerRef = createRef<PickerHandle>();
    const onValueChange = vi.fn();
    await render(
      h(
        Picker<{ label: string }>,
        {
          clearValue: { label: '' },
          defaultValue: { label: 'Alpha' },
          formatValue: value => h('strong', null, value.label),
          needConfirm: true,
          onValueChange,
          portal: false,
          prefix: h('span', null, 'Prefix'),
          ref: pickerRef,
          renderTrigger: ({ triggerProps, value }) =>
            h('button', { ...triggerProps, type: 'button' }, `Choose ${value.label}`),
          showCancelAction: false,
          showConfirmAction: false,
          suffix: h('span', null, 'Suffix'),
        },
        context => h('div', { 'data-status': context.status }, context.value.label),
      ),
    );
    const trigger = container.querySelector('button')!;
    expect(trigger.textContent).toBe('Choose Alpha');
    await dispatch(trigger, new MouseEvent('click', { bubbles: true }));
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(container.querySelector('[role="dialog"]')).not.toBeNull();
    expect(container.querySelector('[data-status="panel-visible"]')?.textContent).toBe('Alpha');
    expect(container.querySelector('[role="dialog"] button')).toBeNull();
    expect(pickerRef.current?.input).toBeNull();
    expect(pickerRef.current?.popup).not.toBeNull();
    await act(async () => pickerRef.current?.clear());
    expect(onValueChange).toHaveBeenCalledWith({ label: '' });
  });

  it('applies native attributes, panel sizing and disabled confirmation buttons', async () => {
    const onCancelButtonClick = vi.fn();
    const onConfirmButtonClick = vi.fn();
    await render(
      h(
        Picker,
        {
          arrow: true,
          cancelDisabled: true,
          cancelButtonProps: { className: 'cancel-action', onClick: onCancelButtonClick },
          className: 'custom-picker',
          confirmDisabled: true,
          confirmButtonProps: { className: 'confirm-action', onClick: onConfirmButtonClick },
          defaultOpen: true,
          fitInputWidth: 'fit-content',
          inputStatus: 'error',
          inputStyle: 'emphasize',
          needConfirm: true,
          panelClassName: 'custom-panel',
          panelStyle: { width: '18rem' },
          placeholder: 'Choose value',
          size: 'large',
        },
        h('div', null, 'Content'),
      ),
    );
    expect(container.firstElementChild?.classList).toContain('custom-picker');
    const input = container.querySelector('input')!;
    expect(input.placeholder).toBe('Choose value');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.closest('.h-picker__input')?.classList).toContain('h-picker__input--large');
    const dialog = document.querySelector('.custom-panel') as HTMLElement;
    expect(dialog.style.width).toBe('18rem');
    const pickerArrow = dialog.querySelector('.h-picker__pop-content--arrow');
    expect(pickerArrow?.classList).toContain('h-popover__arrow');
    expect(pickerArrow?.hasAttribute('data-popper-arrow')).toBe(true);
    expect(dialog.querySelector('.cancel-action')).not.toBeNull();
    expect(dialog.querySelector('.confirm-action')).not.toBeNull();
    expect(Array.from(dialog.querySelectorAll('button')).every(button => button.disabled)).toBe(
      true,
    );
    expect(onCancelButtonClick).not.toHaveBeenCalled();
    expect(onConfirmButtonClick).not.toHaveBeenCalled();
  });

  it('merges input attributes without allowing picker-controlled props to be overridden', async () => {
    const overriddenClick = vi.fn();
    const overriddenChange = vi.fn();
    const overriddenRef = vi.fn();
    const unsafeInputProps = {
      'aria-describedby': 'picker-description',
      'data-picker-input': 'custom',
      onChange: overriddenChange,
      onClick: overriddenClick,
      ref: overriddenRef,
      value: 'overridden',
    } as unknown as NonNullable<PickerProps<string>['inputProps']>;
    const onInput = vi.fn();
    await render(
      h(Picker<string>, {
        defaultValue: 'picker-owned',
        inputable: true,
        inputProps: unsafeInputProps,
        onInput,
      }),
    );

    const input = container.querySelector('input')!;
    expect(input.getAttribute('aria-describedby')).toBe('picker-description');
    expect(input.dataset.pickerInput).toBe('custom');
    expect(input.value).toBe('picker-owned');
    await setInputValue(input, 'updated-by-picker');
    expect(onInput).toHaveBeenCalledOnce();
    expect(overriddenChange).not.toHaveBeenCalled();
    await dispatch(input, new MouseEvent('click', { bubbles: true }));
    expect(input.getAttribute('aria-expanded')).toBe('true');
    expect(overriddenClick).not.toHaveBeenCalled();
    expect(overriddenRef).not.toHaveBeenCalled();
  });

  it('covers default formatting, editable callbacks, IME and keyboard closing paths', async () => {
    const onBlur = vi.fn();
    const onClick = vi.fn();
    const onConfirm = vi.fn();
    const onFocus = vi.fn();
    const onInput = vi.fn();
    const onKeyDown = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      h(
        Picker<number>,
        {
          defaultValue: 12,
          inputable: true,
          needConfirm: true,
          onBlur,
          onClick,
          onConfirm,
          onFocus,
          onInput,
          onKeyDown,
          onOpenChange,
          parseInput: text => Number(text),
        },
        h('div', null, 'Panel'),
      ),
    );
    const input = container.querySelector('input')!;
    expect(input.value).toBe('12');
    await dispatch(input, new FocusEvent('focusin', { bubbles: true }));
    await dispatch(input, new CompositionEvent('compositionstart', { bubbles: true, data: '一' }));
    await setInputValue(input, '24');
    await dispatch(input, new CompositionEvent('compositionend', { bubbles: true, data: '一' }));
    await dispatch(input, new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(onInput).toHaveBeenCalledOnce();
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(onKeyDown).toHaveBeenCalled();
    await dispatch(input, new MouseEvent('click', { bubbles: true }));
    expect(onClick).toHaveBeenCalled();
    await dispatch(input, new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'escape' });
    await dispatch(input, new FocusEvent('focusout', { bubbles: true }));
    expect(onFocus).toHaveBeenCalled();
    expect(onFocus.mock.calls.every(([event]) => event.type === 'focus')).toBe(true);
    expect(onBlur).toHaveBeenCalledOnce();

    await render(h(Picker, { value: null }));
    expect(container.querySelector('input')?.value).toBe('');
    await render(h(Picker, { value: true }));
    expect(container.querySelector('input')?.value).toBe('true');
    await render(h(Picker, { value: { id: 1 } }));
    expect(container.querySelector('input')?.value).toBe('');
  });

  it('supports trigger toggle, prevented handlers and readonly input guards', async () => {
    const onOpenChange = vi.fn();
    await render(h(Picker, { defaultOpen: true, onOpenChange }, h('div', null, 'Panel')));
    const input = container.querySelector('input')!;
    await dispatch(input, new MouseEvent('click', { bubbles: true }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'trigger' });
    await dispatch(input, new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(true, { reason: 'trigger' });

    onOpenChange.mockClear();
    await render(
      h(Picker, {
        inputable: true,
        onClick: event => event.preventDefault(),
        onKeyDown: event => event.preventDefault(),
        onOpenChange,
      }),
    );
    const prevented = container.querySelector('input')!;
    await dispatch(prevented, new MouseEvent('click', { bubbles: true, cancelable: true }));
    await dispatch(
      prevented,
      new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Enter' }),
    );
    expect(onOpenChange).not.toHaveBeenCalled();

    const onInput = vi.fn();
    await render(h(Picker, { inputable: true, onInput, readonly: true }));
    await setInputValue(container.querySelector('input')!, 'ignored');
    expect(onInput).not.toHaveBeenCalled();
  });

  it('runs render-context commands and hover popup pointer transitions', async () => {
    vi.useFakeTimers();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const onOpenChange = vi.fn();
    let context: { close(): void; confirm(): void; cancel(): void } | undefined;
    await render(
      h(
        Picker,
        {
          defaultOpen: true,
          hoverHideDelay: 20,
          onCancel,
          onConfirm,
          onOpenChange,
          trigger: 'hover',
        },
        current => {
          context = current;
          return h('div', null, 'Hover panel');
        },
      ),
    );
    await dispatch(container.firstElementChild!, new MouseEvent('mouseout', { bubbles: true }));
    await dispatch(
      document.querySelector('[role="dialog"]')!,
      new MouseEvent('mouseover', { bubbles: true }),
    );
    await act(async () => vi.advanceTimersByTime(20));
    expect(onOpenChange).not.toHaveBeenCalledWith(false, expect.anything());
    await act(async () => context?.confirm());
    expect(onConfirm).toHaveBeenCalledOnce();

    await render(
      h(Picker, { defaultOpen: true, onCancel, onOpenChange }, current => {
        context = current;
        return h('div', null, 'Panel');
      }),
    );
    await act(async () => context?.cancel());
    expect(onCancel).toHaveBeenCalledOnce();
    await render(
      h(Picker, { onOpenChange, open: true }, current => {
        context = current;
        return h('div', null, 'Panel');
      }),
    );
    await act(async () => context?.close());
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'imperative' });
  });

  it('clears hover timers on unmount and supports custom portal targets', async () => {
    vi.useFakeTimers();
    const target = document.createElement('section');
    document.body.append(target);
    const onOpenChange = vi.fn();
    await render(
      h(Picker, {
        defaultOpen: true,
        hoverHideDelay: 50,
        onOpenChange,
        portalContainer: target,
        trigger: 'hover',
      }),
    );
    expect(target.querySelector('[role="dialog"]')).not.toBeNull();
    await dispatch(container.firstElementChild!, new MouseEvent('mouseout', { bubbles: true }));
    await act(async () => root.unmount());
    await act(async () => vi.advanceTimersByTime(50));
    expect(onOpenChange).not.toHaveBeenCalledWith(false, expect.anything());
    target.remove();
    root = createRoot(container);
  });

  it('covers hidden destruction, default status content and default trigger regions', async () => {
    const pickerRef = createRef<PickerHandle>();
    await render(
      h(Picker, {
        defaultOpen: false,
        destroyOnHide: true,
        formatValue: value => value,
        prefix: h('span', { 'data-prefix': '' }, 'Prefix'),
        ref: pickerRef,
        suffix: h('span', { 'data-suffix': '' }, 'Suffix'),
        value: h('strong', { 'data-formatted': '' }, 'Formatted'),
      }),
    );
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(container.querySelector('[data-prefix]')?.textContent).toBe('Prefix');
    expect(container.querySelector('[data-suffix]')?.textContent).toBe('Suffix');
    expect(container.querySelector('[data-formatted]')?.textContent).toBe('Formatted');
    await act(async () => pickerRef.current?.close());

    await render(h(Picker, { defaultOpen: true, loading: true }));
    expect(document.querySelector('[role="status"]')?.textContent).toBe('Loading');
    const popup = document.querySelector('[role="dialog"]')!;
    await dispatch(popup, new MouseEvent('mouseout', { bubbles: true }));
    await dispatch(container.firstElementChild!, new MouseEvent('mouseover', { bubbles: true }));
  });

  it('forwards custom-trigger focus, blur and keyboard props and blocks disabled clearing', async () => {
    const pickerRef = createRef<PickerHandle>();
    const onOpenChange = vi.fn();
    await render(
      h(Picker, {
        clearable: true,
        defaultValue: 'value',
        disabled: true,
        onOpenChange,
        ref: pickerRef,
      }),
    );
    await act(async () => pickerRef.current?.clear());
    expect(container.querySelector('input')?.value).toBe('value');

    await render(
      h(
        Picker,
        {
          onOpenChange,
          renderTrigger: ({ triggerProps }) =>
            h('button', { ...triggerProps, type: 'button' }, 'Custom trigger'),
        },
        h('div', null, 'Panel'),
      ),
    );
    const trigger = container.querySelector('button')!;
    await dispatch(trigger, new FocusEvent('focusin', { bubbles: true }));
    await dispatch(trigger, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }));
    expect(onOpenChange).toHaveBeenCalledWith(true, { reason: 'trigger' });
    await dispatch(trigger, new MouseEvent('click', { bubbles: true }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'trigger' });
    await dispatch(trigger, new FocusEvent('focusout', { bubbles: true }));
  });
});
