import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { HTable, HTableColumn } from '..';
import type { HTableFooterCellScopeSlots, HTableHeaderCellScopeSlots } from '..';
import HTooltip from '../../Tooltip/src/Tooltip';
import HScrollbar from '../../Scrollbar/src/Scrollbar';
import HDatePicker from '../../DatePicker/src/DatePicker';

async function settle() {
  await nextTick();
  await nextTick();
  await nextTick();
}

describe('Table header and footer rendering browser branches', () => {
  test('applies remaining table presentation props to rows, cells, scroll and expansion', async () => {
    const wrapper = mount(
      () => (
        <HTable
          data={[
            { id: 1, name: 'Alpha', amount: 10 },
            { id: 2, name: 'Beta', amount: 20 },
          ]}
          rowKey="id"
          minHeight={120}
          stripe
          hoverable={false}
          highlightSelected={false}
          headerRowStyle={{ backgroundColor: 'rgb(1, 2, 3)' }}
          footerRowStyle={{ backgroundColor: 'rgb(4, 5, 6)' }}
          footerCellStyle={{ color: 'rgb(7, 8, 9)' }}
          emptyText="No contract rows"
          expandRowSticky
          tooltipTheme="light"
          indent={12}
          scrollbarAlwaysOn
          loadingText="Loading contracts"
          tableLayout="auto"
          showSummary
          summaryMethod={() => [['Total', '30']]}
        >
          <HTableColumn type="selection" columnKey="id" selectedKeys={[1]} />
          <HTableColumn type="expand">
            {{ expand: ({ row }: { row: { name: string } }) => `Expanded ${row.name}` }}
          </HTableColumn>
          <HTableColumn
            title="Name"
            field="name"
            headerAlign="right"
            footerAlign="center"
            showOverflowTooltip
            tooltipOptions={{ overflow: false, toBody: false }}
          />
          <HTableColumn title="Amount" field="amount" />
        </HTable>
      ),
      { attachTo: document.body },
    );
    await settle();
    const table = wrapper.get('.h-table');
    expect(table.classes()).toContain('is-stripe');
    expect(table.classes()).not.toContain('is-hoverable');
    expect(table.classes()).not.toContain('is-highlight-selected');
    expect(table.attributes('style')).toContain('min-height: 120px');
    expect(wrapper.getComponent(HScrollbar).props('always')).toBe(true);
    expect(wrapper.get('table').attributes('style')).toContain('table-layout: auto');
    expect(wrapper.get('thead tr').attributes('style')).toContain('rgb(1, 2, 3)');
    expect(wrapper.findAll('thead th')[2].classes()).toContain('is-text-right');
    expect(wrapper.get('tfoot tr').attributes('style')).toContain('rgb(4, 5, 6)');
    expect(wrapper.findAll('tfoot td')[2].classes()).toContain('is-text-center');
    expect(wrapper.findAll('tfoot td')[2].attributes('style')).toContain('rgb(7, 8, 9)');
    expect(wrapper.findAllComponents(HTooltip).some(tooltip => tooltip.props('theme') === 'light')).toBe(
      true,
    );
    expect(wrapper.findAll('tbody tr')[1].classes()).toContain('is-stripe-row');
    expect(wrapper.findAll('tbody tr')[0].classes()).toContain('is-selected');

    await wrapper.findAll('tbody .h-table__expand-icon')[0].trigger('click');
    await settle();
    expect(wrapper.findAll('tbody tr')[0].classes()).toContain('is-expanded');
    expect(wrapper.text()).toContain('Expanded Alpha');
    wrapper.unmount();

    const loading = ref(false);
    const empty = mount(() => (
      <HTable
        loading={loading.value}
        emptyText="No contract rows"
        loadingText="Loading contracts"
      />
    ));
    expect(empty.text()).toContain('No contract rows');
    loading.value = true;
    await nextTick();
    expect(empty.text()).toContain('Loading contracts');

    const tree = mount(() => (
      <HTable
        data={[{ id: 1, name: 'Parent', children: [{ id: 2, name: 'Child' }] }]}
        rowKey="id"
        defaultExpandAll
        treeExpandField="name"
        indent={12}
      >
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));
    await settle();
    expect(
      tree.findAll('tbody tr')[1].get('.h-table__expand-icon').attributes('style'),
    ).toContain('margin-left: 12px');
  });

  test('forwards every filter popover prop and filterDisabled to the header control', async () => {
    const wrapper = mount(
      () => (
        <HTable data={[{ date: '2026-01-01' }]}>
          <HTableColumn
            title="Date"
            field="date"
            filterable
            filterType="date-picker"
            filterDisabled={false}
            filterPopoverPlacement="top-start"
            filterPopoverClassName="table-filter-contract"
            filterPopoverStyle={{ backgroundColor: 'rgb(10, 11, 12)' }}
          />
        </HTable>
      ),
      { attachTo: document.body },
    );
    await settle();
    const picker = wrapper.getComponent(HDatePicker);
    expect(picker.props()).toMatchObject({
      placement: 'top-start',
      panelClass: 'table-filter-contract',
      panelStyle: { backgroundColor: 'rgb(10, 11, 12)' },
    });
    expect(wrapper.get('button.h-table__header--filter-icon').attributes('disabled')).toBeUndefined();
  });

  test('selects all rows from the header and omits the control when useCheckAll is false', async () => {
    const selectedKeys = ref<number[]>([]);
    const wrapper = mount(() => (
      <HTable data={[{ id: 1 }, { id: 2 }]} rowKey="id">
        <HTableColumn
          type="selection"
          columnKey="id"
          multiple
          selectedKeys={selectedKeys.value}
          onUpdate:selectedKeys={value => {
            selectedKeys.value = value as number[];
          }}
        />
        <HTableColumn type="selection" columnKey="id" multiple useCheckAll={false} />
      </HTable>
    ));
    await settle();

    expect(wrapper.findAll('.h-table__header--selection')).toHaveLength(1);
    await wrapper.get('.h-table__header--selection').trigger('click');
    await settle();
    expect(selectedKeys.value).toEqual([1, 2]);
    await wrapper.get('.h-table__header--selection').trigger('click');
    await settle();
    expect(selectedKeys.value).toEqual([]);
  });

  test('renders header slot scope, sticky offsets, and real overflow tooltip content', async () => {
    const headerScope = vi.fn((scope: HTableHeaderCellScopeSlots) => (
      <span class="custom-header">
        {'props' in scope.column ? scope.column.props.field : 'missing'}:{scope.columnIndex}:
        {String(scope.fixed)}
      </span>
    ));
    const wrapper = mount(
      () => (
        <HTable data={[{ name: 'A very long heading value' }]} headerContentSticky>
          <HTableColumn
            title="Long heading"
            field="name"
            showHeaderOverflowTooltip
            headerTooltipOptions={{ overflow: false, showAfter: 0, toBody: false }}
          >
            {{ header: headerScope }}
          </HTableColumn>
        </HTable>
      ),
      { attachTo: document.body },
    );
    await settle();

    expect(wrapper.get('.custom-header').text()).toBe('name:0:undefined');
    expect(headerScope).toHaveBeenCalled();
    const wrap = wrapper.get('thead .h-table__cell-wrap');
    expect(wrap.classes()).toContain('is-sticky');
    expect(wrap.attributes('style')).toContain('left: calc(');
    expect(wrapper.findComponent(HTooltip).exists()).toBe(true);
    await wrapper.get('thead .h-table__cell-inner').trigger('mouseenter');
    await vi.waitFor(() =>
      expect(wrapper.get('thead .h-tooltip__content').text()).toContain('name:0:undefined'),
    );
    wrapper.unmount();
  });

  test('renders multi-row summary method and summaryFooter scope with footer tooltip', async () => {
    const summaryMethod = vi.fn(() => [
      ['First', '10'],
      ['Second', '20'],
    ]);
    const footerScope = vi.fn((scope: HTableFooterCellScopeSlots) => (
      <span class="custom-footer">
        {'props' in scope.column ? scope.column.props.field : 'missing'}:{scope.columnIndex}:
        {scope.rowIndex}:{String(scope.fixed)}
      </span>
    ));
    const wrapper = mount(
      () => (
        <HTable
          data={[{ label: 'A', amount: 10 }]}
          showSummary
          summaryRowAmount={2}
          summaryMethod={summaryMethod}
        >
          <HTableColumn title="Label" field="label">
            {{ summaryFooter: footerScope }}
          </HTableColumn>
          <HTableColumn
            title="Amount"
            field="amount"
            showFooterOverflowTooltip
            footerTooltipOptions={{ overflow: false, showAfter: 0, toBody: false }}
          />
        </HTable>
      ),
      { attachTo: document.body },
    );
    await settle();

    expect(summaryMethod).toHaveBeenCalledWith(
      expect.objectContaining({ data: [{ label: 'A', amount: 10 }] }),
    );
    expect(wrapper.findAll('tfoot tr')).toHaveLength(2);
    expect(wrapper.findAll('.custom-footer').map(node => node.text())).toEqual([
      'label:0:0:undefined',
      'label:0:1:undefined',
    ]);
    expect(footerScope.mock.calls.length).toBeGreaterThanOrEqual(2);
    expect(wrapper.findAll('tfoot td')[1].text()).toBe('10');
    expect(wrapper.findAll('tfoot td')[3].text()).toBe('20');

    await wrapper.findAll('tfoot .h-table__cell-inner')[1].trigger('mouseenter');
    await vi.waitFor(() =>
      expect(wrapper.findAll('tfoot .h-tooltip__content')[0]?.text()).toBe('10'),
    );
    wrapper.unmount();
  });

  test('keeps invalid automatic numeric summaries empty and uses summary text fallbacks', async () => {
    const wrapper = mount(() => (
      <HTable
        data={[{ label: 'A', amount: 'not-a-number' }]}
        showSummary
        summaryRowAmount={2}
        summaryTexts={['Primary']}
      >
        <HTableColumn title="Label" field="label" />
        <HTableColumn title="Amount" field="amount" />
        <HTableColumn title="No field" />
      </HTable>
    ));
    await settle();

    const footerRows = wrapper.findAll('tfoot tr');
    expect(footerRows[0].findAll('td')[0].text()).toBe('Primary');
    expect(footerRows[1].findAll('td')).toHaveLength(3);
    expect(footerRows[0].findAll('td')[1].text()).toBe('');
    expect(footerRows[0].findAll('td')[2].text()).toBe('');
  });

  test('evaluates functional header/footer styling and empty tooltip option fallbacks', async () => {
    const headerRowClassName = vi.fn(() => 'header-row-function');
    const headerRowStyle = vi.fn(() => ({ backgroundColor: 'rgb(11, 12, 13)' }));
    const headerCellClassName = vi.fn(() => 'header-cell-function');
    const headerCellStyle = vi.fn(() => ({ color: 'rgb(14, 15, 16)' }));
    const footerRowClassName = vi.fn(() => 'footer-row-function');
    const footerRowStyle = vi.fn(() => ({ backgroundColor: 'rgb(17, 18, 19)' }));
    const footerCellClassName = vi.fn(() => 'footer-cell-function');
    const footerCellStyle = vi.fn(() => ({ color: 'rgb(20, 21, 22)' }));
    const wrapper = mount(() => (
      <HTable
        data={[{ label: 'A', amount: 2 }]}
        showSummary
        headerRowClassName={headerRowClassName}
        headerRowStyle={headerRowStyle}
        headerCellClassName={headerCellClassName}
        headerCellStyle={headerCellStyle}
        footerRowClassName={footerRowClassName}
        footerRowStyle={footerRowStyle}
        footerCellClassName={footerCellClassName}
        footerCellStyle={footerCellStyle}
      >
        <HTableColumn title="Label" field="label" showHeaderOverflowTooltip />
        <HTableColumn title="Amount" field="amount" showFooterOverflowTooltip />
      </HTable>
    ));
    await settle();

    expect(wrapper.get('thead tr').classes()).toContain('header-row-function');
    expect(wrapper.get('thead th').classes()).toContain('header-cell-function');
    expect(wrapper.get('tfoot tr').classes()).toContain('footer-row-function');
    expect(wrapper.get('tfoot td').classes()).toContain('footer-cell-function');
    expect(headerRowStyle).toHaveBeenCalled();
    expect(headerCellStyle).toHaveBeenCalled();
    expect(footerRowStyle).toHaveBeenCalled();
    expect(footerCellStyle).toHaveBeenCalled();
  });

  test('renders object loading configuration and the append slot with default sticky offset', async () => {
    const wrapper = mount(HTable, {
      props: {
        data: [{ name: 'Alpha' }],
        loading: { isShow: true, text: 'Object loading' },
        headerSticky: true,
      },
      slots: {
        default: () => <HTableColumn title="Name" field="name" />,
        append: '<div data-table-append>Loaded after table</div>',
      },
    });
    await settle();

    expect(wrapper.text()).toContain('Object loading');
    expect(wrapper.get('[data-table-append]').text()).toBe('Loaded after table');
    expect(wrapper.get('thead th').attributes('style')).toContain('top: 0px');
  });
});
