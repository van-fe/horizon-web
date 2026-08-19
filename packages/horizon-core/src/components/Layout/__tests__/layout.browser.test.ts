import { describe, expect, it } from 'vitest';
import { resolveGridContainerStyle, resolveGridItemStyle } from '..';

describe('Layout Web Core', () => {
  it('creates responsive container and item CSS variables', () => {
    const container = resolveGridContainerStyle({
      cols: { xs: 4, md: 12 },
      gap: 4,
      columnGap: { md: 12 },
      rowGap: 8,
      align: 'center',
      justify: 'end',
    });
    expect(container.style).toMatchObject({
      alignItems: 'center',
      justifyItems: 'end',
      '--h-grid-cols-xs': '4',
      '--h-grid-cols-md': '12',
      '--h-grid-column-gap-md': '12px',
      '--h-grid-row-gap-sm': '8px',
    });

    const item = resolveGridItemStyle(
      { span: { xs: 0, md: 4 }, offset: { md: 2 } },
      container.context,
    );
    expect(item['--h-grid-item-display-xs']).toBe('none');
    expect(item['--h-grid-item-display-md']).toBe('block');
    expect(item['--h-grid-item-span-md']).toBe('6');
    expect(item['--h-grid-item-offset-md']).toContain('calc(');
  });

  it('supports a configured namespace and visible display', () => {
    const container = resolveGridContainerStyle({ cols: 2 }, 'aurora');
    const item = resolveGridItemStyle({ span: 1 }, container.context, 'flex', 'aurora');
    expect(container.style['--aurora-grid-cols-xs']).toBe('2');
    expect(item['--aurora-grid-item-display-xs']).toBe('flex');
  });
});
