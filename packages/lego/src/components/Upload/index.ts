import { default as Upload } from './src/Upload';
import { default as UploadButton } from './src/UploadButton';
import { default as UploadPreviewFileItem } from './src/UploadPreviewFileItem';
import { default as UploadPreviewImgItem } from './src/UploadPreviewImgItem';
import { default as UploadImg } from './src/UploadImg';
import { default as UploadArea } from './src/UploadArea';
import { withInstall } from '@nio-fe/shared';
import { getUploadFile, UploadHelper, xhrUpload, getNanoid as nanoid } from '@nio-fe/upload-helper';

export type {
  NMIMEIconType,
  NUploadOptions,
  NUploadRequestOptions,
  NUploadCustomRequest,
} from './src/composables/useProps';

export const NUpload = withInstall(Upload, undefined, {
  getUploadFile,
  UploadHelper,
  xhrUpload,
  nanoid,
});
export const NUploadButton = withInstall(UploadButton);
export const NUploadPreviewFileItem = withInstall(UploadPreviewFileItem);
export const NUploadPreviewImgItem = withInstall(UploadPreviewImgItem);
export const NUploadImg = withInstall(UploadImg);
export const NUploadArea = withInstall(UploadArea);

export default NUpload;
