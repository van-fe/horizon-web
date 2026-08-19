import { createElement as h, StrictMode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { HorizonWebProvider, QRCode } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

const icon = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

describe('React QRCode', () => {
  it('renders a scannable SVG with native accessibility and shared visual options', async () => {
    await render(
      h(QRCode, {
        value: 'https://example.com',
        size: 128,
        level: 'H',
        color: '#123456',
        background: '#fedcba',
        margin: 3,
        ariaLabel: 'Account sign-in code',
      }),
    );

    const root = getContainer().querySelector('.h-qrcode') as HTMLElement;
    await vi.waitFor(() => expect(root.querySelector('svg')).not.toBeNull());
    expect(root.style.width).toBe('128px');
    expect(root.style.height).toBe('128px');
    expect(root.getAttribute('aria-busy')).toBeNull();
    expect(root.querySelector('[role="img"]')?.getAttribute('aria-label')).toBe(
      'Account sign-in code',
    );
    expect(root.innerHTML).toContain('#123456');
    expect(root.innerHTML).toContain('#fedcba');
  });

  it('renders an icon and hides it behind an expired overlay', async () => {
    const onRefresh = vi.fn();
    await render(h(QRCode, { value: 'contract', icon, iconSize: 24, onRefresh }));

    await vi.waitFor(() => expect(getContainer().querySelector('svg')).not.toBeNull());
    const image = getContainer().querySelector('.h-qrcode__icon') as HTMLImageElement;
    expect(image.width).toBe(24);
    expect(image.height).toBe(24);

    await render(
      h(
        HorizonWebProvider,
        { qrCodeLabels: { expired: 'Session expired', refresh: 'Reload' } },
        h(QRCode, { value: 'contract', icon, expired: true, onRefresh }),
      ),
    );
    expect(getContainer().querySelector('.h-qrcode__icon')).toBeNull();
    expect(getContainer().textContent).toContain('Session expired');
    const button = getContainer().querySelector('button') as HTMLButtonElement;
    expect(button.classList.contains('h-button')).toBe(true);
    expect(button.textContent).toBe('Reload');
    button.click();
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('supports custom expired content and forwards the root ref', async () => {
    const ref = { current: null as HTMLDivElement | null };
    await render(
      h(QRCode, {
        value: 'expired',
        expired: true,
        expiredContent: h('strong', { 'data-expired': true }, 'Renew access'),
        ref,
      }),
    );
    expect(ref.current).toBe(getContainer().querySelector('.h-qrcode'));
    expect(getContainer().querySelector('[data-expired]')?.textContent).toBe('Renew access');
    expect(getContainer().querySelector('button')).toBeNull();
  });

  it('reports real generation errors exactly once in StrictMode', async () => {
    const onError = vi.fn();
    await render(h(StrictMode, null, h(QRCode, { value: 'x'.repeat(10_000), onError })));
    await vi.waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
  });
});
