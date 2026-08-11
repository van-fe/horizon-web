import { mount } from '@vue/test-utils';
import { defineComponent, reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import useSelection from '../src/hooks/useSelection';
import type { HTableInsertedColumnData, HTableTransformedRowDataType } from '../src/utils/types';
import { HTableTransformedRowContextKey } from '../src/utils/types';

function row(id: number, parentUuid: number | null = null) {
  return {
    id,
    [HTableTransformedRowContextKey]: {
      uuid: id,
      index: id - 1,
      siblingIndex: id - 1,
      visible: reactive({ value: true }),
      parentUuid,
      level: parentUuid === null ? 0 : 1,
      isLeaf: true,
    },
  } as unknown as HTableTransformedRowDataType;
}

function mountSelection(overrides: Record<string, unknown> = {}, initialRows = [row(1), row(2), row(3)]) {
  const props = reactive({
    type: 'selection',
    selectedKeys: [] as number[] | number | undefined,
    columnKey: 'id',
    multiple: true,
    multipleLimit: Infinity,
    selectable: true,
    checkStrictly: true,
    reserveSelection: true,
    selectOnIndeterminate: true,
    ...overrides,
  });
  const columnEmit = vi.fn();
  const parentEmit = vi.fn();
  const rowsData = ref(initialRows);
  const column = { props, emit: columnEmit } as unknown as HTableInsertedColumnData;
  let selection!: ReturnType<typeof useSelection>;
  const Harness = defineComponent({
    setup() {
      selection = useSelection(column, parentEmit as never, rowsData);
      return () => null;
    },
  });
  const wrapper = mount(Harness);
  return { wrapper, props, columnEmit, parentEmit, rowsData, selection };
}

describe('Table selection hook branches', () => {
  test('selects and deselects flat multiple rows with selectable and limit guards', () => {
    const state = mountSelection({
      selectedKeys: [1],
      multipleLimit: 2,
      selectable: (record: any) => record.id !== 3,
    });
    const [one, two, three] = state.rowsData.value;

    expect(state.selection.isRowChecked.value(one)).toBe(true);
    expect(state.selection.isRowChecked.value(two)).toBe(false);
    expect(state.selection.isIndeterminate.value(state.rowsData.value)).toBe(true);
    expect(state.selection.isCheckedAll.value(state.rowsData.value)).toBe(false);

    state.selection.handleSelect(one, 0);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', []);
    expect(state.parentEmit).toHaveBeenLastCalledWith('deselect', one);

    state.selection.handleSelect(two, 1);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', [1, 2]);
    expect(state.parentEmit).toHaveBeenLastCalledWith('select', two);

    state.selection.handleSelect(three, 2);
    expect(state.parentEmit).not.toHaveBeenCalledWith('select', three);
    state.wrapper.unmount();
  });

  test('handles single selection toggles and exposes selected rows', () => {
    const state = mountSelection({ multiple: false, selectedKeys: 1 });
    const [one, two] = state.rowsData.value;

    expect(state.selection.getSelectionRows(state.rowsData.value)).toEqual([one]);
    state.selection.handleSelect(one, 0);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', undefined);
    expect(state.parentEmit).toHaveBeenLastCalledWith('deselect', one);

    state.selection.selectedKeys.value = undefined;
    state.selection.handleSelect(two, 1);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', 2);
    expect(state.parentEmit).toHaveBeenLastCalledWith('select', two);

    state.selection.selectedKeys.value = 2;
    state.selection.toggleRowSelection(state.rowsData.value, 2);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', undefined);
    state.selection.toggleRowSelection(state.rowsData.value, 1, true);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', 1);
    state.selection.toggleRowSelection(state.rowsData.value, 1, false);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', undefined);
    state.wrapper.unmount();
  });

  test('selects all, clears selectable rows and supports explicit multiple toggles', () => {
    const state = mountSelection({ selectedKeys: [1], selectable: (record: any) => record.id !== 3 });

    state.selection.handleSelectAll(state.rowsData.value);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', [1, 2]);
    expect(state.parentEmit).toHaveBeenLastCalledWith('selectAll', [1, 2]);

    state.selection.selectedKeys.value = [1, 2];
    state.selection.handleSelectAll(state.rowsData.value);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', []);

    state.selection.selectedKeys.value = [1, 2, 3];
    state.selection.handleClear(state.rowsData.value);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', [3]);
    state.selection.handleClear(state.rowsData.value, true);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', []);

    state.selection.selectedKeys.value = [];
    state.selection.toggleRowSelection(state.rowsData.value, [1, 3]);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', [1]);
    state.selection.toggleRowSelection(state.rowsData.value, 1, false, true);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', []);
    state.wrapper.unmount();
  });

  test('prunes stale non-reserved keys when data changes', () => {
    const state = mountSelection({ selectedKeys: [1, 99], reserveSelection: false });

    state.rowsData.value = [...state.rowsData.value];
    expect(state.columnEmit).toHaveBeenCalledWith('update:selectedKeys', [1]);
    state.columnEmit.mockClear();
    state.rowsData.value = [row(2)];
    expect(state.columnEmit).toHaveBeenCalledWith('update:selectedKeys', []);
    state.wrapper.unmount();
  });

  test('keeps parent and leaf selection linked when checkStrictly is disabled', () => {
    const parent = row(1);
    parent[HTableTransformedRowContextKey].isLeaf = false;
    const child = row(2, 1);
    const disabledChild = row(3, 1);
    const state = mountSelection(
      {
        selectedKeys: [],
        checkStrictly: false,
        selectable: (record: any) => record.id !== 3,
      },
      [parent, child, disabledChild],
    );

    state.selection.handleSelect(parent, 0);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', [2]);
    expect(state.parentEmit).toHaveBeenLastCalledWith('select', parent);

    state.selection.selectedKeys.value = [2];
    expect(state.selection.isRowChecked.value(parent)).toBe(true);
    expect(state.selection.isRowIndeterminate.value(parent)).toBe(false);
    state.selection.handleSelect(parent, 0);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', []);
    expect(state.parentEmit).toHaveBeenLastCalledWith('deselect', parent);

    state.selection.toggleRowSelection(state.rowsData.value, 1, true, true);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', [2, 3]);
    state.wrapper.unmount();
  });

  test('guards missing column keys and ignores select-all for radio columns', () => {
    const missing = mountSelection({ columnKey: '' });
    const first = missing.rowsData.value[0];
    missing.selection.handleSelect(first, 0);
    missing.selection.handleSelectAll(missing.rowsData.value);
    missing.selection.handleClear(missing.rowsData.value);
    missing.selection.toggleRowSelection(missing.rowsData.value, 1);
    expect(missing.selection.getSelectionRows(missing.rowsData.value)).toEqual([]);
    expect(missing.columnEmit).not.toHaveBeenCalled();
    expect(missing.parentEmit).not.toHaveBeenCalled();
    missing.wrapper.unmount();

    const radio = mountSelection({ multiple: false, selectedKeys: 1 });
    radio.selection.handleSelectAll(radio.rowsData.value);
    expect(radio.columnEmit).not.toHaveBeenCalled();
    radio.wrapper.unmount();
  });

  test('clears an indeterminate selection when selectOnIndeterminate is disabled', () => {
    const state = mountSelection({ selectedKeys: [1], selectOnIndeterminate: false });
    expect(state.selection.isIndeterminate.value(state.rowsData.value)).toBe(true);
    state.selection.handleSelectAll(state.rowsData.value);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', []);
    expect(state.parentEmit).toHaveBeenLastCalledWith('selectAll', []);
    state.wrapper.unmount();
  });

  test('normalizes checked parent values to selectable leaves and respects the linked limit', () => {
    const parent = row(1);
    parent[HTableTransformedRowContextKey].isLeaf = false;
    const child = row(2, 1);
    const sibling = row(3, 1);
    const state = mountSelection(
      { selectedKeys: [1], checkStrictly: false, multipleLimit: 1 },
      [parent, child, sibling],
    );

    expect(state.selection.isRowChecked.value(parent)).toBe(true);
    expect(state.selection.isRowIndeterminate.value(parent)).toBe(false);
    const unknown = row(99, 404);
    expect(state.selection.isRowChecked.value(unknown)).toBe(false);
    expect(state.selection.isRowIndeterminate.value(unknown)).toBe(false);

    state.selection.toggleRowSelection(state.rowsData.value, 1, true, true);
    expect(state.columnEmit).toHaveBeenLastCalledWith('update:selectedKeys', [2]);
    state.wrapper.unmount();
  });

  test('keeps stale keys for reserved selection and skips pruning undefined selections', () => {
    const reserved = mountSelection({ selectedKeys: [99], reserveSelection: true });
    reserved.rowsData.value = [row(1)];
    expect(reserved.columnEmit).not.toHaveBeenCalled();
    reserved.wrapper.unmount();

    const empty = mountSelection({ selectedKeys: undefined, reserveSelection: false });
    empty.rowsData.value = [row(1)];
    expect(empty.columnEmit).not.toHaveBeenCalled();
    empty.wrapper.unmount();
  });
});
