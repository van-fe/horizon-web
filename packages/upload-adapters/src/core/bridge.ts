import {
  createCheckpointKey,
  createMemoryCheckpointStore,
  defaultUploadFingerprint,
} from './checkpoint';
import type {
  HorizonMultipartSettingLike,
  MultipartBridgeOptions,
  MultipartProviderAdapter,
  MultipartUploadedPart,
  UploadChunkLike,
  UploadFileLike,
} from './types';

interface RuntimeUploadState<TSession, TPartResponse> {
  checkpointKey: string;
  fingerprint: string;
  ownerToken: symbol;
  rawFile: File;
  session: TSession;
  uploadedParts: Map<number, MultipartUploadedPart<TPartResponse>>;
}

interface RuntimeCheckpointOwner {
  token: symbol;
  inFlightOperations: number;
}

function resolveRawFile(file: UploadFileLike): File {
  if (file.raw) return file.raw;
  if (typeof File !== 'undefined' && file instanceof File) return file;
  throw new TypeError('A raw File is required to create a multipart upload');
}

export function toHorizonMultipartSetting<TSession, TPartResponse, TCompleteResponse>(
  adapter: MultipartProviderAdapter<TSession, TPartResponse, TCompleteResponse>,
  options: MultipartBridgeOptions<TSession> = {},
): HorizonMultipartSettingLike {
  const checkpointStore = options.checkpointStore ?? createMemoryCheckpointStore<TSession>();
  const resolveFingerprint = options.fingerprint ?? defaultUploadFingerprint;
  const statesByFile = new WeakMap<object, RuntimeUploadState<TSession, TPartResponse>>();
  // Keep ownership records lightweight: File/Blob objects remain reachable only through WeakMap.
  const ownersByCheckpointKey = new Map<string, RuntimeCheckpointOwner>();
  const initializationsByCheckpointKey = new Map<string, symbol>();

  const reportCheckpointError = (
    operation: 'get' | 'set' | 'delete',
    key: string,
    error: unknown,
  ) => {
    try {
      options.onCheckpointError?.({ operation, key, error });
    } catch {
      // Observability hooks must not change upload state.
    }
  };

  const getCheckpoint = async (key: string) => {
    try {
      return await checkpointStore.get(key);
    } catch (error) {
      reportCheckpointError('get', key, error);
      return undefined;
    }
  };

  const setCheckpoint = async (key: string, session: TSession) => {
    try {
      await checkpointStore.set(key, session);
    } catch (error) {
      reportCheckpointError('set', key, error);
    }
  };

  const deleteCheckpoint = async (key: string) => {
    try {
      await checkpointStore.delete(key);
    } catch (error) {
      reportCheckpointError('delete', key, error);
    }
  };

  const rememberState = (
    file: UploadFileLike,
    state: RuntimeUploadState<TSession, TPartResponse>,
  ) => {
    statesByFile.set(file, state);
  };

  const resolveState = (file: UploadFileLike) => {
    const directState = statesByFile.get(file);
    if (
      directState &&
      ownersByCheckpointKey.get(directState.checkpointKey)?.token === directState.ownerToken
    ) {
      return directState;
    }

    throw new Error('Multipart upload has not been initialized or was superseded');
  };

  const runWithState = async <T>(
    file: UploadFileLike,
    operation: (state: RuntimeUploadState<TSession, TPartResponse>) => Promise<T>,
    allowOwnershipRelease = false,
  ) => {
    const state = resolveState(file);
    const owner = ownersByCheckpointKey.get(state.checkpointKey)!;
    owner.inFlightOperations += 1;
    try {
      const result = await operation(state);
      if (
        !allowOwnershipRelease &&
        ownersByCheckpointKey.get(state.checkpointKey)?.token !== state.ownerToken
      ) {
        throw new Error('Multipart upload was superseded by another task for the same checkpoint');
      }
      return result;
    } finally {
      owner.inFlightOperations -= 1;
    }
  };

  return {
    maxAmountUploadingAtSameTime: options.maxAmountUploadingAtSameTime,

    async initUpload(file) {
      const rawFile = resolveRawFile(file);
      const fingerprint = await resolveFingerprint(file, rawFile);
      const checkpointKey = options.checkpointKey
        ? await options.checkpointKey({
            adapterId: adapter.id,
            file,
            rawFile,
            fingerprint,
          })
        : createCheckpointKey(adapter.id, fingerprint);
      const existingOwner = ownersByCheckpointKey.get(checkpointKey);
      if (initializationsByCheckpointKey.has(checkpointKey) || existingOwner?.inFlightOperations) {
        throw new Error(
          'Another multipart upload is already using the same provider, object, and file checkpoint',
        );
      }
      if (existingOwner) {
        ownersByCheckpointKey.delete(checkpointKey);
      }
      const initializationToken = Symbol(checkpointKey);
      initializationsByCheckpointKey.set(checkpointKey, initializationToken);
      try {
        const checkpoint = await getCheckpoint(checkpointKey);
        const session = await adapter.init({ file, rawFile, fingerprint, checkpoint });
        const state: RuntimeUploadState<TSession, TPartResponse> = {
          checkpointKey,
          fingerprint,
          ownerToken: initializationToken,
          rawFile,
          session,
          uploadedParts: new Map(),
        };

        ownersByCheckpointKey.set(checkpointKey, {
          token: initializationToken,
          inFlightOperations: 0,
        });
        rememberState(file, state);
        await setCheckpoint(checkpointKey, session);
        return {};
      } finally {
        if (initializationsByCheckpointKey.get(checkpointKey) === initializationToken) {
          initializationsByCheckpointKey.delete(checkpointKey);
        }
      }
    },

    async getUploadedChunkIndexes(file, chunks) {
      if (!adapter.listParts) return [];
      return runWithState(file, async state => {
        const uploadedParts = await adapter.listParts!({
          file,
          rawFile: state.rawFile,
          fingerprint: state.fingerprint,
          session: state.session,
        });

        state.uploadedParts.clear();
        for (const part of uploadedParts) {
          if (Number.isInteger(part.index) && part.index >= 0 && part.index < chunks.length) {
            state.uploadedParts.set(part.index, part);
          }
        }

        await setCheckpoint(state.checkpointKey, state.session);
        return [...state.uploadedParts.keys()].sort((a, b) => a - b);
      });
    },

    async uploadPart(file, chunk, request) {
      return runWithState(file, async state => {
        const response = await adapter.uploadPart({
          file,
          rawFile: state.rawFile,
          fingerprint: state.fingerprint,
          session: state.session,
          chunk,
          partNumber: chunk.index + 1,
          signal: request.signal,
          onProgress: request.onProgress,
          request,
        });

        state.uploadedParts.set(chunk.index, { index: chunk.index, response });
        await setCheckpoint(state.checkpointKey, state.session);
        return response;
      });
    },

    async handleMerge(file, chunks) {
      return runWithState(
        file,
        async state => {
          const parts = chunks.map(chunk => {
            const restoredPart = state.uploadedParts.get(chunk.index);
            const chunkResponse = chunk.response as TPartResponse | undefined;
            return {
              index: chunk.index,
              response: chunkResponse ?? restoredPart?.response,
            };
          });
          const response = await adapter.complete({
            file,
            rawFile: state.rawFile,
            fingerprint: state.fingerprint,
            session: state.session,
            chunks: chunks as readonly UploadChunkLike[],
            parts,
          });

          statesByFile.delete(file);
          await deleteCheckpoint(state.checkpointKey);
          if (ownersByCheckpointKey.get(state.checkpointKey)?.token === state.ownerToken) {
            ownersByCheckpointKey.delete(state.checkpointKey);
          }
          return response;
        },
        true,
      );
    },
  };
}
