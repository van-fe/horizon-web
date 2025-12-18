import CustomMultipleUploader from './CustomMultipleUploader';
import type BaseMultipartUploadHelper from './BaseMultipartUploadHelper';
import type { ToRefs } from 'vue';
import type { UploadV2Props } from '../../composables/useProps';
import type { NUploadV2FileType, NUploadV2HttpRequestInstanceMethods } from '../fileDefines';

export default class MultipartUploadHelper {
  private readonly file: NUploadV2FileType;
  private readonly instanceMethods: NUploadV2HttpRequestInstanceMethods;
  private readonly currentUploadHelper: BaseMultipartUploadHelper;

  constructor(
    file: NUploadV2FileType,
    instanceMethods: NUploadV2HttpRequestInstanceMethods,
    props?: ToRefs<Partial<UploadV2Props>>,
  ) {
    this.file = file;
    this.instanceMethods = instanceMethods;

    this.currentUploadHelper = new CustomMultipleUploader(file, instanceMethods, props);

    this.currentUploadHelper.upload();
  }
}
