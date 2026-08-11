import { createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox, CheckboxButton, CheckboxGroup } from '../../../index';
import type { CheckboxHandle } from '../../../index';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';

describe('React Checkbox', () => {
  it('supports uncontrolled scalar toggles and state-aware labels', async () => {
    const onChange = vi.fn();
    await render(
      h(Checkbox, { defaultValue: false, onChange, optionValue: 'alerts' }, ({ checked }) =>
        checked ? 'Enabled' : 'Disabled',
      ),
    );
    const input = getContainer().querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(false);
    expect(getContainer().textContent).toContain('Disabled');
    await click(input);
    expect(input.checked).toBe(true);
    expect(getContainer().textContent).toContain('Enabled');
    expect(onChange).toHaveBeenLastCalledWith(true, {
      checked: true,
      optionValue: 'alerts',
    });
  });

  it('adds and removes group values without losing existing selections', async () => {
    const onChange = vi.fn();
    await render(
      h(
        CheckboxGroup,
        { defaultValue: ['kept'], onChange },
        h(Checkbox, { optionValue: 'added' }, 'Added'),
      ),
    );
    const input = getContainer().querySelector('input') as HTMLInputElement;
    await click(input);
    expect(onChange).toHaveBeenLastCalledWith(['kept', 'added']);
    expect(input.checked).toBe(true);
    await click(input);
    expect(onChange).toHaveBeenLastCalledWith(['kept']);
  });

  it('supports custom values, native mixed state and controlled values', async () => {
    const onChange = vi.fn();
    await render(
      h(Checkbox, {
        falseValue: 'off',
        indeterminate: true,
        onChange,
        trueValue: 'on',
        value: 'off',
      }),
    );
    const input = getContainer().querySelector('input') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
    expect(input.getAttribute('aria-checked')).toBe('mixed');
    await click(input);
    expect(onChange).toHaveBeenCalledWith('on', { checked: true, optionValue: '' });
    expect(input.checked).toBe(false);
  });

  it('covers button, disabled, readonly, native events and imperative commands', async () => {
    const ref = createRef<CheckboxHandle>();
    const onBlur = vi.fn();
    const onClick = vi.fn();
    await render(
      h(
        CheckboxButton,
        {
          defaultValue: true,
          fill: 'rgb(1, 2, 3)',
          onBlur,
          onClick,
          ref,
          size: 'large',
        },
        'Choice',
      ),
    );
    const root = getContainer().querySelector('.h-checkbox-button') as HTMLElement;
    const input = root.querySelector('input') as HTMLInputElement;
    expect(root.classList.contains('h-checkbox-button--large')).toBe(true);
    expect(root.style.backgroundColor).toBe('rgb(1, 2, 3)');
    ref.current?.focus();
    expect(document.activeElement).toBe(input);
    await dispatch(input, new FocusEvent('focusout', { bubbles: true }));
    expect(onBlur).toHaveBeenCalledOnce();
    await click(input);
    expect(onClick).toHaveBeenCalledOnce();

    await render(h(Checkbox, { defaultValue: true, readOnly: true }, 'Visible'));
    expect(getContainer().querySelector('input')).toBeNull();
    expect(getContainer().textContent).toContain('Visible');
    await render(h(Checkbox, { disabled: true }, 'Disabled'));
    expect((getContainer().querySelector('input') as HTMLInputElement).disabled).toBe(true);
  });
});
