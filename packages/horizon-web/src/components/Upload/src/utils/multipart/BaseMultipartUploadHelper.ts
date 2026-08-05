import type { HUploadFileType, HUploadHttpRequestInstanceMethods } from '../fileDefines';
import { HUploadFileStatusEnum } from '../fileDefines';
import type { HUploadChunk, HUploadPartRequestOptions } from '../../composables/useMultipartUpload';
import type { Data } from '@aurora/utils';
import UploadHelperOptions from '../UploadHelperOptions';
import type { ToRefs } from 'vue';
import type { UploadProps } from '../../composables/useProps';
import { createMultipartChunks } from './createMultipartChunks';

function requiresFullMultipartRestart(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'requiresFullRestart' in error &&
    (error as { requiresFullRestart?: unknown }).requiresFullRestart === true
  );
}

export default abstract class BaseMultipartUploadHelper extends UploadHelperOptions {
  protected readonly file: HUploadFileType;
  protected readonly instanceMethods: HUploadHttpRequestInstanceMethods;

  private readonly chunks: HUploadChunk[] = [];
  private readonly requests = new Map<number, { abort: () => void }>();
  private readonly loadedBytes = new Map<number, number>();
  private initializePromise?: Promise<void>;
  private nextPendingChunkIndex = 0;
  private completedBytes = 0;
  private inFlightLoadedBytes = 0;
  private paused = false;
  private failed = false;
  private merging = false;
  private completed = false;
  private fullRestartRequired = false;

  protected get chunkSize() {
    return (this.multipartChunkSize || 2) * 1024 * 1024;
  }

  protected get uploadMethod() {
    return this.method;
  }

  protected get maxConcurrentChunks() {
    return this.multipartMaxAmountUploadingAtSameTime;
  }

  protected constructor(
    file: HUploadFileType,
    instanceMethods: HUploadHttpRequestInstanceMethods,
    props?: ToRefs<Partial<UploadProps>>,
  ) {
    super(props);
    this.file = file;
    this.instanceMethods = instanceMethods;
  }

  abstract initUpload(file: HUploadFileType): Promise<void>;

  abstract getUploadedChunkIndexes(
    file: HUploadFileType,
    chunks: HUploadChunk[],
  ): Promise<number[]>;

  abstract mergeFiles(file: HUploadFileType, chunks: HUploadChunk[]): Promise<unknown>;

  abstract filenameModify(fileRawName: string, index: number, part: Blob): string;

  abstract beforeFilePartUpload(file: HUploadFileType, index: number, part: Blob): Data;

  abstract uploadFilePart(
    file: HUploadFileType,
    chunk: HUploadChunk,
    options: HUploadPartRequestOptions,
  ): Promise<unknown> | undefined;

  abstract uploadActionModify(chunk: HUploadChunk): string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected appendHeader(xhr: XMLHttpRequest, header: Data, chunk?: HUploadChunk) {
    Object.entries({ ...this.header, ...header }).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value.toString());
    });
  }

  protected appendData(formData: FormData, data?: Data) {
    Object.entries({ ...this.data, ...data }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
  }

  private async sliceFile() {
    if (this.chunks.length) return;

    const chunks = await createMultipartChunks(this.file.raw!, this.chunkSize);
    chunks.forEach(({ index, size, part }) => {
      this.chunks.push({
        index,
        size,
        part,
        status: 'pending',
      });
    });
  }

  private async initialize() {
    await this.initUpload(this.file);
    await this.sliceFile();

    const uploadedChunkIndexes = new Set(
      (await this.getUploadedChunkIndexes(this.file, this.chunks)).filter(
        index => Number.isInteger(index) && index >= 0 && index < this.chunks.length,
      ),
    );

    this.chunks.forEach(chunk => {
      if (uploadedChunkIndexes.has(chunk.index)) {
        chunk.status = 'success';
        this.completedBytes += chunk.size;
      }
    });
  }

  private updateProgress() {
    const uploadedBytes = this.completedBytes + this.inFlightLoadedBytes;
    const progress = this.file.size ? Math.min(uploadedBytes / this.file.size, 1) * 100 : 100;

    this.instanceMethods.setStatus(this.file, HUploadFileStatusEnum.Uploading, {
      progress,
      response: undefined,
    });
  }

  private updateChunkLoadedBytes(index: number, loaded: number, size: number) {
    const previousLoaded = this.loadedBytes.get(index) || 0;
    const nextLoaded = Math.min(Math.max(loaded, 0), size);
    this.loadedBytes.set(index, nextLoaded);
    this.inFlightLoadedBytes += nextLoaded - previousLoaded;
  }

  private clearChunkLoadedBytes(index: number) {
    this.inFlightLoadedBytes -= this.loadedBytes.get(index) || 0;
    this.loadedBytes.delete(index);
  }

  private completeChunk(chunk: HUploadChunk, response: unknown) {
    this.clearChunkLoadedBytes(chunk.index);
    if (chunk.status !== 'success') this.completedBytes += chunk.size;
    chunk.status = 'success';
    chunk.response = response;
  }

  private abortActiveRequests() {
    this.requests.forEach((xhr, index) => {
      const chunk = this.chunks[index];
      if (chunk?.status === 'uploading') chunk.status = 'pending';
      xhr.abort();
    });
    this.requests.clear();
    this.loadedBytes.clear();
    this.inFlightLoadedBytes = 0;
  }

  private fail(chunk: HUploadChunk, responseText: string, response: unknown) {
    if (requiresFullMultipartRestart(response)) this.fullRestartRequired = true;
    if (this.paused || this.failed || this.completed) return;

    chunk.status = 'fail';
    chunk.response = response;
    this.failed = true;
    this.abortActiveRequests();
    const serializedResponse =
      typeof response === 'string' ? response : JSON.stringify({ reason: responseText });
    void this.instanceMethods.onUploadFail(this.file, responseText, serializedResponse);
  }

  private uploadChunk(chunk: HUploadChunk) {
    let settled = false;
    const extraData = this.beforeFilePartUpload(this.file, chunk.index, chunk.part);
    const abortController = new AbortController();
    const onProgress = (loaded: number) => {
      if (settled || this.paused) return;
      this.updateChunkLoadedBytes(chunk.index, loaded, chunk.size);
      this.updateProgress();
    };

    chunk.status = 'uploading';

    let customRequest: Promise<unknown> | undefined;
    try {
      customRequest = this.uploadFilePart(this.file, chunk, {
        action: this.uploadActionModify(chunk),
        method: this.uploadMethod,
        headers: { ...this.header },
        data: { ...this.data, ...extraData },
        withCredentials: this.withCredentials,
        signal: abortController.signal,
        onProgress,
      });
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      this.fail(chunk, reason, error);
      return;
    }

    if (customRequest) {
      const cancel = () => {
        if (settled) return;
        settled = true;
        this.requests.delete(chunk.index);
        this.clearChunkLoadedBytes(chunk.index);
        if (chunk.status === 'uploading') chunk.status = 'pending';
      };

      abortController.signal.addEventListener('abort', cancel, { once: true });
      this.requests.set(chunk.index, { abort: () => abortController.abort() });

      customRequest.then(
        response => {
          if (settled) return;
          settled = true;
          this.requests.delete(chunk.index);
          this.completeChunk(chunk, response);
          this.updateProgress();
          void this.schedule();
        },
        error => {
          if (requiresFullMultipartRestart(error)) this.fullRestartRequired = true;
          if (settled) return;
          settled = true;
          this.requests.delete(chunk.index);
          this.clearChunkLoadedBytes(chunk.index);
          const reason = error instanceof Error ? error.message : String(error);
          this.fail(chunk, reason, error);
        },
      );
      return;
    }

    const xhr = new XMLHttpRequest();

    xhr.open(this.uploadMethod, this.uploadActionModify(chunk), true);
    xhr.withCredentials = this.withCredentials;
    this.appendHeader(xhr, {}, chunk);

    xhr.upload.addEventListener('progress', event => {
      if (settled || this.paused) return;
      onProgress(event.loaded);
    });

    xhr.onload = () => {
      if (settled) return;
      settled = true;
      this.requests.delete(chunk.index);
      this.clearChunkLoadedBytes(chunk.index);

      if (xhr.status >= 200 && xhr.status < 300) {
        this.completeChunk(chunk, xhr.response);
        this.updateProgress();
        void this.schedule();
      } else {
        this.fail(chunk, xhr.responseText, xhr.response);
      }
    };

    xhr.onerror = () => {
      if (settled) return;
      settled = true;
      this.requests.delete(chunk.index);
      this.clearChunkLoadedBytes(chunk.index);
      this.fail(chunk, xhr.responseText, xhr.response);
    };

    xhr.onabort = () => {
      if (settled) return;
      settled = true;
      this.requests.delete(chunk.index);
      this.clearChunkLoadedBytes(chunk.index);
      if (chunk.status === 'uploading') chunk.status = 'pending';
    };

    const formData = new FormData();
    formData.append(this.filenameModify(this.name, chunk.index, chunk.part), chunk.part);
    this.appendData(formData, extraData);

    this.requests.set(chunk.index, xhr);
    xhr.send(formData);
  }

  private async finish() {
    if (this.merging || this.completed || this.paused || this.failed) return;

    this.merging = true;
    try {
      const response = await this.mergeFiles(this.file, this.chunks);
      this.completed = true;
      const serializedResponse =
        typeof response === 'string' ? response : JSON.stringify(response ?? {});
      void this.instanceMethods.onUploadSuccess(this.file, serializedResponse);
    } catch (error) {
      if (requiresFullMultipartRestart(error)) this.fullRestartRequired = true;
      this.failed = true;
      const reason = error instanceof Error ? error.message : String(error);
      void this.instanceMethods.onUploadFail(this.file, reason, JSON.stringify({ reason }));
    } finally {
      this.merging = false;
    }
  }

  private async schedule() {
    if (this.paused || this.failed || this.completed || this.merging) return;

    const maxConcurrency = Math.max(1, this.maxConcurrentChunks || 1);
    const availableSlots = Math.max(0, maxConcurrency - this.requests.size);

    for (let slot = 0; slot < availableSlots && !this.failed && !this.paused; slot++) {
      let chunk: HUploadChunk | undefined;

      while (this.nextPendingChunkIndex < this.chunks.length && !chunk) {
        const candidate = this.chunks[this.nextPendingChunkIndex++];
        if (candidate.status === 'pending') chunk = candidate;
      }

      if (!chunk) break;
      this.uploadChunk(chunk);
    }

    if (this.nextPendingChunkIndex >= this.chunks.length && !this.requests.size) {
      await this.finish();
    }
  }

  public async start() {
    if (!this.file.raw) return;

    this.paused = false;
    this.failed = false;
    this.instanceMethods.addUploadingQueue(this.file, this);
    const initializePromise = (this.initializePromise ??= this.initialize());

    try {
      await initializePromise;
    } catch (error) {
      if (this.initializePromise === initializePromise) this.initializePromise = undefined;
      if (requiresFullMultipartRestart(error)) this.fullRestartRequired = true;
      this.failed = true;
      const reason = error instanceof Error ? error.message : String(error);
      void this.instanceMethods.onUploadFail(this.file, reason, JSON.stringify({ reason }));
      return;
    }

    try {
      if (!this.paused) {
        this.updateProgress();
        await this.schedule();
      }
    } catch (error) {
      if (requiresFullMultipartRestart(error)) this.fullRestartRequired = true;
      this.failed = true;
      const reason = error instanceof Error ? error.message : String(error);
      void this.instanceMethods.onUploadFail(this.file, reason, JSON.stringify({ reason }));
    }
  }

  public pause() {
    if (this.completed) return;
    this.paused = true;
    this.abortActiveRequests();
  }

  public async resume() {
    if (this.completed) return;
    this.paused = false;
    this.failed = false;
    if (this.fullRestartRequired) {
      this.fullRestartRequired = false;
      this.initializePromise = undefined;
      this.nextPendingChunkIndex = 0;
      this.completedBytes = 0;
      this.inFlightLoadedBytes = 0;
      this.loadedBytes.clear();
      this.chunks.forEach(chunk => {
        chunk.status = 'pending';
        chunk.response = undefined;
      });
    }
    this.chunks.forEach(chunk => {
      if (chunk.status === 'fail' || chunk.status === 'uploading') chunk.status = 'pending';
    });
    this.nextPendingChunkIndex = 0;
    this.instanceMethods.addUploadingQueue(this.file, this);
    await this.start();
  }
}
