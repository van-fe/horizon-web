import { default as Image } from './src/Image';
import { default as ImageList } from './src/ImageList';
import { withInstall, withNoopInstall } from '@aurora/shared';
import type { NImageAction } from './src/composables/useProps';
export const NImage = withInstall(Image, {
  ImageList,
});

export const NImageList = withNoopInstall(ImageList);
export default NImage;

export type { NImageAction };
