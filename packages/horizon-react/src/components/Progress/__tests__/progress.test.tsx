import { createElement as h } from 'react';
import { describe, expect, it } from 'vitest';
import { Progress } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

describe('React Progress', () => {
  it('renders line progress with shared formatting and accessibility', async () => {
    await render(h(Progress, { format: value => `${value} complete`, percentage: 42 }));

    const root = getContainer().querySelector('[role="progressbar"]') as HTMLElement;
    expect(root.getAttribute('aria-valuenow')).toBe('42');
    expect(root.getAttribute('aria-valuetext')).toBe('42 complete');
    expect(root.classList.contains('h-progress-line')).toBe(true);
    expect((root.querySelector('.h-progress-bar__inner') as HTMLElement).style.width).toBe('42%');
    expect(root.querySelector('.h-progress__text')?.textContent).toBe('42 complete');
  });

  it('renders status and custom color semantics', async () => {
    await render(h(Progress, { color: ['red', 'green'], percentage: 75, status: 'success' }));

    const root = getContainer().querySelector('.h-progress') as HTMLElement;
    expect(
      (root.querySelector('.h-progress-bar__inner') as HTMLElement).style.backgroundColor,
    ).toBe('green');
    expect(root.querySelector('.h-progress__text')?.textContent).toBe('✓');
  });

  it('renders dashboard SVG and accepts custom label content', async () => {
    await render(h(Progress, { percentage: 30, type: 'dashboard' }, h('strong', null, 'Syncing')));

    const root = getContainer().querySelector('.h-progress') as HTMLElement;
    expect(root.classList.contains('h-progress-dashboard')).toBe(true);
    expect(root.querySelectorAll('svg path')).toHaveLength(2);
    expect(root.getAttribute('aria-valuetext')).toBe('30%');
    expect(root.querySelector('.h-progress__text')?.textContent).toBe('Syncing');
  });
});
