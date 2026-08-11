import { mount } from '@vue/test-utils';
import { computed, defineComponent, nextTick, reactive, toRefs } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import type { TableProps } from '../src/composables/useProps';
import useDataAnalysis from '../src/hooks/useDataAnalysis';
import type { HTableInsertedColumnData, HTableRowDataType } from '../src/utils/types';
import { HTableTransformedRowContextKey } from '../src/utils/types';
import { getTopParentInTree } from '../src/utils/treeHelper';

function mountAnalysis(data: HTableRowDataType[], rowKey?: string) {
  const source = reactive({ data, rowKey, watchData: false });
  const emit = vi.fn();
  let analysis!: ReturnType<typeof useDataAnalysis>;
  const Harness = defineComponent({
    setup() {
      analysis = useDataAnalysis(
        toRefs(source) as unknown as Parameters<typeof useDataAnalysis>[0],
        emit as never,
        { fieldMapFormatted: computed(() => ({ children: 'children', isLeaf: 'isLeaf' })) },
      );
      return () => null;
    },
  });
  const wrapper = mount(Harness);
  return { analysis, emit, source, wrapper };
}

function treeColumn(
  uuid: string,
  children: HTableInsertedColumnData[] = [],
): HTableInsertedColumnData {
  return {
    uuid,
    props: {} as TableProps,
    emit: vi.fn(),
    slots: {},
    children,
  } as unknown as HTableInsertedColumnData;
}

describe('Table data analysis browser branches', () => {
  test('warns once for an unkeyed tree and gives duplicate keyed rows distinct contexts', () => {
    const unkeyed = mountAnalysis([
      { name: 'Parent', children: [{ name: 'Child' }] },
      { name: 'Second', children: [{ name: 'Other child' }] },
    ]);
    expect(unkeyed.analysis.flattenData.value).toHaveLength(4);
    const parent = unkeyed.analysis.flattenData.value[0][HTableTransformedRowContextKey];
    const child = unkeyed.analysis.flattenData.value[1][HTableTransformedRowContextKey];
    expect(child.parentUuid).toBe(parent.uuid);
    expect(child.level).toBe(1);
    unkeyed.wrapper.unmount();

    const keyed = mountAnalysis([{ id: 1, name: 'First' }, { id: 1, name: 'Duplicate' }], 'id');
    const [first, duplicate] = keyed.analysis.flattenData.value;
    expect(first[HTableTransformedRowContextKey]).not.toBe(
      duplicate[HTableTransformedRowContextKey],
    );
    const firstContext = first[HTableTransformedRowContextKey];
    keyed.analysis.reloadData([{ id: 1, name: 'Reloaded' }]);
    expect(keyed.analysis.flattenData.value[0][HTableTransformedRowContextKey]).toBe(firstContext);
    keyed.wrapper.unmount();
  });

  test('creates fresh ids for primitive rows and stable ids for function objects', () => {
    const callable = Object.assign(() => undefined, { nameValue: 'callable' });
    const data = [42, callable] as unknown as HTableRowDataType[];
    const state = mountAnalysis(data);
    const firstIds = state.analysis.flattenData.value.map(
      current => current[HTableTransformedRowContextKey].uuid,
    );

    state.analysis.reloadData(data);
    const secondIds = state.analysis.flattenData.value.map(
      current => current[HTableTransformedRowContextKey].uuid,
    );
    expect(secondIds[0]).not.toBe(firstIds[0]);
    expect(secondIds[1]).toBe(firstIds[1]);
    state.wrapper.unmount();
  });

  test('sets nested children by key, emits unchanged copies for misses, and rejects missing rowKey', async () => {
    const source = [
      { id: 1, children: [{ id: 2, children: [] }] },
      { id: 3, children: [] },
    ];
    const state = mountAnalysis(source, 'id');
    state.analysis.setChildrenByRowKey(2, [{ id: 4, name: 'Loaded' }]);
    await nextTick();
    expect(state.analysis.flattenData.value.map(current => current.id)).toEqual([1, 2, 4, 3]);
    expect(state.emit).toHaveBeenLastCalledWith('update:data', expect.any(Array));

    const flattenedIdentity = state.analysis.flattenData.value;
    state.analysis.setChildrenByRowKey(999, [{ id: 5 }]);
    expect(state.analysis.flattenData.value).toBe(flattenedIdentity);
    expect(state.emit).toHaveBeenCalledTimes(2);
    state.wrapper.unmount();

    const missingKey = mountAnalysis([{ id: 1 }]);
    missingKey.analysis.setChildrenByRowKey(1, [{ id: 2 }]);
    expect(missingKey.emit).not.toHaveBeenCalled();
    missingKey.wrapper.unmount();
  });

  test('finds direct and deep column ancestors and returns false for missing ids', () => {
    const leaf = treeColumn('leaf');
    const branch = treeColumn('branch', [leaf]);
    const root = treeColumn('root', [branch]);
    const sibling = treeColumn('sibling');

    expect(getTopParentInTree('root', [root, sibling])).toBeNull();
    expect(getTopParentInTree('branch', [root, sibling])).toBe(root);
    expect(getTopParentInTree('leaf', [root, sibling])).toBe(root);
    expect(getTopParentInTree('missing', [root, sibling])).toBe(false);
  });
});
