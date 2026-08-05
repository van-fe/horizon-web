import { createLocalStorageCheckpointStore, toHorizonMultipartSetting } from '../core';
import type {
  Awaitable,
  CheckpointStore,
  HorizonMultipartSettingLike,
  MultipartBridgeOptions,
  MultipartInitContext,
  MultipartProviderAdapter,
  MultipartSessionContext,
  MultipartUploadPartContext,
  MultipartUploadedPart,
  UploadData,
  UploadFileLike,
  UploadFingerprintResolver,
} from '../core';

const DEFAULT_API_SERVER_URL = 'https://api.qiniu.com';
const DEFAULT_CHUNK_SIZE = 4;
const DEFAULT_CONCURRENCY = 3;
const DEFAULT_EXPIRY_SKEW_SECONDS = 60;
const DEFAULT_UPLOAD_HOST_QUERY_PATH = '/v2/query';
const MAX_PART_COUNT = 10_000;
const MAX_PARTS_PER_PAGE = 1000;

export interface QiniuTokenProviderContext {
  file: UploadFileLike;
  rawFile: File;
  fingerprint: string;
  /** Object key requested by the adapter. */
  key: string | null;
}

export interface QiniuUploadCredentials {
  /** Short-lived upload token issued by the application server. */
  token: string;
  bucket?: string;
  key?: string | null;
  uploadHost?: string;
}

export type QiniuTokenProvider = (
  context: QiniuTokenProviderContext,
) => Awaitable<string | QiniuUploadCredentials>;

export interface QiniuResolverContext {
  file: UploadFileLike;
  rawFile: File;
  fingerprint: string;
}

export type QiniuOptionResolver<T> = T | ((context: QiniuResolverContext) => Awaitable<T>);

export interface QiniuHttpRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: Document | XMLHttpRequestBodyInit | null;
  signal?: AbortSignal;
  /** Reports uploaded bytes for the request body. */
  onProgress?: (loaded: number) => void;
}

export interface QiniuHttpResponse<T = unknown> {
  status: number;
  data: T;
  headers?: Record<string, string>;
}

export type QiniuHttpTransport = <T = unknown>(
  request: QiniuHttpRequest,
) => Promise<QiniuHttpResponse<T>>;

export interface QiniuMultipartSession {
  provider: 'qiniu';
  version: 1;
  bucket: string;
  key: string | null;
  uploadHost: string;
  uploadId: string;
  expireAt: number;
  /** Bytes per part. Kept in the checkpoint to prevent incompatible reuse. */
  chunkSize: number;
  fingerprint: string;
}

export interface QiniuUploadedPart {
  etag: string;
  md5?: string;
  size: number;
  putTime?: number;
}

export interface QiniuCompleteResponse extends UploadData {
  key?: string;
  hash?: string;
}

export interface QiniuMultipartAdapterOptions {
  tokenProvider: QiniuTokenProvider;
  /** Defaults to the selected file name. Return null to let Qiniu choose the object key. */
  key?: QiniuOptionResolver<string | null>;
  /** Optional when it can be decoded from the upload token policy. */
  bucket?: QiniuOptionResolver<string>;
  /** Optional when automatic upload-host discovery is available. */
  uploadHost?: QiniuOptionResolver<string>;
  /** Chunk size in MB. Defaults to 4 MB. */
  multipartChunkSize?: number;
  apiServerUrl?: string;
  /** Upload-host query path. Defaults to `/v2/query`; `/v4/query` is also supported. */
  uploadHostQueryPath?: string;
  transport?: QiniuHttpTransport;
  expirySkewSeconds?: number;
  fileName?: QiniuOptionResolver<string | undefined>;
  mimeType?: QiniuOptionResolver<string | undefined>;
  metadata?: QiniuOptionResolver<Record<string, string> | undefined>;
  customVars?: QiniuOptionResolver<Record<string, string> | undefined>;
}

export interface QiniuUploadPresetOptions extends QiniuMultipartAdapterOptions {
  checkpointStore?: CheckpointStore<QiniuMultipartSession>;
  fingerprint?: UploadFingerprintResolver;
  checkpointKey?: MultipartBridgeOptions<QiniuMultipartSession>['checkpointKey'];
  onCheckpointError?: MultipartBridgeOptions<QiniuMultipartSession>['onCheckpointError'];
  maxAmountUploadingAtSameTime?: number;
}

export interface QiniuUploadPreset {
  multipart: HorizonMultipartSettingLike;
  multipartChunkSize: number;
}

interface QiniuTokenPolicy {
  scope?: string;
  isPrefixalScope?: number;
}

interface ParsedQiniuUploadToken {
  accessKey: string;
  bucket: string;
  scopedKey?: string;
  scopedPrefix?: string;
}

interface ResolvedQiniuCredentials {
  token: string;
  accessKey: string;
  bucket: string;
  key: string | null;
  uploadHost?: string;
}

interface QiniuRuntimeCredentials {
  token: string;
  context: QiniuTokenProviderContext;
}

interface QiniuInitResponse {
  uploadId: string;
  expireAt: number;
}

interface QiniuListPartsResponse {
  uploadId: string;
  expireAt: number;
  partNumberMarker: number;
  parts?: Array<{
    etag: string;
    partNumber: number;
    putTime?: number;
    size: number;
  }>;
}

interface QiniuUploadPartResponse {
  etag: string;
  md5?: string;
}

interface QiniuHostQueryResponse {
  data?: {
    up?: {
      acc?: { main?: string[]; backup?: string[] };
      src?: { main?: string[]; backup?: string[] };
    };
  };
  up?: {
    acc?: { main?: string[]; backup?: string[] };
    src?: { main?: string[]; backup?: string[] };
  };
  hosts?: Array<{
    up?: { domains?: string[] };
  }>;
}

export class QiniuRequestError extends Error {
  readonly status: number;
  readonly data: unknown;
  readonly requestId?: string;

  constructor(status: number, data: unknown, requestId?: string) {
    const detail =
      typeof data === 'object' && data !== null && 'error' in data
        ? String((data as { error?: unknown }).error)
        : `HTTP ${status}`;
    super(`Qiniu request failed: ${detail}`);
    this.name = 'QiniuRequestError';
    this.status = status;
    this.data = data;
    this.requestId = requestId;
  }
}

/** A 612 response means every part tied to the old UploadId must be uploaded again. */
export class QiniuMultipartSessionExpiredError extends QiniuRequestError {
  readonly requiresFullRestart = true;

  constructor(data: unknown, requestId?: string) {
    super(612, data, requestId);
    this.name = 'QiniuMultipartSessionExpiredError';
  }
}

function createAbortError() {
  if (typeof DOMException !== 'undefined') {
    return new DOMException('The upload request was aborted', 'AbortError');
  }
  const error = new Error('The upload request was aborted');
  error.name = 'AbortError';
  return error;
}

function parseResponseBody(value: string): unknown {
  if (!value) return undefined;
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return value;
  }
}

export function createQiniuXhrTransport(): QiniuHttpTransport {
  return <T>(request: QiniuHttpRequest) =>
    new Promise<QiniuHttpResponse<T>>((resolve, reject) => {
      if (request.signal?.aborted) {
        reject(createAbortError());
        return;
      }
      if (typeof XMLHttpRequest === 'undefined') {
        reject(new Error('XMLHttpRequest is not available in the current environment'));
        return;
      }

      const xhr = new XMLHttpRequest();
      let settled = false;
      const cleanup = () => request.signal?.removeEventListener('abort', abortRequest);
      const finish = (callback: () => void) => {
        if (settled) return;
        settled = true;
        cleanup();
        callback();
      };
      const abortRequest = () => xhr.abort();

      try {
        xhr.open(request.method, request.url, true);
        for (const [name, value] of Object.entries(request.headers ?? {})) {
          xhr.setRequestHeader(name, value);
        }
      } catch (error) {
        finish(() => reject(error));
        return;
      }

      xhr.upload.addEventListener('progress', event => {
        request.onProgress?.(event.loaded);
      });
      xhr.addEventListener('load', () => {
        const response = {
          status: xhr.status,
          data: parseResponseBody(xhr.responseText) as T,
          headers: {
            'x-reqid': xhr.getResponseHeader('x-reqid') ?? '',
          },
        };
        finish(() => resolve(response));
      });
      xhr.addEventListener('error', () => {
        finish(() => reject(new Error('Qiniu network request failed')));
      });
      xhr.addEventListener('abort', () => {
        finish(() => reject(createAbortError()));
      });
      xhr.addEventListener('timeout', () => {
        finish(() => reject(new Error('Qiniu network request timed out')));
      });
      request.signal?.addEventListener('abort', abortRequest, { once: true });
      if (request.signal?.aborted) {
        abortRequest();
        return;
      }
      try {
        xhr.send(request.body ?? null);
      } catch (error) {
        finish(() => reject(error));
      }
    });
}

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

function withHttpsProtocol(value: string) {
  return /^https?:\/\//i.test(value)
    ? trimTrailingSlash(value)
    : `https://${trimTrailingSlash(value)}`;
}

function normalizeUploadHost(value: string) {
  let url: URL;
  try {
    url = new URL(withHttpsProtocol(value));
  } catch {
    throw new TypeError('Qiniu uploadHost must be a valid HTTP(S) origin');
  }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new TypeError('Qiniu uploadHost must be a credential-free HTTP(S) origin');
  }
  return url.origin;
}

function encodeUrlSafeBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\//g, '_').replace(/\+/g, '-');
}

function decodeUrlSafeBase64(value: string) {
  const normalized = value.replace(/_/g, '/').replace(/-/g, '+');
  const padding = normalized.length % 4;
  const decoded = atob(padding ? normalized + '='.repeat(4 - padding) : normalized);
  const bytes = Uint8Array.from(decoded, character => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function parseUploadToken(token: string): ParsedQiniuUploadToken {
  const segments = token.split(':');
  if (segments.length < 3 || !segments[0] || !segments[2]) {
    throw new TypeError('Qiniu tokenProvider returned an invalid upload token');
  }

  let policy: QiniuTokenPolicy;
  try {
    policy = JSON.parse(decodeUrlSafeBase64(segments.slice(2).join(':'))) as QiniuTokenPolicy;
  } catch {
    throw new TypeError('Unable to decode the Qiniu upload token policy');
  }

  const scope = policy.scope ?? '';
  const separator = scope.indexOf(':');
  const scopedValue = separator >= 0 ? scope.slice(separator + 1) : undefined;
  return {
    accessKey: segments[0],
    bucket: separator >= 0 ? scope.slice(0, separator) : scope,
    scopedKey: separator >= 0 && !policy.isPrefixalScope ? scopedValue : undefined,
    scopedPrefix: separator >= 0 && policy.isPrefixalScope ? scopedValue : undefined,
  };
}

function assertTokenAllowsKey(
  token: ParsedQiniuUploadToken,
  key: string | null,
  description: string,
) {
  if (token.scopedKey !== undefined && token.scopedKey !== key) {
    throw new TypeError(`${description} is scoped to a different object key`);
  }
  if (token.scopedPrefix !== undefined && (key === null || !key.startsWith(token.scopedPrefix))) {
    throw new TypeError(`${description} does not allow the requested object-key prefix`);
  }
}

async function resolveOption<T>(
  value: QiniuOptionResolver<T> | undefined,
  context: QiniuResolverContext,
): Promise<T | undefined> {
  if (typeof value === 'function') {
    return (value as (context: QiniuResolverContext) => Awaitable<T>)(context);
  }
  return value;
}

function createObjectUploadBaseUrl(session: QiniuMultipartSession) {
  const objectName = session.key === null ? '~' : encodeUrlSafeBase64(session.key);
  return `${trimTrailingSlash(session.uploadHost)}/buckets/${encodeURIComponent(
    session.bucket,
  )}/objects/${objectName}/uploads`;
}

function getRequestId(response: QiniuHttpResponse) {
  return response.headers?.['x-reqid'] || response.headers?.['X-Reqid'];
}

async function checkedRequest<T>(
  transport: QiniuHttpTransport,
  request: QiniuHttpRequest,
): Promise<T> {
  const response = await transport<T>(request);
  if (response.status < 200 || response.status >= 300) {
    if (response.status === 612) {
      throw new QiniuMultipartSessionExpiredError(response.data, getRequestId(response));
    }
    throw new QiniuRequestError(response.status, response.data, getRequestId(response));
  }
  return response.data;
}

function isQiniuStatus(error: unknown, status: number): error is QiniuRequestError {
  return error instanceof QiniuRequestError && error.status === status;
}

function assertChunkSize(value: number) {
  if (!Number.isInteger(value) || value < 1 || value > 1024) {
    throw new RangeError('Qiniu multipartChunkSize must be an integer from 1 to 1024 MB');
  }
  return value * 1024 * 1024;
}

function assertMultipartFileSize(size: number, chunkSize: number) {
  if (!Number.isSafeInteger(size) || size <= 0) {
    throw new RangeError('Qiniu multipart upload requires a non-empty file');
  }
  if (Math.ceil(size / chunkSize) > MAX_PART_COUNT) {
    throw new RangeError(`Qiniu multipart upload supports at most ${MAX_PART_COUNT} parts`);
  }
}

function assertChunkMatchesSession(context: MultipartUploadPartContext<QiniuMultipartSession>) {
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
      'The Horizon Upload chunk boundaries do not match the Qiniu multipartChunkSize',
    );
  }
}

function createQiniuImplementation(options: QiniuMultipartAdapterOptions) {
  const transport = options.transport ?? createQiniuXhrTransport();
  const chunkSize = assertChunkSize(options.multipartChunkSize ?? DEFAULT_CHUNK_SIZE);
  const apiServerUrl = trimTrailingSlash(options.apiServerUrl ?? DEFAULT_API_SERVER_URL);
  const uploadHostQueryPath = options.uploadHostQueryPath ?? DEFAULT_UPLOAD_HOST_QUERY_PATH;
  const expirySkew = options.expirySkewSeconds ?? DEFAULT_EXPIRY_SKEW_SECONDS;
  const runtimeCredentials = new WeakMap<QiniuMultipartSession, QiniuRuntimeCredentials>();
  const tokenRefreshes = new WeakMap<QiniuMultipartSession, Promise<QiniuRuntimeCredentials>>();
  const bootstraps = new WeakMap<File, Promise<ResolvedQiniuCredentials>>();

  const resolverContext = (
    context: Pick<MultipartInitContext<QiniuMultipartSession>, 'file' | 'rawFile' | 'fingerprint'>,
  ): QiniuResolverContext => ({
    file: context.file,
    rawFile: context.rawFile,
    fingerprint: context.fingerprint,
  });

  const discoverUploadHost = async (accessKey: string, bucket: string) => {
    const query = new URLSearchParams({ ak: accessKey, bucket });
    const queryPath = uploadHostQueryPath.startsWith('/')
      ? uploadHostQueryPath
      : `/${uploadHostQueryPath}`;
    const response = await checkedRequest<QiniuHostQueryResponse>(transport, {
      url: `${apiServerUrl}${queryPath}?${query.toString()}`,
      method: 'GET',
    });
    const up = response.data?.up ?? response.up;
    const host =
      up?.acc?.main?.[0] ??
      up?.src?.main?.[0] ??
      up?.acc?.backup?.[0] ??
      up?.src?.backup?.[0] ??
      response.hosts?.[0]?.up?.domains?.[0];
    if (!host) throw new Error('Qiniu upload-host discovery returned no usable host');
    return normalizeUploadHost(host);
  };

  const loadBootstrap = async (
    context: Pick<MultipartInitContext<QiniuMultipartSession>, 'file' | 'rawFile' | 'fingerprint'>,
  ) => {
    const existing = bootstraps.get(context.rawFile);
    if (existing) return existing;

    const promise = (async (): Promise<ResolvedQiniuCredentials> => {
      const resolveContext = resolverContext(context);
      const configuredKey = await resolveOption(options.key, resolveContext);
      const requestedKey =
        options.key === undefined ? context.rawFile.name : (configuredKey ?? null);
      const provided = await options.tokenProvider({
        ...resolveContext,
        key: requestedKey,
      });
      const credentials = typeof provided === 'string' ? { token: provided } : provided;
      const tokenInfo = parseUploadToken(credentials.token);
      const configuredBucket = await resolveOption(options.bucket, resolveContext);
      const bucket = credentials.bucket ?? configuredBucket ?? tokenInfo.bucket;
      if (!bucket) throw new TypeError('A Qiniu bucket is required');
      if (tokenInfo.bucket && tokenInfo.bucket !== bucket) {
        throw new TypeError('The Qiniu upload token bucket does not match the configured bucket');
      }

      const key =
        credentials.key !== undefined
          ? credentials.key
          : options.key === undefined && tokenInfo.scopedKey !== undefined
            ? tokenInfo.scopedKey
            : requestedKey;
      assertTokenAllowsKey(tokenInfo, key, 'The Qiniu upload token');
      const configuredHost = await resolveOption(options.uploadHost, resolveContext);
      const uploadHost = credentials.uploadHost ?? configuredHost;

      return {
        token: credentials.token,
        accessKey: tokenInfo.accessKey,
        bucket,
        key,
        uploadHost: uploadHost ? normalizeUploadHost(uploadHost) : undefined,
      };
    })();

    bootstraps.set(context.rawFile, promise);
    try {
      return await promise;
    } catch (error) {
      bootstraps.delete(context.rawFile);
      throw error;
    }
  };

  const tokenContext = (
    context: Pick<
      MultipartSessionContext<QiniuMultipartSession>,
      'file' | 'rawFile' | 'fingerprint'
    >,
    key: string | null,
  ): QiniuTokenProviderContext => ({
    ...resolverContext(context),
    key,
  });

  const refreshToken = async (
    context: MultipartSessionContext<QiniuMultipartSession>,
    staleToken?: string,
  ): Promise<QiniuRuntimeCredentials> => {
    const current = runtimeCredentials.get(context.session);
    if (staleToken !== undefined && current && current.token !== staleToken) return current;

    const activeRefresh = tokenRefreshes.get(context.session);
    if (activeRefresh) return activeRefresh;

    const refresh = (async () => {
      const providerContext = tokenContext(context, context.session.key);
      const provided = await options.tokenProvider(providerContext);
      const credentials = typeof provided === 'string' ? { token: provided } : provided;
      const tokenInfo = parseUploadToken(credentials.token);
      if (
        (tokenInfo.bucket && tokenInfo.bucket !== context.session.bucket) ||
        (credentials.bucket !== undefined && credentials.bucket !== context.session.bucket)
      ) {
        throw new TypeError('The refreshed Qiniu token belongs to a different bucket');
      }
      if (credentials.key !== undefined && credentials.key !== context.session.key) {
        throw new TypeError('The refreshed Qiniu token belongs to a different object key');
      }
      assertTokenAllowsKey(tokenInfo, context.session.key, 'The refreshed Qiniu upload token');
      const runtime = { token: credentials.token, context: providerContext };
      runtimeCredentials.set(context.session, runtime);
      return runtime;
    })();
    tokenRefreshes.set(context.session, refresh);
    try {
      return await refresh;
    } finally {
      if (tokenRefreshes.get(context.session) === refresh) {
        tokenRefreshes.delete(context.session);
      }
    }
  };

  const getRuntime = async (context: MultipartSessionContext<QiniuMultipartSession>) =>
    runtimeCredentials.get(context.session) ?? refreshToken(context);

  const authorizedRequest = async <T>(
    context: MultipartSessionContext<QiniuMultipartSession>,
    createRequest: (token: string) => QiniuHttpRequest,
  ) => {
    let runtime = await getRuntime(context);
    try {
      return await checkedRequest<T>(transport, createRequest(runtime.token));
    } catch (error) {
      if (!isQiniuStatus(error, 401)) throw error;
      runtime = await refreshToken(context, runtime.token);
      return checkedRequest<T>(transport, createRequest(runtime.token));
    }
  };

  const initializeSession = async (context: MultipartSessionContext<QiniuMultipartSession>) => {
    const result = await authorizedRequest<QiniuInitResponse>(context, token => ({
      url: createObjectUploadBaseUrl(context.session),
      method: 'POST',
      headers: { Authorization: `UpToken ${token}` },
    }));
    if (typeof result?.uploadId !== 'string' || !result.uploadId.trim()) {
      throw new Error('Qiniu did not return a valid uploadId');
    }
    if (!Number.isSafeInteger(result.expireAt) || result.expireAt <= 0) {
      throw new Error('Qiniu did not return a valid expireAt');
    }
    context.session.uploadId = result.uploadId;
    context.session.expireAt = result.expireAt;
    return context.session;
  };

  const adapter: MultipartProviderAdapter<
    QiniuMultipartSession,
    QiniuUploadedPart,
    QiniuCompleteResponse
  > = {
    id: 'qiniu',

    async init(context) {
      assertMultipartFileSize(context.rawFile.size, chunkSize);
      const bootstrap = await loadBootstrap(context);
      bootstraps.delete(context.rawFile);
      const uploadHost =
        bootstrap.uploadHost ?? (await discoverUploadHost(bootstrap.accessKey, bootstrap.bucket));
      const reusable =
        context.checkpoint?.provider === 'qiniu' &&
        context.checkpoint.version === 1 &&
        context.checkpoint.bucket === bootstrap.bucket &&
        context.checkpoint.key === bootstrap.key &&
        context.checkpoint.fingerprint === context.fingerprint &&
        context.checkpoint.chunkSize === chunkSize &&
        context.checkpoint.expireAt - expirySkew > Date.now() / 1000;
      const session: QiniuMultipartSession = reusable
        ? { ...context.checkpoint!, uploadHost }
        : {
            provider: 'qiniu',
            version: 1,
            bucket: bootstrap.bucket,
            key: bootstrap.key,
            uploadHost,
            uploadId: '',
            expireAt: 0,
            chunkSize,
            fingerprint: context.fingerprint,
          };
      runtimeCredentials.set(session, {
        token: bootstrap.token,
        context: tokenContext(context, session.key),
      });

      if (!reusable) {
        await initializeSession({ ...context, session });
      }
      return session;
    },

    async listParts(context) {
      const uploadedParts: MultipartUploadedPart<QiniuUploadedPart>[] = [];
      let marker = 0;
      let pageCount = 0;

      try {
        do {
          pageCount += 1;
          if (pageCount > 10) {
            throw new Error('Qiniu listParts exceeded the 10,000-part API limit');
          }
          const query = new URLSearchParams({ 'max-parts': String(MAX_PARTS_PER_PAGE) });
          if (marker > 0) query.set('part-number-marker', String(marker));
          const result = await authorizedRequest<QiniuListPartsResponse>(context, token => ({
            url: `${createObjectUploadBaseUrl(context.session)}/${encodeURIComponent(
              context.session.uploadId,
            )}?${query.toString()}`,
            method: 'GET',
            headers: { Authorization: `UpToken ${token}` },
          }));
          context.session.expireAt = result.expireAt || context.session.expireAt;
          for (const part of result.parts ?? []) {
            const index = part.partNumber - 1;
            const expectedSize = Math.max(
              0,
              Math.min(
                context.rawFile.size - index * context.session.chunkSize,
                context.session.chunkSize,
              ),
            );
            if (index < 0 || expectedSize <= 0 || part.size !== expectedSize) continue;
            uploadedParts.push({
              index,
              response: {
                etag: part.etag,
                size: part.size,
                putTime: part.putTime,
              },
            });
          }
          marker = result.partNumberMarker || 0;
        } while (marker > 0);
      } catch (error) {
        if (!isQiniuStatus(error, 612)) throw error;
        await initializeSession(context);
        return [];
      }

      return uploadedParts;
    },

    async uploadPart(context) {
      assertChunkMatchesSession(context);
      const result = await authorizedRequest<QiniuUploadPartResponse>(context, token => ({
        url: `${createObjectUploadBaseUrl(context.session)}/${encodeURIComponent(
          context.session.uploadId,
        )}/${context.partNumber}`,
        method: 'PUT',
        headers: {
          Authorization: `UpToken ${token}`,
          'Content-Type': 'application/octet-stream',
        },
        body: context.chunk.part,
        signal: context.signal,
        onProgress: context.onProgress,
      }));
      if (typeof result?.etag !== 'string' || !result.etag) {
        throw new Error(`Qiniu returned no ETag for part ${context.partNumber}`);
      }
      context.onProgress(context.chunk.size);
      return {
        etag: result.etag,
        md5: result.md5,
        size: context.chunk.size,
      };
    },

    async complete(context) {
      const partMap = new Map<number, QiniuUploadedPart>();
      for (const part of context.parts) {
        if (!part.response?.etag) {
          throw new Error(`Missing Qiniu ETag for multipart chunk ${part.index}`);
        }
        partMap.set(part.index + 1, part.response);
      }
      const parts = [...partMap]
        .sort(([left], [right]) => left - right)
        .map(([partNumber, part]) => ({ partNumber, etag: part.etag }));
      const optionContext = resolverContext(context);
      const [fileName, mimeType, metadata, customVars] = await Promise.all([
        resolveOption(options.fileName, optionContext),
        resolveOption(options.mimeType, optionContext),
        resolveOption(options.metadata, optionContext),
        resolveOption(options.customVars, optionContext),
      ]);
      const body = {
        parts,
        fname: fileName ?? context.rawFile.name,
        ...((mimeType ?? context.rawFile.type)
          ? { mimeType: mimeType ?? context.rawFile.type }
          : {}),
        ...(metadata ? { metadata } : {}),
        ...(customVars ? { customVars } : {}),
      };

      return authorizedRequest<QiniuCompleteResponse>(context, token => ({
        url: `${createObjectUploadBaseUrl(context.session)}/${encodeURIComponent(
          context.session.uploadId,
        )}`,
        method: 'POST',
        headers: {
          Authorization: `UpToken ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }));
    },

    async abort(context) {
      try {
        await authorizedRequest<unknown>(context, token => ({
          url: `${createObjectUploadBaseUrl(context.session)}/${encodeURIComponent(
            context.session.uploadId,
          )}`,
          method: 'DELETE',
          headers: { Authorization: `UpToken ${token}` },
        }));
      } catch (error) {
        if (!isQiniuStatus(error, 612)) throw error;
      }
    },
  };

  return {
    adapter,
    chunkSize,
    resolveIdentity: async (context: QiniuResolverContext) => {
      const bootstrap = await loadBootstrap(context);
      return { bucket: bootstrap.bucket, key: bootstrap.key };
    },
  };
}

export function createQiniuMultipartAdapter(
  options: QiniuMultipartAdapterOptions,
): MultipartProviderAdapter<QiniuMultipartSession, QiniuUploadedPart, QiniuCompleteResponse> {
  return createQiniuImplementation(options).adapter;
}

export function createQiniuUploadPreset(options: QiniuUploadPresetOptions): QiniuUploadPreset {
  const implementation = createQiniuImplementation(options);
  const multipartChunkSize = implementation.chunkSize / (1024 * 1024);
  const checkpointStore =
    options.checkpointStore ?? createLocalStorageCheckpointStore<QiniuMultipartSession>();
  const checkpointKey: MultipartBridgeOptions<QiniuMultipartSession>['checkpointKey'] =
    options.checkpointKey ??
    (async context => {
      const identity = await implementation.resolveIdentity(context);
      return [
        'qiniu',
        encodeURIComponent(identity.bucket),
        encodeURIComponent(identity.key ?? '~'),
        String(implementation.chunkSize),
        context.fingerprint,
      ].join(':');
    });

  return {
    multipartChunkSize,
    multipart: toHorizonMultipartSetting(implementation.adapter, {
      checkpointStore,
      checkpointKey,
      fingerprint: options.fingerprint,
      onCheckpointError: options.onCheckpointError,
      maxAmountUploadingAtSameTime: options.maxAmountUploadingAtSameTime ?? DEFAULT_CONCURRENCY,
    }),
  };
}
