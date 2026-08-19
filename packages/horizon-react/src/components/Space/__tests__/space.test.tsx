import { createElement as h, Fragment } from 'react';
import { describe, expect, it } from 'vitest';
import { Space, SpaceItem } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

describe('React Space', () => {
  it('wraps child regions and applies preset layout semantics', async () => {
    await render(
      h(
        Space,
        { block: true, direction: 'horizontal', size: 'large', wrap: true },
        h('button', null, 'One'),
        false,
        null,
        h('button', null, 'Two'),
      ),
    );

    const space = getContainer().querySelector('.h-space')!;
    expect(space.classList.contains('h-space--block')).toBe(true);
    expect(space.classList.contains('h-space--horizontal')).toBe(true);
    expect(space.classList.contains('h-space--center')).toBe(true);
    expect(space.classList.contains('h-space--wrap')).toBe(true);
    expect(space.classList.contains('h-space--large')).toBe(true);
    expect(space.children).toHaveLength(2);
  });

  it('supports custom gaps and a semantic divider separator', async () => {
    await render(
      h(
        Space,
        { direction: 'vertical', separator: true, size: [8, '1rem'] },
        h('span', null, 'One'),
        h('span', null, 'Two'),
      ),
    );

    const space = getContainer().querySelector('.h-space') as HTMLElement;
    expect(space.style.gap).toBe('8px 1rem');
    expect(space.classList.contains('h-space--vertical')).toBe(true);
    expect(space.querySelectorAll('[role="separator"]')).toHaveLength(1);
    expect(space.querySelector('[role="separator"]')?.getAttribute('aria-orientation')).toBe(
      'horizontal',
    );
  });

  it('preserves explicit SpaceItem children and custom separators', async () => {
    await render(
      h(
        Space,
        { separator: h('span', { 'data-separator': true }, '|') },
        h(Fragment, null, h(SpaceItem, { 'data-item': true }, 'One'), h('span', null, 'Two')),
      ),
    );

    const space = getContainer().querySelector('.h-space')!;
    expect(space.querySelectorAll('[data-separator]')).toHaveLength(1);
    expect(space.querySelectorAll('[data-item]')).toHaveLength(1);
    expect(space.textContent).toBe('One|Two');
  });
});
