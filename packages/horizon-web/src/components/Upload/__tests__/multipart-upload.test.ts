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

function createUploader(
  setting: HUploadMultipartSetting,
  maxConcurrency = 2,
  file = createFile(),
  overrides: Partial<UploadProps> = {},
) {
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
      ...overrides,
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

  test('ignores start, pause and resume calls after there is no work or upload is completed', async () => {
    const noRaw = createFile(1);
    delete noRaw.raw;
    const empty = createUploader({ handleMerge: vi.fn() }, 1, noRaw);
    await empty.uploader.start();
    expect(empty.methods.addUploadingQueue).not.toHaveBeenCalled();

    const completed = createUploader(
      {
        uploadPart: () => Promise.resolve('part'),
        handleMerge: () => 'merged',
      },
      4,
      createFile(10),
    );
    await completed.uploader.start();
    await flushPromises();
    completed.uploader.pause();
    await completed.uploader.resume();
    expect(completed.methods.onUploadSuccess).toHaveBeenCalledWith(completed.file, 'merged');
    expect(completed.methods.addUploadingQueue).toHaveBeenCalledOnce();
  });

  test('serializes null merge responses and reports non-Error merge failures', async () => {
    const nullMerge = createUploader(
      { uploadPart: () => Promise.resolve('part'), handleMerge: () => null },
      1,
      createFile(10),
    );
    await nullMerge.uploader.start();
    await flushPromises();
    expect(nullMerge.methods.onUploadSuccess).toHaveBeenCalledWith(nullMerge.file, '{}');

    const failedMerge = createUploader(
      {
        uploadPart: () => Promise.resolve('part'),
        handleMerge: () => Promise.reject('merge failed'),
      },
      1,
      createFile(10),
    );
    await failedMerge.uploader.start();
    await flushPromises();
    expect(failedMerge.methods.onUploadFail).toHaveBeenCalledWith(
      failedMerge.file,
      'merge failed',
      JSON.stringify({ reason: 'merge failed' }),
    );
  });

  test('reports thrown and rejected custom upload adapters with Error and non-Error reasons', async () => {
    const thrown = createUploader(
      {
        uploadPart: () => {
          throw 'sync failure';
        },
        handleMerge: vi.fn(),
      },
      1,
      createFile(10),
    );
    await thrown.uploader.start();
    expect(thrown.methods.onUploadFail).toHaveBeenCalledWith(
      thrown.file,
      'sync failure',
      'sync failure',
    );

    const rejected = createUploader(
      { uploadPart: () => Promise.reject('async failure'), handleMerge: vi.fn() },
      1,
      createFile(10),
    );
    await rejected.uploader.start();
    await flushPromises();
    expect(rejected.methods.onUploadFail).toHaveBeenCalledWith(
      rejected.file,
      'async failure',
      'async failure',
    );
  });

  test('covers xhr network errors, abort idempotence and zero-byte progress', async () => {
    const zero = createUploader({ handleMerge: vi.fn() }, 1, createFile(0));
    await zero.uploader.start();
    expect(zero.file.percentage).toBe(100);

    const failed = createUploader({ handleMerge: vi.fn() }, 1, createFile(10));
    await failed.uploader.start();
    const xhr = MockXMLHttpRequest.instances.at(-1)!;
    xhr.responseText = 'network down';
    xhr.response = { reason: 'network down' } as never;
    xhr.onerror?.();
    xhr.onerror?.();
    xhr.onabort?.();
    expect(failed.methods.onUploadFail).toHaveBeenCalledOnce();
  });

  test('does not start chunks when paused while initialization is pending', async () => {
    let resolveInit!: (value: Record<string, string>) => void;
    const initUpload = vi.fn(
      () =>
        new Promise<Record<string, string>>(resolve => {
          resolveInit = resolve;
        }),
    );
    const pending = createUploader(
      { initUpload, uploadPart: vi.fn(), handleMerge: vi.fn() },
      1,
      createFile(10),
    );
    const startPromise = pending.uploader.start();
    pending.uploader.pause();
    resolveInit({ uploadId: 'paused' });
    await startPromise;
    expect(MockXMLHttpRequest.instances).toHaveLength(0);
  });

  test('uses default chunk/concurrency fallbacks and appends configured xhr headers', async () => {
    const upload = createUploader(
      { beforePartUpload: () => ({ chunkToken: 'part' }), handleMerge: vi.fn() },
      0,
      createFile(10),
      {
        multipartChunkSize: 0,
        header: { Authorization: 'token', Version: 2 },
        data: { folder: 'reports' },
      },
    );
    await upload.uploader.start();

    expect(MockXMLHttpRequest.instances).toHaveLength(1);
    const xhr = MockXMLHttpRequest.instances[0];
    expect(xhr.setRequestHeader).toHaveBeenCalledWith('Authorization', 'token');
    expect(xhr.setRequestHeader).toHaveBeenCalledWith('Version', '2');
    expect(xhr.body?.get('folder')).toBe('reports');
    expect(xhr.body?.get('chunkToken')).toBe('part');

    xhr.respond();
    xhr.progress(5, 10);
    xhr.respond();
    xhr.onerror?.();
    xhr.onabort?.();
    await flushPromises();
  });

  test('restarts after flagged non-Error initialization and scheduling failures', async () => {
    const initUpload = vi
      .fn()
      .mockRejectedValueOnce({ requiresFullRestart: true, code: 'expired-init' })
      .mockResolvedValue({ uploadId: 'renewed' });
    const initialized = createUploader(
      { initUpload, uploadPart: () => new Promise(() => undefined), handleMerge: vi.fn() },
      1,
      createFile(10),
    );
    await initialized.uploader.start();
    expect(initialized.methods.onUploadFail).toHaveBeenCalledWith(
      initialized.file,
      '[object Object]',
      JSON.stringify({ reason: '[object Object]' }),
    );
    await initialized.uploader.resume();
    expect(initUpload).toHaveBeenCalledTimes(2);
    initialized.uploader.pause();

    const beforePartUpload = vi
      .fn()
      .mockImplementationOnce(() => {
        throw { requiresFullRestart: true, code: 'expired-schedule' };
      })
      .mockReturnValue({});
    const scheduled = createUploader(
      { beforePartUpload, uploadPart: () => new Promise(() => undefined), handleMerge: vi.fn() },
      1,
      createFile(10),
    );
    await scheduled.uploader.start();
    expect(scheduled.methods.onUploadFail).toHaveBeenCalledWith(
      scheduled.file,
      '[object Object]',
      JSON.stringify({ reason: '[object Object]' }),
    );
    await scheduled.uploader.resume();
    expect(beforePartUpload).toHaveBeenCalledTimes(2);
    scheduled.uploader.pause();
  });

  test('marks flagged chunk and merge errors for a full multipart restart', async () => {
    const initUpload = vi.fn(() => ({ uploadId: 'first' }));
    const uploadPart = vi
      .fn()
      .mockRejectedValueOnce(
        Object.assign(new Error('expired chunk'), { requiresFullRestart: true }),
      )
      .mockImplementation(() => Promise.resolve('part'));
    const chunkFailure = createUploader(
      { initUpload, uploadPart, handleMerge: () => 'merged' },
      1,
      createFile(10),
    );
    await chunkFailure.uploader.start();
    await flushPromises();
    expect(chunkFailure.methods.onUploadFail).toHaveBeenCalledWith(
      chunkFailure.file,
      'expired chunk',
      expect.any(String),
    );
    await chunkFailure.uploader.resume();
    await flushPromises();
    expect(initUpload).toHaveBeenCalledTimes(2);

    const mergeInit = vi.fn(() => ({ uploadId: 'merge' }));
    const mergeFailure = createUploader(
      {
        initUpload: mergeInit,
        uploadPart: () => Promise.resolve('part'),
        handleMerge: () =>
          Promise.reject(Object.assign(new Error('expired merge'), { requiresFullRestart: true })),
      },
      1,
      createFile(10),
    );
    await mergeFailure.uploader.start();
    await flushPromises();
    expect(mergeFailure.methods.onUploadFail).toHaveBeenCalledWith(
      mergeFailure.file,
      'expired merge',
      JSON.stringify({ reason: 'expired merge' }),
    );
    await mergeFailure.uploader.resume();
    expect(mergeInit).toHaveBeenCalledTimes(2);
  });

  test('falls back to an empty multipart action when no action is available', () => {
    const { uploader } = createUploader({ handleMerge: vi.fn() }, 1, createFile(10));
    Object.assign(uploader, { action: undefined });
    expect(uploader.uploadActionModify()).toBe('');
  });

  test('ignores custom progress after pause and reports a synchronously thrown Error', async () => {
    let reportProgress!: (loaded: number) => void;
    const pending = createUploader(
      {
        uploadPart: (_file, _chunk, { onProgress }) => {
          reportProgress = onProgress;
          return new Promise(() => undefined);
        },
        handleMerge: vi.fn(),
      },
      1,
      createFile(10),
    );
    await pending.uploader.start();
    reportProgress(5);
    const percentage = pending.file.percentage;
    pending.uploader.pause();
    reportProgress(9);
    expect(pending.file.percentage).toBe(percentage);

    const thrown = createUploader(
      {
        uploadPart: () => {
          throw new Error('sync Error');
        },
        handleMerge: vi.fn(),
      },
      1,
      createFile(10),
    );
    await thrown.uploader.start();
    expect(thrown.methods.onUploadFail).toHaveBeenCalledWith(
      thrown.file,
      'sync Error',
      expect.any(String),
    );
  });

  test('shares and clears a rejected initialization promise across concurrent starts', async () => {
    let rejectInit!: (reason: unknown) => void;
    const initUpload = vi.fn(
      () =>
        new Promise<Record<string, string>>((_resolve, reject) => {
          rejectInit = reject;
        }),
    );
    const upload = createUploader(
      { initUpload, uploadPart: vi.fn(), handleMerge: vi.fn() },
      1,
      createFile(10),
    );
    const first = upload.uploader.start();
    const second = upload.uploader.start();
    rejectInit(new Error('shared initialization failure'));
    await Promise.all([first, second]);
    expect(initUpload).toHaveBeenCalledOnce();
    expect(upload.methods.onUploadFail).toHaveBeenCalledTimes(2);
  });

  test('does not schedule more chunks while a merge is already pending', async () => {
    let resolveMerge!: (value: string) => void;
    const handleMerge = vi.fn(
      () =>
        new Promise<string>(resolve => {
          resolveMerge = resolve;
        }),
    );
    const upload = createUploader(
      { uploadPart: () => Promise.resolve('part'), handleMerge },
      1,
      createFile(10),
    );
    const start = upload.uploader.start();
    await vi.waitFor(() => expect(handleMerge).toHaveBeenCalledOnce());
    const resume = upload.uploader.resume();
    await flushPromises();
    expect(handleMerge).toHaveBeenCalledOnce();
    resolveMerge('merged');
    await Promise.all([start, resume]);
  });
});
