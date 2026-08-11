import { afterEach, describe, expect, test, vi } from 'vitest';
import { createMultipartChunks } from '../src/utils/multipart/createMultipartChunks';

interface WorkerRequest {
  file: Blob;
  chunkSize: number;
  batchSize: number;
}

class MockWorker {
  static instances: MockWorker[] = [];

  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: ErrorEvent) => void) | null = null;
  postMessage = vi.fn(({ file, chunkSize, batchSize }: WorkerRequest) => {
    queueMicrotask(() => {
      const chunks = Array.from({ length: Math.ceil(file.size / chunkSize) }, (_, index) => {
        const start = index * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        return { index, size: end - start, part: file.slice(start, end) };
      });

      for (let index = 0; index < chunks.length; index += batchSize) {
        this.onmessage?.({
          data: { type: 'batch', chunks: chunks.slice(index, index + batchSize) },
        } as MessageEvent);
      }
      this.onmessage?.({ data: { type: 'done' } } as MessageEvent);
    });
  });
  terminate = vi.fn();

  constructor(readonly url: string) {
    MockWorker.instances.push(this);
  }
}

class ErrorWorker extends MockWorker {
  override postMessage = vi.fn(() => {
    queueMicrotask(() => {
      this.onerror?.({
        message: 'Blocked by Content Security Policy',
        preventDefault: vi.fn(),
      } as unknown as ErrorEvent);
    });
  });
}

class ScriptedWorker extends MockWorker {
  static script: (worker: ScriptedWorker) => void = () => undefined;

  override postMessage = vi.fn(() => {
    queueMicrotask(() => ScriptedWorker.script(this));
  });
}

describe('multipart chunk creation', () => {
  afterEach(() => {
    MockWorker.instances = [];
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  test('slices small files without starting a worker', async () => {
    const worker = vi.fn();
    vi.stubGlobal('Worker', worker);

    const chunks = await createMultipartChunks(new Blob(['abcdef']), 2);

    expect(worker).not.toHaveBeenCalled();
    expect(chunks.map(({ index, size }) => ({ index, size }))).toEqual([
      { index: 0, size: 2 },
      { index: 1, size: 2 },
      { index: 2, size: 2 },
    ]);
    await expect(chunks[2].part.text()).resolves.toBe('ef');
  });

  test('creates large chunk lists in a worker', async () => {
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:multipart');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    vi.stubGlobal('Worker', MockWorker);

    const chunks = await createMultipartChunks(new Blob([new Uint8Array(257)]), 1);

    expect(chunks).toHaveLength(257);
    expect(createObjectURL).toHaveBeenCalledOnce();
    expect(MockWorker.instances[0].postMessage).toHaveBeenCalledWith({
      file: expect.any(Blob),
      chunkSize: 1,
      batchSize: 128,
    });
    expect(MockWorker.instances[0].terminate).toHaveBeenCalledOnce();
    expect(MockWorker.instances[0].onmessage).toBeNull();
    expect(MockWorker.instances[0].onerror).toBeNull();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:multipart');
  });

  test('falls back to batched main-thread slicing when workers are blocked', async () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:blocked');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
    vi.stubGlobal(
      'Worker',
      class {
        constructor() {
          throw new DOMException('Blocked by Content Security Policy', 'SecurityError');
        }
      },
    );

    const chunks = await createMultipartChunks(new Blob([new Uint8Array(257)]), 1);

    expect(chunks).toHaveLength(257);
    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:blocked');
  });

  test('falls back when a worker reports an asynchronous startup error', async () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:async-blocked');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    vi.stubGlobal('Worker', ErrorWorker);

    const chunks = await createMultipartChunks(new Blob([new Uint8Array(257)]), 1);

    expect(chunks).toHaveLength(257);
    expect(MockWorker.instances[0].terminate).toHaveBeenCalledOnce();
    expect(MockWorker.instances[0].onmessage).toBeNull();
    expect(MockWorker.instances[0].onerror).toBeNull();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:async-blocked');
  });

  test('rejects invalid chunk sizes', async () => {
    await expect(createMultipartChunks(new Blob(['file']), 0)).rejects.toThrow(
      'Multipart chunk size must be greater than 0',
    );
  });

  test.each([
    {
      name: 'an empty message',
      script: (worker: ScriptedWorker) => worker.onmessage?.({ data: null } as MessageEvent),
    },
    {
      name: 'an incomplete done message',
      script: (worker: ScriptedWorker) =>
        worker.onmessage?.({ data: { type: 'done' } } as MessageEvent),
    },
    {
      name: 'an explicit worker failure',
      script: (worker: ScriptedWorker) =>
        worker.onmessage?.({ data: { type: 'error', message: 'worker failed' } } as MessageEvent),
    },
    {
      name: 'an unknown worker message without a reason',
      script: (worker: ScriptedWorker) =>
        worker.onmessage?.({ data: { type: 'unknown' } } as MessageEvent),
    },
    {
      name: 'an error event without a message',
      script: (worker: ScriptedWorker) =>
        worker.onerror?.({ preventDefault: vi.fn() } as unknown as ErrorEvent),
    },
  ])('falls back after $name', async ({ script }) => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:scripted');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    ScriptedWorker.script = script;
    vi.stubGlobal('Worker', ScriptedWorker);

    const chunks = await createMultipartChunks(new Blob([new Uint8Array(256)]), 1);

    expect(chunks).toHaveLength(256);
    expect(ScriptedWorker.instances[0].terminate).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:scripted');
  });

  test('falls back when posting to an otherwise valid worker throws a non-Error value', async () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:post-failed');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    vi.stubGlobal(
      'Worker',
      class extends MockWorker {
        override postMessage = vi.fn(() => {
          throw 'post failed';
        });
      },
    );

    const chunks = await createMultipartChunks(new Blob([new Uint8Array(256)]), 1);

    expect(chunks).toHaveLength(256);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:post-failed');
  });

  test('uses cooperative slicing when one of the required worker APIs is absent', async () => {
    const createObjectURL = URL.createObjectURL;
    vi.stubGlobal('Worker', MockWorker);
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: undefined });

    const chunks = await createMultipartChunks(new Blob([new Uint8Array(256)]), 1);

    expect(chunks).toHaveLength(256);
    expect(MockWorker.instances).toHaveLength(0);
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: createObjectURL });
  });

  test.each(['worker', 'url', 'revoke'] as const)(
    'uses cooperative slicing when the %s worker capability is unavailable',
    async missing => {
      const revokeObjectURL = URL.revokeObjectURL;
      if (missing === 'worker') vi.stubGlobal('Worker', undefined);
      if (missing === 'url') vi.stubGlobal('URL', undefined);
      if (missing === 'revoke') {
        vi.stubGlobal('Worker', MockWorker);
        Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: undefined });
      }

      const chunks = await createMultipartChunks(new Blob([new Uint8Array(256)]), 1);
      expect(chunks).toHaveLength(256);
      expect(MockWorker.instances).toHaveLength(0);

      if (missing === 'revoke') {
        Object.defineProperty(URL, 'revokeObjectURL', {
          configurable: true,
          value: revokeObjectURL,
        });
      }
    },
  );

  test.each([Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects the non-finite chunk size %s',
    async chunkSize => {
      await expect(createMultipartChunks(new Blob(['file']), chunkSize)).rejects.toThrow(
        'Multipart chunk size must be greater than 0',
      );
    },
  );

  test('falls back after a worker stalls and ignores messages delivered after settlement', async () => {
    vi.useFakeTimers();
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:stalled');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    vi.stubGlobal(
      'Worker',
      class extends MockWorker {
        override postMessage = vi.fn(() => undefined);
      },
    );

    const chunksPromise = createMultipartChunks(new Blob([new Uint8Array(256)]), 1);
    await vi.advanceTimersByTimeAsync(5000);
    await vi.runAllTimersAsync();
    await expect(chunksPromise).resolves.toHaveLength(256);
    expect(MockWorker.instances[0].terminate).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:stalled');
  });

  test('falls back when worker construction throws a non-Error value', async () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:constructor-failed');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    vi.stubGlobal(
      'Worker',
      class {
        constructor() {
          throw 'constructor failed';
        }
      },
    );

    await expect(createMultipartChunks(new Blob([new Uint8Array(256)]), 1)).resolves.toHaveLength(
      256,
    );
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:constructor-failed');
  });

  test('rejects a batch message without chunks and ignores a repeated captured message', async () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:invalid-batch');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    ScriptedWorker.script = worker => {
      const handler = worker.onmessage!;
      const invalid = { data: { type: 'batch' } } as MessageEvent;
      handler(invalid);
      handler(invalid);
    };
    vi.stubGlobal('Worker', ScriptedWorker);

    await expect(createMultipartChunks(new Blob([new Uint8Array(256)]), 1)).resolves.toHaveLength(
      256,
    );
  });

  test('falls back when posting to a worker throws an Error instance', async () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:error-post');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    vi.stubGlobal(
      'Worker',
      class extends MockWorker {
        override postMessage = vi.fn(() => {
          throw new Error('post failed');
        });
      },
    );

    await expect(createMultipartChunks(new Blob([new Uint8Array(256)]), 1)).resolves.toHaveLength(
      256,
    );
  });
});
