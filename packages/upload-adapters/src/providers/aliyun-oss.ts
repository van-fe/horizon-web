import {
  MultipartSessionExpiredError,
  createLocalStorageCheckpointStore,
  toHorizonMultipartSetting,
} from '../core';
import type {
  Awaitable,
  CheckpointStore,
  HorizonMultipartSettingLike,
  MultipartBridgeOptions,
  MultipartProviderAdapter,
  MultipartSessionContext,
  MultipartUploadPartContext,
  MultipartUploadedPart,
  UploadData,
  UploadFileLike,
  UploadFingerprintResolver,
} from '../core';

const DEFAULT_CHUNK_SIZE_MB = 5;
const DEFAULT_CONCURRENCY = 3;
const MAX_PARTS_PER_PAGE = 1000;
const MAX_PART_COUNT = 10_000;

export interface AliyunOssResolverContext {
  file: UploadFileLike;
  rawFile: File;
  fingerprint: string;
}

export type AliyunOssOptionResolver<T> = T | ((context: AliyunOssResolverContext) => Awaitable<T>);

export interface AliyunOssInitResult {
  uploadId: string;
  bucket?: string;
  name?: string;
  res?: unknown;
}

export interface AliyunOssUploadPartResult {
  etag: string;
  name?: string;
  res?: unknown;
}

export interface AliyunOssListedPart {
  number?: number;
  partNumber?: number;
  PartNumber?: number;
  etag?: string;
  ETag?: string;
  size?: number;
  Size?: number;
}

export interface AliyunOssListPartsResult {
  /** ali-oss returns a single object when the XML response contains exactly one Part. */
  parts?: AliyunOssListedPart | AliyunOssListedPart[];
  isTruncated?: boolean | string;
  nextPartNumberMarker?: number | string;
  res?: unknown;
}

export interface AliyunOssCompletePart {
  number: number;
  etag: string;
}

export interface AliyunOssClientLike {
  initMultipartUpload(name: string, options?: object): Awaitable<AliyunOssInitResult>;
  listParts(
    name: string,
    uploadId: string,
    query?: object,
    options?: object,
  ): Awaitable<AliyunOssListPartsResult>;
  uploadPart(
    name: string,
    uploadId: string,
    partNumber: number,
    file: File,
    start: number,
    end: number,
    options?: object,
  ): Awaitable<AliyunOssUploadPartResult>;
  completeMultipartUpload(
    name: string,
    uploadId: string,
    parts: AliyunOssCompletePart[],
    options?: object,
  ): Awaitable<unknown>;
  abortMultipartUpload?(name: string, uploadId: string, options?: object): Awaitable<unknown>;
}

export interface AliyunOssMultipartSession {
  provider: 'aliyun-oss';
  version: 1;
  objectKey: string;
  uploadId: string;
  /** Bytes per part. Stored to reject checkpoints with incompatible boundaries. */
  chunkSize: number;
  fingerprint: string;
}

export interface AliyunOssUploadedPart {
  etag: string;
  size: number;
}

export interface AliyunOssMultipartAdapterOptions {
  /** An ali-oss Browser.js client, or a resolver that creates one from short-lived STS credentials. */
  client: AliyunOssOptionResolver<AliyunOssClientLike>;
  /** Defaults to the selected file name. It must remain stable across page reloads. */
  objectKey?: AliyunOssOptionResolver<string>;
  /** Chunk size in MB. Defaults to 5 MB and must match the Horizon Upload prop. */
  multipartChunkSize?: number;
  initOptions?: AliyunOssOptionResolver<UploadData | undefined>;
  listPartsOptions?: AliyunOssOptionResolver<UploadData | undefined>;
  uploadPartOptions?: AliyunOssOptionResolver<UploadData | undefined>;
  completeOptions?: AliyunOssOptionResolver<UploadData | undefined>;
  abortOptions?: AliyunOssOptionResolver<UploadData | undefined>;
}

export interface AliyunOssUploadPresetOptions extends AliyunOssMultipartAdapterOptions {
  checkpointStore?: CheckpointStore<AliyunOssMultipartSession>;
  fingerprint?: UploadFingerprintResolver;
  checkpointKey?: MultipartBridgeOptions<AliyunOssMultipartSession>['checkpointKey'];
  onCheckpointError?: MultipartBridgeOptions<AliyunOssMultipartSession>['onCheckpointError'];
  maxAmountUploadingAtSameTime?: number;
}

export interface AliyunOssUploadPreset {
  multipart: HorizonMultipartSettingLike;
  multipartChunkSize: number;
}

function resolveOption<T>(
  value: AliyunOssOptionResolver<T> | undefined,
  context: AliyunOssResolverContext,
): Promise<T | undefined> {
  if (typeof value === 'function') {
    return Promise.resolve((value as (context: AliyunOssResolverContext) => Awaitable<T>)(context));
  }
  return Promise.resolve(value);
}

function assertChunkSize(value: number) {
  if (!Number.isInteger(value) || value < 1 || value > 1024) {
    throw new RangeError('Aliyun OSS multipartChunkSize must be an integer from 1 to 1024 MB');
  }
  return value * 1024 * 1024;
}

function assertSupportedFile(rawFile: File, chunkSize: number) {
  if (rawFile.size <= 0) {
    throw new RangeError('Aliyun OSS multipart upload does not support empty files');
  }
  if (Math.ceil(rawFile.size / chunkSize) > MAX_PART_COUNT) {
    throw new RangeError('Aliyun OSS multipart upload supports at most 10,000 parts');
  }
}

function isTrue(value: boolean | string | undefined) {
  return value === true || value === 'true';
}

function readErrorCode(error: unknown) {
  if (typeof error !== 'object' || error === null) return undefined;
  const value = error as { code?: unknown; status?: unknown; statusCode?: unknown };
  return {
    code: typeof value.code === 'string' ? value.code : undefined,
    status: Number(value.status ?? value.statusCode),
  };
}

function isMissingUpload(error: unknown) {
  const detail = readErrorCode(error);
  return detail?.code === 'NoSuchUpload' || detail?.status === 404;
}

function createAbortError() {
  if (typeof DOMException !== 'undefined') {
    return new DOMException('The upload request was aborted', 'AbortError');
  }
  const error = new Error('The upload request was aborted');
  error.name = 'AbortError';
  return error;
}

function withLogicalAbort<T>(operation: () => Awaitable<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) return Promise.reject(createAbortError());

  return new Promise<T>((resolve, reject) => {
    let settled = false;
    const onAbort = () => {
      if (settled) return;
      settled = true;
      reject(createAbortError());
    };
    signal.addEventListener('abort', onAbort, { once: true });
    let result: Awaitable<T>;
    try {
      result = operation();
    } catch (error) {
      settled = true;
      signal.removeEventListener('abort', onAbort);
      reject(error);
      return;
    }
    Promise.resolve(result).then(
      value => {
        if (settled) return;
        settled = true;
        signal.removeEventListener('abort', onAbort);
        resolve(value);
      },
      error => {
        if (settled) return;
        settled = true;
        signal.removeEventListener('abort', onAbort);
        reject(error);
      },
    );
  });
}

function normalizeListedPart(part: AliyunOssListedPart) {
  const number = Number(part.number ?? part.partNumber ?? part.PartNumber);
  const etag = part.etag ?? part.ETag;
  const size = Number(part.size ?? part.Size);
  if (!Number.isInteger(number) || number < 1 || typeof etag !== 'string') return undefined;
  if (!Number.isFinite(size) || size < 0) return undefined;
  return { number, etag, size };
}

function assertChunkMatchesSession(context: MultipartUploadPartContext<AliyunOssMultipartSession>) {
  const expectedIndex = context.partNumber - 1;
  const expectedStart = expectedIndex * context.session.chunkSize;
  const expectedSize = Math.min(context.session.chunkSize, context.rawFile.size - expectedStart);

  if (
    expectedIndex < 0 ||
    context.chunk.index !== expectedIndex ||
    expectedSize <= 0 ||
    context.chunk.size !== expectedSize ||
    context.chunk.part.size !== expectedSize
  ) {
    throw new RangeError(
      'The Horizon Upload chunk boundaries do not match the Aliyun OSS multipartChunkSize',
    );
  }
}

function createAliyunOssImplementation(options: AliyunOssMultipartAdapterOptions) {
  const chunkSize = assertChunkSize(options.multipartChunkSize ?? DEFAULT_CHUNK_SIZE_MB);
  const clients = new WeakMap<AliyunOssMultipartSession, AliyunOssClientLike>();
  const resolvedObjectKeys = new WeakMap<File, Promise<string>>();

  const resolverContext = (context: AliyunOssResolverContext): AliyunOssResolverContext => ({
    file: context.file,
    rawFile: context.rawFile,
    fingerprint: context.fingerprint,
  });

  const resolveObjectKey = (context: AliyunOssResolverContext) => {
    const existing = resolvedObjectKeys.get(context.rawFile);
    if (existing) return existing;
    const promise = resolveOption(options.objectKey, resolverContext(context)).then(
      key => key ?? context.rawFile.name,
    );
    resolvedObjectKeys.set(context.rawFile, promise);
    void promise.catch(() => {
      if (resolvedObjectKeys.get(context.rawFile) === promise) {
        resolvedObjectKeys.delete(context.rawFile);
      }
    });
    return promise;
  };

  const resolveClient = async (context: AliyunOssResolverContext) => {
    const client = await resolveOption(options.client, resolverContext(context));
    if (!client) throw new TypeError('An Aliyun OSS Browser.js client is required');
    return client;
  };

  const getClient = async (context: MultipartSessionContext<AliyunOssMultipartSession>) => {
    const existing = clients.get(context.session);
    if (existing) return existing;
    const client = await resolveClient(context);
    clients.set(context.session, client);
    return client;
  };

  const initializeSession = async (context: MultipartSessionContext<AliyunOssMultipartSession>) => {
    const client = await getClient(context);
    const initOptions = await resolveOption(options.initOptions, resolverContext(context));
    const result = await client.initMultipartUpload(context.session.objectKey, initOptions);
    if (!result.uploadId) throw new Error('Aliyun OSS did not return an uploadId');
    context.session.uploadId = result.uploadId;
    return context.session;
  };

  const adapter: MultipartProviderAdapter<
    AliyunOssMultipartSession,
    AliyunOssUploadedPart,
    unknown
  > = {
    id: 'aliyun-oss',

    async init(context) {
      assertSupportedFile(context.rawFile, chunkSize);
      const resolveContext = resolverContext(context);
      const [objectKey, client] = await Promise.all([
        resolveObjectKey(resolveContext),
        resolveClient(resolveContext),
      ]);
      const reusable =
        context.checkpoint?.provider === 'aliyun-oss' &&
        context.checkpoint.version === 1 &&
        context.checkpoint.objectKey === objectKey &&
        context.checkpoint.chunkSize === chunkSize &&
        context.checkpoint.fingerprint === context.fingerprint;
      const session: AliyunOssMultipartSession = reusable
        ? { ...context.checkpoint! }
        : {
            provider: 'aliyun-oss',
            version: 1,
            objectKey,
            uploadId: '',
            chunkSize,
            fingerprint: context.fingerprint,
          };
      clients.set(session, client);
      if (!reusable) await initializeSession({ ...context, session });
      return session;
    },

    async listParts(context) {
      const client = await getClient(context);
      const listOptions = await resolveOption(options.listPartsOptions, resolverContext(context));
      const uploadedParts: MultipartUploadedPart<AliyunOssUploadedPart>[] = [];
      let marker: number | string | undefined;
      let pageCount = 0;

      try {
        do {
          const query: UploadData = { 'max-parts': MAX_PARTS_PER_PAGE };
          if (marker !== undefined) query['part-number-marker'] = marker;
          const result = await client.listParts(
            context.session.objectKey,
            context.session.uploadId,
            query,
            listOptions,
          );
          const rawParts = result.parts
            ? Array.isArray(result.parts)
              ? result.parts
              : [result.parts]
            : [];
          for (const rawPart of rawParts) {
            const part = normalizeListedPart(rawPart);
            if (!part) continue;
            const index = part.number - 1;
            const expectedSize = Math.max(
              0,
              Math.min(
                context.rawFile.size - index * context.session.chunkSize,
                context.session.chunkSize,
              ),
            );
            if (expectedSize <= 0 || part.size !== expectedSize) continue;
            uploadedParts.push({
              index,
              response: { etag: part.etag, size: part.size },
            });
          }

          if (!isTrue(result.isTruncated)) break;
          const nextMarker = result.nextPartNumberMarker;
          if (nextMarker === undefined || nextMarker === marker || ++pageCount >= 10) {
            throw new Error('Aliyun OSS listParts pagination did not advance');
          }
          marker = nextMarker;
        } while (true);
      } catch (error) {
        if (!isMissingUpload(error)) throw error;
        await initializeSession(context);
        return [];
      }

      return uploadedParts;
    },

    async uploadPart(context) {
      assertChunkMatchesSession(context);
      const client = await getClient(context);
      const start = (context.partNumber - 1) * context.session.chunkSize;
      const end = start + context.chunk.size;
      const uploadOptions = await resolveOption(
        options.uploadPartOptions,
        resolverContext(context),
      );
      let result: AliyunOssUploadPartResult;
      try {
        result = await withLogicalAbort(
          () =>
            client.uploadPart(
              context.session.objectKey,
              context.session.uploadId,
              context.partNumber,
              context.rawFile,
              start,
              end,
              uploadOptions,
            ),
          context.signal,
        );
      } catch (error) {
        if (isMissingUpload(error)) {
          throw new MultipartSessionExpiredError('Aliyun OSS', error);
        }
        throw error;
      }
      if (!result.etag)
        throw new Error(`Aliyun OSS returned no ETag for part ${context.partNumber}`);
      context.onProgress(context.chunk.size);
      return { etag: result.etag, size: context.chunk.size };
    },

    async complete(context) {
      const client = await getClient(context);
      const parts = context.parts
        .map(part => {
          if (!part.response?.etag) {
            throw new Error(`Missing Aliyun OSS ETag for multipart chunk ${part.index}`);
          }
          return { number: part.index + 1, etag: part.response.etag };
        })
        .sort((left, right) => left.number - right.number);
      const completeOptions = await resolveOption(
        options.completeOptions,
        resolverContext(context),
      );
      try {
        return await client.completeMultipartUpload(
          context.session.objectKey,
          context.session.uploadId,
          parts,
          completeOptions,
        );
      } catch (error) {
        if (isMissingUpload(error)) {
          throw new MultipartSessionExpiredError('Aliyun OSS', error);
        }
        throw error;
      }
    },

    async abort(context) {
      const client = await getClient(context);
      if (!client.abortMultipartUpload) return;
      const abortOptions = await resolveOption(options.abortOptions, resolverContext(context));
      try {
        await client.abortMultipartUpload(
          context.session.objectKey,
          context.session.uploadId,
          abortOptions,
        );
      } catch (error) {
        if (!isMissingUpload(error)) throw error;
      }
    },
  };

  return { adapter, chunkSize, resolveObjectKey };
}

export function createAliyunOssMultipartAdapter(
  options: AliyunOssMultipartAdapterOptions,
): MultipartProviderAdapter<AliyunOssMultipartSession, AliyunOssUploadedPart, unknown> {
  return createAliyunOssImplementation(options).adapter;
}

export function createAliyunOssUploadPreset(
  options: AliyunOssUploadPresetOptions,
): AliyunOssUploadPreset {
  const implementation = createAliyunOssImplementation(options);
  const checkpointStore =
    options.checkpointStore ?? createLocalStorageCheckpointStore<AliyunOssMultipartSession>();
  const checkpointKey: MultipartBridgeOptions<AliyunOssMultipartSession>['checkpointKey'] =
    options.checkpointKey ??
    (async context => {
      const objectKey = await implementation.resolveObjectKey(context);
      return [
        'aliyun-oss',
        encodeURIComponent(objectKey),
        String(implementation.chunkSize),
        context.fingerprint,
      ].join(':');
    });

  return {
    multipartChunkSize: implementation.chunkSize / (1024 * 1024),
    multipart: toHorizonMultipartSetting(implementation.adapter, {
      checkpointStore,
      checkpointKey,
      fingerprint: options.fingerprint,
      onCheckpointError: options.onCheckpointError,
      maxAmountUploadingAtSameTime: options.maxAmountUploadingAtSameTime ?? DEFAULT_CONCURRENCY,
    }),
  };
}
