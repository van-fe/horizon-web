import { act, createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Input } from '../../../index';
import type { InputHandle } from '../../../index';
import { dispatch, getContainer, render } from '../../../__tests__/harness';

describe('React Input', () => {
  it('updates an uncontrolled value and commits changes on blur', async () => {
    const onValueChange = vi.fn();
    const onInput = vi.fn();
    const onChange = vi.fn();
    await render(h(Input, { defaultValue: 'before', onChange, onInput, onValueChange }));
    const field = getContainer().querySelector('input')!;
    await dispatch(field, new FocusEvent('focusin', { bubbles: true }));
    field.value = 'after';
    await dispatch(field, new InputEvent('input', { bubbles: true, data: 'after' }));
    expect(onValueChange).toHaveBeenCalledWith('after');
    expect(onInput).toHaveBeenCalledWith('after', expect.any(Object));
    await dispatch(field, new FocusEvent('focusout', { bubbles: true }));
    expect(onChange).toHaveBeenCalledWith('after');
  });

  it('supports clear, password visibility, regions and limit state', async () => {
    const onClear = vi.fn();
    await render(
      h(Input, {
        allowOverflow: true,
        append: 'append',
        clearable: true,
        defaultValue: 'secret',
        maxLength: 3,
        onClear,
        prefix: 'prefix',
        prepend: 'prepend',
        showLimit: true,
        showPassword: true,
        suffix: 'suffix',
        type: 'password',
      }),
    );
    const container = getContainer();
    expect(container.querySelector('input')?.type).toBe('password');
    expect(container.querySelector('.is-out-of-exceeded')).not.toBeNull();
    expect(container.textContent).toContain('prefix');
    const password = container.querySelector<HTMLButtonElement>('[aria-label="Show password"]')!;
    await dispatch(password, new MouseEvent('click', { bubbles: true }));
    expect(container.querySelector('input')?.type).toBe('text');
    const clear = container.querySelector<HTMLButtonElement>('[aria-label="Clear input"]')!;
    await dispatch(clear, new MouseEvent('click', { bubbles: true }));
    expect(container.querySelector('input')?.value).toBe('');
    expect(onClear).toHaveBeenCalledOnce();
  });

  it('renders an auto-sized textarea and exposes native commands', async () => {
    const ref = createRef<InputHandle>();
    await render(
      h(Input, {
        autoSize: { maxRows: 3, minRows: 2 },
        defaultValue: 'text',
        ref,
        type: 'textarea',
      }),
    );
    const textarea = getContainer().querySelector('textarea')!;
    await act(async () => ref.current?.focus());
    expect(document.activeElement).toBe(textarea);
    await act(async () => ref.current?.select());
    expect(textarea.selectionStart).toBe(0);
    expect(textarea.selectionEnd).toBe(textarea.value.length);
    expect(ref.current?.input).toBe(textarea);
    await act(async () => ref.current?.blur());
    expect(document.activeElement).not.toBe(textarea);
  });

  it('keeps disabled fields inert', async () => {
    const onValueChange = vi.fn();
    await render(
      h(Input, { clearable: true, defaultValue: 'locked', disabled: true, onValueChange }),
    );
    const field = getContainer().querySelector('input')!;
    expect(field.disabled).toBe(true);
    expect(getContainer().querySelector('[aria-label="Clear input"]')).toBeNull();
    field.value = 'ignored';
    await dispatch(field, new InputEvent('input', { bubbles: true }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
