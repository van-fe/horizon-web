import { afterEach, describe, expect, it, vi } from 'vitest';
import type {
  MultipartCompleteContext,
  MultipartInitContext,
  MultipartSessionContext,
  MultipartUploadPartContext,
  UploadChunkLike,
  UploadFileLike,
} from '../core';
import { createMemoryCheckpointStore } from '../core';
import { createAliyunOssMultipartAdapter, createAliyunOssUploadPreset } from '../aliyun-oss';
import type {
  AliyunOssClientLike,
  AliyunOssMultipartSession,
  AliyunOssUploadedPart,
} from '../aliyun-oss';

const MB = 1024 * 1024;

function createFile(size = 2 * MB + 3) {
  const rawFile = new File([new Uint8Array(size)], 'video.bin', {
    lastModified: 1_700_000_000_000,
    type: 'video/mp4',
  });
  const file: UploadFileLike = {
    name: rawFile.name,
    raw: rawFile,
    size: rawFile.size,
    uuid: 'file-1',
  };
  const chunks: UploadChunkLike[] = [
    { index: 0, size: Math.min(MB, size), part: rawFile.slice(0, MB) },
    ...(size > MB
      ? [
          {
            index: 1,
            size: Math.min(MB, size - MB),
            part: rawFile.slice(MB, 2 * MB),
          },
        ]
      : []),
    ...(size > 2 * MB
      ? [
          {
            index: 2,
            size: size - 2 * MB,
            part: rawFile.slice(2 * MB),
          },
        ]
      : []),
  ];
  return { file, rawFile, chunks };
}

function createSession(
  overrides: Partial<AliyunOssMultipartSession> = {},
): AliyunOssMultipartSession {
  return {
    provider: 'aliyun-oss',
    version: 1,
    objectKey: 'uploads/video.bin',
    uploadId: 'upload-old',
    chunkSize: MB,
    fingerprint: 'fingerprint',
    ...overrides,
  };
}

function createClient(overrides: Partial<AliyunOssClientLike> = {}): AliyunOssClientLike {
  return {
    initMultipartUpload: vi.fn(async name => ({ uploadId: 'upload-new', name })),
    listParts: vi.fn(async () => ({ parts: [], isTruncated: false })),
    uploadPart: vi.fn(async name => ({ etag: 'etag-new', name })),
    completeMultipartUpload: vi.fn(async name => ({ name })),
    abortMultipartUpload: vi.fn(async () => ({})),
    ...overrides,
  };
}

function initContext(
  checkpoint?: AliyunOssMultipartSession,
): MultipartInitContext<AliyunOssMultipartSession> {
  const { file, rawFile } = createFile();
  return {
    file,
    rawFile,
    fingerprint: 'fingerprint',
    checkpoint,
  };
}

function sessionContext(
  context: MultipartInitContext<AliyunOssMultipartSession>,
  session: AliyunOssMultipartSession,
): MultipartSessionContext<AliyunOssMultipartSession> {
  return {
    file: context.file,
    rawFile: context.rawFile,
    fingerprint: context.fingerprint,
    session,
  };
}

function uploadContext(
  context: MultipartInitContext<AliyunOssMultipartSession>,
  session: AliyunOssMultipartSession,
  chunk: UploadChunkLike,
  controller: AbortController,
  onProgress = vi.fn(),
): MultipartUploadPartContext<AliyunOssMultipartSession> {
  return {
    ...sessionContext(context, session),
    chunk,
    partNumber: chunk.index + 1,
    signal: controller.signal,
    onProgress,
    request: {
      action: '',
      method: 'PUT',
      headers: {},
      data: {},
      withCredentials: false,
      signal: controller.signal,
      onProgress,
    },
  };
}

afterEach(() => {
  localStorage.clear();
});

describe('createAliyunOssMultipartAdapter', () => {
  it('rejects a fractional multipartChunkSize', () => {
    expect(() =>
      createAliyunOssMultipartAdapter({
        client: createClient(),
        multipartChunkSize: 1.5,
      }),
    ).toThrow('must be an integer from 1 to 1024 MB');
  });

  it('retries objectKey resolution after a transient rejection', async () => {
    const failure = new Error('temporary object key failure');
    const objectKey = vi
      .fn()
      .mockRejectedValueOnce(failure)
      .mockResolvedValueOnce('uploads/video.bin');
    const client = createClient();
    const adapter = createAliyunOssMultipartAdapter({
      client,
      objectKey,
      multipartChunkSize: 1,
    });
    const context = initContext();

    await expect(adapter.init(context)).rejects.toBe(failure);
    await expect(adapter.init(context)).resolves.toMatchObject({
      objectKey: 'uploads/video.bin',
      uploadId: 'upload-new',
    });

    expect(objectKey).toHaveBeenCalledTimes(2);
    expect(client.initMultipartUpload).toHaveBeenCalledTimes(1);
  });

  it('reuses a compatible checkpoint without persisting STS credentials', async () => {
    const client = Object.assign(createClient(), {
      accessKeyId: 'STS.test-access-key',
      accessKeySecret: 'test-secret',
      stsToken: 'test-security-token',
    });
    const checkpoint = createSession();
    const adapter = createAliyunOssMultipartAdapter({
      client,
      objectKey: 'uploads/video.bin',
      multipartChunkSize: 1,
    });

    const session = await adapter.init(initContext(checkpoint));

    expect(session).toEqual(checkpoint);
    expect(client.initMultipartUpload).not.toHaveBeenCalled();
    expect(JSON.stringify(session)).not.toContain('test-secret');
    expect(JSON.stringify(session)).not.toContain('test-security-token');
    expect(JSON.stringify(session)).not.toContain('STS.test-access-key');
  });

  it('paginates listParts and restores only parts whose server size matches', async () => {
    const listParts = vi
      .fn()
      .mockResolvedValueOnce({
        parts: [
          { PartNumber: 1, ETag: 'etag-1', Size: MB },
          { PartNumber: 2, ETag: 'wrong-size', Size: 7 },
        ],
        isTruncated: 'true',
        nextPartNumberMarker: '2',
      })
      .mockResolvedValueOnce({
        parts: [{ PartNumber: 3, ETag: 'etag-3', Size: 3 }],
        isTruncated: false,
      });
    const client = createClient({ listParts });
    const checkpoint = createSession();
    const adapter = createAliyunOssMultipartAdapter({
      client,
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
      listPartsOptions: { timeout: 12_000 },
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);

    await expect(adapter.listParts!(sessionContext(context, session))).resolves.toEqual([
      { index: 0, response: { etag: 'etag-1', size: MB } },
      { index: 2, response: { etag: 'etag-3', size: 3 } },
    ]);
    expect(listParts).toHaveBeenNthCalledWith(
      1,
      checkpoint.objectKey,
      checkpoint.uploadId,
      { 'max-parts': 1000 },
      { timeout: 12_000 },
    );
    expect(listParts).toHaveBeenNthCalledWith(
      2,
      checkpoint.objectKey,
      checkpoint.uploadId,
      { 'max-parts': 1000, 'part-number-marker': '2' },
      { timeout: 12_000 },
    );
  });

  it('restores the single-Part object shape returned by ali-oss XML parsing', async () => {
    const client = createClient({
      listParts: vi.fn(async () => ({
        parts: { PartNumber: 1, ETag: 'etag-1', Size: MB },
        isTruncated: false,
      })),
    });
    const checkpoint = createSession();
    const adapter = createAliyunOssMultipartAdapter({
      client,
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);

    await expect(adapter.listParts!(sessionContext(context, session))).resolves.toEqual([
      { index: 0, response: { etag: 'etag-1', size: MB } },
    ]);
  });

  it('uses the whole File with exact offsets and reports a completed part', async () => {
    const uploadPart = vi.fn(async () => ({ etag: 'etag-2' }));
    const client = createClient({ uploadPart });
    const checkpoint = createSession();
    const adapter = createAliyunOssMultipartAdapter({
      client,
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
      uploadPartOptions: { timeout: 30_000 },
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);
    const chunk: UploadChunkLike = {
      index: 1,
      size: MB,
      part: context.rawFile.slice(MB, 2 * MB),
    };
    const controller = new AbortController();
    const onProgress = vi.fn();

    await expect(
      adapter.uploadPart(uploadContext(context, session, chunk, controller, onProgress)),
    ).resolves.toEqual({ etag: 'etag-2', size: MB });
    expect(uploadPart).toHaveBeenCalledWith(
      checkpoint.objectKey,
      checkpoint.uploadId,
      2,
      context.rawFile,
      MB,
      2 * MB,
      { timeout: 30_000 },
    );
    expect(onProgress).toHaveBeenCalledOnce();
    expect(onProgress).toHaveBeenCalledWith(MB);
  });

  it('does not start a request for a pre-aborted signal', async () => {
    const uploadPart = vi.fn(async () => ({ etag: 'etag-1' }));
    const checkpoint = createSession();
    const adapter = createAliyunOssMultipartAdapter({
      client: createClient({ uploadPart }),
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);
    const controller = new AbortController();
    controller.abort();
    const chunk: UploadChunkLike = {
      index: 0,
      size: MB,
      part: context.rawFile.slice(0, MB),
    };

    await expect(
      adapter.uploadPart(uploadContext(context, session, chunk, controller)),
    ).rejects.toMatchObject({ name: 'AbortError' });
    expect(uploadPart).not.toHaveBeenCalled();
  });

  it('rejects chunks created with a different multipartChunkSize', async () => {
    const uploadPart = vi.fn(async () => ({ etag: 'etag-1' }));
    const checkpoint = createSession();
    const adapter = createAliyunOssMultipartAdapter({
      client: createClient({ uploadPart }),
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);
    const mismatchedChunk: UploadChunkLike = {
      index: 0,
      size: MB / 2,
      part: context.rawFile.slice(0, MB / 2),
    };

    await expect(
      adapter.uploadPart(uploadContext(context, session, mismatchedChunk, new AbortController())),
    ).rejects.toThrow('chunk boundaries do not match');
    expect(uploadPart).not.toHaveBeenCalled();
  });

  it('ignores a late SDK result after logical cancellation', async () => {
    let resolveUpload!: (result: { etag: string }) => void;
    const sdkResult = new Promise<{ etag: string }>(resolve => {
      resolveUpload = resolve;
    });
    const uploadPart = vi.fn(() => sdkResult);
    const checkpoint = createSession();
    const adapter = createAliyunOssMultipartAdapter({
      client: createClient({ uploadPart }),
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);
    const controller = new AbortController();
    const onProgress = vi.fn();
    const chunk: UploadChunkLike = {
      index: 0,
      size: MB,
      part: context.rawFile.slice(0, MB),
    };
    const pending = adapter.uploadPart(
      uploadContext(context, session, chunk, controller, onProgress),
    );
    await vi.waitFor(() => expect(uploadPart).toHaveBeenCalledOnce());

    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' });
    resolveUpload({ etag: 'late-etag' });
    await Promise.resolve();

    expect(onProgress).not.toHaveBeenCalled();
  });

  it('marks a missing upload session as requiring a full restart', async () => {
    const uploadPart = vi.fn().mockRejectedValue(
      Object.assign(new Error('The specified upload does not exist'), {
        code: 'NoSuchUpload',
        status: 404,
      }),
    );
    const checkpoint = createSession();
    const adapter = createAliyunOssMultipartAdapter({
      client: createClient({ uploadPart }),
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);
    const controller = new AbortController();

    await expect(
      adapter.uploadPart(uploadContext(context, session, createFile().chunks[0], controller)),
    ).rejects.toMatchObject({ requiresFullRestart: true, provider: 'Aliyun OSS' });
  });

  it('sorts one-based part numbers and ETags before completion', async () => {
    const completeMultipartUpload = vi.fn(async () => ({
      name: 'uploads/video.bin',
      etag: 'complete-etag',
    }));
    const client = createClient({ completeMultipartUpload });
    const adapter = createAliyunOssMultipartAdapter({
      client,
      objectKey: 'uploads/video.bin',
      multipartChunkSize: 1,
      completeOptions: { timeout: 60_000 },
    });
    const context = initContext();
    const session = createSession();
    const chunks: UploadChunkLike[] = [0, 1, 2].map(index => ({
      index,
      size: index === 2 ? 3 : MB,
      part: new Blob(),
    }));
    const completeContext: MultipartCompleteContext<
      AliyunOssMultipartSession,
      AliyunOssUploadedPart
    > = {
      ...sessionContext(context, session),
      chunks,
      parts: [
        { index: 2, response: { etag: 'etag-3', size: 3 } },
        { index: 0, response: { etag: 'etag-1', size: MB } },
        { index: 1, response: { etag: 'etag-2', size: MB } },
      ],
    };

    await expect(adapter.complete(completeContext)).resolves.toEqual({
      name: 'uploads/video.bin',
      etag: 'complete-etag',
    });
    expect(completeMultipartUpload).toHaveBeenCalledWith(
      session.objectKey,
      session.uploadId,
      [
        { number: 1, etag: 'etag-1' },
        { number: 2, etag: 'etag-2' },
        { number: 3, etag: 'etag-3' },
      ],
      { timeout: 60_000 },
    );
  });

  it('reinitializes NoSuchUpload and persists the replacement UploadId', async () => {
    const checkpoint = createSession();
    const checkpointStore = createMemoryCheckpointStore<AliyunOssMultipartSession>([
      ['aliyun-checkpoint', checkpoint],
    ]);
    const listParts = vi.fn().mockRejectedValue(
      Object.assign(new Error('The specified upload does not exist'), {
        code: 'NoSuchUpload',
        status: 404,
      }),
    );
    const initMultipartUpload = vi.fn(async () => ({
      uploadId: 'upload-reinitialized',
      name: checkpoint.objectKey,
    }));
    const preset = createAliyunOssUploadPreset({
      client: createClient({ listParts, initMultipartUpload }),
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
      checkpointStore,
      checkpointKey: () => 'aliyun-checkpoint',
      fingerprint: () => 'fingerprint',
    });
    const { file, chunks } = createFile();

    await preset.multipart.initUpload(file);
    await expect(preset.multipart.getUploadedChunkIndexes(file, chunks, {})).resolves.toEqual([]);

    expect(listParts).toHaveBeenCalledWith(
      checkpoint.objectKey,
      checkpoint.uploadId,
      { 'max-parts': 1000 },
      undefined,
    );
    expect(initMultipartUpload).toHaveBeenCalledOnce();
    expect(await checkpointStore.get('aliyun-checkpoint')).toMatchObject({
      uploadId: 'upload-reinitialized',
    });
  });
});

describe('createAliyunOssUploadPreset', () => {
  it('stores a provider-only checkpoint keyed by object, chunk size, and fingerprint', async () => {
    const client = Object.assign(createClient(), {
      accessKeyId: 'STS.test-access-key',
      accessKeySecret: 'test-secret',
      stsToken: 'test-security-token',
    });
    const preset = createAliyunOssUploadPreset({
      client,
      objectKey: 'uploads/video.bin',
      multipartChunkSize: 1,
    });
    const { file } = createFile(4);

    await preset.multipart.initUpload(file);

    expect(preset.multipartChunkSize).toBe(1);
    expect(localStorage).toHaveLength(1);
    const storageKey = localStorage.key(0)!;
    expect(storageKey).toContain('aliyun-oss:uploads%2Fvideo.bin:1048576:');
    const serialized = localStorage.getItem(storageKey)!;
    expect(serialized).toContain('upload-new');
    expect(serialized).not.toContain('test-secret');
    expect(serialized).not.toContain('test-security-token');
    expect(serialized).not.toContain('STS.test-access-key');
  });
});
