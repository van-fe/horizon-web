import CustomMultipleUploader from './CustomMultipleUploader';
import type BaseMultipartUploadHelper from './BaseMultipartUploadHelper';
import type { ToRefs } from 'vue';
import type { UploadProps } from '../../composables/useProps';
import type { HUploadFileType, HUploadHttpRequestInstanceMethods } from '../fileDefines';

export default class MultipartUploadHelper {
  private readonly file: HUploadFileType;
  private readonly instanceMethods: HUploadHttpRequestInstanceMethods;
  private readonly currentUploadHelper: BaseMultipartUploadHelper;

  constructor(
    file: HUploadFileType,
    instanceMethods: HUploadHttpRequestInstanceMethods,
    props?: ToRefs<Partial<UploadProps>>,
  ) {
    this.file = file;
    this.instanceMethods = instanceMethods;

    this.currentUploadHelper = new CustomMultipleUploader(file, instanceMethods, props);

    this.currentUploadHelper.upload();
  }
}
