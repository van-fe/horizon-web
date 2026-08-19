import { createElement as h } from 'react';
import { describe, expect, it } from 'vitest';
import { Divider, HorizonWebProvider } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

describe('React Divider', () => {
  it('renders separator semantics, title placement and line style', async () => {
    await render(
      h(
        Divider,
        {
          direction: 'horizontal',
          horizontalMargin: 12,
          lineStyle: 'dashed',
          titlePlacement: 'left',
          variant: 'secondary',
        },
        'Details',
      ),
    );

    const divider = getContainer().querySelector('[role="separator"]') as HTMLElement;
    expect(divider.getAttribute('aria-orientation')).toBe('horizontal');
    expect(divider.classList.contains('h-divider--strong')).toBe(true);
    expect(divider.classList.contains('h-divider--title-left')).toBe(true);
    expect(divider.style.margin).toBe('12px 0px');
    expect(
      (divider.querySelector('.h-divider__line-left') as HTMLElement).style.borderTopStyle,
    ).toBe('dashed');
    expect(divider.textContent).toContain('Details');
  });

  it('uses the configured namespace for classes and default variables', async () => {
    await render(h(HorizonWebProvider, { namespace: 'X' }, h(Divider, { direction: 'vertical' })));

    const divider = getContainer().querySelector('[role="separator"]') as HTMLElement;
    expect(divider.classList.contains('x-divider')).toBe(true);
    expect(divider.getAttribute('aria-orientation')).toBe('vertical');
    expect(divider.style.margin).toContain('--x-divider-spacing-vertical-margin');
  });
});
