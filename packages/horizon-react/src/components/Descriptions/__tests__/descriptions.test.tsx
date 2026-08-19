import { createElement as h } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DescriptionItem, Descriptions, HorizonWebProvider } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

describe('React Descriptions', () => {
  afterEach(() => vi.restoreAllMocks());
  it('renders native structured regions, custom content and forwarded refs', async () => {
    let root: HTMLDivElement | null = null;
    await render(
      h(
        Descriptions,
        { ref: value => (root = value), titleContent: h('strong', null, 'Profile') },
        h(DescriptionItem, { labelContent: h('b', null, 'Name') }, 'Ada'),
      ),
    );
    expect(root?.querySelector('[role="list"]')).not.toBeNull();
    expect(root?.querySelector('[role="term"]')?.textContent).toBe('Name');
    expect(root?.querySelector('[role="definition"]')?.textContent).toBe('Ada');
  });

  it('resolves responsive columns and spans from the root width', async () => {
    await render(
      h(
        'div',
        { style: { width: 900 } },
        h(
          Descriptions,
          { type: 'vertical', column: 6, md: 3, border: true },
          h(DescriptionItem, { label: 'State', value: 'Ready', spanCol: 6, md: 2 }),
        ),
      ),
    );
    const content = getContainer().querySelector('.h-descriptions__content') as HTMLElement;
    const item = getContainer().querySelector('.h-descriptions__item') as HTMLElement;
    await vi.waitFor(() => {
      expect(content.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
      expect(item.style.gridColumn).toBe('span 2');
    });
    expect(content.classList.contains('h-descriptions--border')).toBe(true);
  });

  it('uses provider size and wraps long values inside a narrow surface', async () => {
    await render(
      h(
        HorizonWebProvider,
        { size: 'small' },
        h(
          'div',
          { style: { width: 390 } },
          h(
            Descriptions,
            { title: 'Details' },
            h(DescriptionItem, { label: 'Notes', value: 'A'.repeat(400) }),
          ),
        ),
      ),
    );
    const content = getContainer().querySelector('.h-descriptions__content') as HTMLElement;
    expect(content.classList.contains('h-descriptions--small')).toBe(true);
    expect(content.scrollWidth).toBeLessThanOrEqual(content.clientWidth);
  });
});
