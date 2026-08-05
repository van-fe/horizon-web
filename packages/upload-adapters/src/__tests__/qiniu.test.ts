import { afterEach, describe, expect, it, vi } from 'vitest';
import type {
  MultipartCompleteContext,
  MultipartInitContext,
  MultipartSessionContext,
  MultipartUploadPartContext,
  UploadChunkLike,
  UploadFileLike,
} from '../core';
import {
  QiniuMultipartSessionExpiredError,
  createQiniuMultipartAdapter,
  createQiniuUploadPreset,
  createQiniuXhrTransport,
} from '../qiniu';
import type {
  QiniuHttpRequest,
  QiniuHttpResponse,
  QiniuHttpTransport,
  QiniuMultipartSession,
  QiniuUploadedPart,
} from '../qiniu';

const MB = 1024 * 1024;
const UPLOAD_HOST = 'https://upload.qiniup.com';

function createToken(scope = 'demo:video.bin', suffix = 'token', isPrefixalScope = 0) {
  const policy = btoa(JSON.stringify({ scope, deadline: 4_102_444_800, isPrefixalScope }))
    .replace(/\//g, '_')
    .replace(/\+/g, '-');
  return `test-ak:${suffix}:${policy}`;
}

function createVirtualInitContext(
  size: number,
  fingerprint = 'fingerprint',
): MultipartInitContext<QiniuMultipartSession> {
  const rawFile = new File([], 'video.bin', {
    lastModified: 1_700_000_000_000,
    type: 'video/mp4',
  });
  Object.defineProperty(rawFile, 'size', { value: size });
  return {
    file: { name: rawFile.name, raw: rawFile, size, uuid: fingerprint },
    rawFile,
    fingerprint,
  };
}

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
  return { file, rawFile };
}

function createSession(overrides: Partial<QiniuMultipartSession> = {}): QiniuMultipartSession {
  return {
    provider: 'qiniu',
    version: 1,
    bucket: 'demo',
    key: 'video.bin',
    uploadHost: UPLOAD_HOST,
    uploadId: 'upload-old',
    expireAt: Math.floor(Date.now() / 1000) + 3600,
    chunkSize: MB,
    fingerprint: 'fingerprint',
    ...overrides,
  };
}

function createTransport(
  handler: (request: QiniuHttpRequest) => QiniuHttpResponse | Promise<QiniuHttpResponse>,
) {
  const requests: QiniuHttpRequest[] = [];
  const transport: QiniuHttpTransport = async <T>(request: QiniuHttpRequest) => {
    requests.push(request);
    return (await handler(request)) as QiniuHttpResponse<T>;
  };
  return { requests, transport };
}

function initContext(session?: QiniuMultipartSession): MultipartInitContext<QiniuMultipartSession> {
  const { file, rawFile } = createFile();
  return {
    file,
    rawFile,
    fingerprint: 'fingerprint',
    checkpoint: session,
  };
}

function sessionContext(
  session: QiniuMultipartSession,
): MultipartSessionContext<QiniuMultipartSession> {
  const context = initContext();
  return {
    file: context.file,
    rawFile: context.rawFile,
    fingerprint: context.fingerprint,
    session,
  };
}

afterEach(() => {
  localStorage.clear();
  vi.unstubAllGlobals();
});

describe('createQiniuMultipartAdapter', () => {
  it('initializes Multipart v2 without placing the upload token in the checkpoint', async () => {
    const token = createToken();
    const { requests, transport } = createTransport(() => ({
      status: 200,
      data: { uploadId: 'upload-new', expireAt: 4_102_444_800 },
    }));
    const adapter = createQiniuMultipartAdapter({
      tokenProvider: () => token,
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });

    const session = await adapter.init(initContext());

    expect(session).toMatchObject({
      bucket: 'demo',
      key: 'video.bin',
      uploadId: 'upload-new',
      chunkSize: MB,
    });
    expect(JSON.stringify(session)).not.toContain(token);
    expect(requests).toHaveLength(1);
    expect(requests[0]).toMatchObject({
      method: 'POST',
      url: `${UPLOAD_HOST}/buckets/demo/objects/dmlkZW8uYmlu/uploads`,
      headers: { Authorization: `UpToken ${token}` },
    });
  });

  it.each([
    { data: { expireAt: 4_102_444_800 }, field: 'uploadId' },
    { data: { uploadId: 'upload-invalid' }, field: 'expireAt' },
    { data: { uploadId: 'upload-invalid', expireAt: Number.NaN }, field: 'expireAt' },
  ])(
    'rejects an invalid Multipart v2 initialization response for $field',
    async ({ data, field }) => {
      const { transport } = createTransport(() => ({ status: 200, data }));
      const adapter = createQiniuMultipartAdapter({
        tokenProvider: () => createToken(),
        uploadHost: UPLOAD_HOST,
        multipartChunkSize: 1,
        transport,
      });

      await expect(adapter.init(initContext())).rejects.toThrow(`valid ${field}`);
    },
  );

  it('accepts 10,000 parts and rejects empty or 10,001-part files before requesting a token', async () => {
    const tokenProvider = vi.fn(() => createToken());
    const { transport } = createTransport(() => ({
      status: 200,
      data: { uploadId: 'upload-boundary', expireAt: 4_102_444_800 },
    }));
    const adapter = createQiniuMultipartAdapter({
      tokenProvider,
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });

    await expect(adapter.init(createVirtualInitContext(10_000 * MB))).resolves.toMatchObject({
      uploadId: 'upload-boundary',
    });
    await expect(adapter.init(createVirtualInitContext(0, 'empty'))).rejects.toThrow(
      'requires a non-empty file',
    );
    await expect(
      adapter.init(createVirtualInitContext(10_000 * MB + 1, 'too-many')),
    ).rejects.toThrow('at most 10000 parts');
    expect(tokenProvider).toHaveBeenCalledTimes(1);
  });

  it('keeps credentials isolated for concurrent files with the same fingerprint', async () => {
    const { transport } = createTransport(request => ({
      status: 200,
      data: {
        uploadId: request.url.includes('ZmlsZS1hLmJpbg') ? 'upload-a' : 'upload-b',
        expireAt: 4_102_444_800,
      },
    }));
    const adapter = createQiniuMultipartAdapter({
      key: ({ file }) => `${file.uuid}.bin`,
      tokenProvider: ({ key }) => createToken(`demo:${key}`),
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });
    const first = createVirtualInitContext(4);
    const second = createVirtualInitContext(4);
    first.file.uuid = 'file-a';
    second.file.uuid = 'file-b';

    const [firstSession, secondSession] = await Promise.all([
      adapter.init(first),
      adapter.init(second),
    ]);

    expect(firstSession.key).toBe('file-a.bin');
    expect(secondSession.key).toBe('file-b.bin');
  });

  it('validates exact and prefix upload-token scopes against the final object key', async () => {
    const { transport } = createTransport(() => ({
      status: 200,
      data: { uploadId: 'upload-prefix', expireAt: 4_102_444_800 },
    }));
    const prefixAdapter = createQiniuMultipartAdapter({
      key: 'videos/video.bin',
      tokenProvider: () => createToken('demo:videos/', 'prefix', 1),
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });
    const wrongExactAdapter = createQiniuMultipartAdapter({
      key: 'other.bin',
      tokenProvider: () => createToken('demo:video.bin'),
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });

    await expect(prefixAdapter.init(initContext())).resolves.toMatchObject({
      key: 'videos/video.bin',
    });
    await expect(wrongExactAdapter.init(initContext())).rejects.toThrow(
      'scoped to a different object key',
    );
  });

  it('discovers an upload host through the stable JavaScript SDK v2 query shape', async () => {
    const { requests, transport } = createTransport(request => {
      if (request.method === 'GET') {
        return {
          status: 200,
          data: {
            up: {
              acc: { main: ['up-z0.qiniup.com'], backup: [] },
            },
          },
        };
      }
      return {
        status: 200,
        data: { uploadId: 'upload-discovered', expireAt: 4_102_444_800 },
      };
    });
    const adapter = createQiniuMultipartAdapter({
      tokenProvider: () => createToken(),
      multipartChunkSize: 1,
      transport,
    });

    const session = await adapter.init(initContext());

    expect(requests[0].url).toBe('https://api.qiniu.com/v2/query?ak=test-ak&bucket=demo');
    expect(requests[1].url.startsWith('https://up-z0.qiniup.com/')).toBe(true);
    expect(session.uploadHost).toBe('https://up-z0.qiniup.com');
  });

  it('supports the v4 host-query path and hosts response shape', async () => {
    const { requests, transport } = createTransport(request => {
      if (request.method === 'GET') {
        return {
          status: 200,
          data: { hosts: [{ up: { domains: ['up-v4.qiniup.com'] } }] },
        };
      }
      return {
        status: 200,
        data: { uploadId: 'upload-v4', expireAt: 4_102_444_800 },
      };
    });
    const adapter = createQiniuMultipartAdapter({
      tokenProvider: () => createToken(),
      uploadHostQueryPath: '/v4/query',
      multipartChunkSize: 1,
      transport,
    });

    const session = await adapter.init(initContext());

    expect(requests[0].url).toBe('https://api.qiniu.com/v4/query?ak=test-ak&bucket=demo');
    expect(session.uploadHost).toBe('https://up-v4.qiniup.com');
  });

  it('paginates listParts and restores only parts whose server size matches', async () => {
    const checkpoint = createSession();
    const { requests, transport } = createTransport(request => {
      if (request.url.includes('part-number-marker=2')) {
        return {
          status: 200,
          data: {
            uploadId: checkpoint.uploadId,
            expireAt: checkpoint.expireAt,
            partNumberMarker: 0,
            parts: [{ partNumber: 3, etag: 'etag-3', size: 3, putTime: 30 }],
          },
        };
      }
      return {
        status: 200,
        data: {
          uploadId: checkpoint.uploadId,
          expireAt: checkpoint.expireAt,
          partNumberMarker: 2,
          parts: [
            { partNumber: 1, etag: 'etag-1', size: MB, putTime: 10 },
            { partNumber: 2, etag: 'wrong-size', size: 7, putTime: 20 },
          ],
        },
      };
    });
    const adapter = createQiniuMultipartAdapter({
      tokenProvider: () => createToken(),
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });
    const session = await adapter.init(initContext(checkpoint));

    const parts = await adapter.listParts!(sessionContext(session));

    expect(parts).toEqual([
      {
        index: 0,
        response: { etag: 'etag-1', size: MB, putTime: 10 },
      },
      {
        index: 2,
        response: { etag: 'etag-3', size: 3, putTime: 30 },
      },
    ]);
    expect(requests).toHaveLength(2);
    expect(requests[0].url).toContain('max-parts=1000');
    expect(requests[1].url).toContain('part-number-marker=2');
  });

  it('reinitializes an expired checkpoint when listParts returns 612', async () => {
    const checkpoint = createSession();
    const { requests, transport } = createTransport(request => {
      if (request.method === 'GET') {
        return { status: 612, data: { error: 'no such uploadId' } };
      }
      return {
        status: 200,
        data: { uploadId: 'upload-reinitialized', expireAt: 4_102_444_800 },
      };
    });
    const adapter = createQiniuMultipartAdapter({
      tokenProvider: () => createToken(),
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });
    const session = await adapter.init(initContext(checkpoint));

    await expect(adapter.listParts!(sessionContext(session))).resolves.toEqual([]);
    expect(session.uploadId).toBe('upload-reinitialized');
    expect(requests.map(request => request.method)).toEqual(['GET', 'POST']);
  });

  it('surfaces a 612 during part upload as a full-session restart error', async () => {
    const { transport } = createTransport(() => ({
      status: 612,
      data: { error: 'no such uploadId' },
    }));
    const adapter = createQiniuMultipartAdapter({
      tokenProvider: () => createToken(),
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });
    const session = createSession();
    const controller = new AbortController();
    const context = sessionContext(session);

    const promise = adapter.uploadPart({
      ...context,
      chunk: { index: 0, size: MB, part: context.rawFile.slice(0, MB) },
      partNumber: 1,
      signal: controller.signal,
      onProgress: () => undefined,
      request: {
        action: '',
        method: 'PUT',
        headers: {},
        data: {},
        withCredentials: false,
        signal: controller.signal,
        onProgress: () => undefined,
      },
    });

    await expect(promise).rejects.toMatchObject({
      name: 'QiniuMultipartSessionExpiredError',
      requiresFullRestart: true,
      status: 612,
    });
    await expect(promise).rejects.toBeInstanceOf(QiniuMultipartSessionExpiredError);
    expect(session.uploadId).toBe('upload-old');
  });

  it('uploads a one-based part with AbortSignal and byte progress', async () => {
    const progress: number[] = [];
    const controller = new AbortController();
    const { requests, transport } = createTransport(request => {
      if (request.method === 'POST') {
        return {
          status: 200,
          data: { uploadId: 'upload-new', expireAt: 4_102_444_800 },
        };
      }
      request.onProgress?.(2);
      return { status: 200, data: { etag: 'etag-1', md5: 'part-md5' } };
    });
    const adapter = createQiniuMultipartAdapter({
      tokenProvider: () => createToken(),
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });
    const context = initContext();
    const session = await adapter.init(context);
    requests.length = 0;
    const uploadSessionContext = sessionContext(session);
    const chunk: UploadChunkLike = {
      index: 0,
      size: MB,
      part: uploadSessionContext.rawFile.slice(0, MB),
    };
    const uploadContext: MultipartUploadPartContext<QiniuMultipartSession> = {
      ...uploadSessionContext,
      chunk,
      partNumber: 1,
      signal: controller.signal,
      onProgress: loaded => progress.push(loaded),
      request: {
        action: '',
        method: 'PUT',
        headers: {},
        data: {},
        withCredentials: false,
        signal: controller.signal,
        onProgress: loaded => progress.push(loaded),
      },
    };

    await expect(adapter.uploadPart(uploadContext)).resolves.toEqual({
      etag: 'etag-1',
      md5: 'part-md5',
      size: MB,
    });
    expect(requests[0]).toMatchObject({
      method: 'PUT',
      signal: controller.signal,
      body: chunk.part,
    });
    expect(requests[0].url.endsWith('/upload-new/1')).toBe(true);
    expect(progress).toEqual([2, MB]);
  });

  it('fails a part without an ETag so the same chunk can be retried', async () => {
    let attempt = 0;
    const { requests, transport } = createTransport(() => ({
      status: 200,
      data: ++attempt === 1 ? { md5: 'missing-etag' } : { etag: 'etag-retried' },
    }));
    const adapter = createQiniuMultipartAdapter({
      tokenProvider: () => createToken(),
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });
    const session = createSession();
    const controller = new AbortController();
    const context = sessionContext(session);
    const uploadContext: MultipartUploadPartContext<QiniuMultipartSession> = {
      ...context,
      chunk: { index: 0, size: MB, part: context.rawFile.slice(0, MB) },
      partNumber: 1,
      signal: controller.signal,
      onProgress: () => undefined,
      request: {
        action: '',
        method: 'PUT',
        headers: {},
        data: {},
        withCredentials: false,
        signal: controller.signal,
        onProgress: () => undefined,
      },
    };

    await expect(adapter.uploadPart(uploadContext)).rejects.toThrow(
      'Qiniu returned no ETag for part 1',
    );
    await expect(adapter.uploadPart(uploadContext)).resolves.toEqual({
      etag: 'etag-retried',
      md5: undefined,
      size: MB,
    });
    expect(requests).toHaveLength(2);
  });

  it('rejects chunks created with a different multipartChunkSize', async () => {
    const { transport } = createTransport(request =>
      request.method === 'POST'
        ? {
            status: 200,
            data: { uploadId: 'upload-new', expireAt: 4_102_444_800 },
          }
        : { status: 200, data: { etag: 'etag-1' } },
    );
    const adapter = createQiniuMultipartAdapter({
      tokenProvider: () => createToken(),
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });
    const context = initContext();
    const session = await adapter.init(context);
    const controller = new AbortController();
    const mismatchedChunk: UploadChunkLike = {
      index: 0,
      size: MB / 2,
      part: context.rawFile.slice(0, MB / 2),
    };

    await expect(
      adapter.uploadPart({
        ...sessionContext(session),
        chunk: mismatchedChunk,
        partNumber: 1,
        signal: controller.signal,
        onProgress: () => undefined,
        request: {
          action: '',
          method: 'PUT',
          headers: {},
          data: {},
          withCredentials: false,
          signal: controller.signal,
          onProgress: () => undefined,
        },
      }),
    ).rejects.toThrow('chunk boundaries do not match');
  });

  it('overrides a checkpoint uploadHost with the currently trusted configuration', async () => {
    const checkpoint = createSession({ uploadHost: 'https://attacker.invalid' });
    const { requests, transport } = createTransport(() => ({
      status: 200,
      data: {
        uploadId: checkpoint.uploadId,
        expireAt: checkpoint.expireAt,
        partNumberMarker: 0,
        parts: [],
      },
    }));
    const adapter = createQiniuMultipartAdapter({
      tokenProvider: () => createToken(),
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });
    const session = await adapter.init(initContext(checkpoint));

    expect(session.uploadHost).toBe(UPLOAD_HOST);
    await adapter.listParts!(sessionContext(session));
    expect(requests[0].url.startsWith(UPLOAD_HOST)).toBe(true);
    expect(requests[0].url).not.toContain('attacker.invalid');
  });

  it('sorts ETags by one-based partNumber before complete', async () => {
    const { requests, transport } = createTransport(() => ({
      status: 200,
      data: { key: 'video.bin', hash: 'file-hash' },
    }));
    const adapter = createQiniuMultipartAdapter({
      tokenProvider: () => createToken(),
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });
    const session = createSession();
    const chunks: UploadChunkLike[] = [0, 1, 2].map(index => ({
      index,
      size: index === 2 ? 3 : MB,
      part: new Blob(),
    }));
    const completeContext: MultipartCompleteContext<QiniuMultipartSession, QiniuUploadedPart> = {
      ...sessionContext(session),
      chunks,
      parts: [
        { index: 2, response: { etag: 'etag-3', size: 3 } },
        { index: 0, response: { etag: 'etag-1', size: MB } },
        { index: 1, response: { etag: 'etag-2', size: MB } },
      ],
    };

    await expect(adapter.complete(completeContext)).resolves.toEqual({
      key: 'video.bin',
      hash: 'file-hash',
    });
    const body = JSON.parse(String(requests[0].body)) as {
      parts: Array<{ partNumber: number; etag: string }>;
      fname: string;
      mimeType: string;
    };
    expect(body).toEqual({
      parts: [
        { partNumber: 1, etag: 'etag-1' },
        { partNumber: 2, etag: 'etag-2' },
        { partNumber: 3, etag: 'etag-3' },
      ],
      fname: 'video.bin',
      mimeType: 'video/mp4',
    });
  });

  it('single-flights a 401 token refresh across concurrent parts without replacing the UploadId', async () => {
    const firstToken = createToken('demo:video.bin', 'old');
    const secondToken = createToken('demo:video.bin', 'new');
    const tokenProvider = vi
      .fn()
      .mockResolvedValueOnce(firstToken)
      .mockResolvedValueOnce(secondToken);
    const { requests, transport } = createTransport(request => {
      if (request.headers?.Authorization === `UpToken ${firstToken}`) {
        return { status: 401, data: { error: 'token expired' } };
      }
      return { status: 200, data: { etag: 'etag-1', md5: 'md5' } };
    });
    const adapter = createQiniuMultipartAdapter({
      tokenProvider,
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });
    const session = createSession();
    const controller = new AbortController();
    const createUploadContext = (
      index: number,
    ): MultipartUploadPartContext<QiniuMultipartSession> => {
      const context = sessionContext(session);
      return {
        ...context,
        chunk: {
          index,
          size: MB,
          part: context.rawFile.slice(index * MB, (index + 1) * MB),
        },
        partNumber: index + 1,
        signal: controller.signal,
        onProgress: () => undefined,
        request: {
          action: '',
          method: 'PUT',
          headers: {},
          data: {},
          withCredentials: false,
          signal: controller.signal,
          onProgress: () => undefined,
        },
      };
    };

    await Promise.all([
      adapter.uploadPart(createUploadContext(0)),
      adapter.uploadPart(createUploadContext(1)),
    ]);

    expect(tokenProvider).toHaveBeenCalledTimes(2);
    expect(
      requests.filter(request => request.headers?.Authorization === `UpToken ${firstToken}`),
    ).toHaveLength(2);
    expect(
      requests.filter(request => request.headers?.Authorization === `UpToken ${secondToken}`),
    ).toHaveLength(2);
    expect(requests.every(request => request.url.includes('/upload-old/'))).toBe(true);
  });
});

describe('createQiniuUploadPreset', () => {
  it('uses a localStorage checkpoint keyed by bucket, key, chunk size, and fingerprint', async () => {
    const token = createToken();
    const { transport } = createTransport(() => ({
      status: 200,
      data: { uploadId: 'upload-preset', expireAt: 4_102_444_800 },
    }));
    const preset = createQiniuUploadPreset({
      tokenProvider: () => token,
      uploadHost: UPLOAD_HOST,
      multipartChunkSize: 1,
      transport,
    });
    const { file } = createFile(4);

    await preset.multipart.initUpload(file);

    expect(preset.multipartChunkSize).toBe(1);
    expect(localStorage).toHaveLength(1);
    const storageKey = localStorage.key(0)!;
    expect(storageKey).toContain('qiniu:demo:video.bin:1048576:');
    const serialized = localStorage.getItem(storageKey)!;
    expect(serialized).toContain('upload-preset');
    expect(serialized).not.toContain(token);
  });
});

describe('createQiniuXhrTransport', () => {
  it('aborts the XHR when the supplied AbortSignal is canceled', async () => {
    class FakeXMLHttpRequest extends EventTarget {
      static current: FakeXMLHttpRequest;
      readonly upload = new EventTarget();
      status = 0;
      responseText = '';
      aborted = false;

      constructor() {
        super();
        FakeXMLHttpRequest.current = this;
      }

      open() {}
      setRequestHeader() {}
      getResponseHeader() {
        return null;
      }
      send() {}
      abort() {
        this.aborted = true;
        this.dispatchEvent(new Event('abort'));
      }
    }
    vi.stubGlobal('XMLHttpRequest', FakeXMLHttpRequest);
    const controller = new AbortController();
    const promise = createQiniuXhrTransport()({
      method: 'PUT',
      url: 'https://upload.example.test/part/1',
      body: new Blob(['part']),
      signal: controller.signal,
    });

    controller.abort();

    await expect(promise).rejects.toMatchObject({ name: 'AbortError' });
    expect(FakeXMLHttpRequest.current.aborted).toBe(true);
  });
});
