import { createElement as h } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Alert } from '../../../index';
import { click, getContainer, render } from '../../../__tests__/harness';

describe('React Alert', () => {
  it('renders shared status and live-region semantics', async () => {
    await render(
      h(Alert, {
        description: 'Check the form',
        showIcon: true,
        title: 'Warning',
        type: 'warning',
      }),
    );
    const root = getContainer().querySelector('.h-alert') as HTMLElement;
    expect(root.getAttribute('role')).toBe('alert');
    expect(root.getAttribute('aria-live')).toBe('assertive');
    expect(root.textContent).toContain('Warning');
    expect(root.textContent).toContain('Check the form');
  });
  it('dismisses through the close callback', async () => {
    const onClose = vi.fn();
    await render(h(Alert, { onClose }, 'Closable'));
    await click(getContainer().querySelector('button[aria-label="Close alert"]')!);
    expect(onClose).toHaveBeenCalledOnce();
    expect(getContainer().querySelector('.h-alert')).toBeNull();
  });
  it('passes an imperative close function to actions', async () => {
    const onPrimary = vi.fn((close: () => void) => close());
    await render(h(Alert, { onPrimary, primaryButtonText: 'Retry' }));
    await click(getContainer().querySelector('button')!);
    expect(onPrimary).toHaveBeenCalledOnce();
    expect(getContainer().querySelector('.h-alert')).toBeNull();
  });
});
