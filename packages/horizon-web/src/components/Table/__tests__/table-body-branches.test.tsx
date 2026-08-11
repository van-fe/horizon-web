import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { HTable, HTableColumn } from '..';
import type { HTableCellScopeSlots } from '..';
import type {
  TableColumnExposes,
  TableExposes,
} from '../src/composables/useExposes';

async function settle() {
  await nextTick();
  await nextTick();
  await nextTick();
}

function tableApi(wrapper: ReturnType<typeof mount>) {
  return wrapper.findComponent(HTable).getCurrentComponent().exposed as TableExposes;
}

type EditorScope = HTableCellScopeSlots & {
  value: unknown;
  oldValue: unknown;
  update: (value: unknown) => void;
  commit: () => Promise<boolean>;
  cancel: () => void;
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Table body and column browser branches', () => {
  test('operates selection through the TableColumn public exposes', async () => {
    const selectedKeys = ref<Array<number>>([]);
    const columnRef = ref<TableColumnExposes>();
    const wrapper = mount(() => (
      <HTable
        data={[{ id: 1, name: 'Alpha' }, { id: 2, name: 'Beta' }]}
        rowKey="id"
      >
        <HTableColumn
          ref={columnRef}
          type="selection"
          columnKey="id"
          multiple
          selectedKeys={selectedKeys.value}
          onUpdate:selectedKeys={value => {
            selectedKeys.value = value as number[];
          }}
        />
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));
    await settle();

    expect(columnRef.value?.getSelectionRows()).toEqual([]);
    columnRef.value?.toggleRowSelection(2, true);
    await settle();
    expect(selectedKeys.value).toEqual([2]);
    expect(columnRef.value?.getSelectionRows()).toEqual([
      expect.objectContaining({ id: 2, name: 'Beta' }),
    ]);

    columnRef.value?.toggleRowSelection([1, 2]);
    await settle();
    expect(selectedKeys.value).toEqual([1]);

    columnRef.value?.clearSelection();
    await settle();
    expect(selectedKeys.value).toEqual([]);

    columnRef.value?.toggleRowSelection([1, 2], true, true);
    await settle();
    expect(selectedKeys.value).toEqual([1, 2]);
    columnRef.value?.clearSelection(true);
    await settle();
    expect(selectedKeys.value).toEqual([]);
    wrapper.unmount();
  });

  test('clamps regular scrolling exposes and rejects invalid edit targets', async () => {
    const wrapper = mount(
      () => (
        <HTable
          data={[
            { id: 1, name: 'Alpha' },
            { id: 2, name: 'Beta' },
            { id: 3, name: 'Gamma' },
          ]}
          rowKey="id"
          height={80}
        >
          <HTableColumn title="Name" field="name" editable />
        </HTable>
      ),
      { attachTo: document.body },
    );
    await settle();

    const api = tableApi(wrapper);
    const scrollWrap = api.getScrollWrap() as HTMLElement;
    const rows = scrollWrap.querySelectorAll<HTMLTableRowElement>('.h-table__table-body > .h-table__row');
    expect(rows[1].offsetTop).toBeGreaterThan(0);

    api.scrollToIndex(99);
    expect(scrollWrap.scrollTop).toBeGreaterThan(0);
    api.scrollToIndex(-50);
    expect(scrollWrap.scrollTop).toBe(rows[0].offsetTop);
    api.scrollToRow(2);
    expect(scrollWrap.scrollTop).toBeGreaterThan(0);
    const rowTwoScrollTop = scrollWrap.scrollTop;
    api.scrollToRow('missing');
    expect(scrollWrap.scrollTop).toBe(rowTwoScrollTop);
    expect(api.getVisibleRange()).toEqual({
      startIndex: 0,
      endIndex: 3,
      visibleStartIndex: 0,
      visibleEndIndex: 3,
    });

    await expect(api.startCellEdit('missing', 'name')).resolves.toBe(false);
    await expect(api.startCellEdit(1, 'missing')).resolves.toBe(false);
    await expect(api.startCellEdit(1, 'name')).resolves.toBe(true);
    await settle();
    expect(wrapper.find('[data-table-editor="true"]').exists()).toBe(true);
    api.cancelEdit();
    await settle();
    expect(wrapper.find('[data-table-editor="true"]').exists()).toBe(false);
    wrapper.unmount();

    const empty = mount(() => (
      <HTable data={[]} rowKey="id">
        <HTableColumn title="Name" field="name" />
      </HTable>
    ));
    await settle();
    tableApi(empty).scrollToIndex(0);
    expect(tableApi(empty).getVisibleRange().endIndex).toBe(0);
    empty.unmount();
  });

  test('navigates rows with Home, page keys, ArrowUp and the legacy Spacebar key', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 1;
    });
    const selectedKeys = ref<Array<number>>([]);
    const wrapper = mount(
      () => (
        <HTable
          data={Array.from({ length: 6 }, (_, index) => ({ id: index + 1 }))}
          rowKey="id"
        >
          <HTableColumn
            type="selection"
            columnKey="id"
            multiple
            selectedKeys={selectedKeys.value}
            onUpdate:selectedKeys={value => {
              selectedKeys.value = value as number[];
            }}
          />
          <HTableColumn title="ID" field="id" />
        </HTable>
      ),
      { attachTo: document.body },
    );
    await settle();
    const scrollWrap = wrapper.get<HTMLElement>('.h-scrollbar__wrap').element;
    Object.defineProperty(scrollWrap, 'clientHeight', { configurable: true, value: 90 });

    const rows = () => wrapper.findAll<HTMLElement>('tbody .h-table__row');
    await rows()[3].trigger('focus');
    await rows()[3].trigger('keydown', { key: 'ArrowUp' });
    await settle();
    expect(rows()[2].attributes('tabindex')).toBe('0');

    await rows()[2].trigger('keydown', { key: 'Home' });
    await settle();
    expect(rows()[0].attributes('tabindex')).toBe('0');

    await rows()[0].trigger('keydown', { key: 'PageDown' });
    await settle();
    expect(rows()[2].attributes('tabindex')).toBe('0');

    await rows()[2].trigger('keydown', { key: 'PageUp' });
    await settle();
    expect(rows()[0].attributes('tabindex')).toBe('0');

    await rows()[0].trigger('keydown', { key: 'Spacebar' });
    await settle();
    expect(selectedKeys.value).toEqual([1]);

    await rows()[0].trigger('keydown', { key: 'Unrelated' });
    expect(rows()[0].attributes('tabindex')).toBe('0');
    wrapper.unmount();

    const disabled = mount(() => (
      <HTable data={[{ id: 1 }]} rowKey="id" keyboardNavigation={false}>
        <HTableColumn title="ID" field="id" />
      </HTable>
    ));
    await settle();
    const disabledRow = disabled.get('tbody .h-table__row');
    expect(disabledRow.attributes('tabindex')).toBe('-1');
    await disabledRow.trigger('keydown', { key: 'End' });
    expect(disabledRow.attributes('tabindex')).toBe('-1');
    disabled.unmount();
  });

  test('enforces mutually exclusive selection columns and supports radio row selection', async () => {
    const alphaKeys = ref<string[]>([]);
    const betaKeys = ref<string[]>([]);
    const radioKeys = ref<string>();
    const wrapper = mount(() => (
      <HTable data={[{ id: 1, alpha: 'A', beta: 'B', radio: 'R' }]} rowKey="id">
        <HTableColumn
          type="selection"
          field="alpha"
          columnKey="alpha"
          exclusionFields={['beta']}
          multiple
          selectedKeys={alphaKeys.value}
          onUpdate:selectedKeys={value => {
            alphaKeys.value = value as string[];
          }}
        />
        <HTableColumn
          type="selection"
          field="beta"
          columnKey="beta"
          exclusionFields={['alpha']}
          multiple
          selectedKeys={betaKeys.value}
          onUpdate:selectedKeys={value => {
            betaKeys.value = value as string[];
          }}
        />
        <HTableColumn
          type="selection"
          columnKey="radio"
          selectedKeys={radioKeys.value}
          selectOnClickRow
          onUpdate:selectedKeys={value => {
            radioKeys.value = value as string;
          }}
        />
      </HTable>
    ));
    await settle();

    const selections = wrapper.findAll('tbody .h-table__selection');
    await selections[0].trigger('click');
    await settle();
    expect(alphaKeys.value).toEqual(['A']);
    await selections[1].trigger('click');
    await settle();
    expect(alphaKeys.value).toEqual([]);
    expect(betaKeys.value).toEqual(['B']);
    expect(wrapper.findAll('tbody label.h-radio')).toHaveLength(1);

    await wrapper.get('tbody .h-table__row').trigger('click');
    await settle();
    expect(radioKeys.value).toBe('R');
    wrapper.unmount();
  });

  test('drives the scoped custom editor through real buttons and its public edit API', async () => {
    const data = ref([{ id: 1, name: 'Alpha' }]);
    const commits = vi.fn();
    const cancels = vi.fn();
    const wrapper = mount(() => (
      <HTable
        data={data.value}
        rowKey="id"
        onUpdate:data={value => {
          data.value = value as typeof data.value;
        }}
        onCellEditCommit={commits}
        onCellEditCancel={cancels}
      >
        <HTableColumn title="Name" field="name" columnKey="name" editable>
          {{
            editor: ({ value, oldValue, update, commit, cancel }: EditorScope) => (
              <div class="custom-editor">
                <span class="editor-values">{String(value)}:{String(oldValue)}</span>
                <button class="editor-update" onClick={() => update('Beta')}>Update</button>
                <button class="editor-commit" onClick={() => void commit()}>Commit</button>
                <button class="editor-cancel" onClick={cancel}>Cancel</button>
              </div>
            ),
          }}
        </HTableColumn>
      </HTable>
    ));
    await settle();
    const api = tableApi(wrapper);

    await expect(api.startCellEdit(1, 'name')).resolves.toBe(true);
    await settle();
    expect(wrapper.get('.editor-values').text()).toBe('Alpha:Alpha');
    await wrapper.get('.editor-update').trigger('click');
    await wrapper.get('.editor-commit').trigger('click');
    await settle();
    expect(data.value[0].name).toBe('Beta');
    expect(commits).toHaveBeenCalledOnce();

    await expect(api.startCellEdit(1, 'name')).resolves.toBe(true);
    await settle();
    await wrapper.get('.editor-cancel').trigger('click');
    await settle();
    expect(cancels).toHaveBeenCalledOnce();
    expect(wrapper.find('.custom-editor').exists()).toBe(false);
    wrapper.unmount();
  });
});
