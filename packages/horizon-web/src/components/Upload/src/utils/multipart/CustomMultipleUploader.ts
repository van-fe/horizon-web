import BaseMultipartUploadHelper from './BaseMultipartUploadHelper';
import type { Data } from '@aurora/utils';
import type {
  HUploadMultipartSetting,
  HUploadChunk,
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

  protected appendData(formData: FormData, data?: Data) {
    super.appendData(formData, { ...data, ...this._data });
  }

  async initUpload(file: HUploadFileType): Promise<void> {
    this._data = (await this.setting.initUpload?.(file)) || {};
  }

  beforeFilePartUpload(file: HUploadFileType, index: number, part: Blob): Data {
    return this.setting.beforePartUpload?.(file, index, part) || {};
  }

  filenameModify(fileRawName: string, index: number, part: Blob): string {
    return this.setting.filenameModify?.(fileRawName, index, part) || fileRawName;
  }

  mergeFiles(file: HUploadFileType, chunks: HUploadChunk[]): Promise<void> {
    return this.setting.handleMerge?.(file, chunks);
  }

  uploadActionModify(): string {
    return this.action ?? '';
  }
}
