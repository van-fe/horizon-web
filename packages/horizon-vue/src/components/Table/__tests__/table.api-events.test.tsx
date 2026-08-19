import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { HTable, HTableColumn } from '..';
import { useTableColumnEmits, useTableEmits } from '../src/composables/useEmits';
import { HTableSortOrderEnum } from '../src/utils/types';

describe('Table public event contracts', () => {
  test('emits cell and row pointer events with native payloads', async () => {
    const listeners = {
      cellMouseEnter: vi.fn(),
      cellMouseLeave: vi.fn(),
      cellClick: vi.fn(),
      cellDblclick: vi.fn(),
      cellContextmenu: vi.fn(),
      rowClick: vi.fn(),
      rowDblclick: vi.fn(),
      rowContextmenu: vi.fn(),
    };
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, name: 'Alice' }]}
        rowKey="id"
        onCellMouseEnter={listeners.cellMouseEnter}
        onCellMouseLeave={listeners.cellMouseLeave}
        onCellClick={listeners.cellClick}
        onCellDblclick={listeners.cellDblclick}
        onCellContextmenu={listeners.cellContextmenu}
        onRowClick={listeners.rowClick}
        onRowDblclick={listeners.rowDblclick}
        onRowContextmenu={listeners.rowContextmenu}
      >
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));
    await nextTick();
    await nextTick();
    const cell = wrapper.get('tbody td');
    const row = wrapper.get('tbody tr');

    await cell.trigger('mouseenter');
    await cell.trigger('mouseleave');
    await cell.trigger('click');
    await cell.trigger('dblclick');
    await cell.trigger('contextmenu');

    for (const name of [
      'cellMouseEnter',
      'cellMouseLeave',
      'cellClick',
      'cellDblclick',
      'cellContextmenu',
    ] as const) {
      const [record, column, element, event] = listeners[name].mock.calls[0];
      expect(record).toMatchObject({ id: 1, name: 'Alice' });
      expect(column.props).toMatchObject({ field: 'name' });
      expect(element).toBe(cell.element);
      expect(event).toBeInstanceOf(MouseEvent);
    }

    expect(listeners.rowClick.mock.calls[0][0]).toMatchObject({ id: 1 });
    expect(listeners.rowClick.mock.calls[0][1]).toBeInstanceOf(MouseEvent);
    expect(listeners.rowDblclick.mock.calls[0][1]).toBeInstanceOf(MouseEvent);
    expect(listeners.rowContextmenu.mock.calls[0][1]).toBeInstanceOf(MouseEvent);

    listeners.rowClick.mockClear();
    await row.trigger('click');
    expect(listeners.rowClick).toHaveBeenCalledOnce();
  });

  test('validators accept each documented payload and reject malformed values', () => {
    const row = { id: 1 };
    const column = { props: { field: 'name' } } as any;
    const cell = document.createElement('td');
    const mouse = new MouseEvent('click');

    expect(useTableEmits['update:data']([])).toBe(true);
    expect(useTableEmits['update:data']({} as any)).toBe(false);
    expect(useTableEmits['update:expandRowKeys']([])).toBe(true);
    expect(useTableEmits['update:expandRowKeys']({} as any)).toBe(false);
    expect(useTableEmits.select(row)).toBe(true);
    expect(useTableEmits.select(null as any)).toBe(false);
    expect(useTableEmits.deselect(row)).toBe(true);
    expect(useTableEmits.deselect(null as any)).toBe(false);
    expect(useTableEmits.selectAll([row])).toBe(true);
    expect(useTableEmits.selectAll(row as any)).toBe(false);

    for (const validator of [
      useTableEmits.cellMouseEnter,
      useTableEmits.cellMouseLeave,
      useTableEmits.cellClick,
      useTableEmits.cellDblclick,
      useTableEmits.cellContextmenu,
    ]) {
      expect(validator(row, column, cell, mouse)).toBe(true);
      expect(validator(row, column, null as any, mouse)).toBe(false);
      expect(validator(row, column, cell, new Event('change') as any)).toBe(false);
    }
    for (const validator of [
      useTableEmits.rowClick,
      useTableEmits.rowDblclick,
      useTableEmits.rowContextmenu,
    ]) {
      expect(validator(row, mouse)).toBe(true);
      expect(validator(row, new Event('change') as any)).toBe(false);
    }

    expect(useTableEmits.sortChange([])).toBe(true);
    expect(useTableEmits.sortChange({} as any)).toBe(false);
    expect(useTableEmits.headerDragend(100, 80, column, mouse)).toBe(true);
    expect(useTableEmits.headerDragend('100' as any, 80, column, mouse)).toBe(false);
    expect(useTableEmits.headerDragend(100, '80' as any, column, mouse)).toBe(false);
    expect(useTableEmits.headerDragend(100, 80, column, new Event('x') as any)).toBe(false);
    expect(useTableEmits.scrollTop()).toBe(true);
    expect(useTableEmits.scrollBottom()).toBe(true);

    for (const validator of [
      useTableEmits.cellEditStart,
      useTableEmits.cellEditCommit,
      useTableEmits.cellEditCancel,
      useTableEmits['update:state'],
      useTableEmits.stateChange,
      useTableEmits.queryChange,
      useTableEmits.dataProcessingChange,
    ]) {
      expect((validator as (value: unknown) => boolean)({})).toBe(true);
      expect((validator as (value: unknown) => boolean)(null)).toBe(false);
    }
    expect(useTableEmits.cellEditError({} as any, new Error('fail'))).toBe(true);
    expect(useTableEmits.cellEditError(null as any, new Error('fail'))).toBe(false);
    expect(useTableEmits['update:expandedGroupKeys'](['a'])).toBe(true);
    expect(useTableEmits['update:expandedGroupKeys']('a' as any)).toBe(false);
    expect(useTableEmits.groupToggle('a', true)).toBe(true);
    expect(useTableEmits.groupToggle(1 as any, true)).toBe(false);
    expect(useTableEmits.groupToggle('a', 'true' as any)).toBe(false);
  });

  test('column validators cover selected key, filter and sort payload boundaries', () => {
    for (const value of [[], 'id', 1, { id: 1 }, null, undefined]) {
      expect(useTableColumnEmits['update:selectedKeys'](value)).toBe(true);
    }
    expect(useTableColumnEmits['update:selectedKeys'](true)).toBe(false);
    expect(useTableColumnEmits.filterChange('value')).toBe(true);
    expect(useTableColumnEmits.filterChange(undefined)).toBe(true);
    expect(useTableColumnEmits.sortChange(HTableSortOrderEnum.ASC)).toBe(true);
    expect(useTableColumnEmits.sortChange(HTableSortOrderEnum.DESC)).toBe(true);
    expect(useTableColumnEmits.sortChange(null)).toBe(true);
    expect(useTableColumnEmits.sortChange('invalid' as any)).toBe(false);
  });
});
