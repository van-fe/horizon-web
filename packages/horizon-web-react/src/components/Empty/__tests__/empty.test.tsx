import { createElement as h } from 'react';
import { describe, expect, it } from 'vitest';
import { Empty } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

describe('React Empty', () => {
  it('renders the shared default illustration and size', async () => {
    await render(h(Empty, { description: 'No records' }));
    const root = getContainer().querySelector('.h-empty') as HTMLElement;
    expect(root.classList.contains('h-empty--medium')).toBe(true);
    expect(root.querySelector('img')?.getAttribute('src')).toMatch(
      /^(data:image\/svg\+xml|.*empty-default)/,
    );
    expect(root.querySelector('.h-empty__description')?.textContent).toBe('No records');
  });
  it('renders numeric and custom regions', async () => {
    await render(
      h(
        Empty,
        {
          descriptionContent: h('em', null, 'Custom'),
          imageContent: h('span', null, 'Image'),
          size: 120,
        },
        h('button', null, 'Create'),
      ),
    );
    expect((getContainer().querySelector('.h-empty__image') as HTMLElement).style.width).toBe(
      '120px',
    );
    expect(getContainer().querySelector('.h-empty__description')?.textContent).toBe('Custom');
    expect(getContainer().querySelector('.h-empty__bottom')?.textContent).toBe('Create');
  });
});
