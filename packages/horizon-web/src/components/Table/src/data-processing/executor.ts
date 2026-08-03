import { processTableData } from './engine';
import { createTableDataProcessingWorkerSource } from './inline-worker';
import {
  H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION,
  isTableDataProcessingRequest,
  isTableDataProcessingResponse,
} from './protocol';
import type {
  HTableDataProcessingRequest,
  HTableDataProcessingSerializedError,
  HTableDataProcessingSuccessResponse,
} from './protocol';

export type HTableDataProcessingExecutorMode = 'sync' | 'auto' | 'worker';

export type HTableDataProcessingWorkerUnavailableReason =
  | 'worker-unavailable'
  | 'blob-unavailable'
  | 'object-url-unavailable'
  | 'worker-construction-failed';

/** Worker 创建方法收到内联源码，严格 CSP 环境可忽略源码并返回自托管 Worker。 */
export interface HTableDataProcessingWorkerFactoryContext {
  source: string;
  name: string;
}

/**
 * 自定义数据处理 Worker 创建方法。
 * @en Factory for an inline or self-hosted data-processing worker.
 */
export type HTableDataProcessingWorkerFactory = (
  context: HTableDataProcessingWorkerFactoryContext,
) => Worker;

export interface HTableDataProcessingExecuteOptions {
  signal?: AbortSignal;
  /** 超时后终止 Worker 并触发同步回退；`0` 或未设置表示不限制。 */
  timeout?: number;
}

export interface HTableDataProcessingExecutor {
  readonly mode: 'sync' | 'worker';
  readonly fallbackError?: Error;
  execute(
    request: HTableDataProcessingRequest,
    options?: HTableDataProcessingExecuteOptions,
  ): Promise<HTableDataProcessingSuccessResponse>;
  dispose(): void;
}

export interface HTableDataProcessingExecutorOptions {
  mode?: HTableDataProcessingExecutorMode;
  workerFactory?: HTableDataProcessingWorkerFactory;
  /** Worker 创建或传输失败时是否自动降级到同步引擎，默认为 `true`。 */
  fallbackToSync?: boolean;
  workerName?: string;
}

export interface HTableDataProcessingWorkerAvailability {
  available: boolean;
  reason?: Exclude<HTableDataProcessingWorkerUnavailableReason, 'worker-construction-failed'>;
}

export class HTableDataProcessingWorkerUnavailableError extends Error {
  readonly reason: HTableDataProcessingWorkerUnavailableReason;

  constructor(reason: HTableDataProcessingWorkerUnavailableReason, cause?: unknown) {
    super(`Table data-processing Worker is unavailable (${reason}).`, { cause });
    this.name = 'HTableDataProcessingWorkerUnavailableError';
    this.reason = reason;
  }
}

export class HTableDataProcessingWorkerTransportError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = 'HTableDataProcessingWorkerTransportError';
  }
}

export class HTableDataProcessingRemoteError extends Error {
  readonly code?: string;
  readonly remoteName: string;

  constructor(error: HTableDataProcessingSerializedError) {
    super(error.message);
    this.name = 'HTableDataProcessingRemoteError';
    this.remoteName = error.name;
    this.code = error.code;
    if (error.stack) this.stack = error.stack;
  }
}

function now() {
  return typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now()
    : Date.now();
}

function createAbortError() {
  if (typeof DOMException !== 'undefined') {
    return new DOMException('Table data-processing request was aborted.', 'AbortError');
  }

  const error = new Error('Table data-processing request was aborted.');
  error.name = 'AbortError';
  return error;
}

function assertRequest(request: HTableDataProcessingRequest) {
  if (!isTableDataProcessingRequest(request)) {
    throw new TypeError('Invalid Table data-processing request.');
  }
}

/** 检查当前运行环境是否具备默认 Blob Worker 所需能力。 */
export function getTableDataProcessingWorkerAvailability(): HTableDataProcessingWorkerAvailability {
  if (typeof globalThis.Worker === 'undefined') {
    return { available: false, reason: 'worker-unavailable' };
  }
  if (typeof globalThis.Blob === 'undefined') {
    return { available: false, reason: 'blob-unavailable' };
  }
  if (
    typeof globalThis.URL === 'undefined' ||
    typeof globalThis.URL.createObjectURL !== 'function' ||
    typeof globalThis.URL.revokeObjectURL !== 'function'
  ) {
    return { available: false, reason: 'object-url-unavailable' };
  }
  return { available: true };
}

/** 使用内联 Blob 创建经典 Worker。 */
export const createInlineTableDataProcessingWorker: HTableDataProcessingWorkerFactory = ({
  source,
  name,
}) => {
  const availability = getTableDataProcessingWorkerAvailability();
  if (!availability.available) {
    throw new HTableDataProcessingWorkerUnavailableError(availability.reason!);
  }

  let objectUrl: string | undefined;
  try {
    objectUrl = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
    return new Worker(objectUrl, { name });
  } catch (error) {
    throw new HTableDataProcessingWorkerUnavailableError('worker-construction-failed', error);
  } finally {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }
};

class SyncTableDataProcessingExecutor implements HTableDataProcessingExecutor {
  readonly mode = 'sync' as const;
  private disposed = false;

  constructor(readonly fallbackError?: Error) {}

  async execute(
    request: HTableDataProcessingRequest,
    options: HTableDataProcessingExecuteOptions = {},
  ): Promise<HTableDataProcessingSuccessResponse> {
    assertRequest(request);
    if (this.disposed) {
      const error = new Error('Table data-processing executor has been disposed.');
      error.name = 'HTableDataProcessingExecutorDisposedError';
      throw error;
    }
    if (options.signal?.aborted) throw createAbortError();

    const startedAt = now();
    const { indices } = processTableData(request);
    return {
      protocolVersion: H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION,
      type: 'result',
      requestId: request.requestId,
      indices,
      duration: now() - startedAt,
    };
  }

  dispose() {
    this.disposed = true;
  }
}

interface PendingRequest {
  resolve: (response: HTableDataProcessingSuccessResponse) => void;
  reject: (error: unknown) => void;
  rowCount: number;
  signal?: AbortSignal;
  abort?: () => void;
  timeout?: ReturnType<typeof setTimeout>;
}

function hasInvalidWorkerIndices(indices: Uint32Array, rowCount: number) {
  if (indices.length > rowCount) return true;
  const seen = new Uint8Array(rowCount);
  for (let index = 0; index < indices.length; index++) {
    const rowIndex = indices[index];
    if (rowIndex >= rowCount || seen[rowIndex] === 1) return true;
    seen[rowIndex] = 1;
  }
  return false;
}

class WorkerTableDataProcessingExecutor implements HTableDataProcessingExecutor {
  readonly mode = 'worker' as const;
  private readonly pending = new Map<number, PendingRequest>();
  private fatalError?: Error;
  private disposed = false;

  private readonly handleMessage = (event: MessageEvent<unknown>) => {
    if (!isTableDataProcessingResponse(event.data)) {
      this.fail(
        new HTableDataProcessingWorkerTransportError(
          'Table data-processing Worker returned an invalid response.',
        ),
      );
      return;
    }

    const response = event.data;
    const pending = this.pending.get(response.requestId);
    // A late response can belong to a request the caller aborted. Request ordering remains caller-owned.
    if (!pending) return;

    if (response.type === 'result' && hasInvalidWorkerIndices(response.indices, pending.rowCount)) {
      this.fail(
        new HTableDataProcessingWorkerTransportError(
          'Table data-processing Worker returned invalid row indices.',
        ),
      );
      return;
    }

    this.removePending(response.requestId, pending);

    if (response.type === 'error') {
      pending.reject(new HTableDataProcessingRemoteError(response.error));
      return;
    }
    pending.resolve(response);
  };

  private readonly handleError = (event: ErrorEvent) => {
    event.preventDefault?.();
    this.fail(
      new HTableDataProcessingWorkerTransportError(
        event.message || 'Table data-processing Worker failed.',
        event.error,
      ),
    );
  };

  private readonly handleMessageError = (event: MessageEvent<unknown>) => {
    this.fail(
      new HTableDataProcessingWorkerTransportError(
        'Table data-processing Worker could not deserialize a message.',
        event.data,
      ),
    );
  };

  constructor(private readonly worker: Worker) {
    worker.addEventListener('message', this.handleMessage);
    worker.addEventListener('error', this.handleError);
    worker.addEventListener('messageerror', this.handleMessageError);
  }

  execute(
    request: HTableDataProcessingRequest,
    options: HTableDataProcessingExecuteOptions = {},
  ): Promise<HTableDataProcessingSuccessResponse> {
    try {
      assertRequest(request);
    } catch (error) {
      return Promise.reject(error);
    }
    if (this.disposed) {
      return Promise.reject(new Error('Table data-processing executor has been disposed.'));
    }
    if (this.fatalError) return Promise.reject(this.fatalError);
    if (options.signal?.aborted) return Promise.reject(createAbortError());
    if (this.pending.has(request.requestId)) {
      return Promise.reject(
        new TypeError(`Table data-processing requestId ${request.requestId} is already pending.`),
      );
    }

    return new Promise((resolve, reject) => {
      const pending: PendingRequest = {
        resolve,
        reject,
        rowCount: request.projection.rowCount,
        signal: options.signal,
      };
      if (options.signal) {
        pending.abort = () => {
          if (!this.pending.delete(request.requestId)) return;
          pending.reject(createAbortError());
        };
        options.signal.addEventListener('abort', pending.abort, { once: true });
      }
      if (Number.isFinite(options.timeout) && options.timeout! > 0) {
        pending.timeout = setTimeout(() => {
          if (!this.pending.has(request.requestId)) return;
          this.fail(
            new HTableDataProcessingWorkerTransportError(
              `Table data-processing Worker timed out after ${options.timeout}ms.`,
            ),
          );
        }, options.timeout);
      }
      this.pending.set(request.requestId, pending);

      try {
        this.worker.postMessage(request);
      } catch (error) {
        this.removePending(request.requestId, pending);
        reject(
          new HTableDataProcessingWorkerTransportError(
            'Table data-processing request could not be sent to the Worker.',
            error,
          ),
        );
      }
    });
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    const error = new Error('Table data-processing executor has been disposed.');
    error.name = 'HTableDataProcessingExecutorDisposedError';
    this.rejectPending(error);
    if (!this.fatalError) {
      this.detachWorker();
      this.worker.terminate();
    }
  }

  private removePending(requestId: number, pending: PendingRequest) {
    this.pending.delete(requestId);
    if (pending.signal && pending.abort) {
      pending.signal.removeEventListener('abort', pending.abort);
    }
    clearTimeout(pending.timeout);
  }

  private rejectPending(error: Error) {
    for (const [requestId, pending] of this.pending) {
      this.removePending(requestId, pending);
      pending.reject(error);
    }
  }

  private detachWorker() {
    this.worker.removeEventListener('message', this.handleMessage);
    this.worker.removeEventListener('error', this.handleError);
    this.worker.removeEventListener('messageerror', this.handleMessageError);
  }

  private fail(error: Error) {
    if (this.disposed || this.fatalError) return;
    this.fatalError = error;
    this.rejectPending(error);
    this.detachWorker();
    this.worker.terminate();
  }
}

class FallbackTableDataProcessingExecutor implements HTableDataProcessingExecutor {
  private current: HTableDataProcessingExecutor;
  private readonly synchronous = new SyncTableDataProcessingExecutor();
  private didFallback = false;
  fallbackError?: Error;

  constructor(workerExecutor: HTableDataProcessingExecutor) {
    this.current = workerExecutor;
  }

  get mode() {
    return this.current.mode;
  }

  async execute(
    request: HTableDataProcessingRequest,
    options?: HTableDataProcessingExecuteOptions,
  ): Promise<HTableDataProcessingSuccessResponse> {
    const executor = this.current;
    try {
      return await executor.execute(request, options);
    } catch (error) {
      if (
        executor.mode !== 'worker' ||
        !(error instanceof HTableDataProcessingWorkerTransportError)
      ) {
        throw error;
      }

      if (!this.didFallback) {
        this.didFallback = true;
        this.fallbackError = error;
        executor.dispose();
        this.current = this.synchronous;
      }
      return this.synchronous.execute(request, options);
    }
  }

  dispose() {
    this.current.dispose();
    if (this.current !== this.synchronous) this.synchronous.dispose();
  }
}

/** 创建同步执行器，适用于 SSR、较小数据集以及自定义函数操作。 */
export function createSyncTableDataProcessingExecutor(): HTableDataProcessingExecutor {
  return new SyncTableDataProcessingExecutor();
}

/** 创建 Worker 执行器；创建失败会直接抛错，不会隐式降级。 */
export function createWorkerTableDataProcessingExecutor(
  workerFactory: HTableDataProcessingWorkerFactory = createInlineTableDataProcessingWorker,
  workerName = 'horizon-table-data-processing',
): HTableDataProcessingExecutor {
  try {
    const worker = workerFactory({
      source: createTableDataProcessingWorkerSource(),
      name: workerName,
    });
    return new WorkerTableDataProcessingExecutor(worker);
  } catch (error) {
    if (error instanceof HTableDataProcessingWorkerUnavailableError) throw error;
    throw new HTableDataProcessingWorkerUnavailableError('worker-construction-failed', error);
  }
}

/**
 * 创建可降级的数据处理执行器。请求标识及“只采用最新结果”策略由调用层维护。
 * @en Creates a data-processing executor with optional synchronous fallback. The caller owns
 * request IDs and latest-result selection.
 */
export function createTableDataProcessingExecutor(
  options: HTableDataProcessingExecutorOptions = {},
): HTableDataProcessingExecutor {
  if (options.mode === 'sync') return createSyncTableDataProcessingExecutor();

  const fallbackToSync = options.fallbackToSync !== false;
  try {
    const workerExecutor = createWorkerTableDataProcessingExecutor(
      options.workerFactory,
      options.workerName,
    );
    return fallbackToSync
      ? new FallbackTableDataProcessingExecutor(workerExecutor)
      : workerExecutor;
  } catch (error) {
    if (!fallbackToSync) throw error;
    return new SyncTableDataProcessingExecutor(
      error instanceof Error ? error : new Error(String(error)),
    );
  }
}
