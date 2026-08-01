import BaseMultipartUploadHelper from './BaseMultipartUploadHelper';
import type { Data } from '@aurora/utils';
import type {
  HUploadMultipartSetting,
  HUploadChunk,
  HUploadPartRequestOptions,
} from '../../composables/useMultipartUpload';
import type { ToRefs } from 'vue';
import type { UploadProps } from '../../composables/useProps';
import type { HUploadFileType, HUploadHttpRequestInstanceMethods } from '../fileDefines';

export default class CustomMultipleUploader extends BaseMultipartUploadHelper {
  private _data: Data = {};

  constructor(
    file: HUploadFileType,
    instanceMethods: HUploadHttpRequestInstanceMethods,
    props?: ToRefs<Partial<UploadProps>>,
  ) {
    super(file, instanceMethods, props);
  }

  private get setting() {
    return this.multipart as HUploadMultipartSetting;
  }

  protected get maxConcurrentChunks() {
    return this.setting.maxAmountUploadingAtSameTime ?? super.maxConcurrentChunks;
  }

  protected appendData(formData: FormData, data?: Data) {
    super.appendData(formData, { ...data, ...this._data });
  }

  async initUpload(file: HUploadFileType): Promise<void> {
    this._data = (await this.setting.initUpload?.(file)) || {};
  }

  async getUploadedChunkIndexes(file: HUploadFileType, chunks: HUploadChunk[]): Promise<number[]> {
    return (await this.setting.getUploadedChunkIndexes?.(file, chunks, this._data)) || [];
  }

  beforeFilePartUpload(file: HUploadFileType, index: number, part: Blob): Data {
    return this.setting.beforePartUpload?.(file, index, part) || {};
  }

  uploadFilePart(
    file: HUploadFileType,
    chunk: HUploadChunk,
    options: HUploadPartRequestOptions,
  ): Promise<unknown> | undefined {
    if (!this.setting.uploadPart) return undefined;
    return Promise.resolve(
      this.setting.uploadPart(file, chunk, {
        ...options,
        data: { ...options.data, ...this._data },
      }),
    );
  }

  filenameModify(fileRawName: string, index: number, part: Blob): string {
    return this.setting.filenameModify?.(fileRawName, index, part) || fileRawName;
  }

  async mergeFiles(file: HUploadFileType, chunks: HUploadChunk[]): Promise<unknown> {
    return this.setting.handleMerge?.(file, chunks);
  }

  uploadActionModify(): string {
    return this.action ?? '';
  }
}
