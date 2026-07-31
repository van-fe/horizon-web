import { DOMWrapper, mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { HTable, HTableColumn, HTableSortOrderEnum } from '..';
import HDropdown from '../../Dropdown/src/Dropdown';
import HDropdownItem from '../../Dropdown/src/DropdownItem';
import type { HTreeData } from '../../Tree/src/utils/types';
import HTreeSelect from '../../TreeSelect/src/TreeSelect';

async function settleTable() {
  await nextTick();
  await nextTick();
}

describe('Table', () => {
  test('renders columns, rows and formatter output', async () => {
    const data = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const formatter = (_row: unknown, _column: unknown, value: unknown) => `#${value}`;
    const wrapper = mount(() => (
      <HTable data={data} rowKey="id">
        <HTableColumn title="Name" field="name" />
        <HTableColumn title="Identifier" field="id" formatter={formatter} />
      </HTable>
    ));

    await settleTable();

    expect(wrapper.findAll('th').map(cell => cell.text())).toEqual(['Name', 'Identifier']);
    expect(wrapper.find('tbody').text()).toContain('Alice');
    expect(wrapper.find('tbody').text()).toContain('#2');
    expect(wrapper.find('table').classes()).toContain('is-layout-fixed');
  });

  test('applies table and column class/style callbacks', async () => {
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, name: 'Alice' }]}
        headerRowClassName={() => 'custom-header-row'}
        headerCellClassName={() => 'custom-header-cell'}
        headerCellStyle={() => ({ color: 'red' })}
        rowClassName={() => 'custom-row'}
        cellClassName={() => 'custom-cell'}
        cellStyle={() => ({ color: 'blue' })}
        footerRowClassName={() => 'custom-footer-row'}
        footerCellClassName={() => 'custom-footer-cell'}
        showSummary
      >
        <HTableColumn
          title="Name"
          field="name"
          align="right"
          className="name-cell"
          headerClassName="name-header"
          footerClassName="name-footer"
        />
      </HTable>
    ));

    await settleTable();

    expect(wrapper.find('thead tr').classes()).toContain('custom-header-row');
    expect(wrapper.find('th').classes()).toEqual(
      expect.arrayContaining(['custom-header-cell', 'name-header', 'is-text-right']),
    );
    expect(wrapper.find('th').attributes('style')).toContain('color: red');
    expect(wrapper.find('tbody tr').classes()).toContain('custom-row');
    expect(wrapper.find('tbody td').classes()).toEqual(
      expect.arrayContaining(['custom-cell', 'name-cell']),
    );
    expect(wrapper.find('tbody td').attributes('style')).toContain('color: blue');
    expect(wrapper.find('tfoot tr').classes()).toContain('custom-footer-row');
    expect(wrapper.find('tfoot td').classes()).toEqual(
      expect.arrayContaining(['custom-footer-cell', 'name-footer', 'is-text-right']),
    );
  });

  test('keeps grouped headers aligned and calculates leaf row spans once', async () => {
    const wrapper = mount(() => (
      <HTable data={[{ id: 1, name: 'Alice', email: 'a@example.com', role: 'Designer' }]}>
        <HTableColumn title="ID" field="id" />
        <HTableColumn title="Contact">
          <HTableColumn title="Name" field="name" />
          <HTableColumn title="Email" field="email" />
        </HTableColumn>
        <HTableColumn title="Metadata">
          <HTableColumn title="Role" field="role" />
        </HTableColumn>
      </HTable>
    ));

    await settleTable();

    const headerRows = wrapper.findAll('thead tr');
    expect(headerRows).toHaveLength(2);
    expect(headerRows[0].findAll('th').map(cell => cell.text())).toEqual([
      'ID',
      'Contact',
      'Metadata',
    ]);
    expect(headerRows[0].findAll('th')[0].attributes('rowspan')).toBe('2');
    expect(headerRows[0].findAll('th')[1].attributes('colspan')).toBe('2');
    expect(headerRows[1].findAll('th').map(cell => cell.text())).toEqual(['Name', 'Email', 'Role']);
  });

  test('preserves zero row and column spans returned as an object', async () => {
    const wrapper = mount(() => (
      <HTable
        data={[
          { left: 'A', right: 'B' },
          { left: 'C', right: 'D' },
        ]}
        spanMethod={({ rowIndex, columnIndex }) => {
          if (rowIndex === 0 && columnIndex === 0) {
            return { rowSpan: 1, colSpan: 2 };
          }

          if (rowIndex === 0 && columnIndex === 1) {
            return { rowSpan: 0, colSpan: 0 };
          }
        }}
      >
        <HTableColumn title="Left" field="left" />
        <HTableColumn title="Right" field="right" />
      </HTable>
    ));

    await settleTable();

    const rows = wrapper.findAll('tbody tr');
    expect(rows[0].findAll('td')).toHaveLength(1);
    expect(rows[0].find('td').attributes('colspan')).toBe('2');
    expect(rows[1].findAll('td')).toHaveLength(2);
  });

  test('supports a custom summary slot and keeps zero totals visible', async () => {
    const custom = mount(() => (
      <HTable data={[{ amount: 0 }]} showSummary>
        {{
          default: () => <HTableColumn title="Amount" field="amount" />,
          summary: () => (
            <tr class="custom-summary">
              <td>Custom total</td>
            </tr>
          ),
        }}
      </HTable>
    ));

    await settleTable();

    expect(custom.find('tfoot .custom-summary').text()).toBe('Custom total');

    const automatic = mount(() => (
      <HTable data={[{ label: 'A', amount: 0 }]} showSummary>
        <HTableColumn title="Label" field="label" />
        <HTableColumn title="Amount" field="amount" />
      </HTable>
    ));

    await settleTable();

    expect(automatic.findAll('tfoot td')[1].text()).toBe('0');
  });

  test('does not render the empty state underneath a loading overlay', async () => {
    const isLoading = ref(true);
    const wrapper = mount(() => (
      <HTable data={[]} loading={isLoading.value}>
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));

    await settleTable();

    expect(wrapper.find('.h-table__table--empty').exists()).toBe(false);

    isLoading.value = false;
    await settleTable();

    expect(wrapper.find('.h-table__table--empty').exists()).toBe(true);
  });

  test('syncs expandable rows with expandRowKeys', async () => {
    const expandedKeys = ref<Array<string | number>>([1]);
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, name: 'Alice', detail: 'Details' }]}
        rowKey="id"
        expandRowKeys={expandedKeys.value}
        onUpdate:expandRowKeys={value => {
          expandedKeys.value = value as Array<string | number>;
        }}
      >
        <HTableColumn type="expand">
          {{
            expand: ({ row }: { row: { detail: string } }) => (
              <span class="expanded-content">{row.detail}</span>
            ),
          }}
        </HTableColumn>
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));

    await settleTable();

    expect(wrapper.find('.expanded-content').text()).toBe('Details');

    await wrapper.find('.h-table__expand-icon').trigger('click');
    await settleTable();

    expect(expandedKeys.value).toEqual([]);
    expect(wrapper.find('.expanded-content').exists()).toBe(false);
  });

  test('supports custom tree field mapping', async () => {
    const wrapper = mount(() => (
      <HTable
        data={[
          {
            id: 1,
            name: 'Parent',
            nodes: [{ id: 2, name: 'Child', nodes: [] }],
          },
        ]}
        rowKey="id"
        fieldMap={{ children: 'nodes', isLeaf: 'leaf' }}
        defaultExpandAll
      >
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));

    await settleTable();

    expect(wrapper.find('tbody').text()).toContain('Parent');
    expect(wrapper.find('tbody').text()).toContain('Child');
  });

  test('selects and deselects a row from the whole row', async () => {
    const selectedKey = ref<string | number>();
    const onSelect = vi.fn();
    const onDeselect = vi.fn();
    const wrapper = mount(() => (
      <HTable data={[{ id: 1, name: 'Alice' }]} onSelect={onSelect} onDeselect={onDeselect}>
        <HTableColumn
          type="selection"
          columnKey="id"
          selectedKeys={selectedKey.value}
          selectOnClickRow
          onUpdate:selectedKeys={value => {
            selectedKey.value = value as string | number | undefined;
          }}
        />
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));

    await settleTable();

    await wrapper.find('tbody tr').trigger('click');
    await settleTable();

    expect(selectedKey.value).toBe(1);
    expect(onSelect).toHaveBeenCalledOnce();

    await wrapper.find('tbody tr').trigger('click');
    await settleTable();

    expect(selectedKey.value).toBeUndefined();
    expect(onDeselect).toHaveBeenCalledOnce();
  });

  test('clears mutually exclusive selection fields in the same row', async () => {
    const primaryKey = ref<string | number>();
    const secondaryKey = ref<string | number>();
    const wrapper = mount(() => (
      <HTable data={[{ id: 1, name: 'Alice' }]}>
        <HTableColumn
          type="selection"
          field="primary"
          columnKey="id"
          selectedKeys={primaryKey.value}
          exclusionFields={['secondary']}
          onUpdate:selectedKeys={value => {
            primaryKey.value = value as string | number | undefined;
          }}
        />
        <HTableColumn
          type="selection"
          field="secondary"
          columnKey="id"
          selectedKeys={secondaryKey.value}
          exclusionFields={['primary']}
          onUpdate:selectedKeys={value => {
            secondaryKey.value = value as string | number | undefined;
          }}
        />
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));

    await settleTable();

    await wrapper.findAll('.h-table__selection')[0].trigger('click');
    await settleTable();
    expect(primaryKey.value).toBe(1);

    await wrapper.findAll('.h-table__selection')[1].trigger('click');
    await settleTable();
    expect(primaryKey.value).toBeUndefined();
    expect(secondaryKey.value).toBe(1);
  });

  test('applies default sorting with numeric values', async () => {
    const wrapper = mount(() => (
      <HTable
        data={[
          { id: 10, name: 'Ten' },
          { id: 2, name: 'Two' },
        ]}
        defaultSort={[
          {
            prop: 'id',
            order: HTableSortOrderEnum.ASC,
          },
        ]}
      >
        <HTableColumn title="ID" field="id" sortable />
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));

    await settleTable();

    expect(wrapper.findAll('tbody tr').map(row => row.text())).toEqual(['2Two', '10Ten']);
  });

  test('sorts tree rows within each level without separating children', async () => {
    const wrapper = mount(() => (
      <HTable
        data={[
          {
            id: 1,
            name: 'Zulu',
            children: [{ id: 2, name: 'Alpha', children: [] }],
          },
          { id: 3, name: 'Bravo', children: [] },
        ]}
        rowKey="id"
        defaultExpandAll
        defaultSort={[
          {
            prop: 'name',
            order: HTableSortOrderEnum.ASC,
          },
        ]}
      >
        <HTableColumn title="Name" field="name" sortable />
      </HTable>
    ));

    await settleTable();

    expect(wrapper.findAll('tbody tr').map(row => row.text())).toEqual(['Bravo', 'Zulu', 'Alpha']);
  });

  test('updates sticky offsets after measuring multiple fixed columns', async () => {
    const wrapper = mount(() => (
      <HTable
        data={[{ leftA: 'A', leftB: 'B', center: 'C', rightA: 'D', rightB: 'E' }]}
        showSummary
      >
        <HTableColumn title="Left A" field="leftA" fixed />
        <HTableColumn title="Left B" field="leftB" fixed />
        <HTableColumn title="Center" field="center" />
        <HTableColumn title="Right A" field="rightA" fixed="right" />
        <HTableColumn title="Right B" field="rightB" fixed="right" />
      </HTable>
    ));

    await settleTable();

    const widths = [60, 100, 200, 90, 70];
    wrapper.findAll('thead th').forEach((cell, index) => {
      cell.element.getBoundingClientRect = () =>
        ({
          width: widths[index],
          height: 40,
        }) as DOMRect;
    });

    (
      wrapper.findComponent(HTable).vm.$.exposed as {
        refreshLayout: () => void;
      }
    ).refreshLayout();
    await settleTable();

    const headerCells = wrapper.findAll('thead th');
    const bodyCells = wrapper.findAll('tbody td');
    const footerCells = wrapper.findAll('tfoot td');

    expect(headerCells[1].attributes('style')).toContain('left: 60px');
    expect(bodyCells[1].attributes('style')).toContain('left: 60px');
    expect(footerCells[1].attributes('style')).toContain('left: 60px');
    expect(headerCells[3].attributes('style')).toContain('right: 70px');
    expect(bodyCells[3].attributes('style')).toContain('right: 70px');
    expect(footerCells[3].attributes('style')).toContain('right: 70px');
    expect(headerCells[4].attributes('style')).toContain('right: 0px');
  });

  test('resizes a column from the header divider and emits the final width', async () => {
    const onHeaderDragend = vi.fn();
    const wrapper = mount(() => (
      <HTable data={[{ name: 'Alice' }]} showHeaderDivider onHeaderDragend={onHeaderDragend}>
        <HTableColumn title="Name" field="name" minWidth={40} resizable />
      </HTable>
    ));

    await settleTable();

    Object.defineProperty(wrapper.find('thead th').element, 'clientWidth', {
      configurable: true,
      value: 120,
    });

    await wrapper.find('.h-table__header--divider').trigger('mousedown', { clientX: 100 });
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 145 }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 145 }));
    await settleTable();

    expect(onHeaderDragend).toHaveBeenCalledOnce();
    expect(onHeaderDragend).toHaveBeenCalledWith(
      165,
      120,
      expect.objectContaining({ props: expect.objectContaining({ field: 'name' }) }),
      expect.any(MouseEvent),
    );
    expect(wrapper.find('col').attributes('style')).toContain('width: 165px');
  });

  test('commits managed fixed and order drafts on confirm and resets to the initial state', async () => {
    const wrapper = mount(
      () => (
        <HTable
          data={[{ locked: 'Locked', movingA: 'A', movingB: 'B', normal: 'Normal' }]}
          useColumnManager
        >
          <HTableColumn title="Locked" field="locked" fixed lockFixed />
          <HTableColumn title="Moving" fixed>
            <HTableColumn title="Moving A" field="movingA" />
            <HTableColumn title="Moving B" field="movingB" />
          </HTableColumn>
          <HTableColumn title="Normal" field="normal" />
        </HTable>
      ),
      {
        attachTo: document.body,
      },
    );

    await settleTable();

    const treeSelect = wrapper.findComponent(HTreeSelect);
    (
      treeSelect.vm.$.exposed as {
        changePanelVisible: (visible: boolean) => void;
      }
    ).changePanelVisible(true);
    await settleTable();

    const movingItemElement = Array.from(
      document.querySelectorAll<HTMLElement>('.h-table__column-manager--item'),
    ).find(item => item.textContent?.trim() === 'Moving');

    expect(movingItemElement).toBeDefined();
    await new DOMWrapper(movingItemElement!).find('button').trigger('click');
    await settleTable();

    const movingDropdown = wrapper
      .findAllComponents(HDropdown)
      .find(dropdown =>
        dropdown.element.closest('.h-table__column-manager--item')?.textContent?.includes('Moving'),
      );

    expect(movingDropdown).toBeDefined();
    (
      movingDropdown!.vm.$.exposed as {
        handleOpen: () => void;
      }
    ).handleOpen();
    await settleTable();

    const fixedOptions = movingDropdown!.findAllComponents(HDropdownItem);
    expect(fixedOptions).toHaveLength(2);
    await fixedOptions[1].trigger('click');

    const draftHeaderCells = wrapper.findAll('thead th');
    expect(draftHeaderCells.map(cell => cell.text())).toEqual([
      'Locked',
      'Moving',
      'Normal',
      'Moving A',
      'Moving B',
    ]);
    expect(draftHeaderCells[1].classes()).toContain('is-fixed-left');
    expect(draftHeaderCells[1].classes()).not.toContain('is-fixed-right');

    (
      treeSelect.vm.$.exposed as {
        confirmHandle: () => void;
      }
    ).confirmHandle();
    await settleTable();

    const headerCells = wrapper.findAll('thead th');
    const bodyCells = wrapper.findAll('tbody td');

    expect(headerCells.map(cell => cell.text())).toEqual([
      'Locked',
      'Normal',
      'Moving',
      'Moving A',
      'Moving B',
    ]);
    expect(headerCells[2].classes()).toEqual(
      expect.arrayContaining(['is-fixed-right', 'is-last-fixed-column']),
    );
    expect(headerCells[2].attributes('style')).toContain('right: 0px');
    expect(headerCells[2].attributes('style')).not.toContain('left:');
    expect(headerCells[3].classes()).toEqual(
      expect.arrayContaining(['is-fixed-right', 'is-last-fixed-column']),
    );
    expect(headerCells[4].classes()).toContain('is-fixed-right');
    expect(bodyCells[2].classes()).toEqual(
      expect.arrayContaining(['is-fixed-right', 'is-last-fixed-column']),
    );
    expect(bodyCells[3].classes()).toContain('is-fixed-right');

    const headerWidthMap = new Map([
      ['Locked', 60],
      ['Normal', 90],
      ['Moving', 150],
      ['Moving A', 70],
      ['Moving B', 80],
    ]);
    const rectSpy = vi
      .spyOn(HTMLTableCellElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLTableCellElement) {
        return {
          width: headerWidthMap.get(this.textContent?.trim() ?? '') ?? 0,
          height: 40,
        } as DOMRect;
      });

    (
      treeSelect.vm.$.exposed as {
        changePanelVisible: (visible: boolean) => void;
      }
    ).changePanelVisible(true);
    await settleTable();

    const treeData = treeSelect.props('treeData') as HTreeData[];
    const reorderedTreeData = treeData.map(item =>
      item.label === 'Moving'
        ? {
            ...item,
            children: [...(item.children ?? [])].reverse(),
          }
        : item,
    );

    treeSelect.vm.$emit('update:treeData', reorderedTreeData);
    await settleTable();

    expect(wrapper.findAll('thead th').map(cell => cell.text())).toEqual([
      'Locked',
      'Normal',
      'Moving',
      'Moving A',
      'Moving B',
    ]);

    (
      treeSelect.vm.$.exposed as {
        confirmHandle: () => void;
      }
    ).confirmHandle();
    await settleTable();

    const reorderedHeaderCells = wrapper.findAll('thead th');
    const reorderedBodyCells = wrapper.findAll('tbody td');

    expect(reorderedHeaderCells.map(cell => cell.text())).toEqual([
      'Locked',
      'Normal',
      'Moving',
      'Moving B',
      'Moving A',
    ]);
    expect(reorderedHeaderCells[3].attributes('style')).toContain('right: 70px');
    expect(reorderedHeaderCells[4].attributes('style')).toContain('right: 0px');
    expect(reorderedBodyCells[2].attributes('style')).toContain('right: 70px');
    expect(reorderedBodyCells[3].attributes('style')).toContain('right: 0px');

    (
      treeSelect.vm.$.exposed as {
        changePanelVisible: (visible: boolean) => void;
      }
    ).changePanelVisible(true);
    await settleTable();

    const confirmWrapperElement = document.querySelector<HTMLElement>(
      '.h-table__column-manager--popper .h-picker__pop-content--confirm-wrapper',
    );
    const confirmButtons = new DOMWrapper(confirmWrapperElement!).findAll('button');

    expect(confirmButtons).toHaveLength(2);
    await confirmButtons[0].trigger('click');
    await settleTable();

    expect(wrapper.findAll('thead th').map(cell => cell.text())).toEqual([
      'Locked',
      'Normal',
      'Moving',
      'Moving B',
      'Moving A',
    ]);

    const resetTreeData = treeSelect.props('treeData') as HTreeData[];
    const resetMovingColumn = resetTreeData.find(item => item.label === 'Moving');
    expect(resetMovingColumn?.children?.map(item => item.label)).toEqual(['Moving A', 'Moving B']);

    (
      treeSelect.vm.$.exposed as {
        confirmHandle: () => void;
      }
    ).confirmHandle();
    await settleTable();

    const resetHeaderCells = wrapper.findAll('thead th');

    expect(resetHeaderCells.map(cell => cell.text())).toEqual([
      'Locked',
      'Moving',
      'Normal',
      'Moving A',
      'Moving B',
    ]);
    expect(resetHeaderCells[1].classes()).toContain('is-fixed-left');
    expect(resetHeaderCells[1].classes()).not.toContain('is-fixed-right');

    rectSpy.mockRestore();

    Object.defineProperty(resetHeaderCells[0].element.parentElement!, 'clientHeight', {
      configurable: true,
      value: 40,
    });
    (
      wrapper.findComponent(HTable).vm.$.exposed as {
        refreshLayout: () => void;
      }
    ).refreshLayout();
    await settleTable();

    expect(wrapper.find('.h-table').attributes('style')).toContain(
      '--h-table-header-row-height: 40px',
    );

    wrapper.unmount();
  });

  test('reorders draggable sibling columns from the header', async () => {
    const wrapper = mount(() => (
      <HTable data={[{ name: 'Alice', age: 30 }]}>
        <HTableColumn title="Name" field="name" order={1} draggable />
        <HTableColumn title="Age" field="age" order={2} draggable />
      </HTable>
    ));

    await settleTable();

    const dataTransfer = {
      effectAllowed: 'none',
      dropEffect: 'none',
      setData: vi.fn(),
    };

    await wrapper.findAll('th')[0].trigger('dragstart', { dataTransfer });
    await wrapper.findAll('th')[1].trigger('dragover', {
      clientX: 1,
      dataTransfer,
    });
    await wrapper.findAll('th')[1].trigger('drop', { dataTransfer });
    await settleTable();

    expect(wrapper.findAll('th').map(cell => cell.text())).toEqual(['Age', 'Name']);
    expect(wrapper.findAll('tbody td').map(cell => cell.text())).toEqual(['30', 'Alice']);
  });

  test('reorders rows from a drag column and emits the next data', async () => {
    const data = ref([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
    const wrapper = mount(() => (
      <HTable
        data={data.value}
        rowKey="id"
        onUpdate:data={value => {
          data.value = value as typeof data.value;
        }}
      >
        <HTableColumn type="drag" />
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));

    await settleTable();

    const dataTransfer = {
      effectAllowed: 'none',
      dropEffect: 'none',
      setData: vi.fn(),
    };

    await wrapper.findAll('.h-table__drag-handle')[0].trigger('dragstart', { dataTransfer });
    await wrapper.findAll('tbody tr')[1].trigger('dragover', {
      clientY: 1,
      dataTransfer,
    });
    await wrapper.findAll('tbody tr')[1].trigger('drop', { dataTransfer });
    await settleTable();

    expect(data.value.map(row => row.id)).toEqual([2, 1]);
    expect(wrapper.findAll('tbody tr').map(row => row.text())).toEqual(['Bob', 'Alice']);
  });
});
