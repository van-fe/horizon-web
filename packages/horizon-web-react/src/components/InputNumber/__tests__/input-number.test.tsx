import { act, createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Form, FormItem, InputNumber } from '../../../index';
import type { InputNumberHandle } from '../../../index';
import { dispatch, getContainer, render } from '../../../__tests__/harness';

describe('React InputNumber', () => {
  it('updates, commits and exposes numeric commands', async () => {
    const onValueChange = vi.fn();
    const onChange = vi.fn();
    const ref = createRef<InputNumberHandle>();
    await render(
      h(InputNumber, {
        defaultValue: 1,
        max: 3,
        onChange,
        onValueChange,
        ref,
      }),
    );
    const input = getContainer().querySelector<HTMLInputElement>('input')!;
    expect(input.value).toBe('1');
    await act(async () => ref.current?.increase());
    expect(input.value).toBe('2');
    expect(onValueChange).toHaveBeenLastCalledWith(2);
    expect(onChange).toHaveBeenLastCalledWith(2);
    await act(async () => ref.current?.decrease());
    expect(input.value).toBe('1');
    await act(async () => ref.current?.clear());
    expect(input.value).toBe('');
    expect(ref.current?.input).toBe(input);
  });

  it('supports precision string mode and formatter/parser input', async () => {
    const onValueChange = vi.fn();
    await render(
      h(InputNumber, {
        defaultValue: '1.20',
        formatter: value => `$${value}`,
        onValueChange,
        parser: value => value.replace('$', ''),
        precision: 2,
        stringMode: true,
      }),
    );
    const input = getContainer().querySelector<HTMLInputElement>('input')!;
    expect(input.value).toBe('$1.20');
    input.value = '$2.345';
    await dispatch(input, new InputEvent('input', { bubbles: true }));
    expect(onValueChange).toHaveBeenLastCalledWith('2.35');
    await dispatch(input, new FocusEvent('focusout', { bubbles: true }));
    expect(input.value).toBe('$2.35');
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('keeps controlled rendering owned by the caller', async () => {
    const onValueChange = vi.fn();
    const ref = createRef<InputNumberHandle>();
    await render(h(InputNumber, { onValueChange, ref, value: 1 }));
    const input = getContainer().querySelector<HTMLInputElement>('input')!;
    await act(async () => ref.current?.increase());
    expect(onValueChange).toHaveBeenLastCalledWith(2);
    expect(input.value).toBe('1');
  });

  it('handles keyboard, wheel and between controls at boundaries', async () => {
    await render(
      h(InputNumber, {
        controlsPosition: 'between',
        defaultValue: 1,
        max: 2,
        min: 0,
        wheelToChange: true,
      }),
    );
    const input = getContainer().querySelector<HTMLInputElement>('input')!;
    await dispatch(input, new FocusEvent('focusin', { bubbles: true }));
    await dispatch(input, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }));
    expect(input.value).toBe('2');
    expect(
      getContainer().querySelector('[aria-label="Increase value"]')?.getAttribute('aria-disabled'),
    ).toBe('true');
    await dispatch(input, new WheelEvent('wheel', { bubbles: true, deltaY: 1 }));
    expect(input.value).toBe('1');
    await dispatch(input, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowLeft' }));
    expect(input.value).toBe('0');
  });

  it('repeats a pointer step and cleans listeners on unmount', async () => {
    vi.useFakeTimers();
    const onValueChange = vi.fn();
    await render(
      h(InputNumber, { defaultValue: 0, longPress: true, longPressInterval: 10, onValueChange }),
    );
    const increase = getContainer().querySelector<HTMLButtonElement>(
      '[aria-label="Increase value"]',
    )!;
    await dispatch(
      increase,
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        isPrimary: true,
        pointerId: 7,
      }),
    );
    await act(async () => vi.advanceTimersByTimeAsync(530));
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange.mock.calls.map(([nextValue]) => nextValue)).toEqual([1, 2, 3, 4]);
    await render(h('div'));
    const count = onValueChange.mock.calls.length;
    await act(async () => vi.advanceTimersByTimeAsync(500));
    expect(onValueChange).toHaveBeenCalledTimes(count);
    vi.useRealTimers();
  });

  it('consumes Form disabled, invalid and label context', async () => {
    await render(
      h(
        Form,
        { disabled: true, model: { amount: null }, onlyRender: true },
        h(FormItem, { error: 'Invalid amount', field: 'amount', label: 'Amount' }, h(InputNumber)),
      ),
    );
    const input = getContainer().querySelector<HTMLInputElement>('input')!;
    expect(input.disabled).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(getContainer().querySelector('label')?.htmlFor).toBe(input.id);
    expect(input.getAttribute('aria-describedby')).toContain('-error');
  });
});
