import { createElement as h, createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { HorizonWebProvider, List, ListItem } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

describe('React List', () => {
  it('renders typed data, regions, shared states and a forwarded ref', async () => {
    const ref = createRef<HTMLDivElement>();
    const data = [
      { id: 1, name: 'Alpha' },
      { id: 2, name: 'Beta' },
    ];
    await render(
      h(List, {
        ref,
        data,
        border: true,
        zebra: true,
        header: h('strong', null, 'Header'),
        footer: 'Footer',
        maxHeight: 120,
        renderItem: item => h(ListItem, { key: item.id, title: item.name }),
      }),
    );
    expect(ref.current?.getAttribute('role')).toBe('list');
    expect(ref.current?.classList.contains('is-border')).toBe(true);
    expect(ref.current?.classList.contains('is-zebra')).toBe(true);
    expect(ref.current?.style.maxHeight).toBe('120px');
    expect(ref.current?.querySelectorAll('[role="listitem"]')).toHaveLength(2);
    expect(ref.current?.querySelector('.h-list__footer')?.textContent).toBe('Footer');
  });

  it('uses provider size and supports static children', async () => {
    await render(
      h(
        HorizonWebProvider,
        { size: 'small' },
        h(List, null, h(ListItem, { title: 'One' }, 'Body')),
      ),
    );
    expect(getContainer().querySelector('.h-list')?.classList.contains('h-list--small')).toBe(true);
    expect(getContainer().querySelector('.h-list-item__main--default')?.textContent).toBe('Body');
  });

  it('renders all ListItem regions and wraps long narrow content', async () => {
    await render(
      h(
        'div',
        { style: { width: '390px' } },
        h(
          List,
          null,
          h(
            ListItem,
            {
              titleContent: h('b', null, 'Custom'),
              leading: 'L',
              descriptionContent: 'D'.repeat(300),
              actions: 'Action',
            },
            'Content',
          ),
        ),
      ),
    );
    const item = getContainer().querySelector('.h-list-item') as HTMLElement;
    expect(item.querySelector('.h-list-item__main--sider')?.textContent).toBe('L');
    expect(item.querySelector('b')?.textContent).toBe('Custom');
    expect(item.querySelector('.h-list-item__right')?.textContent).toBe('Action');
    expect(item.scrollWidth).toBeLessThanOrEqual(item.clientWidth);
  });
});
