import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { HTable, HTableColumn } from '..';
import type { HTableCellScopeSlots, HTableGroupScopeSlots } from '..';
import type { TableExposes } from '../src/composables/useExposes';
import HSelect from '../../Select/src/Select';

async function settle() {
  await nextTick();
  await nextTick();
  await nextTick();
}

function exposedTable(wrapper: ReturnType<typeof mount>) {
  return wrapper.findComponent(HTable).getCurrentComponent().exposed as TableExposes;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Table body keyboard and editing browser branches', () => {
  test('renders group slot scope and expands, collapses, and focuses parent groups by keyboard', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 1;
    });
    const wrapper = mount(
      () => (
        <HTable
          data={[
            { id: 1, team: 'Core', role: 'Engineer', points: 2 },
            { id: 2, team: 'Core', role: 'Designer', points: 3 },
            { id: 3, team: 'Growth', role: 'Engineer', points: 5 },
          ]}
          rowKey="id"
          groupBy={['team', 'role']}
          aggregations={{ points: 'sum' }}
        >
          {{
            default: () => (
              <>
                <HTableColumn title="Team" field="team" />
                <HTableColumn title="Role" field="role" />
                <HTableColumn title="Points" field="points" />
              </>
            ),
            group: (scope: HTableGroupScopeSlots) => (
              <button class="custom-group" onClick={scope.toggle}>
                {scope.key}|{scope.label}|{scope.level}|{scope.rows.length}|
                {String(scope.aggregates.points ?? 'none')}
              </button>
            ),
          }}
        </HTable>
      ),
      { attachTo: document.body },
    );
    await settle();

    let groupRows = wrapper.findAll<HTMLElement>('.h-table__row--group');
    expect(groupRows[0].get('.custom-group').text()).toContain('Core|0|2|5');
    await groupRows[0].get('.custom-group').trigger('click');
    await settle();
    groupRows = wrapper.findAll<HTMLElement>('.h-table__row--group');
    expect(groupRows[0].attributes('aria-expanded')).toBe('false');

    await groupRows[0].trigger('keydown', { key: 'ArrowRight' });
    await settle();
    groupRows = wrapper.findAll<HTMLElement>('.h-table__row--group');
    expect(groupRows[0].attributes('aria-expanded')).toBe('true');

    const nestedGroup = groupRows.find(row => row.attributes('aria-level') === '2')!;
    await nestedGroup.trigger('keydown', { key: 'ArrowLeft' });
    await settle();
    expect(nestedGroup.attributes('aria-expanded')).toBe('false');
    await nestedGroup.trigger('keydown', { key: 'ArrowLeft' });
    await settle();
    expect(wrapper.findAll('.h-table__row--group')[0].attributes('tabindex')).toBe('0');

    await wrapper.findAll('.h-table__row--group')[0].trigger('keydown', { key: 'Spacebar' });
    expect(wrapper.findAll('.h-table__row--group')[0].attributes('aria-expanded')).toBe('true');
    wrapper.unmount();
  });

  test('toggles tree and expand-column rows with Enter and ignores Enter for plain rows', async () => {
    const tree = mount(() => (
      <HTable
        data={[{ id: 1, name: 'Parent', children: [{ id: 2, name: 'Child' }] }]}
        rowKey="id"
      >
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));
    await settle();
    await tree.get('tbody .h-table__row').trigger('keydown', { key: 'Enter' });
    await settle();
    expect(tree.findAll('tbody .h-table__row')).toHaveLength(2);
    await tree.get('tbody .h-table__row').trigger('keydown', { key: 'Enter' });
    await settle();
    expect(tree.findAll('tbody .h-table__row')).toHaveLength(1);
    tree.unmount();

    const expanded = mount(() => (
      <HTable data={[{ id: 1, details: 'Details' }]} rowKey="id">
        <HTableColumn type="expand">
          {{
            expand: ({ row }: HTableCellScopeSlots) => (
              <span class="details">{String(row.details)}</span>
            ),
          }}
        </HTableColumn>
      </HTable>
    ));
    await settle();
    await expanded.get('tbody .h-table__row').trigger('keydown', { key: 'Enter' });
    await settle();
    expect(expanded.get('.details').text()).toBe('Details');
    expanded.unmount();

    const plain = mount(() => (
      <HTable data={[{ id: 1 }]} rowKey="id">
        <HTableColumn title="ID" field="id" />
      </HTable>
    ));
    await settle();
    await plain.get('tbody .h-table__row').trigger('keydown', { key: 'Enter' });
    expect(plain.find('tbody .h-table__row').attributes('aria-expanded')).toBeUndefined();
    plain.unmount();
  });

  test('keeps textarea editing on Enter, skips blur commit when disabled, and cancels on Escape', async () => {
    const data = ref([{ id: 1, note: 'Alpha' }]);
    const commits = vi.fn();
    const wrapper = mount(() => (
      <HTable
        data={data.value}
        rowKey="id"
        commitEditOnBlur={false}
        onUpdate:data={value => {
          data.value = value as typeof data.value;
        }}
        onCellEditCommit={commits}
      >
        <HTableColumn
          title="Note"
          field="note"
          editable
          editTrigger="click"
          editorOptions={{ type: 'textarea' }}
        />
      </HTable>
    ));
    await settle();

    await wrapper.get('tbody td').trigger('click');
    await settle();
    const textarea = wrapper.get('textarea');
    await textarea.setValue('Beta');
    await textarea.trigger('keydown', { key: 'Enter' });
    await textarea.trigger('focusout');
    await settle();
    expect(wrapper.find('textarea').exists()).toBe(true);
    expect(commits).not.toHaveBeenCalled();
    expect(data.value[0].note).toBe('Alpha');

    await wrapper.get('textarea').trigger('keydown', { key: 'Escape' });
    await settle();
    expect(wrapper.find('textarea').exists()).toBe(false);
    wrapper.unmount();
  });

  test('does not commit a row while focus moves within its editors, then commits on outside focus', async () => {
    const data = ref([{ id: 1, name: 'Alpha', role: 'Developer' }]);
    const commits = vi.fn();
    const outside = document.createElement('button');
    document.body.append(outside);
    const wrapper = mount(
      () => (
        <HTable
          data={data.value}
          rowKey="id"
          editMode="row"
          onUpdate:data={value => {
            data.value = value as typeof data.value;
          }}
          onCellEditCommit={commits}
        >
          <HTableColumn title="Name" field="name" editable />
          <HTableColumn title="Role" field="role" editable />
        </HTable>
      ),
      { attachTo: document.body },
    );
    await settle();
    await expect(exposedTable(wrapper).startCellEdit(1, 'name')).resolves.toBe(true);
    await settle();

    const inputs = wrapper.findAll<HTMLInputElement>('[data-table-editor="true"] input');
    await inputs[0].setValue('Beta');
    inputs[0].element.dispatchEvent(
      new FocusEvent('focusout', { bubbles: true, relatedTarget: inputs[1].element }),
    );
    await settle();
    expect(wrapper.findAll('[data-table-editor="true"]')).toHaveLength(2);
    expect(commits).not.toHaveBeenCalled();

    inputs[1].element.dispatchEvent(
      new FocusEvent('focusout', { bubbles: true, relatedTarget: outside }),
    );
    await settle();
    expect(data.value[0].name).toBe('Beta');
    expect(commits).toHaveBeenCalledTimes(2);
    expect(
      commits.mock.calls.some(
        ([context]) =>
          context.column.props.field === 'name' &&
          context.value === 'Beta' &&
          context.oldValue === 'Alpha',
      ),
    ).toBe(true);
    expect(wrapper.find('[data-table-editor="true"]').exists()).toBe(false);
    wrapper.unmount();
    outside.remove();
  });

  test('auto-commits a non-text editor on change and respects confirm-required editors', async () => {
    const singleData = ref([{ id: 1, role: 'reader' }]);
    const singleTable = mount(() => (
      <HTable
        data={singleData.value}
        rowKey="id"
        onUpdate:data={value => {
          singleData.value = value as typeof singleData.value;
        }}
      >
        <HTableColumn
          title="Role"
          field="role"
          editable
          editorType="select"
          editorOptions={{
            options: [
              { value: 'reader', label: 'Reader' },
              { value: 'writer', label: 'Writer' },
            ],
          }}
        />
      </HTable>
    ));
    await settle();
    await singleTable.get('tbody td').trigger('dblclick');
    await settle();
    const singleEditor = singleTable.getComponent(HSelect);
    singleEditor.vm.$emit('update:modelValue', 'writer');
    await nextTick();
    singleEditor.vm.$emit('change', '', 'writer');
    await settle();
    expect(singleData.value[0].role).toBe('writer');
    expect(singleTable.find('[data-table-editor="true"]').exists()).toBe(false);

    const selectData = ref([{ id: 1, roles: ['reader'] }]);
    const selectTable = mount(() => (
      <HTable
        data={selectData.value}
        rowKey="id"
        onUpdate:data={value => {
          selectData.value = value as typeof selectData.value;
        }}
      >
        <HTableColumn
          title="Roles"
          field="roles"
          editable
          editorType="select"
          editorOptions={{
            multiple: true,
            needConfirm: true,
            options: [
              { value: 'reader', label: 'Reader' },
              { value: 'writer', label: 'Writer' },
            ],
          }}
        />
      </HTable>
    ));
    await settle();
    await selectTable.get('tbody td').trigger('dblclick');
    await settle();
    const selectEditor = selectTable.getComponent(HSelect);
    selectEditor.vm.$emit('update:modelValue', ['reader', 'writer']);
    await nextTick();
    selectEditor.vm.$emit('change', '', ['reader', 'writer']);
    await settle();
    expect(selectTable.find('[data-table-editor="true"]').exists()).toBe(true);
    selectEditor.vm.$emit('confirm');
    await settle();
    expect(selectData.value[0].roles).toEqual(['reader', 'writer']);
    expect(selectTable.find('[data-table-editor="true"]').exists()).toBe(false);
  });

  test('renders non-Error commit failures through the public editor state', async () => {
    const wrapper = mount(() => (
      <HTable data={[{ id: 1, name: 'Alpha' }]} rowKey="id">
        <HTableColumn
          title="Name"
          field="name"
          editable
          beforeCommit={async () => {
            throw 'string failure';
          }}
        />
      </HTable>
    ));
    await settle();
    await wrapper.get('tbody td').trigger('dblclick');
    await settle();
    await wrapper.get('input').setValue('Beta');
    await wrapper.get('input').trigger('keydown', { key: 'Enter' });
    await settle();

    expect(wrapper.get('.h-table__cell-editor').classes()).toContain('is-invalid');
    expect(wrapper.get('.h-table__cell-editor').attributes('title')).toBe('string failure');
  });
});
