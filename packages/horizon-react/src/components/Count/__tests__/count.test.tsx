import { createElement as h } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Count } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

describe('React Count', () => {
  it('renders a static formatted count and emits its value', async () => {
    const onChange = vi.fn();
    await render(
      h(Count, {
        autoPlay: false,
        decimal: 2,
        endValue: 12345.6,
        onChange,
        prefix: '$',
        suffix: ' USD',
      }),
    );
    await Promise.resolve();
    expect(getContainer().querySelector('.h-count__content')?.textContent).toBe('12,345.60');
    expect(getContainer().querySelector('.h-count')?.textContent).toContain('$');
    expect(onChange).toHaveBeenCalledWith(12345.6);
  });
  it('supports custom grouping and content regions', async () => {
    await render(
      h(Count, {
        autoPlay: false,
        endValue: -12345,
        extent: 3,
        prefixContent: h('b', null, 'P'),
        separator: '_',
      }),
    );
    expect(getContainer().querySelector('.h-count__content')?.textContent).toBe('-12_345');
    expect(getContainer().querySelector('b')?.textContent).toBe('P');
  });
});
