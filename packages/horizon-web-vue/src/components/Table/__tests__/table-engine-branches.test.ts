import { describe, expect, test } from 'vitest';
import {
  analyzeTableDataProcessingCompatibility,
  processTableData,
} from '../src/data-processing/engine';
import type {
  HTableDataFilter,
  HTableDataProcessingInput,
  HTableDataSort,
} from '../src/data-processing/types';

const values = [' Alpha ', 'alphabet', 'beta', null, Number.NaN, 5, 10, false, true];

function indices(options: {
  filters?: HTableDataFilter[];
  sorts?: HTableDataSort[];
  columns?: Record<string, readonly any[]>;
}) {
  const columns = options.columns ?? { value: values };
  const rowCount = Object.values(columns)[0]?.length ?? 0;
  return [
    ...processTableData({
      projection: { rowCount, columns },
      filters: options.filters,
      sorts: options.sorts,
    }).indices,
  ];
}

describe('Table pure data engine branches', () => {
  test.each([
    ['contains', { operator: 'contains', value: ' AL ' }, [0, 1, 7]],
    ['starts-with', { operator: 'starts-with', value: 'al', caseSensitive: true }, [1]],
    ['ends-with', { operator: 'ends-with', value: 'TA' }, [2]],
    ['equals NaN', { operator: 'equals', value: Number.NaN }, [4]],
    ['not-equals', { operator: 'not-equals', value: false }, [0, 1, 2, 3, 4, 5, 6, 8]],
    ['in', { operator: 'in', values: [5, true] }, [5, 8]],
    ['not-in', { operator: 'not-in', values: [5, true] }, [0, 1, 2, 3, 4, 6, 7]],
    ['gt', { operator: 'gt', value: 5 }, [6]],
    ['gte', { operator: 'gte', value: 5 }, [5, 6]],
    ['lt', { operator: 'lt', value: 5 }, [3, 7, 8]],
    ['lte', { operator: 'lte', value: 5 }, [3, 5, 7, 8]],
    ['between inclusive', { operator: 'between', min: 5, max: 10 }, [5, 6]],
    [
      'between exclusive',
      { operator: 'between', min: 5, max: 10, includeMin: false, includeMax: false },
      [],
    ],
    ['is-null', { operator: 'is-null' }, [3]],
    ['not-null', { operator: 'not-null' }, [0, 1, 2, 4, 5, 6, 7, 8]],
  ] as const)('runs the %s filter operator', (_, filter, expected) => {
    expect(indices({ filters: [{ column: 'value', ...filter } as HTableDataFilter] })).toEqual(
      expected,
    );
  });

  test('treats empty set filters as no-ops', () => {
    expect(indices({ filters: [{ column: 'value', operator: 'in', values: [] }] })).toEqual(
      values.map((_, index) => index),
    );
    expect(indices({ filters: [{ column: 'value', operator: 'not-in', values: [] }] })).toEqual(
      values.map((_, index) => index),
    );
  });

  test('sorts nulls, NaN, booleans, strings and stable multi-column ties', () => {
    expect(
      indices({
        columns: { value: [3, null, 1, Number.NaN, 2] },
        sorts: [{ column: 'value', direction: 'asc', valueType: 'number', nulls: 'first' }],
      }),
    ).toEqual([1, 2, 4, 0, 3]);
    expect(
      indices({
        columns: { value: [3, null, 1, Number.NaN, 2] },
        sorts: [{ column: 'value', direction: 'desc', valueType: 'number', nulls: 'last' }],
      }),
    ).toEqual([3, 0, 4, 2, 1]);
    expect(
      indices({
        columns: { value: [true, false, true] },
        sorts: [{ column: 'value', direction: 'asc', valueType: 'boolean' }],
      }),
    ).toEqual([1, 0, 2]);
    expect(
      indices({
        columns: { value: ['item10', 'item2', 'item1'] },
        sorts: [{ column: 'value', direction: 'asc', valueType: 'string', numeric: true }],
      }),
    ).toEqual([2, 1, 0]);
    expect(
      indices({
        columns: { value: [Number.NaN, Number.NaN, 1] },
        sorts: [{ column: 'value', direction: 'asc', valueType: 'number' }],
      }),
    ).toEqual([2, 0, 1]);
    expect(
      indices({
        columns: { value: [null, 'a', undefined] },
        sorts: [{ column: 'value', direction: 'asc', valueType: 'string' }],
      }),
    ).toEqual([0, 2, 1]);
    expect(
      indices({
        columns: { group: ['b', 'a', 'a'], score: [1, 1, 1] },
        sorts: [
          { column: 'group', direction: 'asc' },
          { column: 'score', direction: 'desc', valueType: 'number' },
        ],
      }),
    ).toEqual([1, 2, 0]);
  });

  test('supports one-sided numeric ranges', () => {
    expect(
      indices({ filters: [{ column: 'value', operator: 'between', max: 5 }] }),
    ).toEqual([3, 5, 7, 8]);
    expect(
      indices({ filters: [{ column: 'value', operator: 'between', min: 5 }] }),
    ).toEqual([5, 6]);
  });

  test.each([
    ['projection', undefined, 'INVALID_PROJECTION'],
    ['row count', { projection: { rowCount: -1, columns: {} } }, 'INVALID_ROW_COUNT'],
    ['columns', { projection: { rowCount: 1, columns: null } }, 'INVALID_COLUMNS'],
    [
      'missing column',
      {
        projection: { rowCount: 1, columns: { value: [1] } },
        filters: [{ column: 'missing', operator: 'equals', value: 1 }],
      },
      'COLUMN_NOT_FOUND',
    ],
    [
      'short column',
      {
        projection: { rowCount: 2, columns: { value: [1] } },
        sorts: [{ column: 'value', direction: 'asc' }],
      },
      'COLUMN_LENGTH_MISMATCH',
    ],
  ])('rejects invalid %s inputs with a stable error code', (_, input, code) => {
    try {
      processTableData(input as HTableDataProcessingInput);
      throw new Error('expected engine to fail');
    } catch (error) {
      expect(error).toMatchObject({ name: 'HTableDataProcessingError', code });
    }
  });

  test('reports custom, unsupported and recursively non-cloneable operations', () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    circular.value = 1;
    const symbolKey = Symbol('handler');
    const withSymbolKey = { [symbolKey]: 'value' };
    const result = analyzeTableDataProcessingCompatibility([
      { kind: 'filter', key: 'custom', handler: () => true },
      { kind: 'group', key: 'group', handler: 'built-in' },
      { kind: 'sort', key: 'symbol', handler: Symbol('sort') },
      { kind: 'sort', key: 'weak-map', handler: new WeakMap() },
      { kind: 'sort', key: 'weak-set', handler: new WeakSet() },
      { kind: 'sort', key: 'promise', handler: Promise.resolve() },
      { kind: 'sort', key: 'array', handler: [1, () => true] },
      { kind: 'sort', key: 'symbol-key', handler: withSymbolKey },
      { kind: 'sort', key: 'circular', handler: circular },
    ]);

    expect(result.compatible).toBe(false);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        { kind: 'filter', key: 'custom', reason: 'custom-function' },
        { kind: 'group', key: 'group', reason: 'unsupported-operation' },
        { kind: 'sort', key: 'symbol', reason: 'non-cloneable-handler' },
        { kind: 'sort', key: 'weak-map', reason: 'non-cloneable-handler' },
        { kind: 'sort', key: 'symbol-key', reason: 'non-cloneable-handler' },
      ]),
    );
    expect(
      analyzeTableDataProcessingCompatibility([
        { kind: 'filter', handler: { nested: [1, 2, 3] } },
        { kind: 'sort', handler: circular },
      ]),
    ).toEqual({ compatible: true, issues: [] });
  });
});
