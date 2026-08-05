import { describe, expect, test, vi } from 'vitest';
import type { HUploadMultipartSetting } from '../../../horizon-web/src/components/Upload/src/composables/useMultipartUpload';
import {
  createCheckpointKey,
  createMemoryCheckpointStore,
  defaultUploadFingerprint,
  toHorizonMultipartSetting,
  type MultipartProviderAdapter,
  type UploadChunkLike,
  type UploadFileLike,
} from '../core';

interface TestSession {
  uploadId: string;
}

interface TestPartResponse {
  etag: string;
}

function createFile() {
  const raw = new File(['abcdef'], 'demo.bin', {
    type: 'application/octet-stream',
    lastModified: 456,
  });
  const file: UploadFileLike = { name: raw.name, size: raw.size, raw, uuid: 'file-1' };
  const chunks: UploadChunkLike[] = [
    { index: 0, size: 3, part: raw.slice(0, 3) },
    { index: 1, size: 3, part: raw.slice(3, 6) },
  ];
  return { raw, file, chunks };
}

describe('toHorizonMultipartSetting', () => {
  test('restores a checkpoint and maps the complete multipart lifecycle', async () => {
    const { raw, file, chunks } = createFile();
    const fingerprint = await defaultUploadFingerprint(file, raw);
    const checkpointKey = createCheckpointKey('test', fingerprint);
    const checkpointStore = createMemoryCheckpointStore<TestSession>([
      [checkpointKey, { uploadId: 'existing-upload' }],
    ]);
    const init = vi.fn(context => ({
      uploadId: context.checkpoint?.uploadId ?? 'new-upload',
    }));
    const listParts = vi.fn(() => [
      { index: 0, response: { etag: 'restored-etag' } },
      { index: 99, response: { etag: 'invalid-etag' } },
    ]);
    const uploadPart = vi.fn(() => ({ etag: 'new-etag' }));
    const complete = vi.fn(() => ({ url: '/demo.bin' }));
    const adapter: MultipartProviderAdapter<TestSession, TestPartResponse> = {
      id: 'test',
      init,
      listParts,
      uploadPart,
      complete,
    };
    const setting = toHorizonMultipartSetting(adapter, {
      checkpointStore,
      maxAmountUploadingAtSameTime: 3,
    });

    const horizonCompatible: HUploadMultipartSetting = setting;
    expect(horizonCompatible).toBe(setting);
    expect(setting.maxAmountUploadingAtSameTime).toBe(3);

    await setting.initUpload(file);
    expect(init).toHaveBeenCalledWith(
      expect.objectContaining({
        checkpoint: { uploadId: 'existing-upload' },
        fingerprint,
        rawFile: raw,
      }),
    );
    await expect(setting.getUploadedChunkIndexes(file, chunks, {})).resolves.toEqual([0]);

    const controller = new AbortController();
    const onProgress = vi.fn();
    await expect(
      setting.uploadPart(file, chunks[1], {
        action: '/upload',
        method: 'PUT',
        headers: {},
        data: {},
        withCredentials: false,
        signal: controller.signal,
        onProgress,
      }),
    ).resolves.toEqual({ etag: 'new-etag' });
    expect(uploadPart).toHaveBeenCalledWith(
      expect.objectContaining({
        chunk: chunks[1],
        partNumber: 2,
        session: { uploadId: 'existing-upload' },
        signal: controller.signal,
        onProgress,
      }),
    );

    await expect(setting.handleMerge(file, chunks)).resolves.toEqual({ url: '/demo.bin' });
    expect(complete).toHaveBeenCalledWith(
      expect.objectContaining({
        parts: [
          { index: 0, response: { etag: 'restored-etag' } },
          { index: 1, response: { etag: 'new-etag' } },
        ],
      }),
    );
    expect(await checkpointStore.get(checkpointKey)).toBeUndefined();
  });

  test('keeps the checkpoint when completion fails', async () => {
    const { raw, file, chunks } = createFile();
    const checkpointStore = createMemoryCheckpointStore<TestSession>();
    const adapter: MultipartProviderAdapter<TestSession> = {
      id: 'test',
      init: () => ({ uploadId: 'upload-1' }),
      uploadPart: () => undefined,
      complete: () => Promise.reject(new Error('complete failed')),
    };
    const setting = toHorizonMultipartSetting(adapter, { checkpointStore });
    const checkpointKey = createCheckpointKey('test', await defaultUploadFingerprint(file, raw));

    await setting.initUpload(file);
    await expect(setting.handleMerge(file, chunks)).rejects.toThrow('complete failed');
    expect(await checkpointStore.get(checkpointKey)).toEqual({ uploadId: 'upload-1' });
  });

  test('requires access to the original File', async () => {
    const adapter: MultipartProviderAdapter = {
      id: 'test',
      init: () => ({}),
      uploadPart: () => undefined,
      complete: () => undefined,
    };
    const setting = toHorizonMultipartSetting(adapter);

    await expect(setting.initUpload({ name: 'missing.bin' })).rejects.toThrow(
      'A raw File is required',
    );
  });

  test('does not reuse runtime state for an uninitialized file with the same fingerprint', async () => {
    const first = createFile();
    const second = createFile();
    const adapter: MultipartProviderAdapter<TestSession> = {
      id: 'test',
      init: () => ({ uploadId: 'upload-1' }),
      uploadPart: () => undefined,
      complete: () => undefined,
    };
    const setting = toHorizonMultipartSetting(adapter);

    await setting.initUpload(first.file);
    await expect(
      setting.uploadPart(second.file, second.chunks[0], {
        action: '',
        method: 'PUT',
        headers: {},
        data: {},
        withCredentials: false,
        signal: new AbortController().signal,
        onProgress: () => undefined,
      }),
    ).rejects.toThrow('Multipart upload has not been initialized');
  });

  test('rejects concurrent initialization for the same checkpoint', async () => {
    const first = createFile();
    const second = createFile();
    let finishInitialization!: () => void;
    let markStarted!: () => void;
    const initialization = new Promise<void>(resolve => {
      finishInitialization = resolve;
    });
    const started = new Promise<void>(resolve => {
      markStarted = resolve;
    });
    const adapter: MultipartProviderAdapter<TestSession> = {
      id: 'test',
      init: async () => {
        markStarted();
        await initialization;
        return { uploadId: 'upload-1' };
      },
      uploadPart: () => undefined,
      complete: () => undefined,
    };
    const setting = toHorizonMultipartSetting(adapter);
    const firstInitialization = setting.initUpload(first.file);
    await started;

    await expect(setting.initUpload(second.file)).rejects.toThrow(
      'Another multipart upload is already using the same',
    );
    finishInitialization();
    await firstInitialization;
  });

  test('keeps initialization ownership until checkpoint persistence finishes', async () => {
    const first = createFile();
    const second = createFile();
    let finishCheckpointWrite!: () => void;
    let markCheckpointWriteStarted!: () => void;
    const checkpointWrite = new Promise<void>(resolve => {
      finishCheckpointWrite = resolve;
    });
    const checkpointWriteStarted = new Promise<void>(resolve => {
      markCheckpointWriteStarted = resolve;
    });
    const adapter: MultipartProviderAdapter<TestSession> = {
      id: 'test',
      init: () => ({ uploadId: 'upload-1' }),
      uploadPart: () => undefined,
      complete: () => undefined,
    };
    const setting = toHorizonMultipartSetting(adapter, {
      checkpointStore: {
        get: () => undefined,
        set: async () => {
          markCheckpointWriteStarted();
          await checkpointWrite;
        },
        delete: () => undefined,
      },
    });

    const firstInitialization = setting.initUpload(first.file);
    await checkpointWriteStarted;
    await expect(setting.initUpload(second.file)).rejects.toThrow(
      'Another multipart upload is already using the same',
    );
    finishCheckpointWrite();
    await firstInitialization;
  });

  test('lets an idle re-selected file take ownership of the checkpoint', async () => {
    const first = createFile();
    const second = createFile();
    const uploadPart = vi.fn(() => undefined);
    const adapter: MultipartProviderAdapter<TestSession> = {
      id: 'test',
      init: context => ({ uploadId: context.checkpoint?.uploadId ?? 'upload-1' }),
      uploadPart,
      complete: () => undefined,
    };
    const setting = toHorizonMultipartSetting(adapter);
    const request = {
      action: '',
      method: 'PUT',
      headers: {},
      data: {},
      withCredentials: false,
      signal: new AbortController().signal,
      onProgress: () => undefined,
    };

    await setting.initUpload(first.file);
    await setting.initUpload(second.file);
    await expect(setting.uploadPart(first.file, first.chunks[0], request)).rejects.toThrow(
      'superseded',
    );
    await expect(
      setting.uploadPart(second.file, second.chunks[0], request),
    ).resolves.toBeUndefined();
    expect(uploadPart).toHaveBeenCalledOnce();
  });

  test('does not let re-selection supersede an in-flight part operation', async () => {
    const first = createFile();
    const second = createFile();
    let finishUpload!: () => void;
    let markStarted!: () => void;
    const uploading = new Promise<void>(resolve => {
      finishUpload = resolve;
    });
    const started = new Promise<void>(resolve => {
      markStarted = resolve;
    });
    const adapter: MultipartProviderAdapter<TestSession> = {
      id: 'test',
      init: context => ({ uploadId: context.checkpoint?.uploadId ?? 'upload-1' }),
      uploadPart: async () => {
        markStarted();
        await uploading;
      },
      complete: () => undefined,
    };
    const setting = toHorizonMultipartSetting(adapter);
    const request = {
      action: '',
      method: 'PUT',
      headers: {},
      data: {},
      withCredentials: false,
      signal: new AbortController().signal,
      onProgress: () => undefined,
    };

    await setting.initUpload(first.file);
    const firstUpload = setting.uploadPart(first.file, first.chunks[0], request);
    await started;

    await expect(setting.initUpload(second.file)).rejects.toThrow(
      'Another multipart upload is already using the same',
    );
    finishUpload();
    await firstUpload;
    await expect(setting.initUpload(second.file)).resolves.toEqual({});
  });

  test('replaces restored part metadata on every server reconciliation', async () => {
    const { file, chunks } = createFile();
    const listParts = vi
      .fn()
      .mockResolvedValueOnce([{ index: 0, response: { etag: 'old' } }])
      .mockResolvedValueOnce([]);
    const adapter: MultipartProviderAdapter<TestSession, TestPartResponse> = {
      id: 'test',
      init: () => ({ uploadId: 'upload-1' }),
      listParts,
      uploadPart: () => ({ etag: 'new' }),
      complete: () => undefined,
    };
    const setting = toHorizonMultipartSetting(adapter);

    await setting.initUpload(file);
    await expect(setting.getUploadedChunkIndexes(file, chunks, {})).resolves.toEqual([0]);
    await expect(setting.getUploadedChunkIndexes(file, chunks, {})).resolves.toEqual([]);
  });

  test('does not turn a completed cloud upload into a failure when checkpoint cleanup fails', async () => {
    const { file, chunks } = createFile();
    const onCheckpointError = vi.fn();
    const adapter: MultipartProviderAdapter<TestSession> = {
      id: 'test',
      init: () => ({ uploadId: 'upload-1' }),
      uploadPart: () => undefined,
      complete: () => ({ url: '/done' }),
    };
    const setting = toHorizonMultipartSetting(adapter, {
      checkpointStore: {
        get: () => undefined,
        set: () => undefined,
        delete: () => Promise.reject(new Error('storage offline')),
      },
      onCheckpointError,
    });

    await setting.initUpload(file);
    await expect(setting.handleMerge(file, chunks)).resolves.toEqual({ url: '/done' });
    expect(onCheckpointError).toHaveBeenCalledWith(
      expect.objectContaining({ operation: 'delete', error: expect.any(Error) }),
    );
    await expect(setting.handleMerge(file, chunks)).rejects.toThrow(
      'Multipart upload has not been initialized',
    );
  });
});
