import type { HUploadFileType, HUploadHttpRequestInstanceMethods } from '../fileDefines';
import { HUploadFileStatusEnum } from '../fileDefines';
import type { HUploadChunk } from '../../composables/useMultipartUpload';
import type { Data } from '@aurora/utils';
import UploadHelperOptions from '../UploadHelperOptions';
import type { ToRefs } from 'vue';
import type { UploadProps } from '../../composables/useProps';

export default abstract class BaseMultipartUploadHelper extends UploadHelperOptions {
  protected readonly file: HUploadFileType;
  protected readonly instanceMethods: HUploadHttpRequestInstanceMethods;

  private readonly chunks: HUploadChunk[] = [];
  private readonly requests = new Map<number, XMLHttpRequest>();
  private readonly loadedBytes = new Map<number, number>();
  private initializePromise?: Promise<void>;
  private paused = false;
  private failed = false;
  private merging = false;
  private completed = false;

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

  private sliceFile() {
    if (this.chunks.length) return;

    const size = this.file.size || 0;
    const totalChunks = Math.ceil(size / this.chunkSize);

    for (let index = 0; index < totalChunks; index++) {
      const start = index * this.chunkSize;
      const end = Math.min(start + this.chunkSize, size);

      this.chunks.push({
        index,
        size: end - start,
        part: this.file.raw!.slice(start, end),
        status: 'pending',
      });
    }
  }

  private async initialize() {
    await this.initUpload(this.file);
    this.sliceFile();

    const uploadedChunkIndexes = new Set(
      (await this.getUploadedChunkIndexes(this.file, this.chunks)).filter(
        index => Number.isInteger(index) && index >= 0 && index < this.chunks.length,
      ),
    );

    this.chunks.forEach(chunk => {
      if (uploadedChunkIndexes.has(chunk.index)) chunk.status = 'success';
    });
  }

  private updateProgress() {
    const uploadedBytes = this.chunks.reduce((total, chunk) => {
      if (chunk.status === 'success') return total + chunk.size;
      return total + (this.loadedBytes.get(chunk.index) || 0);
    }, 0);
    const progress = this.file.size ? Math.min(uploadedBytes / this.file.size, 1) * 100 : 100;

    this.instanceMethods.setStatus(this.file, HUploadFileStatusEnum.Uploading, {
      progress,
      response: undefined,
    });
  }

  private abortActiveRequests() {
    this.requests.forEach((xhr, index) => {
      const chunk = this.chunks[index];
      if (chunk?.status === 'uploading') chunk.status = 'pending';
      xhr.abort();
    });
    this.requests.clear();
    this.loadedBytes.clear();
  }

  private fail(chunk: HUploadChunk, xhr: XMLHttpRequest) {
    if (this.paused || this.failed || this.completed) return;

    chunk.status = 'fail';
    chunk.response = xhr.response;
    this.failed = true;
    this.abortActiveRequests();
    void this.instanceMethods.onUploadFail(this.file, xhr.responseText, xhr.response);
  }

  private uploadChunk(chunk: HUploadChunk) {
    const xhr = new XMLHttpRequest();
    let settled = false;

    xhr.open(this.uploadMethod, this.uploadActionModify(chunk), true);
    xhr.withCredentials = this.withCredentials;
    this.appendHeader(xhr, {}, chunk);

    xhr.upload.addEventListener('progress', event => {
      if (settled || this.paused) return;
      this.loadedBytes.set(chunk.index, Math.min(event.loaded, chunk.size));
      this.updateProgress();
    });

    xhr.onload = () => {
      if (settled) return;
      settled = true;
      this.requests.delete(chunk.index);
      this.loadedBytes.delete(chunk.index);

      if (xhr.status >= 200 && xhr.status < 300) {
        chunk.status = 'success';
        chunk.response = xhr.response;
        this.updateProgress();
        void this.schedule();
      } else {
        this.fail(chunk, xhr);
      }
    };

    xhr.onerror = () => {
      if (settled) return;
      settled = true;
      this.requests.delete(chunk.index);
      this.loadedBytes.delete(chunk.index);
      this.fail(chunk, xhr);
    };

    xhr.onabort = () => {
      if (settled) return;
      settled = true;
      this.requests.delete(chunk.index);
      this.loadedBytes.delete(chunk.index);
      if (chunk.status === 'uploading') chunk.status = 'pending';
    };

    const formData = new FormData();
    formData.append(this.filenameModify(this.name, chunk.index, chunk.part), chunk.part);
    this.appendData(formData, this.beforeFilePartUpload(this.file, chunk.index, chunk.part));

    chunk.status = 'uploading';
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
      this.failed = true;
      const reason = error instanceof Error ? error.message : String(error);
      void this.instanceMethods.onUploadFail(this.file, reason, JSON.stringify({ reason }));
    } finally {
      this.merging = false;
    }
  }

  private async schedule() {
    if (this.paused || this.failed || this.completed || this.merging) return;

    const pendingChunks = this.chunks.filter(chunk => chunk.status === 'pending');
    const maxConcurrency = Math.max(1, this.maxConcurrentChunks || 1);
    const availableSlots = Math.max(0, maxConcurrency - this.requests.size);

    pendingChunks.slice(0, availableSlots).forEach(chunk => this.uploadChunk(chunk));

    if (!pendingChunks.length && !this.requests.size) {
      await this.finish();
    }
  }

  public async start() {
    if (!this.file.raw) return;

    this.paused = false;
    this.failed = false;
    this.instanceMethods.addUploadingQueue(this.file, this);
    this.initializePromise ??= this.initialize();

    try {
      await this.initializePromise;
      if (!this.paused) {
        this.updateProgress();
        await this.schedule();
      }
    } catch (error) {
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
    this.chunks.forEach(chunk => {
      if (chunk.status === 'fail' || chunk.status === 'uploading') chunk.status = 'pending';
    });
    this.instanceMethods.addUploadingQueue(this.file, this);
    await this.start();
  }
}
