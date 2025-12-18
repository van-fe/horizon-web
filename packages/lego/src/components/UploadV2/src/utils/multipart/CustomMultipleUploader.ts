import BaseMultipartUploadHelper from './BaseMultipartUploadHelper';
import type { Data } from '@nio-fe/shared';
import type {
  NUploadV2MultipartSetting,
  NUploadV2Chunk,
} from '../../composables/useMultipartUpload';
import type { ToRefs } from 'vue';
import type { UploadV2Props } from '../../composables/useProps';
import type { NUploadV2FileType, NUploadV2HttpRequestInstanceMethods } from '../fileDefines';

export default class CustomMultipleUploader extends BaseMultipartUploadHelper {
  private _data: Data = {};

  constructor(
    file: NUploadV2FileType,
    instanceMethods: NUploadV2HttpRequestInstanceMethods,
    props?: ToRefs<Partial<UploadV2Props>>,
  ) {
    super(file, instanceMethods, props);
  }

  private get setting() {
    return this.multipart as NUploadV2MultipartSetting;
  }

  protected appendData(formData: FormData, data?: Data) {
    super.appendData(formData, { ...data, ...this._data });
  }

  async initUpload(file: NUploadV2FileType): Promise<void> {
    this._data = (await this.setting.initUpload?.(file)) || {};
  }

  beforeFilePartUpload(file: NUploadV2FileType, index: number, part: Blob): Data {
    return this.setting.beforePartUpload?.(file, index, part) || {};
  }

  filenameModify(fileRawName: string, index: number, part: Blob): string {
    return this.setting.filenameModify?.(fileRawName, index, part) || fileRawName;
  }

  mergeFiles(file: NUploadV2FileType, chunks: NUploadV2Chunk[]): Promise<void> {
    return this.setting.handleMerge?.(file, chunks);
  }

  uploadActionModify(): string {
    return this.action ?? '';
  }
}
