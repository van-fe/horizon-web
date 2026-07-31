import CustomMultipleUploader from './CustomMultipleUploader';
import type BaseMultipartUploadHelper from './BaseMultipartUploadHelper';
import type { ToRefs } from 'vue';
import type { UploadProps } from '../../composables/useProps';
import type { HUploadFileType, HUploadHttpRequestInstanceMethods } from '../fileDefines';

export default class MultipartUploadHelper {
  private readonly currentUploadHelper: BaseMultipartUploadHelper;

  constructor(
    file: HUploadFileType,
    instanceMethods: HUploadHttpRequestInstanceMethods,
    props?: ToRefs<Partial<UploadProps>>,
  ) {
    this.currentUploadHelper = new CustomMultipleUploader(file, instanceMethods, props);
  }

  start() {
    return this.currentUploadHelper.start();
  }

  pause() {
    this.currentUploadHelper.pause();
  }

  resume() {
    return this.currentUploadHelper.resume();
  }
}
