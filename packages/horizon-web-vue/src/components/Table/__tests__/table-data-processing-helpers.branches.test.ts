import { ref } from 'vue';
import { describe, expect, test } from 'vitest';
import type { HTableColumnData, HTableTransformedRowDataType } from '../src/utils/types';
import { HTableColumnFilterKey, HTableSortOrderEnum } from '../src/utils/types';
import {
  buildTableWorkerInput,
  isTableDataStrictPrimitive,
  mapTableSortColumn,
  mapTableStrictPrimitiveColumn,
  mapTableStringColumn,
  normalizeTableDataProcessingOptions,
} from '../src/hooks/useDataProcessing';

const rows = [
  { value: 12, nested: { label: 'Alpha' }, nullable: null },
  { value: '3', nested: { label: undefined }, nullable: false },
] as unknown as HTableTransformedRowDataType[];

function column(props: Record<string, unknown>, filterValue?: unknown) {
  return {
    props,
    [HTableColumnFilterKey]: { currentFilterValue: ref(filterValue) },
  } as unknown as HTableColumnData;
}

describe('Table data-processing helper branches', () => {
  test('normalizes scalar, invalid, fractional, and omitted worker options', () => {
    expect(normalizeTableDataProcessingOptions(undefined as never)).toMatchObject({
      mode: 'sync',
      workerThreshold: 10_000,
      debounce: 16,
      workerTimeout: 30_000,
    });
    expect(normalizeTableDataProcessingOptions('auto')).toMatchObject({ mode: 'auto' });
    expect(
      normalizeTableDataProcessingOptions({
        mode: undefined,
        workerThreshold: Number.NaN,
        debounce: Number.POSITIVE_INFINITY,
        workerTimeout: undefined,
      }),
    ).toMatchObject({
      mode: 'sync',
      workerThreshold: 10_000,
      debounce: 16,
      workerTimeout: 30_000,
    });
    expect(
      normalizeTableDataProcessingOptions({
        mode: 'worker',
        workerThreshold: 8.9,
        debounce: -2.1,
        workerTimeout: 12.9,
      }),
    ).toMatchObject({ mode: 'worker', workerThreshold: 8, debounce: 0, workerTimeout: 12 });
  });

  test('classifies and projects every primitive/string/sort value branch', () => {
    expect(
      [null, undefined, 'value', true, 1, Number.NaN, {}].map(isTableDataStrictPrimitive),
    ).toEqual([true, true, true, true, true, false, false]);
    expect(mapTableStrictPrimitiveColumn(rows, 'nullable')).toEqual([null, false]);
    expect(mapTableStrictPrimitiveColumn(rows, 'nested')).toBeUndefined();
    expect(mapTableStringColumn(rows, 'nested.label')).toEqual(['Alpha', '']);
    expect(mapTableSortColumn(rows, 'value')).toEqual([12, '3']);
    expect(mapTableSortColumn(rows, 'nested.missing')).toEqual(['', '']);
  });

  test('builds all serializable filter plans and rejects unsupported projections', () => {
    expect(buildTableWorkerInput(rows, [column({ filterType: 'input' }, '2')], [])).toBeUndefined();
    expect(
      buildTableWorkerInput(
        rows,
        [column({ field: 'value', filterType: 'input', filterMethod: () => true }, '2')],
        [],
      ),
    ).toBeUndefined();

    const input = buildTableWorkerInput(
      rows,
      [column({ field: 'nested.label', filterType: 'input' }, 'Al')],
      [],
    );
    expect(input?.filters).toEqual([{ column: 'filter:0', operator: 'contains', value: 'Al' }]);

    const single = buildTableWorkerInput(
      rows,
      [column({ field: 'value', filterType: 'select', filterOptions: { multiple: false } }, [])],
      [],
    );
    expect(single?.filters).toEqual([{ column: 'filter:0', operator: 'equals', value: '' }]);

    expect(
      buildTableWorkerInput(
        rows,
        [column({ field: 'value', filterType: 'cascader' }, [{ code: 'invalid' }])],
        [],
      ),
    ).toBeUndefined();
    expect(
      buildTableWorkerInput(
        rows,
        [column({ field: 'nested', filterType: 'tree-select' }, ['Alpha'])],
        [],
      ),
    ).toBeUndefined();
    expect(
      buildTableWorkerInput(rows, [column({ field: 'value', filterType: 'date-picker' }, 'x')], []),
    ).toBeUndefined();
  });

  test('builds ascending/descending sorts and rejects every custom sort shape', () => {
    const sortable = column({ field: 'value' });
    expect(
      buildTableWorkerInput(rows, [], [
        [sortable, HTableSortOrderEnum.ASC],
        [sortable, HTableSortOrderEnum.DESC],
      ])?.sorts,
    ).toEqual([
      { column: 'sort:0', direction: 'asc', numeric: true },
      { column: 'sort:1', direction: 'desc', numeric: true },
    ]);
    expect(
      buildTableWorkerInput(rows, [], [[column({}), HTableSortOrderEnum.ASC]]),
    ).toBeUndefined();
    expect(
      buildTableWorkerInput(
        rows,
        [],
        [[column({ field: 'value', sortMethod: () => 0 }), HTableSortOrderEnum.ASC]],
      ),
    ).toBeUndefined();
    expect(
      buildTableWorkerInput(
        rows,
        [],
        [[column({ field: 'value', sortBy: () => 0 }), HTableSortOrderEnum.ASC]],
      ),
    ).toBeUndefined();
  });
});
