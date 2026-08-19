import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  HTableDataProcessingRemoteError,
  HTableDataProcessingWorkerTransportError,
  HTableDataProcessingWorkerUnavailableError,
  createInlineTableDataProcessingWorker,
  createSyncTableDataProcessingExecutor,
  createTableDataProcessingExecutor,
  createWorkerTableDataProcessingExecutor,
  getTableDataProcessingWorkerAvailability,
} from '../src/data-processing/executor';
import {
  H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION,
  createTableDataProcessingRequest,
  isTableDataProcessingRequest,
  isTableDataProcessingResponse,
} from '../src/data-processing/protocol';

class ControlledWorker extends EventTarget {
  readonly postMessage = vi.fn();
  readonly terminate = vi.fn();
}

const request = (requestId = 1, rowCount = 2) =>
  createTableDataProcessingRequest(requestId, {
    projection: { rowCount, columns: { value: Array.from({ length: rowCount }, (_, i) => i) } },
  });

const result = (requestId = 1, indices = new Uint32Array([0, 1])) => ({
  protocolVersion: H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION,
  type: 'result' as const,
  requestId,
  indices,
  duration: 1,
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Table data-processing executor branches', () => {
  test('rejects invalid protocol ids and non-object request/response payloads', () => {
    expect(() => createTableDataProcessingRequest(-1, request(0))).toThrow(TypeError);
    expect(isTableDataProcessingRequest(null)).toBe(false);
    expect(isTableDataProcessingRequest('request')).toBe(false);
    expect(isTableDataProcessingResponse(undefined)).toBe(false);
    expect(isTableDataProcessingResponse('response')).toBe(false);
  });

  test('reports every default Worker availability boundary', () => {
    const original = {
      Worker: globalThis.Worker,
      Blob: globalThis.Blob,
      URL: globalThis.URL,
    };

    vi.stubGlobal('Worker', undefined);
    expect(getTableDataProcessingWorkerAvailability()).toEqual({
      available: false,
      reason: 'worker-unavailable',
    });

    vi.stubGlobal('Worker', original.Worker);
    vi.stubGlobal('Blob', undefined);
    expect(getTableDataProcessingWorkerAvailability()).toEqual({
      available: false,
      reason: 'blob-unavailable',
    });

    vi.stubGlobal('Blob', original.Blob);
    vi.stubGlobal('URL', {});
    expect(getTableDataProcessingWorkerAvailability()).toEqual({
      available: false,
      reason: 'object-url-unavailable',
    });

    vi.stubGlobal('URL', original.URL);
    expect(getTableDataProcessingWorkerAvailability()).toEqual({ available: true });
  });

  test('creates and revokes the inline Worker URL and wraps constructor failure', () => {
    const worker = new ControlledWorker();
    const WorkerMock = vi.fn(function WorkerMock() {
      return worker;
    });
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:table-worker');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    vi.stubGlobal('Worker', WorkerMock);

    expect(createInlineTableDataProcessingWorker({ source: 'self.onmessage=()=>{}', name: 't' })).toBe(
      worker,
    );
    expect(createObjectURL).toHaveBeenCalledOnce();
    expect(WorkerMock).toHaveBeenCalledWith('blob:table-worker', { name: 't' });
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:table-worker');

    WorkerMock.mockImplementationOnce(function WorkerBlocked() {
      throw new Error('CSP blocked');
    });
    expect(() =>
      createInlineTableDataProcessingWorker({ source: 'source', name: 'blocked' }),
    ).toThrow(HTableDataProcessingWorkerUnavailableError);
    expect(revokeObjectURL).toHaveBeenCalledTimes(2);

    createObjectURL.mockImplementationOnce(() => {
      throw new Error('blob URL blocked');
    });
    expect(() =>
      createInlineTableDataProcessingWorker({ source: 'source', name: 'url-blocked' }),
    ).toThrow(HTableDataProcessingWorkerUnavailableError);
    expect(revokeObjectURL).toHaveBeenCalledTimes(2);
  });

  test('validates, aborts and disposes synchronous execution', async () => {
    const executor = createSyncTableDataProcessingExecutor();
    await expect(executor.execute({} as any)).rejects.toBeInstanceOf(TypeError);

    const controller = new AbortController();
    controller.abort();
    await expect(executor.execute(request(), { signal: controller.signal })).rejects.toMatchObject({
      name: 'AbortError',
    });

    await expect(executor.execute(request())).resolves.toMatchObject({
      type: 'result',
      requestId: 1,
      indices: new Uint32Array([0, 1]),
    });
    executor.dispose();
    await expect(executor.execute(request(2))).rejects.toMatchObject({
      name: 'HTableDataProcessingExecutorDisposedError',
    });

    vi.stubGlobal('DOMException', undefined);
    const fallbackAbort = createSyncTableDataProcessingExecutor();
    const fallbackController = new AbortController();
    fallbackController.abort();
    await expect(
      fallbackAbort.execute(request(3), { signal: fallbackController.signal }),
    ).rejects.toMatchObject({ name: 'AbortError' });
  });

  test('resolves valid Worker results and ignores late responses after abort', async () => {
    const worker = new ControlledWorker();
    const executor = createWorkerTableDataProcessingExecutor(() => worker as unknown as Worker);
    const pending = executor.execute(request());
    worker.dispatchEvent(new MessageEvent('message', { data: result() }));
    await expect(pending).resolves.toMatchObject({ requestId: 1 });

    const controller = new AbortController();
    const aborted = executor.execute(request(2), { signal: controller.signal });
    controller.abort();
    await expect(aborted).rejects.toMatchObject({ name: 'AbortError' });
    worker.dispatchEvent(new MessageEvent('message', { data: result(2) }));
    executor.dispose();
    expect(worker.terminate).toHaveBeenCalledOnce();
  });

  test('rejects invalid requests, pre-aborted signals and duplicate ids', async () => {
    const worker = new ControlledWorker();
    const executor = createWorkerTableDataProcessingExecutor(() => worker as unknown as Worker);
    await expect(executor.execute({} as any)).rejects.toBeInstanceOf(TypeError);

    const controller = new AbortController();
    controller.abort();
    await expect(executor.execute(request(), { signal: controller.signal })).rejects.toMatchObject({
      name: 'AbortError',
    });

    const first = executor.execute(request(3));
    await expect(executor.execute(request(3))).rejects.toBeInstanceOf(TypeError);
    worker.dispatchEvent(new MessageEvent('message', { data: result(3) }));
    await first;
    executor.dispose();
    await expect(executor.execute(request(4))).rejects.toThrow('disposed');
  });

  test('wraps postMessage failures without poisoning later requests', async () => {
    const worker = new ControlledWorker();
    worker.postMessage.mockImplementationOnce(() => {
      throw new Error('clone failed');
    });
    const executor = createWorkerTableDataProcessingExecutor(() => worker as unknown as Worker);

    await expect(executor.execute(request())).rejects.toBeInstanceOf(
      HTableDataProcessingWorkerTransportError,
    );
    const next = executor.execute(request(2));
    worker.dispatchEvent(new MessageEvent('message', { data: result(2) }));
    await expect(next).resolves.toMatchObject({ requestId: 2 });
    executor.dispose();
  });

  test.each([
    ['too many', new Uint32Array([0, 1, 0])],
    ['out of range', new Uint32Array([0, 2])],
    ['duplicate', new Uint32Array([1, 1])],
  ])('treats %s Worker indices as a fatal transport error', async (_, badIndices) => {
    const worker = new ControlledWorker();
    const executor = createWorkerTableDataProcessingExecutor(() => worker as unknown as Worker);
    const pending = executor.execute(request());
    worker.dispatchEvent(new MessageEvent('message', { data: result(1, badIndices) }));

    await expect(pending).rejects.toBeInstanceOf(HTableDataProcessingWorkerTransportError);
    expect(worker.terminate).toHaveBeenCalledOnce();
    await expect(executor.execute(request(2))).rejects.toBeInstanceOf(
      HTableDataProcessingWorkerTransportError,
    );
  });

  test('maps remote errors and preserves their public metadata', async () => {
    const worker = new ControlledWorker();
    const executor = createWorkerTableDataProcessingExecutor(() => worker as unknown as Worker);
    const pending = executor.execute(request());
    worker.dispatchEvent(
      new MessageEvent('message', {
        data: {
          protocolVersion: H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION,
          type: 'error',
          requestId: 1,
          error: { name: 'RemoteRangeError', message: 'bad range', code: 'BAD_RANGE', stack: 's' },
        },
      }),
    );

    await expect(pending).rejects.toMatchObject({
      name: 'HTableDataProcessingRemoteError',
      remoteName: 'RemoteRangeError',
      code: 'BAD_RANGE',
      message: 'bad range',
    } satisfies Partial<HTableDataProcessingRemoteError>);
    executor.dispose();
  });

  test.each(['invalid-response', 'error', 'messageerror'] as const)(
    'fails all pending work on %s transport failure',
    async kind => {
      const worker = new ControlledWorker();
      const executor = createWorkerTableDataProcessingExecutor(() => worker as unknown as Worker);
      const first = executor.execute(request(1));
      const second = executor.execute(request(2));

      if (kind === 'invalid-response') {
        worker.dispatchEvent(new MessageEvent('message', { data: { nope: true } }));
      } else if (kind === 'error') {
        worker.dispatchEvent(new ErrorEvent('error', { message: 'worker crashed', error: 42 }));
      } else {
        worker.dispatchEvent(new MessageEvent('messageerror', { data: 'bad clone' }));
      }

      await expect(first).rejects.toBeInstanceOf(HTableDataProcessingWorkerTransportError);
      await expect(second).rejects.toBeInstanceOf(HTableDataProcessingWorkerTransportError);
      expect(worker.terminate).toHaveBeenCalledOnce();
    },
  );

  test('uses the fallback Worker error message and ignores repeated fatal events', async () => {
    const worker = new ControlledWorker();
    const executor = createWorkerTableDataProcessingExecutor(() => worker as unknown as Worker);
    const pending = executor.execute(request());
    worker.dispatchEvent(new ErrorEvent('error', { error: new Error('silent failure') }));
    await expect(pending).rejects.toThrow('Table data-processing Worker failed.');
    worker.dispatchEvent(new MessageEvent('messageerror', { data: 'already failed' }));
    expect(worker.terminate).toHaveBeenCalledOnce();
  });

  test('times out pending Worker requests and dispose is idempotent', async () => {
    const worker = new ControlledWorker();
    const executor = createWorkerTableDataProcessingExecutor(() => worker as unknown as Worker);
    await expect(executor.execute(request(), { timeout: 5 })).rejects.toThrow('timed out after 5ms');
    executor.dispose();
    executor.dispose();
    expect(worker.terminate).toHaveBeenCalledOnce();
  });

  test('falls back only for transport errors and exposes construction fallback errors', async () => {
    const worker = new ControlledWorker();
    worker.postMessage.mockImplementation(() => {
      throw new Error('transport');
    });
    const fallback = createTableDataProcessingExecutor({
      mode: 'worker',
      workerFactory: () => worker as unknown as Worker,
    });
    await expect(fallback.execute(request())).resolves.toMatchObject({ indices: new Uint32Array([0, 1]) });
    expect(fallback.mode).toBe('sync');
    expect(fallback.fallbackError).toBeInstanceOf(HTableDataProcessingWorkerTransportError);
    fallback.dispose();

    const construction = new Error('no worker');
    const synchronous = createTableDataProcessingExecutor({
      mode: 'worker',
      workerFactory: () => {
        throw construction;
      },
    });
    expect(synchronous.mode).toBe('sync');
    expect(synchronous.fallbackError).toBeInstanceOf(HTableDataProcessingWorkerUnavailableError);

    expect(() =>
      createTableDataProcessingExecutor({
        mode: 'worker',
        fallbackToSync: false,
        workerFactory: () => {
          throw construction;
        },
      }),
    ).toThrow(HTableDataProcessingWorkerUnavailableError);

    const directSync = createTableDataProcessingExecutor({ mode: 'sync' });
    await expect(directSync.execute(request())).resolves.toMatchObject({ requestId: 1 });

    const directWorker = new ControlledWorker();
    const noFallback = createTableDataProcessingExecutor({
      mode: 'worker',
      fallbackToSync: false,
      workerFactory: () => directWorker as unknown as Worker,
    });
    const pending = noFallback.execute(request(9));
    directWorker.dispatchEvent(new MessageEvent('message', { data: result(9) }));
    await expect(pending).resolves.toMatchObject({ requestId: 9 });
    noFallback.dispose();
  });
});
