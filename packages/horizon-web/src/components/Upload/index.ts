import { default as Upload } from './src/Upload';
import { withInstall } from '@aurora/utils';
import {
  createBackgroundUploadInstance,
  destroyBackgroundUploadInstance,
} from './src/utils/uploadBackgroundHelper';

export const HUpload = withInstall(Upload, {
  createBackgroundUploadInstance,
  destroyBackgroundUploadInstance,
});

export default HUpload;

export {
  HUploadFileStatusEnum,
  HUploadFileTypeEnum,
  fileTypeMapping,
  fileTypeIconMapping,
} from './src/utils/fileDefines';

export type {
  HUploadFileType,
  HUploadUserFile,
  HUploadRawFileType,
  HUploadHttpRequestInstanceMethods,
} from './src/utils/fileDefines';
