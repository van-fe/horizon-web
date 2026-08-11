import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { HTable, HTableColumn, HTableSortOrderEnum } from '..';

async function settle() {
  await nextTick();
  await nextTick();
  await nextTick();
}

describe('Table unified state browser branches', () => {
  test('applies selection shapes and respects locked column state while resetting only columns', async () => {
    const singleSelection = ref<number>();
    const multipleSelection = ref<string[]>([]);
    const stateChange = vi.fn();
    const queryChange = vi.fn();
    const wrapper = mount(() => (
      <HTable
        data={[
          { id: 1, code: 'A', locked: 'L1', normal: 'N1' },
          { id: 2, code: 'B', locked: 'L2', normal: 'N2', hidden: 'H2' },
        ]}
        rowKey="id"
        onStateChange={stateChange}
        onQueryChange={queryChange}
      >
        <HTableColumn
          type="selection"
          columnKey="id"
          selectedKeys={singleSelection.value}
          onUpdate:selectedKeys={value => {
            singleSelection.value = value as number;
          }}
        />
        <HTableColumn
          type="selection"
          columnKey="code"
          multiple
          selectedKeys={multipleSelection.value}
          onUpdate:selectedKeys={value => {
            multipleSelection.value = value as string[];
          }}
        />
        <HTableColumn
          title="Locked"
          field="locked"
          fixed
          visible
          lockVisible
          lockFixed
          lockPosition
          resizable
        />
        <HTableColumn title="Normal" field="normal" resizable sortable filterable />
        <HTableColumn title="Hidden" field="hidden" />
      </HTable>
    ));
    await settle();
    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    const initial = table.getState();

    table.setState({
      sorting: [{ columnKey: 'normal', field: 'normal', order: HTableSortOrderEnum.DESC }],
      filters: { normal: 'N2', missing: 'ignored' },
      selection: { id: [2], code: ['A', 'B'] },
      expanded: [2],
      columnOrder: ['normal', 'locked', 'code', 'id'],
      columnVisibility: { locked: false, normal: true, hidden: false, missing: false },
      columnFixed: { locked: undefined, normal: 'right', missing: 'left' },
      columnWidths: { locked: Number.NaN, normal: 140, missing: 20 },
    });
    await settle();
    await settle();

    expect(singleSelection.value).toBe(2);
    expect(multipleSelection.value).toEqual(['A', 'B']);
    const changed = table.getState();
    expect(changed.columnVisibility.locked).toBe(true);
    expect(changed.columnVisibility.normal).toBe(true);
    expect(changed.columnVisibility.hidden).toBe(false);
    expect(changed.columnFixed.locked).toBe(initial.columnFixed.locked);
    expect(changed.columnFixed.normal).toBe('right');
    expect(changed.columnWidths.normal).toBe(140);
    expect(changed.columnWidths.locked).toBeUndefined();
    expect(changed.expanded).toEqual([2]);
    expect(changed.filters).toMatchObject({ normal: 'N2' });
    expect(changed.filters).not.toHaveProperty('missing');
    expect(changed.sorting).toEqual([
      expect.objectContaining({ columnKey: 'normal', order: HTableSortOrderEnum.DESC }),
    ]);

    table.setState({
      sorting: [{ columnKey: 'missing', order: HTableSortOrderEnum.ASC }],
      filters: { missing: 'ignored' },
    });
    await settle();
    expect(table.getState().sorting).toEqual([]);
    expect(table.getState().filters).not.toHaveProperty('missing');
    expect(stateChange).toHaveBeenCalled();
    expect(queryChange).toHaveBeenCalledWith(
      expect.objectContaining({ filters: expect.objectContaining({ normal: 'N2' }) }),
    );

    table.resetColumnState();
    await settle();
    await settle();
    const resetColumns = table.getState();
    expect(resetColumns.columnVisibility).toEqual(initial.columnVisibility);
    expect(resetColumns.columnFixed).toEqual(initial.columnFixed);
    expect(resetColumns.columnOrder).toEqual(initial.columnOrder);
    expect(resetColumns.filters).toMatchObject({ normal: 'N2' });
    expect(resetColumns.selection).toMatchObject({ id: [2], code: ['A', 'B'] });
    expect(resetColumns.expanded).toEqual([2]);
  });

  test('restores a versionless state, rejects duplicate emissions, and resets to defaults', async () => {
    const updates = vi.fn();
    const stateChanges = vi.fn();
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, name: 'Alpha' }, { id: 2, name: 'Beta' }]}
        rowKey="id"
        defaultState={{ filters: { name: 'Alpha' } }}
        onUpdate:state={updates}
        onStateChange={stateChanges}
      >
        <HTableColumn title="Name" field="name" filterable />
      </HTable>
    ));
    await settle();
    await settle();
    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    expect(wrapper.findAll('tbody .h-table__row')).toHaveLength(1);

    expect(table.restoreState({ filters: { name: 'Beta' } })).toBe(true);
    await settle();
    await settle();
    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual(['Beta']);
    const calls = stateChanges.mock.calls.length;
    table.setState(table.getState());
    await settle();
    await settle();
    expect(stateChanges.mock.calls.length).toBe(calls);

    table.resetState();
    await settle();
    await settle();
    expect(wrapper.findAll('tbody .h-table__row').map(row => row.text())).toEqual([
      'Alpha',
      'Beta',
    ]);
    expect(updates).toHaveBeenCalled();
  });

  test('rejects unsupported versions and safely resets before columns initialize', async () => {
    const showColumn = ref(false);
    const wrapper = mount(() => (
      <HTable data={[{ id: 1, name: 'Alpha' }]} rowKey="id">
        {showColumn.value && <HTableColumn title="Name" field="name" />}
      </HTable>
    ));
    const table = wrapper.findComponent(HTable).getCurrentComponent().exposed!;
    expect(table.restoreState({ version: 2 as 1 })).toBe(false);
    expect(table.restoreState({})).toBe(true);
    await settle();
    expect(table.resetState()).toBeUndefined();
    expect(table.resetColumnState()).toBeUndefined();

    showColumn.value = true;
    await settle();
    expect(table.getState().columnOrder).toEqual(['name']);
    table.resetState();
    table.resetColumnState();
    await settle();
    expect(table.getState().columnOrder).toEqual(['name']);
  });

  test('reacts to a controlled state replacement after initialization', async () => {
    const controlled = ref({ filters: { name: 'Alpha' } });
    const wrapper = mount(() => (
      <HTable data={[{ name: 'Alpha' }, { name: 'Beta' }]} state={controlled.value}>
        <HTableColumn title="Name" field="name" filterable />
      </HTable>
    ));
    await settle();
    await settle();
    expect(wrapper.findAll('tbody tr').map(row => row.text())).toEqual(['Alpha']);

    controlled.value = { filters: { name: 'Beta' } };
    await settle();
    await settle();
    expect(wrapper.findAll('tbody tr').map(row => row.text())).toEqual(['Beta']);

    controlled.value = undefined as unknown as { filters: { name: string } };
    await settle();
    expect(wrapper.findAll('tbody tr').map(row => row.text())).toEqual(['Beta']);
  });
});
