import {
  createLocalStorageCheckpointStore,
  MultipartSessionExpiredError,
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
const MAX_CHUNK_SIZE_MB = 5 * 1024;

export interface TencentCosResolverContext {
  file: UploadFileLike;
  rawFile: File;
  fingerprint: string;
}

export type TencentCosOptionResolver<T> =
  | T
  | ((context: TencentCosResolverContext) => Awaitable<T>);

export interface TencentCosObjectParams {
  Bucket: string;
  Region: string;
  Key: string;
  Headers?: Record<string, unknown>;
}

export interface TencentCosMultipartInitParams extends TencentCosObjectParams {}

export interface TencentCosMultipartInitResult {
  UploadId: string;
  statusCode?: number;
  headers?: Record<string, unknown>;
  RequestId?: string;
}

export interface TencentCosMultipartListPartParams extends TencentCosObjectParams {
  UploadId: string;
  MaxParts?: number;
  PartNumberMarker?: string;
}

export interface TencentCosListedPart {
  PartNumber: number | string;
  ETag: string;
  Size: number | string;
  LastModified?: string;
}

export interface TencentCosMultipartListPartResult {
  Part?: TencentCosListedPart | TencentCosListedPart[];
  IsTruncated?: boolean | string;
  NextPartNumberMarker?: number | string;
  statusCode?: number;
  headers?: Record<string, unknown>;
  RequestId?: string;
}

export interface TencentCosMultipartUploadParams extends TencentCosObjectParams {
  UploadId: string;
  PartNumber: number;
  Body: Blob;
  ContentLength?: number;
  onProgress?: (progress: TencentCosProgressInfo) => void;
}

export interface TencentCosProgressInfo {
  loaded: number;
  total: number;
  speed?: number;
  percent?: number;
}

export interface TencentCosMultipartUploadResult {
  ETag: string;
  statusCode?: number;
  headers?: Record<string, unknown>;
  RequestId?: string;
}

export interface TencentCosCompletePart {
  PartNumber: number;
  ETag: string;
}

export interface TencentCosMultipartCompleteParams extends TencentCosObjectParams {
  UploadId: string;
  Parts: TencentCosCompletePart[];
}

export interface TencentCosMultipartCompleteResult {
  ETag?: string;
  Location?: string;
  VersionId?: string;
  statusCode?: number;
  headers?: Record<string, unknown>;
  RequestId?: string;
}

export interface TencentCosMultipartAbortParams extends TencentCosObjectParams {
  UploadId: string;
}

export interface TencentCosMultipartAbortResult {
  statusCode?: number;
  headers?: Record<string, unknown>;
  RequestId?: string;
}

export type TencentCosCallback<T> = (error: unknown, data?: T) => void;

export interface TencentCosClientLike {
  multipartInit(
    params: TencentCosMultipartInitParams,
    callback: TencentCosCallback<TencentCosMultipartInitResult>,
  ): void;
  multipartListPart(
    params: TencentCosMultipartListPartParams,
    callback: TencentCosCallback<TencentCosMultipartListPartResult>,
  ): void;
  multipartUpload(
    params: TencentCosMultipartUploadParams,
    callback: TencentCosCallback<TencentCosMultipartUploadResult>,
  ): void;
  multipartComplete(
    params: TencentCosMultipartCompleteParams,
    callback: TencentCosCallback<TencentCosMultipartCompleteResult>,
  ): void;
  multipartAbort?(
    params: TencentCosMultipartAbortParams,
    callback: TencentCosCallback<TencentCosMultipartAbortResult>,
  ): void;
}

export interface TencentCosMultipartSession {
  provider: 'tencent-cos';
  version: 1;
  bucket: string;
  region: string;
  objectKey: string;
  uploadId: string;
  /** Bytes per part. Stored to reject checkpoints with incompatible boundaries. */
  chunkSize: number;
  fingerprint: string;
}

export interface TencentCosUploadedPart {
  etag: string;
  size: number;
}

export interface TencentCosMultipartAdapterOptions {
  /** A cos-js-sdk-v5 client, or a resolver that creates one from short-lived credentials. */
  client: TencentCosOptionResolver<TencentCosClientLike>;
  /** COS bucket name including the APPID suffix, for example `example-1250000000`. */
  bucket: TencentCosOptionResolver<string>;
  /** COS region, for example `ap-guangzhou`. */
  region: TencentCosOptionResolver<string>;
  /** Defaults to the selected file name. It must remain stable across page reloads. */
  objectKey?: TencentCosOptionResolver<string>;
  /** Chunk size in MB. Defaults to 5 MB. */
  multipartChunkSize?: number;
  initOptions?: TencentCosOptionResolver<UploadData | undefined>;
  listPartsOptions?: TencentCosOptionResolver<UploadData | undefined>;
  uploadPartOptions?: TencentCosOptionResolver<UploadData | undefined>;
  completeOptions?: TencentCosOptionResolver<UploadData | undefined>;
  abortOptions?: TencentCosOptionResolver<UploadData | undefined>;
}

export interface TencentCosUploadPresetOptions extends TencentCosMultipartAdapterOptions {
  checkpointStore?: CheckpointStore<TencentCosMultipartSession>;
  fingerprint?: UploadFingerprintResolver;
  checkpointKey?: MultipartBridgeOptions<TencentCosMultipartSession>['checkpointKey'];
  onCheckpointError?: MultipartBridgeOptions<TencentCosMultipartSession>['onCheckpointError'];
  maxAmountUploadingAtSameTime?: number;
}

export interface TencentCosUploadPreset {
  multipart: HorizonMultipartSettingLike;
  multipartChunkSize: number;
}

interface ResolvedTencentCosLocation {
  bucket: string;
  region: string;
  objectKey: string;
}

function resolveOption<T>(
  value: TencentCosOptionResolver<T> | undefined,
  context: TencentCosResolverContext,
): Promise<T | undefined> {
  if (typeof value === 'function') {
    return Promise.resolve(
      (value as (context: TencentCosResolverContext) => Awaitable<T>)(context),
    );
  }
  return Promise.resolve(value);
}

function assertChunkSize(value: number) {
  if (!Number.isInteger(value) || value < 1 || value > MAX_CHUNK_SIZE_MB) {
    throw new RangeError('Tencent COS multipartChunkSize must be an integer from 1 to 5120 MB');
  }
  return value * 1024 * 1024;
}

function assertSupportedFile(rawFile: File, chunkSize: number) {
  if (rawFile.size <= 0) {
    throw new RangeError('Tencent COS multipart upload does not support empty files');
  }
  if (Math.ceil(rawFile.size / chunkSize) > MAX_PART_COUNT) {
    throw new RangeError('Tencent COS multipart upload supports at most 10,000 parts');
  }
}

function isTrue(value: boolean | string | undefined) {
  return value === true || value === 'true';
}

function readErrorDetail(error: unknown) {
  if (typeof error !== 'object' || error === null) return {};
  const value = error as {
    code?: unknown;
    Code?: unknown;
    error?: unknown;
    status?: unknown;
    statusCode?: unknown;
  };
  const nestedError =
    typeof value.error === 'object' && value.error !== null
      ? (value.error as { Code?: unknown; code?: unknown })
      : undefined;
  const rawCode = value.code ?? value.Code ?? nestedError?.code ?? nestedError?.Code;
  return {
    code: typeof rawCode === 'string' ? rawCode : undefined,
    status: Number(value.status ?? value.statusCode),
  };
}

function isMissingUpload(error: unknown) {
  const detail = readErrorDetail(error);
  return detail.code === 'NoSuchUpload' || (!detail.code && detail.status === 404);
}

function createAbortError() {
  if (typeof DOMException !== 'undefined') {
    return new DOMException('The upload request was aborted', 'AbortError');
  }
  const error = new Error('The upload request was aborted');
  error.name = 'AbortError';
  return error;
}

function callTencentCos<T>(operation: (callback: TencentCosCallback<T>) => void): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let settled = false;
    const callback: TencentCosCallback<T> = (error, data) => {
      if (settled) return;
      settled = true;
      if (error) {
        reject(error);
        return;
      }
      if (data === undefined) {
        reject(new Error('Tencent COS callback returned no data'));
        return;
      }
      resolve(data as T);
    };

    try {
      operation(callback);
    } catch (error) {
      if (settled) return;
      settled = true;
      reject(error);
    }
  });
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

function normalizeListedPart(part: TencentCosListedPart) {
  const partNumber = Number(part.PartNumber);
  const size = Number(part.Size);
  if (!Number.isInteger(partNumber) || partNumber < 1 || partNumber > MAX_PART_COUNT) {
    return undefined;
  }
  if (typeof part.ETag !== 'string' || !Number.isFinite(size) || size < 0) {
    return undefined;
  }
  return { partNumber, etag: part.ETag, size };
}

function assertChunkMatchesSession(
  context: MultipartUploadPartContext<TencentCosMultipartSession>,
) {
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
      'The Horizon Upload chunk boundaries do not match the Tencent COS multipartChunkSize',
    );
  }
}

function createTencentCosImplementation(options: TencentCosMultipartAdapterOptions) {
  const chunkSize = assertChunkSize(options.multipartChunkSize ?? DEFAULT_CHUNK_SIZE_MB);
  const clients = new WeakMap<TencentCosMultipartSession, TencentCosClientLike>();
  const resolvedLocations = new WeakMap<File, Promise<ResolvedTencentCosLocation>>();

  const resolverContext = (context: TencentCosResolverContext): TencentCosResolverContext => ({
    file: context.file,
    rawFile: context.rawFile,
    fingerprint: context.fingerprint,
  });

  const resolveLocation = (context: TencentCosResolverContext) => {
    const existing = resolvedLocations.get(context.rawFile);
    if (existing) return existing;
    const resolveContext = resolverContext(context);
    const promise = Promise.all([
      resolveOption(options.bucket, resolveContext),
      resolveOption(options.region, resolveContext),
      resolveOption(options.objectKey, resolveContext),
    ]).then(([bucket, region, objectKey]) => {
      if (!bucket) throw new TypeError('A Tencent COS bucket is required');
      if (!region) throw new TypeError('A Tencent COS region is required');
      return { bucket, region, objectKey: objectKey ?? context.rawFile.name };
    });
    resolvedLocations.set(context.rawFile, promise);
    void promise.catch(() => {
      if (resolvedLocations.get(context.rawFile) === promise) {
        resolvedLocations.delete(context.rawFile);
      }
    });
    return promise;
  };

  const resolveClient = async (context: TencentCosResolverContext) => {
    const client = await resolveOption(options.client, resolverContext(context));
    if (!client) throw new TypeError('A cos-js-sdk-v5 client is required');
    return client;
  };

  const getClient = async (context: MultipartSessionContext<TencentCosMultipartSession>) => {
    const existing = clients.get(context.session);
    if (existing) return existing;
    const client = await resolveClient(context);
    clients.set(context.session, client);
    return client;
  };

  const initializeSession = async (
    context: MultipartSessionContext<TencentCosMultipartSession>,
  ) => {
    const client = await getClient(context);
    const initOptions = await resolveOption(options.initOptions, resolverContext(context));
    const result = await callTencentCos<TencentCosMultipartInitResult>(callback =>
      client.multipartInit(
        {
          ...initOptions,
          Bucket: context.session.bucket,
          Region: context.session.region,
          Key: context.session.objectKey,
        },
        callback,
      ),
    );
    if (!result?.UploadId) throw new Error('Tencent COS did not return an UploadId');
    context.session.uploadId = result.UploadId;
    return context.session;
  };

  const adapter: MultipartProviderAdapter<
    TencentCosMultipartSession,
    TencentCosUploadedPart,
    TencentCosMultipartCompleteResult
  > = {
    id: 'tencent-cos',

    async init(context) {
      assertSupportedFile(context.rawFile, chunkSize);
      const resolveContext = resolverContext(context);
      const [location, client] = await Promise.all([
        resolveLocation(resolveContext),
        resolveClient(resolveContext),
      ]);
      const reusable =
        context.checkpoint?.provider === 'tencent-cos' &&
        context.checkpoint.version === 1 &&
        context.checkpoint.bucket === location.bucket &&
        context.checkpoint.region === location.region &&
        context.checkpoint.objectKey === location.objectKey &&
        context.checkpoint.chunkSize === chunkSize &&
        context.checkpoint.fingerprint === context.fingerprint;
      const session: TencentCosMultipartSession = reusable
        ? { ...context.checkpoint! }
        : {
            provider: 'tencent-cos',
            version: 1,
            bucket: location.bucket,
            region: location.region,
            objectKey: location.objectKey,
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
      const listPartsOptions = await resolveOption(
        options.listPartsOptions,
        resolverContext(context),
      );
      const uploadedParts = new Map<number, MultipartUploadedPart<TencentCosUploadedPart>>();
      let marker: string | undefined;
      let pageCount = 0;

      try {
        do {
          const result = await callTencentCos<TencentCosMultipartListPartResult>(callback =>
            client.multipartListPart(
              {
                ...listPartsOptions,
                Bucket: context.session.bucket,
                Region: context.session.region,
                Key: context.session.objectKey,
                UploadId: context.session.uploadId,
                MaxParts: MAX_PARTS_PER_PAGE,
                ...(marker === undefined ? {} : { PartNumberMarker: marker }),
              },
              callback,
            ),
          );

          if (!result) throw new Error('Tencent COS listParts returned no data');

          const rawParts = result.Part
            ? Array.isArray(result.Part)
              ? result.Part
              : [result.Part]
            : [];
          for (const rawPart of rawParts) {
            const part = normalizeListedPart(rawPart);
            if (!part) continue;
            const index = part.partNumber - 1;
            const expectedSize = Math.max(
              0,
              Math.min(
                context.rawFile.size - index * context.session.chunkSize,
                context.session.chunkSize,
              ),
            );
            if (expectedSize <= 0 || part.size !== expectedSize) continue;
            uploadedParts.set(index, {
              index,
              response: { etag: part.etag, size: part.size },
            });
          }

          if (!isTrue(result.IsTruncated)) break;
          const nextMarker = result.NextPartNumberMarker;
          if (nextMarker === undefined || String(nextMarker) === marker || ++pageCount >= 10) {
            throw new Error('Tencent COS listParts pagination did not advance');
          }
          marker = String(nextMarker);
        } while (true);
      } catch (error) {
        if (!isMissingUpload(error)) throw error;
        await initializeSession(context);
        return [];
      }

      return [...uploadedParts.values()].sort((left, right) => left.index - right.index);
    },

    async uploadPart(context) {
      assertChunkMatchesSession(context);
      const client = await getClient(context);
      const uploadPartOptions = await resolveOption(
        options.uploadPartOptions,
        resolverContext(context),
      );
      let acceptProgress = true;
      let lastLoaded = 0;
      const reportProgress = (progress: TencentCosProgressInfo) => {
        if (!acceptProgress || context.signal.aborted || !Number.isFinite(progress.loaded)) {
          return;
        }
        const loaded = Math.max(0, Math.min(context.chunk.size, progress.loaded));
        if (loaded < lastLoaded) return;
        lastLoaded = loaded;
        context.onProgress(loaded);
      };
      let result: TencentCosMultipartUploadResult;
      try {
        result = await withLogicalAbort(
          () =>
            callTencentCos<TencentCosMultipartUploadResult>(callback =>
              client.multipartUpload(
                {
                  ...uploadPartOptions,
                  Bucket: context.session.bucket,
                  Region: context.session.region,
                  Key: context.session.objectKey,
                  UploadId: context.session.uploadId,
                  PartNumber: context.partNumber,
                  Body: context.chunk.part,
                  ContentLength: context.chunk.size,
                  onProgress: reportProgress,
                },
                callback,
              ),
            ),
          context.signal,
        );
      } catch (error) {
        if (isMissingUpload(error)) {
          throw new MultipartSessionExpiredError('tencent-cos', error);
        }
        throw error;
      } finally {
        acceptProgress = false;
      }
      if (!result?.ETag) {
        throw new Error(`Tencent COS returned no ETag for part ${context.partNumber}`);
      }
      if (lastLoaded < context.chunk.size && !context.signal.aborted) {
        context.onProgress(context.chunk.size);
      }
      return { etag: result.ETag, size: context.chunk.size };
    },

    async complete(context) {
      const client = await getClient(context);
      const parts = context.parts
        .map(part => {
          if (!part.response?.etag) {
            throw new Error(`Missing Tencent COS ETag for multipart chunk ${part.index}`);
          }
          return { PartNumber: part.index + 1, ETag: part.response.etag };
        })
        .sort((left, right) => left.PartNumber - right.PartNumber);
      const completeOptions = await resolveOption(
        options.completeOptions,
        resolverContext(context),
      );
      try {
        return await callTencentCos<TencentCosMultipartCompleteResult>(callback =>
          client.multipartComplete(
            {
              ...completeOptions,
              Bucket: context.session.bucket,
              Region: context.session.region,
              Key: context.session.objectKey,
              UploadId: context.session.uploadId,
              Parts: parts,
            },
            callback,
          ),
        );
      } catch (error) {
        if (isMissingUpload(error)) {
          throw new MultipartSessionExpiredError('tencent-cos', error);
        }
        throw error;
      }
    },

    async abort(context) {
      const client = await getClient(context);
      if (!client.multipartAbort) return;
      const abortOptions = await resolveOption(options.abortOptions, resolverContext(context));
      try {
        await callTencentCos<TencentCosMultipartAbortResult>(callback =>
          client.multipartAbort!(
            {
              ...abortOptions,
              Bucket: context.session.bucket,
              Region: context.session.region,
              Key: context.session.objectKey,
              UploadId: context.session.uploadId,
            },
            callback,
          ),
        );
      } catch (error) {
        if (!isMissingUpload(error)) throw error;
      }
    },
  };

  return { adapter, chunkSize, resolveLocation };
}

export function createTencentCosMultipartAdapter(
  options: TencentCosMultipartAdapterOptions,
): MultipartProviderAdapter<
  TencentCosMultipartSession,
  TencentCosUploadedPart,
  TencentCosMultipartCompleteResult
> {
  return createTencentCosImplementation(options).adapter;
}

export function createTencentCosUploadPreset(
  options: TencentCosUploadPresetOptions,
): TencentCosUploadPreset {
  const implementation = createTencentCosImplementation(options);
  const checkpointStore =
    options.checkpointStore ?? createLocalStorageCheckpointStore<TencentCosMultipartSession>();
  const checkpointKey: MultipartBridgeOptions<TencentCosMultipartSession>['checkpointKey'] =
    options.checkpointKey ??
    (async context => {
      const location = await implementation.resolveLocation(context);
      return [
        'tencent-cos',
        encodeURIComponent(location.bucket),
        encodeURIComponent(location.region),
        encodeURIComponent(location.objectKey),
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
