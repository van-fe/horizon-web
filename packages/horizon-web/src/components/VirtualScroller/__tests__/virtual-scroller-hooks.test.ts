import { reactive } from 'vue';
import { describe, expect, test } from 'vitest';
import useRecycleScrollerLayout from '../src/composables/useRecycleScrollerLayout';
import useRecycleScrollerPool from '../src/composables/useRecycleScrollerPool';
import type { RecycleScrollerProps } from '../src/composables/useProps';

function createLayout(
  overrides: Partial<RecycleScrollerProps> & Pick<RecycleScrollerProps, 'items'>,
) {
  const props = reactive({
    keyField: 'id',
    typeField: 'type',
    sizeField: 'size',
    itemSize: null,
    itemSecondarySize: undefined,
    gridItems: undefined,
    minItemSize: 20,
    buffer: 0,
    ...overrides,
  }) as unknown as Readonly<RecycleScrollerProps>;

  return {
    layout: useRecycleScrollerLayout(props),
    props,
  };
}

describe('virtual scroller hooks', () => {
  test('calculates fixed-size, variable-size and grid ranges', () => {
    const fixed = createLayout({
      items: Array.from({ length: 100 }, (_, id) => ({ id })),
      itemSize: 50,
      buffer: 100,
    }).layout;

    expect(fixed.getRange(500, 700)).toEqual({
      startIndex: 8,
      endIndex: 16,
      visibleStartIndex: 10,
      visibleEndIndex: 14,
      totalSize: 5000,
    });

    const variable = createLayout({
      items: [
        { id: 0, size: 20 },
        { id: 1, size: 30 },
        { id: 2, size: 50 },
        { id: 3, size: 40 },
      ],
    }).layout;

    expect(variable.getRange(20, 50)).toEqual({
      startIndex: 1,
      endIndex: 2,
      visibleStartIndex: 1,
      visibleEndIndex: 2,
      totalSize: 140,
    });

    const grid = createLayout({
      items: Array.from({ length: 10 }, (_, id) => ({ id })),
      itemSize: 50,
      itemSecondarySize: 80,
      gridItems: 2,
    }).layout;

    expect(grid.getRange(50, 100)).toEqual({
      startIndex: 2,
      endIndex: 4,
      visibleStartIndex: 2,
      visibleEndIndex: 4,
      totalSize: 250,
    });
    expect(grid.getItemPosition(3)).toEqual({ position: 50, offset: 80 });
  });

  test('subtracts the before slot exactly once', () => {
    const layout = createLayout({
      items: Array.from({ length: 20 }, (_, id) => ({ id })),
      itemSize: 50,
      buffer: 100,
    }).layout;

    expect(layout.getRange(0, 300, 500)).toMatchObject({
      startIndex: 0,
      endIndex: 0,
      visibleStartIndex: 0,
      visibleEndIndex: 0,
    });
    expect(layout.getRange(300, 600, 500)).toMatchObject({
      startIndex: 0,
      endIndex: 4,
      visibleStartIndex: 0,
      visibleEndIndex: 2,
    });
  });

  test('reuses the same pool after a non-continuous jump', () => {
    const { acquireView, pool, releaseAllViews } = useRecycleScrollerPool();

    for (let i = 0; i < 4; i++) {
      acquireView(i, { id: i }, i, 'row');
    }
    expect(pool.value).toHaveLength(4);

    releaseAllViews();
    for (let i = 80; i < 84; i++) {
      acquireView(i, { id: i }, i, 'row');
    }

    expect(pool.value).toHaveLength(4);
    expect(
      pool.value
        .filter(view => view.nr.used)
        .map(view => view.nr.index)
        .sort(),
    ).toEqual([80, 81, 82, 83]);
  });

  test('rejects missing and duplicated keys early', () => {
    const missingKeyLayout = createLayout({
      items: [{ value: 1 }],
      keyField: 'id',
    }).layout;
    expect(() => missingKeyLayout.itemIndexByKey.value).toThrow("keyField is 'id'");

    const duplicatedKeyLayout = createLayout({
      items: [
        { id: 1, value: 1 },
        { id: 1, value: 2 },
      ],
    }).layout;
    expect(() => duplicatedKeyLayout.itemIndexByKey.value).toThrow("Key '1' is duplicated");
  });

  test('keeps object keys by identity', () => {
    const firstKey = { value: 1 };
    const secondKey = { value: 1 };
    const layout = createLayout({
      items: [
        { id: firstKey, value: 1 },
        { id: secondKey, value: 2 },
      ],
    }).layout;

    expect(layout.itemIndexByKey.value.get(firstKey)).toBe(0);
    expect(layout.itemIndexByKey.value.get(secondKey)).toBe(1);
  });
});
