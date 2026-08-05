import { describe, expect, test, vi } from 'vitest';
import {
  createCheckpointKey,
  createLocalStorageCheckpointStore,
  createMemoryCheckpointStore,
  defaultUploadFingerprint,
} from '../core';

describe('checkpoint stores', () => {
  test('stores and deletes checkpoints in memory', async () => {
    const store = createMemoryCheckpointStore<{ uploadId: string }>();

    await store.set('file', { uploadId: 'upload-1' });
    expect(await store.get('file')).toEqual({ uploadId: 'upload-1' });

    await store.delete('file');
    expect(await store.get('file')).toBeUndefined();
  });

  test('persists namespaced checkpoints in localStorage', async () => {
    localStorage.clear();
    const store = createLocalStorageCheckpointStore<{ uploadId: string }>({
      storage: localStorage,
      prefix: 'test:',
    });

    await store.set('file', { uploadId: 'upload-2' });

    expect(localStorage.getItem('test:file')).toBe('{"uploadId":"upload-2"}');
    expect(await store.get('file')).toEqual({ uploadId: 'upload-2' });

    await store.delete('file');
    expect(localStorage.getItem('test:file')).toBeNull();
  });

  test('drops malformed localStorage checkpoints and reports the error', async () => {
    localStorage.clear();
    localStorage.setItem('test:broken', '{');
    const onError = vi.fn();
    const store = createLocalStorageCheckpointStore({
      storage: localStorage,
      prefix: 'test:',
      onError,
    });

    expect(await store.get('broken')).toBeUndefined();
    expect(localStorage.getItem('test:broken')).toBeNull();
    expect(onError).toHaveBeenCalledOnce();
  });
});

describe('checkpoint identity', () => {
  test('creates a stable sampled fingerprint', async () => {
    const rawFile = new File(['hello'], 'hello world.txt', {
      type: 'text/plain',
      lastModified: 123,
    });
    const file = { name: rawFile.name, size: rawFile.size, raw: rawFile };
    const fingerprint = await defaultUploadFingerprint(file, rawFile);

    expect(fingerprint).toMatch(/^sample-sha256-v1:[a-f0-9]{64}$/);
    expect(await defaultUploadFingerprint(file, rawFile)).toBe(fingerprint);
    expect(createCheckpointKey('qiniu', fingerprint)).toBe(`qiniu:${fingerprint}`);
  });

  test('distinguishes files with identical metadata but different sampled content', async () => {
    const first = new File(['first'], 'same.bin', {
      type: 'application/octet-stream',
      lastModified: 123,
    });
    const second = new File(['other'], 'same.bin', {
      type: 'application/octet-stream',
      lastModified: 123,
    });
    Object.defineProperty(second, 'size', { value: first.size });

    const [firstFingerprint, secondFingerprint] = await Promise.all([
      defaultUploadFingerprint({ name: first.name, size: first.size, raw: first }, first),
      defaultUploadFingerprint({ name: second.name, size: second.size, raw: second }, second),
    ]);

    expect(firstFingerprint).not.toBe(secondFingerprint);
  });
});
