import { default as UploadV2 } from './src/UploadV2';
import { withInstall } from '@nio-fe/shared';
import {
  createBackgroundUploadInstance,
  destroyBackgroundUploadInstance,
} from './src/utils/uploadBackgroundHelper';

export const NUploadV2 = withInstall(UploadV2, {
  createBackgroundUploadInstance,
  destroyBackgroundUploadInstance,
});

export default NUploadV2;

export {
  NUploadV2FileStatusEnum,
  NUploadV2FileTypeEnum,
  fileTypeMapping,
  fileTypeIconMapping,
} from './src/utils/fileDefines';

export type {
  NUploadV2FileType,
  NUploadV2UserFile,
  NUploadV2RawFileType,
  NUploadV2HttpRequestInstanceMethods,
} from './src/utils/fileDefines';
