import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { HTable, HTableColumn } from '..';
import type { HTableCellScopeSlots, HTableRowDataType } from '..';
import HTooltip from '../../Tooltip/src/Tooltip';
import HVirtualScroller from '../../VirtualScroller/src/VirtualScroller';
import { sleep } from '~/utils/tools';

async function settle() {
  await nextTick();
  await nextTick();
  await nextTick();
}

describe('Table body rendering browser branches', () => {
  test('renders function, constant, and generated index columns and keeps drag handle clicks local', async () => {
    const rowClick = vi.fn();
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, name: 'Alpha' }, { id: 2, name: 'Beta' }]}
        rowKey="id"
        onRowClick={rowClick}
      >
        <HTableColumn
          title="Function index"
          type="index"
          index={(index, row) => index * 10 + Number(row.id)}
        />
        <HTableColumn title="Constant index" type="index" index={99} />
        <HTableColumn title="Generated index" type="index" />
        <HTableColumn title="Drag" type="drag" />
      </HTable>
    ));
    await settle();

    const firstCells = wrapper.findAll('tbody tr')[0].findAll('td');
    expect(firstCells.map(cell => cell.text())).toEqual(['11', '99', '1', '']);
    const dragHandle = wrapper.get<HTMLElement>('.h-table__drag-handle');
    expect(dragHandle.attributes('draggable')).toBe('true');
    await dragHandle.trigger('click');
    expect(rowClick).not.toHaveBeenCalled();
  });

  test('renders the default cell slot scope inside a real body overflow tooltip', async () => {
    const cellSlot = vi.fn((scope: HTableCellScopeSlots) => (
      <span class="custom-cell">
        {String(scope.row.name)}:{scope.rowIndex}:{scope.columnIndex}:{String(scope.fixed)}
      </span>
    ));
    const wrapper = mount(
      () => (
        <HTable data={[{ id: 1, name: 'Alpha' }]} rowKey="id">
          <HTableColumn
            title="Name"
            field="name"
            showOverflowTooltip
            tooltipOptions={{ overflow: false, showAfter: 0, toBody: false }}
          >
            {{ default: cellSlot }}
          </HTableColumn>
        </HTable>
      ),
      { attachTo: document.body },
    );
    await settle();

    expect(wrapper.get('tbody .custom-cell').text()).toBe('Alpha:0:0:undefined');
    expect(cellSlot).toHaveBeenCalled();
    expect(wrapper.findComponent(HTooltip).exists()).toBe(true);
    await wrapper.get('tbody .h-table__cell-inner').trigger('mouseenter');
    await sleep(0);
    expect(wrapper.get('tbody .h-tooltip__content').text()).toContain('Alpha:0:0:undefined');
    wrapper.unmount();
  });

  test('hides invalid tree radio selection, disables non-selectable radio, and renders static row styles', async () => {
    const selected = ref<number>();
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, name: 'Parent', children: [{ id: 2, name: 'Child' }] }]}
        rowKey="id"
        defaultExpandAll
        treeExpandField="name"
        rowClassName="static-row"
        rowStyle="color: rgb(1, 2, 3);"
      >
        <HTableColumn type="selection" columnKey="id" selectedKeys={selected.value} />
        <HTableColumn
          type="selection"
          columnKey="id"
          selectedKeys={selected.value}
          selectable={() => false}
        />
        <HTableColumn type="selection" />
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));
    await settle();

    const rows = wrapper.findAll('tbody .h-table__row');
    expect(rows.every(row => row.classes().includes('static-row'))).toBe(true);
    expect(rows[0].attributes('style')).toContain('color: rgb(1, 2, 3)');
    const selections = rows[0].findAll('.h-table__selection');
    expect(selections[0].classes()).toContain('is-hidden');
    expect(selections[1].find('label.h-radio').classes()).toContain('h-radio--disabled');
    expect(selections).toHaveLength(2);
  });

  test('accepts tuple span results and falls back when spanMethod returns nothing', async () => {
    const wrapper = mount(() => (
      <HTable
        data={[
          { left: 'A', right: 'B' },
          { left: 'C', right: 'D' },
        ]}
        spanMethod={({ rowIndex, columnIndex }) => {
          if (rowIndex === 0 && columnIndex === 0) return [1, 2];
          if (rowIndex === 0 && columnIndex === 1) return [0, 0];
          return undefined;
        }}
      >
        <HTableColumn title="Left" field="left" />
        <HTableColumn title="Right" field="right" />
      </HTable>
    ));
    await settle();

    const rows = wrapper.findAll('tbody tr');
    expect(rows[0].findAll('td')).toHaveLength(1);
    expect(rows[0].get('td').attributes('colspan')).toBe('2');
    expect(rows[1].findAll('td')).toHaveLength(2);
  });

  test('shows a lazy tree loading indicator and inserts the resolved children', async () => {
    let resolveChildren!: (children: HTableRowDataType[]) => void;
    const dynamicLoad = vi.fn(
      () =>
        new Promise<HTableRowDataType[]>(resolve => {
          resolveChildren = resolve;
        }),
    );
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, name: 'Lazy parent', isLeaf: false }]}
        rowKey="id"
        dynamicLoad={dynamicLoad}
      >
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));
    await settle();

    await wrapper.get('tbody .h-table__expand-icon').trigger('click');
    await settle();
    expect(dynamicLoad).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    expect(wrapper.find('.h-table__expand-icon--loading').exists()).toBe(true);

    resolveChildren([{ id: 2, name: 'Loaded child', isLeaf: true }]);
    await sleep(0);
    await settle();
    expect(wrapper.find('.h-table__expand-icon--loading').exists()).toBe(false);
    expect(wrapper.findAll('tbody .h-table__row')).toHaveLength(2);
    expect(wrapper.find('tbody').text()).toContain('Loaded child');
  });

  test('warns for incompatible virtual/tree/grouping options and keeps functional row styling', async () => {
    const rowClassName = vi.fn(() => 'functional-row');
    const rowStyle = vi.fn(() => ({ color: 'rgb(4, 5, 6)' }));
    const wrapper = mount(() => (
      <HTable
        data={[{ name: 'Parent', children: [{ name: 'Child' }] }]}
        groupBy="name"
        virtual={{ buffer: 0 }}
        tableLayout="auto"
        spanMethod={() => ({ rowSpan: 1, colSpan: 1 })}
        rowClassName={rowClassName}
        rowStyle={rowStyle}
      >
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));
    await settle();

    expect(wrapper.findComponent(HVirtualScroller).exists()).toBe(false);
    expect(wrapper.get('tbody tr').classes()).toContain('functional-row');
    expect(wrapper.get('tbody tr').attributes('style')).toContain('rgb(4, 5, 6)');
    expect(rowClassName).toHaveBeenCalled();
    expect(rowStyle).toHaveBeenCalled();
  });

  test('uses functional styling for expanded rows and leaves click-trigger editors inert on dblclick', async () => {
    const rowClassName = vi.fn(() => 'expanded-functional-row');
    const rowStyle = vi.fn(() => ({ backgroundColor: 'rgb(7, 8, 9)' }));
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, name: 'Alpha' }]}
        rowKey="id"
        expandRowKeys={[1]}
        rowClassName={rowClassName}
        rowStyle={rowStyle}
      >
        <HTableColumn type="expand">{{ expand: () => <span data-expand>Details</span> }}</HTableColumn>
        <HTableColumn title="Name" field="name" editable editTrigger="click" />
      </HTable>
    ));
    await settle();

    const expanded = wrapper.get('tbody .h-table__row--expand');
    expect(expanded.classes()).toContain('expanded-functional-row');
    expect(expanded.attributes('style')).toContain('rgb(7, 8, 9)');
    await wrapper.findAll('tbody td').at(-1)!.trigger('dblclick');
    expect(wrapper.find('[data-table-editor="true"]').exists()).toBe(false);
  });
});
