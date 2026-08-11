import { mount } from '@vue/test-utils';
import { defineComponent, Fragment, nextTick, provide, reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import TableColumn from '../src/TableColumn';
import type { TableProps } from '../src/composables/useProps';
import useColumn from '../src/hooks/useColumn';
import {
  HTableColumnAnalysisInjectKey,
  HTableEmitsInjectKey,
  HTableFlattenDataInjectKey,
  HTablePropsInjectKey,
  HTableUseBuiltInDataOperationsInjectKey,
} from '../src/utils/injectKeys';
import type { HTableTransformedRowDataType } from '../src/utils/types';
import { HTableColumnContextKey } from '../src/utils/types';

async function settle() {
  await nextTick();
  await nextTick();
  await nextTick();
}

describe('Table column analysis branch contracts', () => {
  test('drops empty groups, links siblings, trims trailing col styles and handles fixed/sort stores', async () => {
    const rows = ref<HTableTransformedRowDataType[]>([]);
    const showColumns = ref(true);
    const props = reactive({ queryMode: 'local' }) as TableProps;
    let columns!: ReturnType<typeof useColumn>;
    const Harness = defineComponent({
      setup() {
        provide(HTablePropsInjectKey, props);
        provide(HTableEmitsInjectKey, vi.fn() as never);
        provide(HTableFlattenDataInjectKey, rows);
        provide(HTableUseBuiltInDataOperationsInjectKey, () => true);
        columns = useColumn(rows, vi.fn() as never);
        provide(HTableColumnAnalysisInjectKey, columns.analysisColumns);

        return () => (
          <Fragment>
            {showColumns.value && (
              <>
                <TableColumn title="A" field="a" />
                <TableColumn title="Hidden group">
                  {{ default: () => <TableColumn title="Hidden" field="hidden" visible={false} /> }}
                </TableColumn>
                <TableColumn title="B" field="b" width={100} />
                <TableColumn title="C" field="c" />
              </>
            )}
          </Fragment>
        );
      },
    });
    const wrapper = mount(Harness);
    await settle();
    const analysis = columns.analysisColumns.value;

    expect(analysis.flattenColumns.map(column => column.props.field)).toEqual(['a', 'b', 'c']);
    expect(analysis.columnGroups[0].map(column => column.props.title)).toEqual(['A', 'B', 'C']);
    expect(analysis.colStyle.map(entry => entry.column.props.field)).toEqual(['a', 'b']);
    expect(analysis.flattenColumns[0][HTableColumnContextKey].prevColumn).toBeUndefined();
    expect(analysis.flattenColumns[0][HTableColumnContextKey].nextColumn).toBe(
      analysis.flattenColumns[1],
    );
    expect(analysis.flattenColumns[2][HTableColumnContextKey].nextColumn).toBeUndefined();

    const [a, b, c] = analysis.flattenColumns;
    expect(columns.getLastFixedLeftColumn()).toBeNull();
    expect(columns.getLastFixedRightColumn()).toBeNull();
    expect(columns.isColumnsHaveFixed.value).toBe(false);

    columns.fixedStore.value = new Map([
      [a.uuid, 'left'],
      [b.uuid, 'left'],
      [c.uuid, 'right'],
    ]);
    await nextTick();
    expect(columns.isColumnsHaveFixed.value).toBe(true);
    expect(columns.getLastFixedLeftColumn()?.uuid).toBe(b.uuid);
    expect(columns.getLastFixedRightColumn()?.uuid).toBe(c.uuid);

    columns.fixedStore.value = new Map([[a.uuid, 'left']]);
    columns.visibleStore.value = new Map([
      [a.uuid, true],
      [b.uuid, false],
      [c.uuid, false],
    ]);
    await nextTick();
    expect(columns.analysisColumns.value.flattenColumns).toHaveLength(1);
    expect(columns.getLastFixedLeftColumn()?.uuid).toBe(a.uuid);
    expect(columns.getLastFixedRightColumn()).toBeNull();

    columns.fixedStore.value = new Map([[a.uuid, 'right']]);
    await nextTick();
    expect(columns.getLastFixedLeftColumn()).toBeNull();
    expect(columns.getLastFixedRightColumn()?.uuid).toBe(a.uuid);

    columns.visibleStore.value = new Map([
      [a.uuid, true],
      [b.uuid, true],
      [c.uuid, true],
    ]);
    columns.fixedStore.value = new Map();
    columns.sortStore.value = new Map([
      [b.uuid, -1],
      [a.uuid, 5],
    ]);
    await nextTick();
    expect(columns.analysisColumns.value.flattenColumns.map(column => column.uuid)).toEqual([
      b.uuid,
      c.uuid,
      a.uuid,
    ]);

    showColumns.value = false;
    await settle();
    expect(columns.columns.value).toHaveLength(0);
    expect(columns.getLastFixedLeftColumn()).toBeNull();
    expect(columns.getLastFixedRightColumn()).toBeNull();
    wrapper.unmount();
  });

  test('inherits a parent fixed state and restores fixed/visible/sort snapshots', async () => {
    const rows = ref<HTableTransformedRowDataType[]>([]);
    const props = reactive({ queryMode: 'local' }) as TableProps;
    let columns!: ReturnType<typeof useColumn>;
    const Harness = defineComponent({
      setup() {
        provide(HTablePropsInjectKey, props);
        provide(HTableEmitsInjectKey, vi.fn() as never);
        provide(HTableFlattenDataInjectKey, rows);
        provide(HTableUseBuiltInDataOperationsInjectKey, () => true);
        columns = useColumn(rows, vi.fn() as never);
        provide(HTableColumnAnalysisInjectKey, columns.analysisColumns);
        return () => (
          <TableColumn title="Parent" fixed="left" order={3}>
            {{ default: () => <TableColumn title="Child" field="child" visible /> }}
          </TableColumn>
        );
      },
    });
    const wrapper = mount(Harness);
    await settle();
    const parent = columns.columns.value[0];
    const child = parent.children[0];

    expect(columns.getFixedState(child.uuid)).toBe('left');
    expect(columns.getVisibleState(child.uuid)).toBe(true);
    expect(columns.getSortState(parent.uuid)).toBe(3);

    columns.fixedStore.value = new Map();
    columns.visibleStore.value = new Map([[child.uuid, false]]);
    columns.sortStore.value = new Map([[parent.uuid, 9]]);
    columns.resetFixedState();
    columns.resetVisibleState();
    columns.resetSortState();
    expect(columns.getFixedState(parent.uuid)).toBe('left');
    expect(columns.getVisibleState(child.uuid)).toBe(true);
    expect(columns.getSortState(parent.uuid)).toBe(3);
    wrapper.unmount();
  });
});
