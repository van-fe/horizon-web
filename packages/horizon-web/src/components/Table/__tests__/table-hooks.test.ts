import { computed, ref } from 'vue';
import { describe, expect, test } from 'vitest';
import useVisibleRows from '../src/hooks/useVisibleRows';
import type { HTableTransformedRowDataType } from '../src/utils/types';
import { HTableTransformedRowContextKey } from '../src/utils/types';

function createRow(
  id: number,
  options: {
    parentId?: number | null;
    visible?: boolean;
    value?: number;
  } = {},
) {
  return {
    id,
    value: options.value ?? id,
    [HTableTransformedRowContextKey]: {
      uuid: id,
      index: id,
      siblingIndex: id,
      visible: ref({ value: options.visible ?? true }),
      parentUuid: options.parentId ?? null,
      level: options.parentId == null ? 0 : 1,
      isLeaf: true,
    },
  } as HTableTransformedRowDataType;
}

describe('Table hooks', () => {
  test('filters hidden rows and sorts flat data', () => {
    const flattenData = ref([
      createRow(1, { value: 3 }),
      createRow(2, { visible: false }),
      createRow(3, { value: 1 }),
    ]);
    const { visibleRows } = useVisibleRows({
      flattenData,
      isTreeData: computed(() => false),
      isTreeRowVisible: () => true,
      sortRow: (a, b) => a.value - b.value,
    });

    expect(visibleRows.value.map(row => row.id)).toEqual([3, 1]);
  });

  test('sorts tree siblings without separating descendants from their parents', () => {
    const flattenData = ref([
      createRow(1, { value: 2 }),
      createRow(11, { parentId: 1, value: 2 }),
      createRow(12, { parentId: 1, value: 1 }),
      createRow(2, { value: 1 }),
      createRow(21, { parentId: 2, value: 1 }),
    ]);
    const { visibleRows } = useVisibleRows({
      flattenData,
      isTreeData: computed(() => true),
      isTreeRowVisible: () => true,
      sortRow: (a, b) => a.value - b.value,
    });

    expect(visibleRows.value.map(row => row.id)).toEqual([2, 21, 1, 12, 11]);
  });
});
