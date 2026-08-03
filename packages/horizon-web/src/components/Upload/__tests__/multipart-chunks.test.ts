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

describe('multipart chunk creation', () => {
  afterEach(() => {
    MockWorker.instances = [];
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
});
