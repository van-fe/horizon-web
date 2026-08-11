import { act, createElement as h, createRef } from 'react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { Radio, RadioButton, RadioGroup } from '../../../index';
import type { RadioHandle } from '../../../index';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';

describe('React Radio', () => {
  it('supports uncontrolled groups and native group names', async () => {
    const onChange = vi.fn();
    await render(
      h(
        RadioGroup,
        { defaultValue: 'one', name: 'priority', onChange },
        h(Radio, { optionValue: 'one' }, 'One'),
        h(Radio, { optionValue: 'two' }, 'Two'),
      ),
    );
    const inputs = getContainer().querySelectorAll<HTMLInputElement>('input');
    expect(inputs[0].checked).toBe(true);
    expect(inputs[0].name).toBe('priority');
    expect(inputs[1].name).toBe('priority');
    await click(inputs[1]);
    expect(inputs[1].checked).toBe(true);
    expect(onChange).toHaveBeenCalledWith('two');
  });

  it('preserves item-level disabled state inside an enabled group', async () => {
    await render(
      h(
        RadioGroup,
        { defaultValue: 'one' },
        h(Radio, { optionValue: 'one' }, 'One'),
        h(Radio, { disabled: true, optionValue: 'two' }, 'Two'),
      ),
    );
    const inputs = getContainer().querySelectorAll<HTMLInputElement>('input');
    expect(inputs[0].disabled).toBe(false);
    expect(inputs[1].disabled).toBe(true);
  });

  it('keeps controlled values stable while reporting a selection', async () => {
    const onChange = vi.fn();
    await render(
      h(
        RadioGroup,
        { onChange, value: 'one' },
        h(Radio, { optionValue: 'one' }, 'One'),
        h(Radio, { optionValue: 'two' }, 'Two'),
      ),
    );
    const inputs = getContainer().querySelectorAll<HTMLInputElement>('input');
    await click(inputs[1]);
    expect(onChange).toHaveBeenCalledWith('two');
    expect(inputs[0].checked).toBe(true);
  });

  it('uses native keyboard navigation inside a group', async () => {
    const onChange = vi.fn();
    await render(
      h(
        RadioGroup,
        { defaultValue: 'one', onChange },
        h(Radio, { optionValue: 'one' }, 'One'),
        h(Radio, { optionValue: 'two' }, 'Two'),
      ),
    );
    const inputs = getContainer().querySelectorAll<HTMLInputElement>('input');
    inputs[0].focus();
    await act(async () => userEvent.keyboard('{ArrowRight}'));
    expect(document.activeElement).toBe(inputs[1]);
    expect(inputs[1].checked).toBe(true);
    expect(onChange).toHaveBeenCalledWith('two');
  });

  it('covers button, readonly, disabled, render labels, blur and focus refs', async () => {
    const ref = createRef<RadioHandle>();
    const onBlur = vi.fn();
    await render(
      h(
        RadioButton,
        {
          defaultValue: 'selected',
          fill: 'rgb(4, 5, 6)',
          onBlur,
          optionValue: 'selected',
          ref,
          size: 'large',
        },
        ({ checked }) => (checked ? 'Selected' : 'Idle'),
      ),
    );
    const root = getContainer().querySelector('.h-radio-button') as HTMLElement;
    const input = root.querySelector('input') as HTMLInputElement;
    expect(root.classList.contains('h-radio-button--large')).toBe(true);
    expect(root.style.backgroundColor).toBe('rgb(4, 5, 6)');
    expect(root.textContent).toContain('Selected');
    ref.current?.focus();
    expect(document.activeElement).toBe(input);
    await dispatch(input, new FocusEvent('focusout', { bubbles: true }));
    expect(onBlur).toHaveBeenCalledOnce();

    await render(h(Radio, { optionValue: 'hidden', readOnly: true, value: 'other' }, 'Hidden'));
    expect(getContainer().textContent).not.toContain('Hidden');
    await render(h(Radio, { disabled: true, optionValue: 'one' }, 'Disabled'));
    expect((getContainer().querySelector('input') as HTMLInputElement).disabled).toBe(true);
  });
});
