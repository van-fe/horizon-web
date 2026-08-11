import { createElement as h } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Result } from '../../../index';
import { click, getContainer, render } from '../../../__tests__/harness';

describe('React Result', () => {
  it('renders icon and HTTP status semantics', async () => {
    await render(h(Result, { subtitle: 'Everything is ready', title: 'Success', type: 'success' }));
    expect(getContainer().querySelector('[data-result-type="success"]')?.textContent).toBe('✓');
    expect(getContainer().querySelector('.h-result__title')?.textContent).toBe('Success');
    await render(h(Result, { primaryButton: false, secondaryButton: false, type: 404 }));
    expect(
      getContainer().querySelector('img[data-result-status="404"]')?.getAttribute('src'),
    ).toMatch(/^(data:image\/svg\+xml|.*result-not-found)/);
  });
  it('emits native action callbacks', async () => {
    const onPrimaryClick = vi.fn();
    const onSecondaryClick = vi.fn();
    await render(
      h(Result, {
        onPrimaryClick,
        onSecondaryClick,
        primaryButtonText: 'Continue',
        secondaryButtonText: 'Back',
      }),
    );
    const buttons = getContainer().querySelectorAll('button');
    await click(buttons[0]);
    await click(buttons[1]);
    expect(onSecondaryClick).toHaveBeenCalledOnce();
    expect(onPrimaryClick).toHaveBeenCalledOnce();
  });
});
