import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import type { ToRefs } from 'vue';
import { reactive, toRefs } from 'vue';
import type { UploadProps } from '../src/composables/useProps';
import type { HUploadMultipartSetting } from '../src/composables/useMultipartUpload';
import type { HUploadFileType, HUploadHttpRequestInstanceMethods } from '../src/utils/fileDefines';
import { HUploadFileStatusEnum, HUploadFileTypeEnum } from '../src/utils/fileDefines';
import CustomMultipleUploader from '../src/utils/multipart/CustomMultipleUploader';

class MockXMLHttpRequest {
  static instances: MockXMLHttpRequest[] = [];

  readonly upload = new EventTarget();
  status = 0;
  response = '';
  responseText = '';
  withCredentials = false;
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  onabort: (() => void) | null = null;
  aborted = false;
  body?: FormData;

  constructor() {
    MockXMLHttpRequest.instances.push(this);
  }

  open = vi.fn();
  setRequestHeader = vi.fn();

  send(body: FormData) {
    this.body = body;
  }

  abort() {
    this.aborted = true;
    this.onabort?.();
  }

  progress(loaded: number, total: number) {
    const event = new Event('progress');
    Object.defineProperties(event, {
      loaded: { value: loaded },
      total: { value: total },
    });
    this.upload.dispatchEvent(event);
  }

  respond(status = 200, response = '{}') {
    this.status = status;
    this.response = response;
    this.responseText = response;
    this.onload?.();
  }
}

const flushPromises = async () => {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
};

function createFile(size = 2.5 * 1024 * 1024): HUploadFileType {
  const raw = new File([new Uint8Array(size)], 'large.bin');
  return {
    name: raw.name,
    percentage: 0,
    status: HUploadFileStatusEnum.New,
    type: HUploadFileTypeEnum.Unknown,
    size: raw.size,
    uuid: 'large-file',
    url: '',
    raw,
  };
}

function createUploader(setting: HUploadMultipartSetting, maxConcurrency = 2) {
  const file = createFile();
  const methods: HUploadHttpRequestInstanceMethods = {
    setStatus: vi.fn((target, status, args) => {
      target.status = status;
      if (status === HUploadFileStatusEnum.Uploading) {
        target.percentage = args?.progress;
      }
    }),
    onUploadSuccess: vi.fn(),
    onUploadFail: vi.fn(),
    onUploadFinished: vi.fn(),
    addUploadingQueue: vi.fn(),
  };
  const props = toRefs(
    reactive({
      action: '/upload',
      method: 'POST' as const,
      multipart: setting,
      multipartChunkSize: 1,
      multipartMaxAmountUploadingAtSameTime: maxConcurrency,
      name: 'file',
    }),
  );
  const uploader = new CustomMultipleUploader(
    file,
    methods,
    props as unknown as ToRefs<Partial<UploadProps>>,
  );

  return { file, methods, uploader };
}

describe('multipart upload', () => {
  beforeEach(() => {
    MockXMLHttpRequest.instances = [];
    vi.stubGlobal('XMLHttpRequest', MockXMLHttpRequest);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('fills all concurrency slots and reports aggregate byte progress', async () => {
    const uploadedIndexes: number[] = [];
    const { file, uploader } = createUploader({
      beforePartUpload: (_file, index) => {
        uploadedIndexes.push(index);
        return {};
      },
      handleMerge: vi.fn(),
    });

    await uploader.start();

    expect(MockXMLHttpRequest.instances).toHaveLength(2);
    expect(uploadedIndexes).toEqual([0, 1]);

    MockXMLHttpRequest.instances[0].progress(512 * 1024, 1024 * 1024);
    expect(file.percentage).toBeCloseTo(20, 4);

    MockXMLHttpRequest.instances[0].respond();
    expect(MockXMLHttpRequest.instances).toHaveLength(3);
    expect(uploadedIndexes).toEqual([0, 1, 2]);
  });

  test('supports the concurrency override from multipart settings', async () => {
    const { uploader } = createUploader({
      maxAmountUploadingAtSameTime: 1,
      handleMerge: vi.fn(),
    });

    await uploader.start();

    expect(MockXMLHttpRequest.instances).toHaveLength(1);
  });

  test('supports a cancellable custom chunk request adapter', async () => {
    const attempts: number[] = [];
    const aborted: number[] = [];
    const resolvers = new Map<number, (value: unknown) => void>();
    const progressReporters = new Map<number, (loaded: number) => void>();
    const requestData = new Map<number, Record<string, unknown>>();
    const { file, uploader } = createUploader({
      initUpload: () => ({ uploadId: 'custom-upload' }),
      beforePartUpload: (_file, index) => ({ partIndex: index }),
      uploadPart: (_file, chunk, { data, signal, onProgress }) =>
        new Promise((resolve, reject) => {
          attempts.push(chunk.index);
          requestData.set(chunk.index, data);
          resolvers.set(chunk.index, resolve);
          progressReporters.set(chunk.index, onProgress);
          signal.addEventListener(
            'abort',
            () => {
              aborted.push(chunk.index);
              reject(new DOMException('Aborted', 'AbortError'));
            },
            { once: true },
          );
        }),
      handleMerge: vi.fn(),
    });

    await uploader.start();
    expect(MockXMLHttpRequest.instances).toHaveLength(0);
    expect(attempts).toEqual([0, 1]);
    expect(requestData.get(0)).toEqual({ uploadId: 'custom-upload', partIndex: 0 });

    progressReporters.get(0)?.(512 * 1024);
    expect(file.percentage).toBeCloseTo(20, 4);

    resolvers.get(0)?.({ etag: 'part-0' });
    await flushPromises();
    uploader.pause();
    expect(aborted).toEqual([1, 2]);

    await uploader.resume();
    expect(attempts).toEqual([0, 1, 2, 1, 2]);
  });

  test('pauses active requests and resumes from completed chunks', async () => {
    const handleMerge = vi.fn(() => ({ url: 'https://example.com/large.bin' }));
    const uploadedIndexes: number[] = [];
    const { methods, uploader } = createUploader({
      beforePartUpload: (_file, index) => {
        uploadedIndexes.push(index);
        return {};
      },
      handleMerge,
    });

    await uploader.start();
    MockXMLHttpRequest.instances[0].respond();
    uploader.pause();

    expect(MockXMLHttpRequest.instances[1].aborted).toBe(true);
    expect(MockXMLHttpRequest.instances[2].aborted).toBe(true);

    await uploader.resume();
    expect(uploadedIndexes).toEqual([0, 1, 2, 1, 2]);

    MockXMLHttpRequest.instances[3].respond();
    MockXMLHttpRequest.instances[4].respond();
    await flushPromises();

    expect(handleMerge).toHaveBeenCalledOnce();
    expect(methods.onUploadSuccess).toHaveBeenCalledWith(
      expect.any(Object),
      JSON.stringify({ url: 'https://example.com/large.bin' }),
    );
  });

  test('skips chunks reported as uploaded by the server', async () => {
    const uploadedIndexes: number[] = [];
    const getUploadedChunkIndexes = vi.fn(() => [0, -1, 99]);
    const { file, uploader } = createUploader({
      initUpload: () => ({ uploadId: 'existing-upload' }),
      getUploadedChunkIndexes,
      beforePartUpload: (_file, index) => {
        uploadedIndexes.push(index);
        return {};
      },
      handleMerge: vi.fn(),
    });

    await uploader.start();

    expect(getUploadedChunkIndexes).toHaveBeenCalledWith(
      file,
      expect.arrayContaining([expect.objectContaining({ index: 0 })]),
      { uploadId: 'existing-upload' },
    );
    expect(uploadedIndexes).toEqual([1, 2]);
    expect(file.percentage).toBeCloseTo(40, 4);
  });

  test('retries only failed or interrupted chunks', async () => {
    const uploadedIndexes: number[] = [];
    const { methods, uploader } = createUploader({
      beforePartUpload: (_file, index) => {
        uploadedIndexes.push(index);
        return {};
      },
      handleMerge: vi.fn(),
    });

    await uploader.start();
    MockXMLHttpRequest.instances[0].respond();
    MockXMLHttpRequest.instances[1].respond(500, 'failed');

    expect(methods.onUploadFail).toHaveBeenCalledOnce();

    await uploader.resume();
    expect(uploadedIndexes).toEqual([0, 1, 2, 1, 2]);
  });

  test('reinitializes every chunk when a provider reports an expired multipart session', async () => {
    const initUpload = vi.fn(() => ({ uploadId: 'upload-id' }));
    const attempts: number[] = [];
    let rejectSessionOnce = true;
    const { uploader } = createUploader(
      {
        maxAmountUploadingAtSameTime: 1,
        initUpload,
        uploadPart: (_file, chunk) => {
          attempts.push(chunk.index);
          if (chunk.index === 1 && rejectSessionOnce) {
            rejectSessionOnce = false;
            return Promise.reject(
              Object.assign(new Error('NoSuchUpload'), { requiresFullRestart: true }),
            );
          }
          if (attempts.length >= 3) return new Promise(() => undefined);
          return Promise.resolve({ etag: `etag-${chunk.index}` });
        },
        handleMerge: vi.fn(),
      },
      1,
    );

    await uploader.start();
    await flushPromises();
    expect(attempts).toEqual([0, 1]);

    await uploader.resume();
    expect(initUpload).toHaveBeenCalledTimes(2);
    expect(attempts).toEqual([0, 1, 0]);
  });

  test('retries initialization after a transient initialization failure', async () => {
    const initUpload = vi
      .fn()
      .mockRejectedValueOnce(new Error('temporary STS failure'))
      .mockResolvedValueOnce({ uploadId: 'upload-id' });
    const { uploader } = createUploader({
      initUpload,
      uploadPart: () => new Promise(() => undefined),
      handleMerge: vi.fn(),
    });

    await uploader.start();
    expect(initUpload).toHaveBeenCalledOnce();

    await uploader.resume();
    expect(initUpload).toHaveBeenCalledTimes(2);
  });

  test('keeps successful initialization when scheduling fails synchronously', async () => {
    const initUpload = vi.fn(() => ({ uploadId: 'upload-id' }));
    const beforePartUpload = vi
      .fn()
      .mockImplementationOnce(() => {
        throw new Error('temporary scheduling failure');
      })
      .mockReturnValue({});
    const { methods, uploader } = createUploader({
      initUpload,
      beforePartUpload,
      uploadPart: () => new Promise(() => undefined),
      handleMerge: vi.fn(),
    });

    await uploader.start();
    expect(methods.onUploadFail).toHaveBeenCalledOnce();
    expect(initUpload).toHaveBeenCalledOnce();

    await uploader.resume();
    expect(initUpload).toHaveBeenCalledOnce();
    expect(beforePartUpload).toHaveBeenCalledTimes(3);
  });
});
