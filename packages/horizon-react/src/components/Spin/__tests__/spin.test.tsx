import { act, createElement as h } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HorizonWebProvider, Spin } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

afterEach(() => vi.useRealTimers());

describe('React Spin', () => {
  it('renders an accessible inline indicator and forwards its ref', async () => {
    let root: HTMLDivElement | null = null;
    await render(h(Spin, { ref: value => (root = value), size: 'large', tip: 'Loading data' }));
    expect(root?.classList.contains('h-spin--large')).toBe(true);
    expect(root?.querySelector('[role="status"]')?.getAttribute('aria-label')).toBe('Loading data');
    expect(root?.querySelector('.h-spin__icon')).not.toBeNull();
  });

  it('wraps regional content and isolates custom indicator content', async () => {
    await render(
      h(
        Spin,
        { indicator: h('span', { 'data-test': 'custom-indicator' }, '…'), tipContent: 'Wait' },
        h('button', { 'data-test': 'save' }, 'Save'),
      ),
    );
    const root = getContainer().querySelector('.h-spin') as HTMLElement;
    expect(root.getAttribute('aria-busy')).toBe('true');
    expect(root.classList.contains('is-nested')).toBe(true);
    expect(root.classList.contains('is-masked')).toBe(true);
    expect(root.querySelector('[data-test="save"]')).not.toBeNull();
    expect(root.querySelector('[data-test="custom-indicator"]')?.textContent).toBe('…');
  });

  it('honors delayed visibility and cancels stale work', async () => {
    vi.useFakeTimers();
    await render(h(Spin, { delay: 50 }));
    expect(getContainer().querySelector('[role="status"]')).toBeNull();
    await act(async () => vi.advanceTimersByTimeAsync(50));
    expect(getContainer().querySelector('[role="status"]')).not.toBeNull();
    await render(h(Spin, { delay: 50, spinning: false }));
    await act(async () => vi.advanceTimersByTimeAsync(50));
    expect(getContainer().querySelector('[role="status"]')).toBeNull();
  });

  it('uses the provider loading label and stays inside a narrow surface', async () => {
    await render(
      h(
        HorizonWebProvider,
        { spinLabels: { loading: 'Preparing workspace' } },
        h('div', { style: { width: 390 } }, h(Spin, { fullscreen: true }, 'A'.repeat(400))),
      ),
    );
    const root = getContainer().querySelector('.h-spin') as HTMLElement;
    const indicator = root.querySelector('[role="status"]') as HTMLElement;
    expect(root.classList.contains('is-fullscreen')).toBe(true);
    expect(indicator.getAttribute('aria-label')).toBe('Preparing workspace');
    expect(root.scrollWidth).toBeLessThanOrEqual(root.clientWidth);
  });
});
