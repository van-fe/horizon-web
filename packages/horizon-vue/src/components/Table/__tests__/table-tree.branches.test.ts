import { mount } from '@vue/test-utils';
import { computed, defineComponent, reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import type { TableProps } from '../src/composables/useProps';
import useTree, { formatTreeFieldMap } from '../src/hooks/useTree';
import {
  HTableFieldMapFormattedInjectKey,
  HTableSetChildrenByRowKeyValueInjectKey,
} from '../src/utils/injectKeys';
import type { HTableColumnData, HTableTransformedRowDataType } from '../src/utils/types';
import { HTableTransformedRowContextKey } from '../src/utils/types';

function row(
  uuid: number,
  parentUuid: number | null,
  fields: Record<string, unknown> = {},
) {
  return {
    id: uuid,
    ...fields,
    [HTableTransformedRowContextKey]: {
      uuid,
      index: uuid,
      siblingIndex: uuid,
      parentUuid,
      level: parentUuid === null ? 0 : 1,
      isLeaf: fields.isLeaf !== false,
      visible: {},
    },
  } as unknown as HTableTransformedRowDataType;
}

function createTree(
  propsInput: Partial<TableProps>,
  rows: HTableTransformedRowDataType[],
  fields = { children: 'children', isLeaf: 'isLeaf' },
) {
  const props = reactive(propsInput as Record<string, unknown>) as unknown as TableProps;
  const rowsRef = ref(rows);
  const setChildren = vi.fn();
  let tree!: ReturnType<typeof useTree>;
  const Harness = defineComponent({
    setup() {
      tree = useTree(props, rowsRef);
      return () => null;
    },
  });
  const wrapper = mount(Harness, {
    global: {
      provide: {
        [HTableFieldMapFormattedInjectKey as symbol]: computed(() => fields),
        [HTableSetChildrenByRowKeyValueInjectKey as symbol]: setChildren,
      },
    },
  });
  return { props, rowsRef, setChildren, tree, wrapper };
}

describe('Table useTree branch contracts', () => {
  test('formats default/custom fields and identifies plain/tree rows', () => {
    const fieldMap = ref<Record<string, string>>({});
    const formatted = formatTreeFieldMap({ fieldMap } as never);
    expect(formatted.value).toEqual({ children: 'children', isLeaf: 'isLeaf' });

    fieldMap.value = { children: 'nodes', isLeaf: 'terminal' };
    expect(formatted.value).toEqual({
      children: 'nodes',
      isLeaf: 'terminal',
    });

    const plain = createTree({}, [row(1, null)]);
    expect(plain.tree.isTreeData.value).toBe(false);
    expect(plain.tree.isRowCanBeExpand(plain.rowsRef.value[0])).toBe(false);
    expect(plain.tree.isTreeRowVisible(plain.rowsRef.value[0])).toBe(true);
    plain.wrapper.unmount();
  });

  test('expands nested rows, reports visibility, clears and recursively collapses descendants', async () => {
    const root = row(1, null, { children: [{}] });
    const child = row(2, 1, { children: [{}] });
    const grandchild = row(3, 2);
    const state = createTree({}, [root, child, grandchild]);

    expect(state.tree.isTreeData.value).toBe(true);
    expect(state.tree.isTreeRowVisible(root)).toBe(true);
    expect(state.tree.isTreeRowVisible(child)).toBe(false);
    expect(state.tree.isRowCanBeExpand(root)).toBe(true);

    await state.tree.toggleTreeExpandRows(root);
    await state.tree.toggleTreeExpandRows(child);
    expect(state.tree.isTreeRowVisible(grandchild)).toBe(true);
    await state.tree.toggleTreeExpandRows(root);
    expect(state.tree.treeExpandRows.value.size).toBe(0);
    expect(state.tree.isTreeRowVisible(grandchild)).toBe(false);

    state.tree.expandAll();
    expect(state.tree.treeExpandRows.value).toEqual(new Set([1, 2]));
    state.tree.clearTreeExpandRows();
    expect(state.tree.treeExpandRows.value.size).toBe(0);
    state.wrapper.unmount();
  });

  test('loads lazy rows, always clears loading state, and handles missing loader/row key', async () => {
    const lazy = row(4, null, { isLeaf: false, children: [] });
    const dynamicLoad = vi.fn(async () => [{ id: 5 }]);
    const loaded = createTree({ rowKey: 'id', dynamicLoad }, [lazy]);

    const promise = loaded.tree.toggleTreeExpandRows(lazy);
    expect(loaded.tree.syncLoadingRows.value.has(4)).toBe(true);
    await promise;
    expect(loaded.setChildren).toHaveBeenCalledWith(4, [{ id: 5 }]);
    expect(loaded.tree.syncLoadingRows.value.has(4)).toBe(false);
    expect(loaded.tree.treeExpandRows.value.has(4)).toBe(true);
    loaded.wrapper.unmount();

    const rejectedLoad = vi.fn(async () => Promise.reject(new Error('load failed')));
    const rejected = createTree({ rowKey: 'id', dynamicLoad: rejectedLoad }, [lazy]);
    await expect(rejected.tree.toggleTreeExpandRows(lazy)).rejects.toThrow('load failed');
    expect(rejected.tree.syncLoadingRows.value.has(4)).toBe(false);
    expect(rejected.tree.treeExpandRows.value.has(4)).toBe(false);
    rejected.wrapper.unmount();

    const missing = createTree({ rowKey: undefined, dynamicLoad }, [lazy]);
    await missing.tree.toggleTreeExpandRows(lazy);
    expect(missing.setChildren).not.toHaveBeenCalled();
    expect(missing.tree.treeExpandRows.value.has(4)).toBe(true);
    missing.wrapper.unmount();
  });

  test('uses strict/multiple selection only for expandable rows', () => {
    const expandable = row(1, null, { isLeaf: false });
    const leaf = row(2, null, { isLeaf: true });
    const state = createTree({}, [expandable, leaf]);
    const column = (checkStrictly: boolean, multiple: boolean) =>
      ({ props: { checkStrictly, multiple } }) as unknown as HTableColumnData;

    expect(state.tree.shouldSelectionBeVisible(expandable, column(false, false))).toBe(false);
    expect(state.tree.shouldSelectionBeVisible(expandable, column(true, false))).toBe(true);
    expect(state.tree.shouldSelectionBeVisible(expandable, column(false, true))).toBe(true);
    expect(state.tree.shouldSelectionBeVisible(leaf, column(false, false))).toBe(true);
    state.wrapper.unmount();
  });
});
