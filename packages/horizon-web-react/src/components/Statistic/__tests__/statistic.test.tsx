import { createElement as h } from 'react';
import { describe, expect, it } from 'vitest';
import { Statistic } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

describe('React Statistic', () => {
  it('formats values and exposes loading state', async () => {
    await render(
      h(Statistic, {
        loading: true,
        locale: 'en-US',
        precision: 2,
        prefix: '$',
        suffix: ' USD',
        title: 'Revenue',
        value: 1234.5,
      }),
    );
    const root = getContainer().querySelector('.h-statistic') as HTMLElement;
    expect(root.getAttribute('aria-busy')).toBe('true');
    expect(root.querySelector('.h-statistic__number')?.textContent).toBe('1,234.50');
    expect(root.querySelector('.h-statistic__prefix')?.textContent).toBe('$');
  });
  it('renders trend and custom value regions', async () => {
    await render(
      h(
        Statistic,
        { trend: 'up', trendType: 'success', trendValue: '12%' },
        h('strong', null, 'Custom'),
      ),
    );
    expect(getContainer().querySelector('.h-statistic__number')?.textContent).toBe('Custom');
    expect(getContainer().querySelector('.h-statistic__trend')?.getAttribute('aria-label')).toBe(
      'Increased',
    );
    expect(getContainer().querySelector('.h-statistic--trend-success')).not.toBeNull();
  });
});
