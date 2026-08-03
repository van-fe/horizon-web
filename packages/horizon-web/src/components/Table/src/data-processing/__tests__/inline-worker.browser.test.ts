import { describe, expect, test } from 'vitest';
import {
  createWorkerTableDataProcessingExecutor,
  getTableDataProcessingWorkerAvailability,
} from '../executor';
import { createTableDataProcessingRequest } from '../protocol';

describe('Table inline data-processing Worker', () => {
  test('runs the shared engine in a real browser Worker', async () => {
    expect(getTableDataProcessingWorkerAvailability()).toEqual({ available: true });
    const executor = createWorkerTableDataProcessingExecutor();

    try {
      const result = await executor.execute(
        createTableDataProcessingRequest(42, {
          projection: {
            rowCount: 5,
            columns: {
              label: ['item 10', 'item 2', 'other', 'item 1', 'item 20'],
              score: new Float64Array([10, 2, 100, 1, 20]),
            },
          },
          filters: [{ column: 'label', operator: 'starts-with', value: 'item' }],
          sorts: [{ column: 'score', direction: 'desc', valueType: 'number' }],
        }),
      );

      expect(result.requestId).toBe(42);
      expect(result.indices).toBeInstanceOf(Uint32Array);
      expect([...result.indices]).toEqual([4, 0, 1, 3]);
      expect(result.duration).toBeGreaterThanOrEqual(0);
    } finally {
      executor.dispose();
    }
  });
});
