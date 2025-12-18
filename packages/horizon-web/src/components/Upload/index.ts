import { default as Upload } from './src/Upload';
import { withInstall } from '@aurora/utils';
import {
  createBackgroundUploadInstance,
  destroyBackgroundUploadInstance,
} from './src/utils/uploadBackgroundHelper';

export const NUpload = withInstall(Upload, {
  createBackgroundUploadInstance,
  destroyBackgroundUploadInstance,
});

export default NUpload;

export {
  NUploadFileStatusEnum,
  NUploadFileTypeEnum,
  fileTypeMapping,
  fileTypeIconMapping,
} from './src/utils/fileDefines';

export type {
  NUploadFileType,
  NUploadUserFile,
  NUploadRawFileType,
  NUploadHttpRequestInstanceMethods,
} from './src/utils/fileDefines';
