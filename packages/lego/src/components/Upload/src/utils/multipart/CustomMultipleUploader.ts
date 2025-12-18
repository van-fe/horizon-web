import BaseMultipartUploadHelper from './BaseMultipartUploadHelper';
import type { Data } from '@nio-fe/shared';
import type {
  NUploadMultipartSetting,
  NUploadChunk,
} from '../../composables/useMultipartUpload';
import type { ToRefs } from 'vue';
import type { UploadProps } from '../../composables/useProps';
import type { NUploadFileType, NUploadHttpRequestInstanceMethods } from '../fileDefines';

export default class CustomMultipleUploader extends BaseMultipartUploadHelper {
  private _data: Data = {};

  constructor(
    file: NUploadFileType,
    instanceMethods: NUploadHttpRequestInstanceMethods,
    props?: ToRefs<Partial<UploadProps>>,
  ) {
    super(file, instanceMethods, props);
  }

  private get setting() {
    return this.multipart as NUploadMultipartSetting;
  }

  protected appendData(formData: FormData, data?: Data) {
    super.appendData(formData, { ...data, ...this._data });
  }

  async initUpload(file: NUploadFileType): Promise<void> {
    this._data = (await this.setting.initUpload?.(file)) || {};
  }

  beforeFilePartUpload(file: NUploadFileType, index: number, part: Blob): Data {
    return this.setting.beforePartUpload?.(file, index, part) || {};
  }

  filenameModify(fileRawName: string, index: number, part: Blob): string {
    return this.setting.filenameModify?.(fileRawName, index, part) || fileRawName;
  }

  mergeFiles(file: NUploadFileType, chunks: NUploadChunk[]): Promise<void> {
    return this.setting.handleMerge?.(file, chunks);
  }

  uploadActionModify(): string {
    return this.action ?? '';
  }
}
