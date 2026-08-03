import { processTableData } from './engine';
import { H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION } from './protocol';

/**
 * 构建不依赖模块 URL 的经典 Worker 源码。
 *
 * 使用 Blob 源码可避免组件库输出 ESM、CJS、UMD 时 `import.meta.url` 的兼容问题。
 * 严格 CSP 环境可以通过执行器的 `workerFactory` 改用自托管 Worker。
 * @en Builds classic Worker source without relying on a module URL.
 */
export function createTableDataProcessingWorkerSource(): string {
  const engineSource = processTableData.toString();

  return `"use strict";
const protocolVersion = ${H_TABLE_DATA_PROCESSING_PROTOCOL_VERSION};
const processTableData = (${engineSource});
const now = () => typeof performance !== "undefined" && typeof performance.now === "function"
  ? performance.now()
  : Date.now();
const serializeError = error => ({
  name: error && typeof error.name === "string" ? error.name : "Error",
  message: error && typeof error.message === "string" ? error.message : String(error),
  ...(error && typeof error.code === "string" ? { code: error.code } : {}),
  ...(error && typeof error.stack === "string" ? { stack: error.stack } : {}),
});
self.onmessage = event => {
  const request = event.data;
  if (!request || request.protocolVersion !== protocolVersion || request.type !== "process" ||
      !Number.isSafeInteger(request.requestId) || request.requestId < 0) {
    return;
  }

  const startedAt = now();
  try {
    const output = processTableData(request);
    const response = {
      protocolVersion,
      type: "result",
      requestId: request.requestId,
      indices: output.indices,
      duration: now() - startedAt,
    };
    self.postMessage(response, [output.indices.buffer]);
  } catch (error) {
    self.postMessage({
      protocolVersion,
      type: "error",
      requestId: request.requestId,
      error: serializeError(error),
    });
  }
};
`;
}
