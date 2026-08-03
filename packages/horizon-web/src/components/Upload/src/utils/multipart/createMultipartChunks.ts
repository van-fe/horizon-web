const WORKER_CHUNK_THRESHOLD = 256;
const CHUNK_BATCH_SIZE = 128;
const WORKER_STALL_TIMEOUT = 5000;

export interface MultipartChunkPart {
  index: number;
  size: number;
  part: Blob;
}

interface MultipartChunkWorkerMessage {
  type: 'batch' | 'done' | 'error';
  chunks?: MultipartChunkPart[];
  message?: string;
}

interface MultipartChunkWorker {
  onmessage: ((event: MessageEvent<MultipartChunkWorkerMessage>) => void) | null;
  onerror: ((event: ErrorEvent) => void) | null;
  postMessage: (message: { file: Blob; chunkSize: number; batchSize: number }) => void;
  terminate: () => void;
}

const workerSource = `
self.onmessage = function (event) {
  try {
    var file = event.data.file;
    var chunkSize = event.data.chunkSize;
    var batchSize = event.data.batchSize;
    var totalChunks = Math.ceil(file.size / chunkSize);
    var chunks = [];

    for (var index = 0; index < totalChunks; index += 1) {
      var start = index * chunkSize;
      var end = Math.min(start + chunkSize, file.size);
      chunks.push({
        index: index,
        size: end - start,
        part: file.slice(start, end)
      });

      if (chunks.length === batchSize) {
        self.postMessage({ type: 'batch', chunks: chunks });
        chunks = [];
      }
    }

    if (chunks.length) self.postMessage({ type: 'batch', chunks: chunks });
    self.postMessage({ type: 'done' });
  } catch (error) {
    self.postMessage({
      type: 'error',
      message: error instanceof Error ? error.message : String(error)
    });
  }
};
`;

function getTotalChunks(file: Blob, chunkSize: number) {
  if (!Number.isFinite(chunkSize) || chunkSize <= 0) {
    throw new RangeError('Multipart chunk size must be greater than 0');
  }

  return Math.ceil(file.size / chunkSize);
}

function createChunk(file: Blob, chunkSize: number, index: number): MultipartChunkPart {
  const start = index * chunkSize;
  const end = Math.min(start + chunkSize, file.size);

  return {
    index,
    size: end - start,
    part: file.slice(start, end),
  };
}

function sliceSynchronously(file: Blob, chunkSize: number, totalChunks: number) {
  return Array.from({ length: totalChunks }, (_, index) => createChunk(file, chunkSize, index));
}

function yieldToMainThread() {
  return new Promise<void>(resolve => setTimeout(resolve, 0));
}

async function sliceCooperatively(file: Blob, chunkSize: number, totalChunks: number) {
  const chunks: MultipartChunkPart[] = [];

  for (let index = 0; index < totalChunks; index++) {
    if (index > 0 && index % CHUNK_BATCH_SIZE === 0) await yieldToMainThread();
    chunks.push(createChunk(file, chunkSize, index));
  }

  return chunks;
}

function canUseWorker() {
  return (
    typeof Worker !== 'undefined' &&
    typeof URL !== 'undefined' &&
    typeof URL.createObjectURL === 'function' &&
    typeof URL.revokeObjectURL === 'function'
  );
}

function sliceInWorker(file: Blob, chunkSize: number, totalChunks: number) {
  return new Promise<MultipartChunkPart[]>((resolve, reject) => {
    const chunks: MultipartChunkPart[] = [];
    const workerUrl = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
    let worker: MultipartChunkWorker;
    let stallTimer: ReturnType<typeof setTimeout> | undefined;
    let settled = false;

    const armStallTimer = () => {
      clearTimeout(stallTimer);
      stallTimer = setTimeout(
        () => fail(new Error('Multipart upload worker timed out')),
        WORKER_STALL_TIMEOUT,
      );
    };
    const cleanup = () => {
      clearTimeout(stallTimer);
      if (worker) {
        worker.onmessage = null;
        worker.onerror = null;
        worker.terminate();
      }
      URL.revokeObjectURL(workerUrl);
    };
    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(error);
    };

    try {
      worker = new Worker(workerUrl) as MultipartChunkWorker;
    } catch (error) {
      URL.revokeObjectURL(workerUrl);
      reject(error instanceof Error ? error : new Error(String(error)));
      return;
    }

    worker.onmessage = event => {
      if (settled) return;

      const message = event.data;

      if (!message || typeof message.type !== 'string') {
        fail(new Error('Multipart upload worker returned an invalid response'));
        return;
      }

      if (message.type === 'batch' && Array.isArray(message.chunks)) {
        chunks.push(...message.chunks);
        armStallTimer();
        return;
      }

      if (message.type === 'done') {
        if (chunks.length !== totalChunks) {
          fail(new Error('Multipart upload worker returned an incomplete chunk list'));
          return;
        }

        settled = true;
        cleanup();
        resolve(chunks);
        return;
      }

      fail(new Error(message.message || 'Failed to create multipart upload chunks'));
    };
    worker.onerror = event => {
      event.preventDefault();
      fail(new Error(event.message || 'Failed to run multipart upload worker'));
    };

    try {
      armStallTimer();
      worker.postMessage({ file, chunkSize, batchSize: CHUNK_BATCH_SIZE });
    } catch (error) {
      fail(error instanceof Error ? error : new Error(String(error)));
    }
  });
}

export async function createMultipartChunks(file: Blob, chunkSize: number) {
  const totalChunks = getTotalChunks(file, chunkSize);

  if (totalChunks < WORKER_CHUNK_THRESHOLD) {
    return sliceSynchronously(file, chunkSize, totalChunks);
  }

  if (canUseWorker()) {
    try {
      return await sliceInWorker(file, chunkSize, totalChunks);
    } catch {
      // A strict Content Security Policy may reject blob workers. Keep slicing responsive anyway.
    }
  }

  return sliceCooperatively(file, chunkSize, totalChunks);
}
