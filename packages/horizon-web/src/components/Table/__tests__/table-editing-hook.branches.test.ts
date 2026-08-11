import { mount } from '@vue/test-utils';
import { computed, defineComponent, nextTick, reactive } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import type { TableColumnProps, TableProps } from '../src/composables/useProps';
import useEditing from '../src/hooks/useEditing';
import type { HTableColumnData, HTableRowDataType } from '../src/utils/types';
import { HTableTransformedRowContextKey } from '../src/utils/types';

function transformed(raw: HTableRowDataType, uuid: string | number, parentUuid: string | number | null = null) {
  return {
    ...raw,
    [HTableTransformedRowContextKey]: {
      uuid,
      index: 0,
      siblingIndex: 0,
      visible: {},
      parentUuid,
      level: parentUuid === null ? 0 : 1,
      isLeaf: true,
    },
  } as ReturnType<typeof createRowType>;
}

function createRowType() {
  return {} as HTableRowDataType & {
    [HTableTransformedRowContextKey]: {
      uuid: string | number;
      index: number;
      siblingIndex: number;
      visible: Record<string, boolean>;
      parentUuid: string | number | null;
      level: number;
      isLeaf: boolean;
    };
  };
}

function column(uuid: string, props: Partial<TableColumnProps>): HTableColumnData {
  return {
    uuid,
    props: reactive({ field: uuid, editable: true, ...props }) as unknown as TableColumnProps,
    emit: vi.fn(),
    slots: {},
    children: [],
    calcChildren: [],
    index: 0,
    headerColSpan: 1,
    headerRowSpan: 1,
  } as unknown as HTableColumnData;
}

function mountEditing(options: {
  data: HTableRowDataType[];
  columns: HTableColumnData[];
  rowKey?: string;
  editMode?: 'cell' | 'row';
}) {
  const tableProps = reactive({
    data: options.data,
    rowKey: options.rowKey,
    editMode: options.editMode ?? 'cell',
  }) as unknown as TableProps;
  const emit = vi.fn();
  const focusEditor = vi.fn();
  let editing!: ReturnType<typeof useEditing>;
  const Harness = defineComponent({
    setup() {
      editing = useEditing({
        tableProps,
        columns: computed(() => options.columns),
        fieldMapFormatted: computed(() => ({ children: 'children', isLeaf: 'isLeaf' })),
        emit: emit as never,
        focusEditor,
      });
      return () => null;
    },
  });
  const wrapper = mount(Harness);
  return { editing, emit, focusEditor, tableProps, wrapper };
}

describe('Table editing hook browser branches', () => {
  test('evaluates missing, boolean, and function editable contracts', () => {
    const currentRow = transformed({ id: 1, name: 'Alpha' }, 1);
    const missingField = column('missing', { field: undefined, editable: true });
    const disabled = column('disabled', { field: 'name', editable: false });
    const predicate = vi.fn((_row, index: number) => index === 2);
    const conditional = column('conditional', { field: 'name', editable: predicate });
    const state = mountEditing({
      data: [{ id: 1, name: 'Alpha' }],
      columns: [missingField, disabled, conditional],
      rowKey: 'id',
    });

    expect(state.editing.canEdit(currentRow, missingField, 0)).toBe(false);
    expect(state.editing.canEdit(currentRow, disabled, 0)).toBe(false);
    expect(state.editing.canEdit(currentRow, conditional, 0)).toBe(false);
    expect(state.editing.canEdit(currentRow, conditional, 2)).toBe(true);
    expect(predicate).toHaveBeenCalledWith(currentRow, 2);
    state.wrapper.unmount();
  });

  test('keeps only the latest concurrent beforeEdit result and reuses an active edit', async () => {
    const currentRow = transformed({ id: 1, first: 'A', second: 'B' }, 1);
    let resolveFirst!: (allowed: boolean) => void;
    let resolveSecond!: (allowed: boolean) => void;
    const first = column('first', {
      beforeEdit: () => new Promise(resolve => (resolveFirst = resolve)),
    });
    const second = column('second', {
      beforeEdit: () => new Promise(resolve => (resolveSecond = resolve)),
    });
    const state = mountEditing({
      data: [{ id: 1, first: 'A', second: 'B' }],
      columns: [first, second],
      rowKey: 'id',
    });

    const stale = state.editing.startEdit(currentRow, first, 0);
    const latest = state.editing.startEdit(currentRow, second, 0);
    resolveFirst(true);
    await expect(stale).resolves.toBe(false);
    resolveSecond(true);
    await expect(latest).resolves.toBe(true);
    await nextTick();
    expect(state.editing.isEditing(currentRow, second)).toBe(true);
    expect(state.editing.isEditing(currentRow, first)).toBe(false);
    expect(state.editing.getValue(second)).toBe('B');
    await expect(state.editing.startEdit(currentRow, second, 0)).resolves.toBe(true);
    expect(state.emit.mock.calls.filter(([name]) => name === 'cellEditStart')).toHaveLength(1);
    expect(state.focusEditor).toHaveBeenCalledOnce();
    state.editing.cancelEdit();
    state.wrapper.unmount();
  });

  test('blocks operations while commit is pending and supports a rejected beforeCommit', async () => {
    const currentRow = transformed({ id: 1, name: 'Alpha' }, 1);
    let resolveCommit!: (allowed: boolean) => void;
    const beforeCommit = vi.fn(() => new Promise<boolean>(resolve => (resolveCommit = resolve)));
    const editable = column('name', { beforeCommit });
    const state = mountEditing({
      data: [{ id: 1, name: 'Alpha' }],
      columns: [editable],
      rowKey: 'id',
    });
    await state.editing.startEdit(currentRow, editable, 0);
    state.editing.updateValue(editable, 'Beta');
    const pending = state.editing.commitEdit();
    await nextTick();
    expect(state.editing.editing.value?.pending).toBe(true);
    expect(await state.editing.commitEdit()).toBe(false);
    expect(await state.editing.startEdit(currentRow, editable, 0)).toBe(false);
    state.editing.updateValue(editable, 'Ignored');
    expect(state.editing.getValue(editable)).toBe('Beta');
    state.editing.cancelEdit();
    expect(state.editing.editing.value).toBeDefined();

    resolveCommit(false);
    await expect(pending).resolves.toBe(false);
    expect(state.editing.editing.value?.pending).toBe(false);
    state.editing.cancelEdit();
    expect(state.editing.editing.value).toBeUndefined();
    expect(state.emit).toHaveBeenCalledWith(
      'cellEditCancel',
      expect.objectContaining({ value: 'Beta', oldValue: 'Alpha' }),
    );
    expect(await state.editing.commitEdit()).toBe(true);
    state.editing.updateValue(editable, 'No state');
    state.editing.cancelEdit();
    state.wrapper.unmount();
  });

  test('rejects commits without rowKey and immutably updates nested child array fields', async () => {
    const root = { id: 1, children: [{ id: 2, profile: { tags: ['old', 'keep'] } }] };
    const child = transformed(root.children[0], 2, 1);
    const nested = column('tags', { field: 'profile.tags.1' });
    const missingKey = mountEditing({ data: [root], columns: [nested] });
    await missingKey.editing.startEdit(child, nested, 0);
    expect(await missingKey.editing.commitEdit()).toBe(false);
    expect(missingKey.editing.editing.value).toBeDefined();
    missingKey.editing.cancelEdit();
    missingKey.wrapper.unmount();

    const state = mountEditing({ data: [root], columns: [nested], rowKey: 'id' });
    await state.editing.startEdit(child, nested, 0);
    state.editing.updateValue(nested, 'new');
    expect(await state.editing.commitEdit()).toBe(true);
    const updateCall = state.emit.mock.calls.find(([name]) => name === 'update:data')!;
    const nextData = updateCall[1] as typeof state.tableProps.data;
    expect(nextData[0]).not.toBe(root);
    expect(nextData[0].children).not.toBe(root.children);
    expect(nextData[0].children[0].profile.tags).toEqual(['old', 'new']);
    expect(root.children[0].profile.tags).toEqual(['old', 'keep']);
    expect(state.emit).toHaveBeenCalledWith(
      'cellEditCommit',
      expect.objectContaining({ value: 'new', oldValue: 'keep' }),
    );
    state.wrapper.unmount();
  });
});
