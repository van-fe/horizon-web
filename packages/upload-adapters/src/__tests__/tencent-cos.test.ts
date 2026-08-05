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
import { createTencentCosMultipartAdapter, createTencentCosUploadPreset } from '../tencent-cos';
import type {
  TencentCosClientLike,
  TencentCosMultipartSession,
  TencentCosUploadedPart,
} from '../tencent-cos';

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
  overrides: Partial<TencentCosMultipartSession> = {},
): TencentCosMultipartSession {
  return {
    provider: 'tencent-cos',
    version: 1,
    bucket: 'example-1250000000',
    region: 'ap-guangzhou',
    objectKey: 'uploads/video.bin',
    uploadId: 'upload-old',
    chunkSize: MB,
    fingerprint: 'fingerprint',
    ...overrides,
  };
}

function createClient(overrides: Partial<TencentCosClientLike> = {}): TencentCosClientLike {
  return {
    multipartInit: vi.fn((_params, callback) => {
      callback(null, { UploadId: 'upload-new' });
    }),
    multipartListPart: vi.fn((_params, callback) => {
      callback(null, { Part: [], IsTruncated: 'false' });
    }),
    multipartUpload: vi.fn((_params, callback) => {
      callback(null, { ETag: '"etag-new"' });
    }),
    multipartComplete: vi.fn((_params, callback) => {
      callback(null, { ETag: '"complete-etag"' });
    }),
    multipartAbort: vi.fn((_params, callback) => {
      callback(null, {});
    }),
    ...overrides,
  };
}

function initContext(
  checkpoint?: TencentCosMultipartSession,
): MultipartInitContext<TencentCosMultipartSession> {
  const { file, rawFile } = createFile();
  return {
    file,
    rawFile,
    fingerprint: 'fingerprint',
    checkpoint,
  };
}

function sessionContext(
  context: MultipartInitContext<TencentCosMultipartSession>,
  session: TencentCosMultipartSession,
): MultipartSessionContext<TencentCosMultipartSession> {
  return {
    file: context.file,
    rawFile: context.rawFile,
    fingerprint: context.fingerprint,
    session,
  };
}

function uploadContext(
  context: MultipartInitContext<TencentCosMultipartSession>,
  session: TencentCosMultipartSession,
  chunk: UploadChunkLike,
  controller: AbortController,
  onProgress = vi.fn(),
): MultipartUploadPartContext<TencentCosMultipartSession> {
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

describe('createTencentCosMultipartAdapter', () => {
  it('rejects a fractional multipartChunkSize', () => {
    expect(() =>
      createTencentCosMultipartAdapter({
        client: createClient(),
        bucket: 'example-1250000000',
        region: 'ap-guangzhou',
        multipartChunkSize: 1.5,
      }),
    ).toThrow('must be an integer from 1 to 5120 MB');
  });

  it('retries location resolution after a transient rejection', async () => {
    const failure = new Error('temporary bucket failure');
    const bucket = vi
      .fn()
      .mockRejectedValueOnce(failure)
      .mockResolvedValueOnce('example-1250000000');
    const client = createClient();
    const adapter = createTencentCosMultipartAdapter({
      client,
      bucket,
      region: 'ap-guangzhou',
      objectKey: 'uploads/video.bin',
      multipartChunkSize: 1,
    });
    const context = initContext();

    await expect(adapter.init(context)).rejects.toBe(failure);
    await expect(adapter.init(context)).resolves.toMatchObject({
      bucket: 'example-1250000000',
      region: 'ap-guangzhou',
      objectKey: 'uploads/video.bin',
      uploadId: 'upload-new',
    });

    expect(bucket).toHaveBeenCalledTimes(2);
    expect(client.multipartInit).toHaveBeenCalledTimes(1);
  });

  it('reuses a compatible checkpoint without persisting COS credentials', async () => {
    const client = Object.assign(createClient(), {
      SecretId: 'AKID.test-secret-id',
      SecretKey: 'test-secret-key',
      SecurityToken: 'test-security-token',
    });
    const checkpoint = createSession();
    const adapter = createTencentCosMultipartAdapter({
      client,
      bucket: checkpoint.bucket,
      region: checkpoint.region,
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
    });

    const session = await adapter.init(initContext(checkpoint));

    expect(session).toEqual(checkpoint);
    expect(client.multipartInit).not.toHaveBeenCalled();
    expect(JSON.stringify(session)).not.toContain('test-secret-key');
    expect(JSON.stringify(session)).not.toContain('test-security-token');
    expect(JSON.stringify(session)).not.toContain('AKID.test-secret-id');
  });

  it('paginates listParts, validates sizes, deduplicates, and sorts by part number', async () => {
    const pages = [
      {
        Part: [
          { PartNumber: 2, ETag: '"wrong-size"', Size: 7 },
          { PartNumber: 1, ETag: '"etag-1"', Size: MB },
        ],
        IsTruncated: 'true',
        NextPartNumberMarker: 2,
      },
      {
        Part: [
          { PartNumber: 3, ETag: '"etag-3"', Size: 3 },
          { PartNumber: 1, ETag: '"etag-1-new"', Size: MB },
        ],
        IsTruncated: 'false',
      },
    ];
    const multipartListPart = vi.fn((_params, callback) => {
      callback(null, pages.shift());
    });
    const checkpoint = createSession();
    const client = createClient({ multipartListPart });
    const adapter = createTencentCosMultipartAdapter({
      client,
      bucket: checkpoint.bucket,
      region: checkpoint.region,
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
      listPartsOptions: { Headers: { 'x-cos-test': 'list' } },
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);

    await expect(adapter.listParts!(sessionContext(context, session))).resolves.toEqual([
      { index: 0, response: { etag: '"etag-1-new"', size: MB } },
      { index: 2, response: { etag: '"etag-3"', size: 3 } },
    ]);
    expect(multipartListPart).toHaveBeenNthCalledWith(
      1,
      {
        Bucket: checkpoint.bucket,
        Region: checkpoint.region,
        Key: checkpoint.objectKey,
        UploadId: checkpoint.uploadId,
        MaxParts: 1000,
        Headers: { 'x-cos-test': 'list' },
      },
      expect.any(Function),
    );
    expect(multipartListPart).toHaveBeenNthCalledWith(
      2,
      {
        Bucket: checkpoint.bucket,
        Region: checkpoint.region,
        Key: checkpoint.objectKey,
        UploadId: checkpoint.uploadId,
        MaxParts: 1000,
        PartNumberMarker: '2',
        Headers: { 'x-cos-test': 'list' },
      },
      expect.any(Function),
    );
  });

  it('restores a single Part object defensively', async () => {
    const checkpoint = createSession();
    const client = createClient({
      multipartListPart: vi.fn((_params, callback) => {
        callback(null, {
          Part: { PartNumber: '1', ETag: '"etag-1"', Size: String(MB) },
          IsTruncated: false,
        });
      }),
    });
    const adapter = createTencentCosMultipartAdapter({
      client,
      bucket: checkpoint.bucket,
      region: checkpoint.region,
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);

    await expect(adapter.listParts!(sessionContext(context, session))).resolves.toEqual([
      { index: 0, response: { etag: '"etag-1"', size: MB } },
    ]);
  });

  it('uploads the Blob with official COS fields and forwards byte progress', async () => {
    const multipartUpload = vi.fn((params, callback) => {
      params.onProgress?.({ loaded: MB / 2, total: MB, speed: 1, percent: 0.5 });
      params.onProgress?.({ loaded: MB, total: MB, speed: 1, percent: 1 });
      callback(null, { ETag: '"etag-2"' });
    });
    const checkpoint = createSession();
    const adapter = createTencentCosMultipartAdapter({
      client: createClient({ multipartUpload }),
      bucket: checkpoint.bucket,
      region: checkpoint.region,
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
      uploadPartOptions: { Headers: { 'x-cos-traffic-limit': 819_200 } },
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
    ).resolves.toEqual({ etag: '"etag-2"', size: MB });
    expect(multipartUpload).toHaveBeenCalledWith(
      {
        Bucket: checkpoint.bucket,
        Region: checkpoint.region,
        Key: checkpoint.objectKey,
        UploadId: checkpoint.uploadId,
        PartNumber: 2,
        Body: chunk.part,
        ContentLength: MB,
        Headers: { 'x-cos-traffic-limit': 819_200 },
        onProgress: expect.any(Function),
      },
      expect.any(Function),
    );
    expect(onProgress.mock.calls).toEqual([[MB / 2], [MB]]);
  });

  it('does not start multipartUpload for a pre-aborted signal', async () => {
    const multipartUpload = vi.fn((_params, callback) => {
      callback(null, { ETag: '"etag-1"' });
    });
    const checkpoint = createSession();
    const adapter = createTencentCosMultipartAdapter({
      client: createClient({ multipartUpload }),
      bucket: checkpoint.bucket,
      region: checkpoint.region,
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);
    const controller = new AbortController();
    controller.abort();

    await expect(
      adapter.uploadPart(uploadContext(context, session, createFile().chunks[0], controller)),
    ).rejects.toMatchObject({ name: 'AbortError' });
    expect(multipartUpload).not.toHaveBeenCalled();
  });

  it('ignores late SDK progress and callback results after logical cancellation', async () => {
    let sdkParams!: Parameters<TencentCosClientLike['multipartUpload']>[0];
    let sdkCallback!: Parameters<TencentCosClientLike['multipartUpload']>[1];
    const multipartUpload = vi.fn((params, callback) => {
      sdkParams = params;
      sdkCallback = callback;
    });
    const checkpoint = createSession();
    const adapter = createTencentCosMultipartAdapter({
      client: createClient({ multipartUpload }),
      bucket: checkpoint.bucket,
      region: checkpoint.region,
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);
    const chunk: UploadChunkLike = {
      index: 0,
      size: MB,
      part: context.rawFile.slice(0, MB),
    };
    const controller = new AbortController();
    const onProgress = vi.fn();
    const pending = adapter.uploadPart(
      uploadContext(context, session, chunk, controller, onProgress),
    );
    await vi.waitFor(() => expect(multipartUpload).toHaveBeenCalledOnce());

    sdkParams.onProgress?.({ loaded: MB / 2, total: MB });
    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' });
    sdkParams.onProgress?.({ loaded: MB, total: MB });
    sdkCallback(null, { ETag: '"late-etag"' });
    await Promise.resolve();

    expect(onProgress.mock.calls).toEqual([[MB / 2]]);
  });

  it('marks a missing UploadId during multipartUpload as requiring a full restart', async () => {
    const missingUpload = Object.assign(new Error('The upload no longer exists'), {
      code: 'NoSuchUpload',
      statusCode: 404,
    });
    const multipartUpload = vi.fn((_params, callback) => {
      callback(missingUpload);
    });
    const checkpoint = createSession();
    const adapter = createTencentCosMultipartAdapter({
      client: createClient({ multipartUpload }),
      bucket: checkpoint.bucket,
      region: checkpoint.region,
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);
    const chunk: UploadChunkLike = {
      index: 0,
      size: MB,
      part: context.rawFile.slice(0, MB),
    };

    await expect(
      adapter.uploadPart(uploadContext(context, session, chunk, new AbortController())),
    ).rejects.toMatchObject({
      name: 'MultipartSessionExpiredError',
      provider: 'tencent-cos',
      requiresFullRestart: true,
      originalError: missingUpload,
    });
  });

  it('rejects chunks created with a different multipartChunkSize', async () => {
    const multipartUpload = vi.fn((_params, callback) => {
      callback(null, { ETag: '"etag-1"' });
    });
    const checkpoint = createSession();
    const adapter = createTencentCosMultipartAdapter({
      client: createClient({ multipartUpload }),
      bucket: checkpoint.bucket,
      region: checkpoint.region,
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
    expect(multipartUpload).not.toHaveBeenCalled();
  });

  it('sorts one-based PartNumber and ETag pairs before completion', async () => {
    const multipartComplete = vi.fn((_params, callback) => {
      callback(null, {
        ETag: '"complete-etag"',
        Location: 'example.cos.ap-guangzhou.myqcloud.com/uploads/video.bin',
      });
    });
    const client = createClient({ multipartComplete });
    const adapter = createTencentCosMultipartAdapter({
      client,
      bucket: 'example-1250000000',
      region: 'ap-guangzhou',
      objectKey: 'uploads/video.bin',
      multipartChunkSize: 1,
      completeOptions: { Headers: { 'x-cos-pnum-max': 10_000 } },
    });
    const context = initContext();
    const session = createSession();
    const chunks: UploadChunkLike[] = [0, 1, 2].map(index => ({
      index,
      size: index === 2 ? 3 : MB,
      part: new Blob(),
    }));
    const completeContext: MultipartCompleteContext<
      TencentCosMultipartSession,
      TencentCosUploadedPart
    > = {
      ...sessionContext(context, session),
      chunks,
      parts: [
        { index: 2, response: { etag: '"etag-3"', size: 3 } },
        { index: 0, response: { etag: '"etag-1"', size: MB } },
        { index: 1, response: { etag: '"etag-2"', size: MB } },
      ],
    };

    await expect(adapter.complete(completeContext)).resolves.toMatchObject({
      ETag: '"complete-etag"',
    });
    expect(multipartComplete).toHaveBeenCalledWith(
      {
        Bucket: session.bucket,
        Region: session.region,
        Key: session.objectKey,
        UploadId: session.uploadId,
        Parts: [
          { PartNumber: 1, ETag: '"etag-1"' },
          { PartNumber: 2, ETag: '"etag-2"' },
          { PartNumber: 3, ETag: '"etag-3"' },
        ],
        Headers: { 'x-cos-pnum-max': 10_000 },
      },
      expect.any(Function),
    );
  });

  it('marks NoSuchUpload from multipartComplete as requiring a full restart', async () => {
    const missingUpload = Object.assign(new Error('The upload no longer exists'), {
      code: 'NoSuchUpload',
      statusCode: 404,
    });
    const multipartComplete = vi.fn((_params, callback) => {
      callback(missingUpload);
    });
    const checkpoint = createSession();
    const adapter = createTencentCosMultipartAdapter({
      client: createClient({ multipartComplete }),
      bucket: checkpoint.bucket,
      region: checkpoint.region,
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);

    await expect(
      adapter.complete({
        ...sessionContext(context, session),
        chunks: [createFile().chunks[0]],
        parts: [{ index: 0, response: { etag: '"etag-1"', size: MB } }],
      }),
    ).rejects.toMatchObject({
      name: 'MultipartSessionExpiredError',
      provider: 'tencent-cos',
      requiresFullRestart: true,
      originalError: missingUpload,
    });
  });

  it('ignores NoSuchUpload while aborting an already removed session', async () => {
    const missingUpload = Object.assign(new Error('The specified upload does not exist'), {
      code: 'NoSuchUpload',
      statusCode: 404,
    });
    const multipartAbort = vi.fn((_params, callback) => {
      callback(missingUpload);
    });
    const checkpoint = createSession();
    const adapter = createTencentCosMultipartAdapter({
      client: createClient({ multipartAbort }),
      bucket: checkpoint.bucket,
      region: checkpoint.region,
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
      abortOptions: { Headers: { 'x-cos-test': 'abort' } },
    });
    const context = initContext(checkpoint);
    const session = await adapter.init(context);

    await expect(adapter.abort!(sessionContext(context, session))).resolves.toBeUndefined();
    expect(multipartAbort).toHaveBeenCalledWith(
      {
        Bucket: session.bucket,
        Region: session.region,
        Key: session.objectKey,
        UploadId: session.uploadId,
        Headers: { 'x-cos-test': 'abort' },
      },
      expect.any(Function),
    );
  });

  it('rejects a new session when COS omits UploadId', async () => {
    const multipartInit = vi.fn((_params, callback) => {
      callback(null, { UploadId: '' });
    });
    const adapter = createTencentCosMultipartAdapter({
      client: createClient({ multipartInit }),
      bucket: 'example-1250000000',
      region: 'ap-guangzhou',
      multipartChunkSize: 1,
    });

    await expect(adapter.init(initContext())).rejects.toThrow(
      'Tencent COS did not return an UploadId',
    );
  });

  it('rejects a successful callback that omits its result data', async () => {
    const multipartInit = vi.fn((_params, callback) => {
      callback(null);
    });
    const adapter = createTencentCosMultipartAdapter({
      client: createClient({ multipartInit }),
      bucket: 'example-1250000000',
      region: 'ap-guangzhou',
      multipartChunkSize: 1,
    });

    await expect(adapter.init(initContext())).rejects.toThrow(
      'Tencent COS callback returned no data',
    );
  });

  it('propagates callback errors from multipartInit', async () => {
    const requestError = Object.assign(new Error('temporary credentials expired'), {
      code: 'ExpiredToken',
      statusCode: 403,
    });
    const multipartInit = vi.fn((_params, callback) => {
      callback(requestError);
    });
    const adapter = createTencentCosMultipartAdapter({
      client: createClient({ multipartInit }),
      bucket: 'example-1250000000',
      region: 'ap-guangzhou',
      multipartChunkSize: 1,
    });

    await expect(adapter.init(initContext())).rejects.toBe(requestError);
  });
});

describe('createTencentCosUploadPreset', () => {
  it('reinitializes NoSuchUpload and persists the replacement UploadId', async () => {
    const checkpoint = createSession();
    const checkpointStore = createMemoryCheckpointStore<TencentCosMultipartSession>([
      ['tencent-checkpoint', checkpoint],
    ]);
    const missingUpload = Object.assign(new Error('The specified upload does not exist'), {
      error: { Code: 'NoSuchUpload' },
      statusCode: 404,
    });
    const multipartListPart = vi.fn((_params, callback) => {
      callback(missingUpload);
    });
    const multipartInit = vi.fn((_params, callback) => {
      callback(null, { UploadId: 'upload-reinitialized' });
    });
    const preset = createTencentCosUploadPreset({
      client: createClient({ multipartListPart, multipartInit }),
      bucket: checkpoint.bucket,
      region: checkpoint.region,
      objectKey: checkpoint.objectKey,
      multipartChunkSize: 1,
      checkpointStore,
      checkpointKey: () => 'tencent-checkpoint',
      fingerprint: () => 'fingerprint',
    });
    const { file, chunks } = createFile();

    await preset.multipart.initUpload(file);
    await expect(preset.multipart.getUploadedChunkIndexes(file, chunks, {})).resolves.toEqual([]);

    expect(multipartListPart).toHaveBeenCalledWith(
      {
        Bucket: checkpoint.bucket,
        Region: checkpoint.region,
        Key: checkpoint.objectKey,
        UploadId: checkpoint.uploadId,
        MaxParts: 1000,
      },
      expect.any(Function),
    );
    expect(multipartInit).toHaveBeenCalledOnce();
    expect(await checkpointStore.get('tencent-checkpoint')).toMatchObject({
      uploadId: 'upload-reinitialized',
    });
  });

  it('stores a provider-only checkpoint keyed by location without credentials', async () => {
    const client = Object.assign(createClient(), {
      SecretId: 'AKID.test-secret-id',
      SecretKey: 'test-secret-key',
      SecurityToken: 'test-security-token',
    });
    const preset = createTencentCosUploadPreset({
      client,
      bucket: 'example-1250000000',
      region: 'ap-guangzhou',
      objectKey: 'uploads/video.bin',
      multipartChunkSize: 1,
    });
    const { file } = createFile(4);

    await preset.multipart.initUpload(file);

    expect(preset.multipartChunkSize).toBe(1);
    expect(localStorage).toHaveLength(1);
    const storageKey = localStorage.key(0)!;
    expect(storageKey).toContain(
      'tencent-cos:example-1250000000:ap-guangzhou:uploads%2Fvideo.bin:1048576:',
    );
    const serialized = localStorage.getItem(storageKey)!;
    expect(serialized).toContain('upload-new');
    expect(serialized).not.toContain('test-secret-key');
    expect(serialized).not.toContain('test-security-token');
    expect(serialized).not.toContain('AKID.test-secret-id');
  });
});
