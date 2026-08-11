import type { HTableDataProcessingInput } from './types';

/**
 * Table 数据处理 Worker 消息协议版本。
 * @en Message protocol version for Table data-processing Workers.
 */
export const H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION = 1 as const;

export interface HTableDataProcessingRequest extends HTableDataProcessingInput {
  protocolVersion: typeof H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION;
  type: 'process';
  requestId: number;
}

export interface HTableDataProcessingSuccessResponse {
  protocolVersion: typeof H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION;
  type: 'result';
  requestId: number;
  indices: Uint32Array;
  duration: number;
}

export interface HTableDataProcessingSerializedError {
  name: string;
  message: string;
  code?: string;
  stack?: string;
}

export interface HTableDataProcessingErrorResponse {
  protocolVersion: typeof H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION;
  type: 'error';
  requestId: number;
  error: HTableDataProcessingSerializedError;
}

export type HTableDataProcessingResponse =
  | HTableDataProcessingSuccessResponse
  | HTableDataProcessingErrorResponse;

/**
 * 创建带版本与请求标识的数据处理消息。
 * @param requestId 调用层维护的单调递增请求标识
 * @paramEn requestId Monotonically increasing request identifier owned by the caller.
 * @param input 数据处理任务
 * @paramEn input Data-processing job.
 * @en Creates a versioned data-processing message with a caller-owned request identifier.
 */
export function createTableDataProcessingRequest(
  requestId: number,
  input: HTableDataProcessingInput,
): HTableDataProcessingRequest {
  if (!Number.isSafeInteger(requestId) || requestId < 0) {
    throw new TypeError('Table data-processing requestId must be a non-negative safe integer.');
  }

  return {
    ...input,
    protocolVersion: H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION,
    type: 'process',
    requestId,
  };
}

export function isTableDataProcessingRequest(value: unknown): value is HTableDataProcessingRequest {
  if (!value || typeof value !== 'object') return false;
  const request = value as Partial<HTableDataProcessingRequest>;
  return (
    request.protocolVersion === H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION &&
    request.type === 'process' &&
    Number.isSafeInteger(request.requestId) &&
    request.requestId! >= 0 &&
    typeof request.projection === 'object' &&
    request.projection !== null
  );
}

export function isTableDataProcessingResponse(
  value: unknown,
): value is HTableDataProcessingResponse {
  if (!value || typeof value !== 'object') return false;
  const response = value as Partial<HTableDataProcessingResponse>;
  if (
    response.protocolVersion !== H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION ||
    !Number.isSafeInteger(response.requestId) ||
    response.requestId! < 0
  ) {
    return false;
  }

  if (response.type === 'result') {
    return response.indices instanceof Uint32Array && Number.isFinite(response.duration);
  }
  return (
    response.type === 'error' && !!response.error && typeof response.error.message === 'string'
  );
}
