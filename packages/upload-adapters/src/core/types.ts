export type Awaitable<T> = T | PromiseLike<T>;

export type UploadData = Record<string, unknown>;

export interface UploadFileLike {
  name: string;
  size?: number | null;
  uuid?: string;
  raw?: File;
}

export interface UploadChunkLike<TResponse = unknown> {
  index: number;
  size: number;
  part: Blob;
  response?: TResponse;
}

export interface MultipartUploadedPart<TResponse = unknown> {
  /** Zero-based chunk index used by upload consumers. */
  index: number;
  response?: TResponse;
}

export interface MultipartInitContext<TSession> {
  file: UploadFileLike;
  rawFile: File;
  fingerprint: string;
  checkpoint?: TSession;
}

export interface MultipartSessionContext<TSession> {
  file: UploadFileLike;
  rawFile: File;
  fingerprint: string;
  session: TSession;
}

export interface HorizonUploadPartRequestOptionsLike {
  action: string;
  method: string;
  headers: UploadData;
  data: UploadData;
  withCredentials: boolean;
  signal: AbortSignal;
  onProgress: (loaded: number) => void;
}

export interface MultipartUploadPartContext<TSession> extends MultipartSessionContext<TSession> {
  chunk: UploadChunkLike;
  /** One-based part number for cloud-provider APIs. */
  partNumber: number;
  signal: AbortSignal;
  onProgress: (loaded: number) => void;
  request: HorizonUploadPartRequestOptionsLike;
}

export interface MultipartCompleteContext<
  TSession,
  TPartResponse,
> extends MultipartSessionContext<TSession> {
  parts: readonly MultipartUploadedPart<TPartResponse>[];
  chunks: readonly UploadChunkLike[];
}

export type MultipartAbortContext<TSession> = MultipartSessionContext<TSession>;

export interface MultipartProviderAdapter<
  TSession = unknown,
  TPartResponse = unknown,
  TCompleteResponse = unknown,
> {
  readonly id: string;
  init: (context: MultipartInitContext<TSession>) => Awaitable<TSession>;
  listParts?: (
    context: MultipartSessionContext<TSession>,
  ) => Awaitable<readonly MultipartUploadedPart<TPartResponse>[]>;
  uploadPart: (context: MultipartUploadPartContext<TSession>) => Awaitable<TPartResponse>;
  complete: (
    context: MultipartCompleteContext<TSession, TPartResponse>,
  ) => Awaitable<TCompleteResponse>;
  abort?: (context: MultipartAbortContext<TSession>) => Awaitable<void>;
}

export interface CheckpointStore<TCheckpoint> {
  get: (key: string) => Awaitable<TCheckpoint | undefined>;
  set: (key: string, checkpoint: TCheckpoint) => Awaitable<void>;
  delete: (key: string) => Awaitable<void>;
}

export interface LocalStorageCheckpointOptions<TCheckpoint> {
  storage?: Storage;
  prefix?: string;
  serialize?: (checkpoint: TCheckpoint) => string;
  deserialize?: (serialized: string) => TCheckpoint;
  onError?: (error: unknown) => void;
}

export type UploadFingerprintResolver = (file: UploadFileLike, rawFile: File) => Awaitable<string>;

export interface MultipartCheckpointKeyContext {
  adapterId: string;
  file: UploadFileLike;
  rawFile: File;
  fingerprint: string;
}

export type MultipartCheckpointKeyResolver = (
  context: MultipartCheckpointKeyContext,
) => Awaitable<string>;

export interface MultipartBridgeOptions<TSession> {
  checkpointStore?: CheckpointStore<TSession>;
  fingerprint?: UploadFingerprintResolver;
  checkpointKey?: MultipartCheckpointKeyResolver;
  maxAmountUploadingAtSameTime?: number;
  /** Checkpoint persistence is best-effort and never changes a successful cloud operation. */
  onCheckpointError?: (detail: MultipartCheckpointError) => void;
}

export interface MultipartCheckpointError {
  operation: 'get' | 'set' | 'delete';
  key: string;
  error: unknown;
}

/** Signals that every previously uploaded part belongs to an unusable cloud session. */
export class MultipartSessionExpiredError extends Error {
  readonly requiresFullRestart = true;
  readonly provider: string;
  readonly originalError: unknown;

  constructor(provider: string, originalError: unknown) {
    super(`${provider} multipart session no longer exists and must be restarted`);
    this.name = 'MultipartSessionExpiredError';
    this.provider = provider;
    this.originalError = originalError;
  }
}

export interface HorizonMultipartSettingLike {
  maxAmountUploadingAtSameTime?: number;
  initUpload: (file: UploadFileLike) => Awaitable<UploadData>;
  getUploadedChunkIndexes: (
    file: UploadFileLike,
    chunks: readonly UploadChunkLike[],
    initData: UploadData,
  ) => Awaitable<number[]>;
  uploadPart: (
    file: UploadFileLike,
    chunk: UploadChunkLike,
    options: HorizonUploadPartRequestOptionsLike,
  ) => Awaitable<unknown>;
  handleMerge: (file: UploadFileLike, chunks: readonly UploadChunkLike[]) => Awaitable<unknown>;
}
