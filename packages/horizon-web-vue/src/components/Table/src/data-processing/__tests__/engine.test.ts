import { describe, expect, test } from 'vitest';
import { analyzeTableDataProcessingCompatibility, processTableData } from '../engine';
import type { HTableDataProcessingInput } from '../types';

describe('Table data-processing engine', () => {
  test('filters columnar primitive and typed-array data before sorting', () => {
    const result = processTableData({
      projection: {
        rowCount: 6,
        columns: {
          name: ['Beta', 'alpha', 'Gamma', 'delta', 'zeta', 'Alfa'],
          score: new Float64Array([20, 10, 30, 20, 5, 20]),
          enabled: [true, true, false, true, true, true],
        },
      },
      filters: [
        { column: 'name', operator: 'contains', value: 'a' },
        { column: 'score', operator: 'gte', value: 10 },
        { column: 'enabled', operator: 'equals', value: true },
      ],
      sorts: [
        { column: 'score', direction: 'desc', valueType: 'number' },
        { column: 'name', direction: 'asc', valueType: 'string' },
      ],
    });

    expect(result.indices).toBeInstanceOf(Uint32Array);
    expect([...result.indices]).toEqual([5, 0, 3, 1]);
  });

  test('keeps multi-column sorting stable and deterministic', () => {
    const result = processTableData({
      projection: {
        rowCount: 7,
        columns: {
          group: ['b', 'a', 'a', 'a', 'b', 'a', 'b'],
          rank: [1, 2, 1, 1, 2, 1, 1],
        },
      },
      sorts: [
        { column: 'group', direction: 'asc' },
        { column: 'rank', direction: 'asc', valueType: 'number' },
      ],
    });

    expect([...result.indices]).toEqual([2, 3, 5, 1, 0, 6, 4]);
  });

  test('applies explicit null placement independently from direction', () => {
    const projection = {
      rowCount: 5,
      columns: { value: [2, null, 1, undefined, 3] },
    } as const;

    const first = processTableData({
      projection,
      sorts: [{ column: 'value', direction: 'desc', valueType: 'number', nulls: 'first' }],
    });
    const last = processTableData({
      projection,
      sorts: [{ column: 'value', direction: 'desc', valueType: 'number', nulls: 'last' }],
    });

    expect([...first.indices]).toEqual([1, 3, 4, 0, 2]);
    expect([...last.indices]).toEqual([4, 0, 2, 1, 3]);
  });

  test('orders infinities and overflow-prone finite numbers without treating them as ties', () => {
    const result = processTableData({
      projection: {
        rowCount: 6,
        columns: {
          value: [Infinity, Number.MAX_VALUE, 0, -Number.MAX_VALUE, -Infinity, Number.NaN],
        },
      },
      sorts: [{ column: 'value', direction: 'asc', valueType: 'number' }],
    });

    expect([...result.indices]).toEqual([4, 3, 2, 1, 0, 5]);
  });

  test('supports set, range and null filters', () => {
    const projection = {
      rowCount: 6,
      columns: {
        category: ['a', 'b', 'c', 'a', 'b', 'c'],
        value: [null, 2, 3, 4, undefined, 6],
      },
    } as const;

    expect([
      ...processTableData({
        projection,
        filters: [
          { column: 'category', operator: 'in', values: ['a', 'c'] },
          { column: 'value', operator: 'between', min: 3, max: 6, includeMax: false },
          { column: 'value', operator: 'not-null' },
        ],
      }).indices,
    ]).toEqual([2, 3]);
  });

  test.each([
    {
      input: {
        projection: { rowCount: 2, columns: {} },
        sorts: [{ column: 'missing', direction: 'asc' }],
      },
      code: 'COLUMN_NOT_FOUND',
    },
    {
      input: {
        projection: { rowCount: 2, columns: { value: [1] } },
        sorts: [{ column: 'value', direction: 'asc' }],
      },
      code: 'COLUMN_LENGTH_MISMATCH',
    },
  ])('rejects invalid projections with $code', ({ input, code }) => {
    expect(() => processTableData(input as HTableDataProcessingInput)).toThrowError(
      expect.objectContaining({ name: 'HTableDataProcessingError', code }),
    );
  });

  test('detects custom, unsupported and non-cloneable operations', () => {
    const compatibility = analyzeTableDataProcessingCompatibility([
      {
        kind: 'sort',
        key: 'name',
        handler: (left: string, right: string) => left.localeCompare(right),
      },
      { kind: 'group', key: 'team' },
      { kind: 'filter', key: 'status', handler: { nested: Symbol('not cloneable') } },
      { kind: 'filter', key: 'ready', handler: { value: ['cloneable'] } },
    ]);

    expect(compatibility).toEqual({
      compatible: false,
      issues: [
        { kind: 'sort', key: 'name', reason: 'custom-function' },
        { kind: 'group', key: 'team', reason: 'unsupported-operation' },
        { kind: 'filter', key: 'status', reason: 'non-cloneable-handler' },
      ],
    });
  });

  test('remains self-contained when serialized for the inline Worker', () => {
    const restored = Function(
      `return (${processTableData.toString()})`,
    )() as typeof processTableData;
    const result = restored({
      projection: { rowCount: 3, columns: { value: [3, 1, 2] } },
      sorts: [{ column: 'value', direction: 'asc', valueType: 'number' }],
    });

    expect([...result.indices]).toEqual([1, 2, 0]);
  });
});
