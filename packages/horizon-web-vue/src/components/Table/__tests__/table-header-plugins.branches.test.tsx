import { DOMWrapper, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { HTable, HTableColumn } from '..';
import HInput from '../../Input/src/Input';
import HInputNumber from '../../InputNumber/src/InputNumber';
import HTooltip from '../../Tooltip/src/Tooltip';
import { sleep } from '~/utils/tools';
import type { TableColumnProps } from '../src/composables/useProps';
import { isTableFilterValueEmpty } from '../src/hooks/useHeaderPluginRender';

async function settle() {
  await nextTick();
  await nextTick();
}

describe('Table header plugin browser branches', () => {
  test('sorts separate hot zones by pointer and keyboard and blocks disabled/no-field columns', async () => {
    const sortChange = vi.fn();
    const wrapper = mount(
      () => (
        <HTable
          data={[{ id: 2, name: 'Beta' }, { id: 1, name: 'Alpha' }]}
          onSortChange={sortChange}
        >
          <HTableColumn title="ID" field="id" sortable sortSeparate />
          <HTableColumn title="Disabled" field="name" sortable sortDisabled />
          <HTableColumn title="No field" sortable />
        </HTable>
      ),
      { attachTo: document.body },
    );
    await settle();

    const sortPlugins = wrapper.findAll('.h-table__header--sort');
    expect(sortPlugins).toHaveLength(2);
    const separated = sortPlugins[0];
    expect(separated.attributes('role')).toBeUndefined();
    const hotZones = separated.findAll('[role="button"]');
    expect(hotZones).toHaveLength(2);

    const outerKey = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    separated.element.dispatchEvent(outerKey);
    expect(outerKey.defaultPrevented).toBe(false);

    await hotZones[0].trigger('click', { metaKey: true });
    await settle();
    expect(wrapper.findAll('tbody tr').map(row => row.text())).toEqual(['1Alpha', '2Beta']);
    expect(sortChange).toHaveBeenCalled();
    expect(hotZones[0].attributes('aria-pressed')).toBe('true');

    await hotZones[1].trigger('keydown', { key: ' ', metaKey: true });
    await settle();
    expect(wrapper.findAll('tbody tr').map(row => row.text())).toEqual(['2Beta', '1Alpha']);
    expect(hotZones[1].attributes('aria-pressed')).toBe('true');

    await hotZones[1].trigger('click', { metaKey: true });
    await settle();
    expect(hotZones[1].attributes('aria-pressed')).toBe('false');

    const unrelated = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
    hotZones[0].element.dispatchEvent(unrelated);
    expect(unrelated.defaultPrevented).toBe(false);

    const disabled = sortPlugins[1];
    expect(disabled.classes()).toContain('is-disabled');
    const callsBeforeDisabledClick = sortChange.mock.calls.length;
    const disabledClick = new MouseEvent('click', { bubbles: true, cancelable: true });
    disabled.element.dispatchEvent(disabledClick);
    expect(sortChange).toHaveBeenCalledTimes(callsBeforeDisabledClick);
    wrapper.unmount();
  });

  test('keeps a disabled separated sorter inert and derives its label from field', async () => {
    const sortChange = vi.fn();
    const wrapper = mount(() => (
      <HTable data={[{ code: 2 }, { code: 1 }]} onSortChange={sortChange}>
        <HTableColumn field="code" sortable sortSeparate sortDisabled />
      </HTable>
    ));
    await settle();

    const sort = wrapper.get('.h-table__header--sort');
    const icons = sort.findAll('.h-table__header--sort-icon');
    expect(icons).toHaveLength(2);
    expect(icons[0].attributes('tabindex')).toBe('-1');
    expect(icons[0].attributes('aria-label')).toBe('code ↑');
    expect(icons[1].attributes('aria-label')).toBe('code ↓');
    const callsBeforeClick = sortChange.mock.calls.length;
    await icons[0].trigger('click', { metaKey: true });
    await icons[1].trigger('click', { metaKey: true });
    expect(sortChange).toHaveBeenCalledTimes(callsBeforeClick);
  });

  test('sorts the combined header control by pointer and legacy keyboard activation', async () => {
    const sortChange = vi.fn();
    const wrapper = mount(() => (
      <HTable data={[{ id: 2 }, { id: 1 }]} onSortChange={sortChange}>
        <HTableColumn title="ID" field="id" sortable />
      </HTable>
    ));
    await settle();
    const sort = wrapper.get('.h-table__header--sort');
    expect(sort.attributes('role')).toBe('button');
    expect(sort.attributes('aria-pressed')).toBe('false');
    const callsBeforeInteraction = sortChange.mock.calls.length;

    await sort.trigger('click', { metaKey: true });
    await settle();
    expect(wrapper.findAll('tbody tr').map(row => row.text())).toEqual(['1', '2']);
    expect(sort.attributes('aria-pressed')).toBe('true');

    await sort.trigger('keydown', { key: 'Spacebar', ctrlKey: true });
    await settle();
    expect(wrapper.findAll('tbody tr').map(row => row.text())).toEqual(['2', '1']);
    expect(sortChange).toHaveBeenCalledTimes(callsBeforeInteraction + 2);
  });

  test('filters an input column through real picker confirm and cancel controls', async () => {
    const wrapper = mount(
      () => (
        <HTable data={[{ name: 'Alice' }, { name: 'Bob' }]}>
          <HTableColumn
            title="Name"
            field="name"
            filterable
            filterType="input"
            filterOptions={{ placeholder: 'Search names' }}
          />
        </HTable>
      ),
      { attachTo: document.body },
    );
    await settle();

    await wrapper.get('.h-table__header--search').trigger('click');
    await sleep(0);
    const input = wrapper.findComponent(HInput).get('input');
    expect(input.attributes('placeholder')).toBe('Search names');
    await input.setValue('Ali');
    const buttons = Array.from(
      document.querySelectorAll('.h-picker__pop-content--confirm-wrapper-buttons button'),
    ).map(element => new DOMWrapper(element));
    expect(buttons).toHaveLength(2);
    await buttons[1].trigger('click');
    await settle();
    expect(wrapper.findAll('tbody tr')).toHaveLength(1);
    expect(wrapper.find('tbody').text()).toContain('Alice');

    await wrapper.get('.h-table__header--search').trigger('click');
    await sleep(0);
    const resetButton = document.querySelector(
      '.h-picker__pop-content--confirm-wrapper-buttons button',
    );
    expect(resetButton).not.toBeNull();
    await new DOMWrapper(resetButton!).trigger('click');
    await settle();
    expect(wrapper.findAll('tbody tr')).toHaveLength(2);
    wrapper.unmount();
  });

  test('filters an input-number column through its real editor and confirm action', async () => {
    const wrapper = mount(
      () => (
        <HTable data={[{ amount: 12 }, { amount: 20 }, { amount: 3 }]}>
          <HTableColumn title="Amount" field="amount" filterable filterType="input-number" />
        </HTable>
      ),
      { attachTo: document.body },
    );
    await settle();

    await wrapper.get('.h-table__header--search').trigger('click');
    await sleep(0);
    const editor = wrapper.getComponent(HInputNumber);
    editor.vm.$emit('update:modelValue', 2);
    await nextTick();
    const buttons = Array.from(
      document.querySelectorAll('.h-picker__pop-content--confirm-wrapper-buttons button'),
    ).map(element => new DOMWrapper(element));
    await buttons.at(-1)!.trigger('click');
    await settle();
    expect(wrapper.findAll('tbody tr').map(row => row.text())).toEqual(['12', '20']);
    wrapper.unmount();
  });

  test('classifies nested and cyclic filter values without recursive overflow', () => {
    expect(isTableFilterValueEmpty(undefined)).toBe(true);
    expect(isTableFilterValueEmpty([])).toBe(true);
    expect(isTableFilterValueEmpty([null, [undefined]])).toBe(true);
    expect(isTableFilterValueEmpty([null, ['Open']])).toBe(false);
    const cyclic: unknown[] = [];
    cyclic.push(cyclic);
    expect(isTableFilterValueEmpty(cyclic)).toBe(false);
  });

  test('renders select/specialized filters and opens the real header tip tooltip', async () => {
    const cases: Array<{
      filterType: NonNullable<TableColumnProps['filterType']>;
      filterOptions: Record<string, unknown>;
    }> = [
      { filterType: 'select', filterOptions: {} },
      { filterType: 'tree-select', filterOptions: { data: [{ uuid: 'open', label: 'Open' }] } },
      { filterType: 'date-picker', filterOptions: {} },
      { filterType: 'time-picker', filterOptions: {} },
      {
        filterType: 'cascader',
        filterOptions: { options: [{ value: 'open', label: 'Open' }] },
      },
    ];

    for (const item of cases) {
      const filterWrapper = mount(
        () => (
          <HTable data={[{ status: 'Open' }]}>
            <HTableColumn
              title={item.filterType}
              field="status"
              filterable
              filterType={item.filterType}
              filterOptions={item.filterOptions as TableColumnProps['filterOptions']}
            />
          </HTable>
        ),
        { attachTo: document.body },
      );
      await settle();
      expect(filterWrapper.find('.h-table__header--filter-icon').exists()).toBe(true);
      filterWrapper.unmount();
    }

    const wrapper = mount(
      () => (
        <HTable data={[{ status: 'Open' }]}>
          <HTableColumn title="Help" field="status" tip="Header guidance" />
        </HTable>
      ),
      { attachTo: document.body },
    );
    await settle();
    expect(wrapper.findComponent(HTooltip).exists()).toBe(true);
    await wrapper.get('.h-table__header--tip').trigger('mouseenter');
    await sleep(250);
    const tooltipContent = Array.from(document.querySelectorAll('.h-tooltip__content')).find(
      content => content.textContent === 'Header guidance',
    );
    expect(tooltipContent).toBeDefined();
    wrapper.unmount();

    const missingField = mount(() => (
      <HTable data={[{ status: 'Open' }]}>
        <HTableColumn title="Missing" filterable filterType="select" />
      </HTable>
    ));
    await settle();
    expect(missingField.find('.h-table__header--filter-icon').exists()).toBe(false);
    missingField.unmount();
  });
});
