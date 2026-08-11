import { act, createElement as h } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { click, getContainer, render } from '../../../__tests__/harness';
import { Switch } from '..';

describe('React Switch', () => {
  it('supports uncontrolled native input interaction', async () => {
    const onChange = vi.fn();
    await render(h(Switch, { defaultValue: false, label: 'Automatic updates', onChange }));

    const input = getContainer().querySelector<HTMLInputElement>('input[role="switch"]')!;
    expect(input.checked).toBe(false);
    await click(input);
    expect(input.checked).toBe(true);
    expect(onChange).toHaveBeenCalledWith(true, { reason: 'toggle' });
  });

  it('keeps controlled value authoritative until the parent updates it', async () => {
    const onChange = vi.fn();
    await render(h(Switch, { onChange, value: false }));

    const input = getContainer().querySelector<HTMLInputElement>('input[role="switch"]')!;
    await click(input);
    expect(input.checked).toBe(false);
    expect(onChange).toHaveBeenCalledWith(true, { reason: 'toggle' });

    await render(h(Switch, { onChange, value: true }));
    expect(input.checked).toBe(true);
  });

  it('blocks disabled, readonly, and pending guarded transitions', async () => {
    let finish!: (accepted: boolean) => void;
    const onChange = vi.fn();
    await render(
      h(Switch, {
        beforeChange: () => new Promise<boolean>(resolve => (finish = resolve)),
        onChange,
      }),
    );

    const input = getContainer().querySelector<HTMLInputElement>('input[role="switch"]')!;
    await click(input);
    expect(input.getAttribute('aria-busy')).toBe('true');
    await click(input);
    expect(onChange).not.toHaveBeenCalled();

    await act(async () => finish(true));
    expect(onChange).toHaveBeenCalledOnce();
    expect(input.checked).toBe(true);

    await render(h(Switch, { disabled: true, onChange, value: false }));
    await click(input);
    expect(onChange).toHaveBeenCalledOnce();

    await render(h(Switch, { onChange, readOnly: true, value: false }));
    await click(input);
    expect(onChange).toHaveBeenCalledOnce();
  });
});
