import { describe, expect, it } from 'vitest';
import {
  GRID_DEFAULTS,
  GRID_ITEM_DEFAULTS,
  isGridAlignment,
  isGridValue,
  resolveGridContainer,
  resolveGridItem,
  resolveGridValue,
} from '..';

describe('Layout Core', () => {
  it('defines stable defaults and validators', () => {
    expect(GRID_DEFAULTS).toEqual({
      tag: 'div',
      cols: 24,
      align: 'stretch',
      justify: 'stretch',
    });
    expect(GRID_ITEM_DEFAULTS).toEqual({ span: 1, offset: 0 });
    expect(isGridAlignment('center')).toBe(true);
    expect(isGridAlignment('middle')).toBe(false);
    expect(isGridValue({ xs: 2, md: 6 })).toBe(true);
    expect(isGridValue({ phone: 2 })).toBe(false);
    expect(isGridValue(Number.NaN)).toBe(false);
  });

  it('resolves inherited responsive values and normalizes inputs', () => {
    expect(resolveGridValue({ xs: 2, md: 4 }, 24)).toEqual({
      xs: 2,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 4,
      xxl: 4,
    });
    expect(resolveGridValue(3.8, 1, { integer: true }).xs).toBe(3);
    expect(resolveGridValue(-2, 1, { min: 0 }).xs).toBe(0);
  });

  it('resolves directional gaps and clamps grid items', () => {
    const container = resolveGridContainer({
      cols: { xs: 4, md: 12 },
      gap: 4,
      columnGap: { md: 12 },
      rowGap: 8,
    });
    expect(container.columnGap).toMatchObject({ xs: 4, sm: 4, md: 12 });
    expect(container.rowGap.md).toBe(8);

    const item = resolveGridItem({ span: { xs: 0, md: 4 }, offset: { md: 2 } }, container);
    expect(item.xs).toEqual({ visible: false, span: 1, offset: 0 });
    expect(item.md).toEqual({ visible: true, span: 6, offset: 2 });

    const oversized = resolveGridItem({ span: 20, offset: 20 }, resolveGridContainer({ cols: 4 }));
    expect(oversized.xs).toEqual({ visible: true, span: 4, offset: 3 });
  });
});
