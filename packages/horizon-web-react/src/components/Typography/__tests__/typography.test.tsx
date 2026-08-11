import { createElement as h } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Typography } from '../../../index';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';

describe('React Typography', () => {
  it('renders heading and shared visual semantics', async () => {
    await render(
      h(
        Typography,
        { deleted: true, level: 2, prefix: 'Before ', variant: 'success', weight: 'bold' },
        'Revenue',
      ),
    );

    const root = getContainer().querySelector('.h-typography') as HTMLElement;
    expect(root.tagName).toBe('H2');
    expect(root.classList.contains('h-typography--success')).toBe(true);
    expect(root.classList.contains('h-typography--heading-2')).toBe(true);
    expect(root.classList.contains('is-deleted')).toBe(true);
    expect(root.textContent).toContain('Before Revenue');
  });

  it('commits uncontrolled edits through native callbacks', async () => {
    const onChange = vi.fn();
    const onValueChange = vi.fn();
    await render(
      h(Typography, { defaultValue: 'Before', editable: true, onChange, onValueChange }),
    );

    await click(getContainer().querySelector('button[aria-label="Edit"]')!);
    const input = getContainer().querySelector('input') as HTMLInputElement;
    input.value = 'After';
    await dispatch(input, new InputEvent('input', { bubbles: true }));
    await dispatch(input, new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));

    expect(onValueChange).toHaveBeenCalledWith('After');
    expect(onChange).toHaveBeenCalledWith('After');
    expect(getContainer().querySelector('.h-typography__content')?.textContent).toBe('After');
  });

  it('reports clipboard results through the shared copy event', async () => {
    const onCopy = vi.fn();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    await render(h(Typography, { copyable: true, onCopy, value: 'Copy me' }));

    await click(getContainer().querySelector('button[aria-label="Copy"]')!);
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledWith('Copy me');
    expect(onCopy).toHaveBeenCalledWith('Copy me', true);
  });
});
