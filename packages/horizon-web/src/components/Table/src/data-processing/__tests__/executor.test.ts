import { describe, expect, test, vi } from 'vitest';
import { processTableData } from '../engine';
import {
  createSyncTableDataProcessingExecutor,
  createTableDataProcessingExecutor,
  createWorkerTableDataProcessingExecutor,
  HTableDataProcessingRemoteError,
  HTableDataProcessingWorkerTransportError,
  HTableDataProcessingWorkerUnavailableError,
} from '../executor';
import { createTableDataProcessingWorkerSource } from '../inline-worker';
import {
  createTableDataProcessingRequest,
  H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION,
} from '../protocol';
import type { HTableDataProcessingRequest } from '../protocol';

type FakeEventListener = (event: { data?: unknown; message?: string; error?: unknown }) => void;

class FakeTableDataWorker {
  readonly posted: HTableDataProcessingRequest[] = [];
  readonly terminated = vi.fn();
  private readonly listeners = new Map<string, Set<FakeEventListener>>();
  private isTerminated = false;

  constructor(private readonly delayFor: (requestId: number) => number = () => 0) {}

  addEventListener(type: string, listener: FakeEventListener) {
    const listeners = this.listeners.get(type) ?? new Set();
    listeners.add(listener);
    this.listeners.set(type, listeners);
  }

  removeEventListener(type: string, listener: FakeEventListener) {
    this.listeners.get(type)?.delete(listener);
  }

  postMessage(request: HTableDataProcessingRequest) {
    this.posted.push(request);
    setTimeout(() => {
      if (this.isTerminated) return;
      const startedAt = performance.now();
      try {
        const { indices } = processTableData(request);
        this.emit('message', {
          data: {
            protocolVersion: H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION,
            type: 'result',
            requestId: request.requestId,
            indices,
            duration: performance.now() - startedAt,
          },
        });
      } catch (error) {
        const cause = error as Error & { code?: string };
        this.emit('message', {
          data: {
            protocolVersion: H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION,
            type: 'error',
            requestId: request.requestId,
            error: {
              name: cause.name,
              message: cause.message,
              code: cause.code,
            },
          },
        });
      }
    }, this.delayFor(request.requestId));
  }

  terminate() {
    this.isTerminated = true;
    this.terminated();
  }

  protected emit(type: string, event: Parameters<FakeEventListener>[0]) {
    this.listeners.get(type)?.forEach(listener => listener(event));
  }
}

const asWorker = (worker: FakeTableDataWorker) => worker as unknown as Worker;

const input = {
  projection: {
    rowCount: 6,
    columns: {
      label: ['z10', 'z2', 'a', 'z1', 'x', 'z3'],
      score: new Float64Array([3, 2, 9, 1, 7, 2]),
    },
  },
  filters: [{ column: 'label', operator: 'starts-with', value: 'z' }] as const,
  sorts: [
    { column: 'score', direction: 'asc', valueType: 'number' },
    { column: 'label', direction: 'asc' },
  ] as const,
};

describe('Table data-processing executors', () => {
  test('keeps synchronous and Worker results in parity', async () => {
    const worker = new FakeTableDataWorker();
    const syncExecutor = createSyncTableDataProcessingExecutor();
    const workerExecutor = createWorkerTableDataProcessingExecutor(() => asWorker(worker));
    const request = createTableDataProcessingRequest(7, input);

    const [syncResult, workerResult] = await Promise.all([
      syncExecutor.execute(request),
      workerExecutor.execute(request),
    ]);

    expect([...syncResult.indices]).toEqual([3, 1, 5, 0]);
    expect([...workerResult.indices]).toEqual([...syncResult.indices]);
    expect(workerResult.requestId).toBe(7);
    expect(worker.posted).toEqual([request]);
    workerExecutor.dispose();
  });

  test('matches out-of-order responses by request ID so the caller can select the latest', async () => {
    const worker = new FakeTableDataWorker(requestId => (requestId === 1 ? 20 : 0));
    const executor = createWorkerTableDataProcessingExecutor(() => asWorker(worker));
    const settled: number[] = [];

    const first = executor.execute(createTableDataProcessingRequest(1, input)).then(result => {
      settled.push(result.requestId);
      return result;
    });
    const second = executor.execute(createTableDataProcessingRequest(2, input)).then(result => {
      settled.push(result.requestId);
      return result;
    });

    const [firstResult, secondResult] = await Promise.all([first, second]);
    expect(firstResult.requestId).toBe(1);
    expect(secondResult.requestId).toBe(2);
    expect(settled).toEqual([2, 1]);
    executor.dispose();
  });

  test('falls back synchronously when a CSP-like construction error blocks the Worker', async () => {
    const executor = createTableDataProcessingExecutor({
      mode: 'auto',
      workerFactory: () => {
        throw new DOMException('Blocked by Content Security Policy', 'SecurityError');
      },
    });

    expect(executor.mode).toBe('sync');
    expect(executor.fallbackError).toBeInstanceOf(HTableDataProcessingWorkerUnavailableError);
    const result = await executor.execute(createTableDataProcessingRequest(8, input));
    expect([...result.indices]).toEqual([3, 1, 5, 0]);
  });

  test('falls back after a Worker message transport failure', async () => {
    class DataCloneErrorWorker extends FakeTableDataWorker {
      override postMessage() {
        throw new DOMException('The object could not be cloned.', 'DataCloneError');
      }
    }

    const worker = new DataCloneErrorWorker();
    const executor = createTableDataProcessingExecutor({
      mode: 'worker',
      workerFactory: () => asWorker(worker),
    });
    const result = await executor.execute(createTableDataProcessingRequest(9, input));

    expect([...result.indices]).toEqual([3, 1, 5, 0]);
    expect(executor.mode).toBe('sync');
    expect(executor.fallbackError).toBeInstanceOf(HTableDataProcessingWorkerTransportError);
    expect(worker.terminated).toHaveBeenCalledOnce();
  });

  test('falls back after an asynchronous CSP startup error', async () => {
    class StartupErrorWorker extends FakeTableDataWorker {
      override postMessage() {
        queueMicrotask(() => {
          this.emit('error', { message: 'Blocked by Content Security Policy' });
        });
      }
    }

    const worker = new StartupErrorWorker();
    const executor = createTableDataProcessingExecutor({
      workerFactory: () => asWorker(worker),
    });
    const result = await executor.execute(createTableDataProcessingRequest(10, input));

    expect([...result.indices]).toEqual([3, 1, 5, 0]);
    expect(executor.mode).toBe('sync');
    expect(executor.fallbackError).toMatchObject({
      name: 'HTableDataProcessingWorkerTransportError',
      message: 'Blocked by Content Security Policy',
    });
    expect(worker.terminated).toHaveBeenCalledOnce();
  });

  test('rejects out-of-range Worker indices and falls back without exposing invalid rows', async () => {
    class OutOfRangeWorker extends FakeTableDataWorker {
      override postMessage(request: HTableDataProcessingRequest) {
        queueMicrotask(() => {
          this.emit('message', {
            data: {
              protocolVersion: H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION,
              type: 'result',
              requestId: request.requestId,
              indices: new Uint32Array([request.projection.rowCount]),
              duration: 0,
            },
          });
        });
      }
    }

    const worker = new OutOfRangeWorker();
    const executor = createTableDataProcessingExecutor({
      mode: 'worker',
      workerFactory: () => asWorker(worker),
    });
    const result = await executor.execute(createTableDataProcessingRequest(14, input));

    expect([...result.indices]).toEqual([3, 1, 5, 0]);
    expect(executor.mode).toBe('sync');
    expect(executor.fallbackError).toMatchObject({
      name: 'HTableDataProcessingWorkerTransportError',
      message: 'Table data-processing Worker returned invalid row indices.',
    });
    expect(worker.terminated).toHaveBeenCalledOnce();
  });

  test('terminates an unresponsive Worker on timeout and falls back synchronously', async () => {
    class SilentWorker extends FakeTableDataWorker {
      override postMessage() {}
    }

    const worker = new SilentWorker();
    const executor = createTableDataProcessingExecutor({
      mode: 'worker',
      workerFactory: () => asWorker(worker),
    });
    const result = await executor.execute(createTableDataProcessingRequest(15, input), {
      timeout: 5,
    });

    expect([...result.indices]).toEqual([3, 1, 5, 0]);
    expect(executor.mode).toBe('sync');
    expect(executor.fallbackError).toMatchObject({
      name: 'HTableDataProcessingWorkerTransportError',
      message: 'Table data-processing Worker timed out after 5ms.',
    });
    expect(worker.terminated).toHaveBeenCalledOnce();
  });

  test('does not hide engine validation errors behind synchronous fallback', async () => {
    const worker = new FakeTableDataWorker();
    const executor = createTableDataProcessingExecutor({
      workerFactory: () => asWorker(worker),
    });
    const request = createTableDataProcessingRequest(11, {
      projection: { rowCount: 1, columns: {} },
      sorts: [{ column: 'missing', direction: 'asc' }],
    });

    await expect(executor.execute(request)).rejects.toMatchObject({
      name: 'HTableDataProcessingRemoteError',
      remoteName: 'HTableDataProcessingError',
      code: 'COLUMN_NOT_FOUND',
    } satisfies Partial<HTableDataProcessingRemoteError>);
    expect(executor.mode).toBe('worker');
    executor.dispose();
  });

  test('aborts caller bookkeeping and ignores the late Worker response', async () => {
    const worker = new FakeTableDataWorker(() => 10);
    const executor = createWorkerTableDataProcessingExecutor(() => asWorker(worker));
    const controller = new AbortController();
    const pending = executor.execute(createTableDataProcessingRequest(12, input), {
      signal: controller.signal,
    });
    controller.abort();

    await expect(pending).rejects.toMatchObject({ name: 'AbortError' });
    await new Promise(resolve => setTimeout(resolve, 15));
    await expect(
      executor.execute(createTableDataProcessingRequest(13, input)),
    ).resolves.toMatchObject({
      requestId: 13,
    });
    executor.dispose();
  });

  test('generates a URL-independent inline Worker program', () => {
    const source = createTableDataProcessingWorkerSource();

    expect(source).toContain('const processTableData =');
    expect(source).toContain('self.onmessage');
    expect(source).toContain('output.indices.buffer');
    expect(source).not.toContain('import.meta');
    expect(source).not.toContain('new URL');
  });
});
