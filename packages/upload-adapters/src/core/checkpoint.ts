import type { CheckpointStore, LocalStorageCheckpointOptions, UploadFileLike } from './types';

const DEFAULT_LOCAL_STORAGE_PREFIX = 'aurora:upload:checkpoint:';
const FINGERPRINT_SAMPLE_SIZE = 64 * 1024;

export function createMemoryCheckpointStore<TCheckpoint>(
  initialEntries?: Iterable<readonly [string, TCheckpoint]>,
): CheckpointStore<TCheckpoint> {
  const checkpoints = new Map<string, TCheckpoint>(initialEntries);

  return {
    get: key => checkpoints.get(key),
    set: (key, checkpoint) => {
      checkpoints.set(key, checkpoint);
    },
    delete: key => {
      checkpoints.delete(key);
    },
  };
}

export function createLocalStorageCheckpointStore<TCheckpoint>(
  options: LocalStorageCheckpointOptions<TCheckpoint> = {},
): CheckpointStore<TCheckpoint> {
  const prefix = options.prefix ?? DEFAULT_LOCAL_STORAGE_PREFIX;
  const serialize = options.serialize ?? (checkpoint => JSON.stringify(checkpoint));
  const deserialize = options.deserialize ?? (serialized => JSON.parse(serialized) as TCheckpoint);

  const reportError = (error: unknown) => {
    options.onError?.(error);
  };

  const getStorage = () => {
    if (options.storage) return options.storage;
    try {
      return globalThis.localStorage;
    } catch (error) {
      reportError(error);
      return undefined;
    }
  };

  return {
    get: key => {
      const storage = getStorage();
      if (!storage) return undefined;
      const storageKey = `${prefix}${key}`;

      try {
        const serialized = storage.getItem(storageKey);
        if (serialized === null) return undefined;
        return deserialize(serialized);
      } catch (error) {
        reportError(error);
        try {
          storage.removeItem(storageKey);
        } catch (removeError) {
          reportError(removeError);
        }
        return undefined;
      }
    },
    set: (key, checkpoint) => {
      try {
        getStorage()?.setItem(`${prefix}${key}`, serialize(checkpoint));
      } catch (error) {
        reportError(error);
      }
    },
    delete: key => {
      try {
        getStorage()?.removeItem(`${prefix}${key}`);
      } catch (error) {
        reportError(error);
      }
    },
  };
}

function metadataFingerprint(file: UploadFileLike, rawFile?: File) {
  const source = rawFile ?? file.raw;
  const values = [
    source?.name ?? file.name,
    source?.size ?? file.size ?? 0,
    source?.lastModified ?? 0,
    source?.type ?? '',
  ];

  return values.map(value => encodeURIComponent(String(value))).join(':');
}

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Creates a stable, lightweight fingerprint from metadata plus sampled file contents.
 * Large files hash the first, middle, and last 64 KiB instead of buffering the whole file.
 */
export async function defaultUploadFingerprint(
  file: UploadFileLike,
  rawFile?: File,
): Promise<string> {
  const source = rawFile ?? file.raw;
  const metadata = metadataFingerprint(file, source);
  const fallback = `metadata-v1:${metadata}`;
  if (!source || typeof source.arrayBuffer !== 'function') return fallback;

  try {
    const subtle = globalThis.crypto?.subtle;
    if (!subtle || typeof TextEncoder === 'undefined') return fallback;

    const sampleRanges =
      source.size <= FINGERPRINT_SAMPLE_SIZE * 3
        ? [{ start: 0, end: source.size }]
        : [
            { start: 0, end: FINGERPRINT_SAMPLE_SIZE },
            {
              start: Math.floor((source.size - FINGERPRINT_SAMPLE_SIZE) / 2),
              end:
                Math.floor((source.size - FINGERPRINT_SAMPLE_SIZE) / 2) + FINGERPRINT_SAMPLE_SIZE,
            },
            { start: source.size - FINGERPRINT_SAMPLE_SIZE, end: source.size },
          ];
    const encoder = new TextEncoder();
    const segments: Uint8Array[] = [
      encoder.encode(`aurora-upload-sample-sha256-v1\n${metadata}\n`),
    ];

    for (const range of sampleRanges) {
      segments.push(encoder.encode(`${range.start}:${range.end - range.start}\n`));
      segments.push(new Uint8Array(await source.slice(range.start, range.end).arrayBuffer()));
    }

    const length = segments.reduce((total, segment) => total + segment.byteLength, 0);
    const payload = new Uint8Array(length);
    let offset = 0;
    for (const segment of segments) {
      payload.set(segment, offset);
      offset += segment.byteLength;
    }

    const digest = await subtle.digest('SHA-256', payload);
    return `sample-sha256-v1:${toHex(digest)}`;
  } catch {
    return fallback;
  }
}

export function createCheckpointKey(adapterId: string, fingerprint: string): string {
  return `${adapterId}:${fingerprint}`;
}
