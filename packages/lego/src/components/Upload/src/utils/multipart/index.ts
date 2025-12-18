import CustomMultipleUploader from './CustomMultipleUploader';
import type BaseMultipartUploadHelper from './BaseMultipartUploadHelper';
import type { ToRefs } from 'vue';
import type { UploadProps } from '../../composables/useProps';
import type { NUploadFileType, NUploadHttpRequestInstanceMethods } from '../fileDefines';

export default class MultipartUploadHelper {
  private readonly file: NUploadFileType;
  private readonly instanceMethods: NUploadHttpRequestInstanceMethods;
  private readonly currentUploadHelper: BaseMultipartUploadHelper;

  constructor(
    file: NUploadFileType,
    instanceMethods: NUploadHttpRequestInstanceMethods,
    props?: ToRefs<Partial<UploadProps>>,
  ) {
    this.file = file;
    this.instanceMethods = instanceMethods;

    this.currentUploadHelper = new CustomMultipleUploader(file, instanceMethods, props);

    this.currentUploadHelper.upload();
  }
}
