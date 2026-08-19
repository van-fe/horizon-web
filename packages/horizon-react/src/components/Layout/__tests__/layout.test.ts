import { createElement as h } from 'react';
import { describe, expect, it } from 'vitest';
import { getContainer, render } from '../../../__tests__/harness';
import { Grid, GridItem } from '..';

describe('React Layout', () => {
  it('renders responsive columns, gaps and alignment', async () => {
    await render(
      h(
        Grid,
        {
          cols: { xs: 2, md: 4 },
          gap: 4,
          columnGap: { md: 12 },
          rowGap: 8,
          align: 'center',
          justify: 'end',
        },
        h(GridItem, { span: { xs: 1, md: 2 } }, 'Item'),
      ),
    );
    const grid = getContainer().querySelector<HTMLElement>('.h-grid')!;
    expect(grid.style.getPropertyValue('--h-grid-cols-xs')).toBe('2');
    expect(grid.style.getPropertyValue('--h-grid-cols-md')).toBe('4');
    expect(grid.style.getPropertyValue('--h-grid-column-gap-md')).toBe('12px');
    expect(grid.style.getPropertyValue('--h-grid-row-gap-sm')).toBe('8px');
    expect(grid.style.alignItems).toBe('center');
    expect(grid.style.justifyItems).toBe('end');
  });

  it('provides responsive span and offset to items', async () => {
    await render(
      h(
        Grid,
        { cols: { xs: 4, md: 12 }, columnGap: { xs: 4, md: 12 } },
        h(Grid.Item, { span: { xs: 0, md: 4 }, offset: { md: 2 } }, 'Item'),
      ),
    );
    const item = getContainer().querySelector<HTMLElement>('.h-grid-item')!;
    expect(item.style.getPropertyValue('--h-grid-item-display-xs')).toBe('none');
    expect(item.style.getPropertyValue('--h-grid-item-display-md')).toBe('block');
    expect(item.style.getPropertyValue('--h-grid-item-span-md')).toBe('6');
    expect(item.style.getPropertyValue('--h-grid-item-offset-md')).toContain('calc(');
  });

  it('supports a custom semantic element and native props', async () => {
    await render(
      h(
        Grid,
        { tag: 'section', 'aria-label': 'Metrics', className: 'custom-grid' },
        h(GridItem, { className: 'custom-item' }, h('strong', null, 'Metrics content')),
      ),
    );
    const grid = getContainer().querySelector('section');
    expect(grid).toHaveAttribute('aria-label', 'Metrics');
    expect(grid).toHaveClass('h-grid', 'custom-grid');
    expect(grid?.querySelector('.custom-item strong')).toHaveTextContent('Metrics content');
  });

  it('uses safe standalone item defaults and forwards refs', async () => {
    let gridElement: HTMLElement | null = null;
    let itemElement: HTMLDivElement | null = null;
    await render(
      h(
        Grid,
        { ref: (value: HTMLElement | null) => (gridElement = value) },
        h(GridItem, { ref: (value: HTMLDivElement | null) => (itemElement = value) }, 'Item'),
      ),
    );
    expect(gridElement).toBeInstanceOf(HTMLElement);
    expect(itemElement).toBeInstanceOf(HTMLDivElement);
    expect(itemElement?.style.getPropertyValue('--h-grid-item-span-xs')).toBe('1');
  });
});
