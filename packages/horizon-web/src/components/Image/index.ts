import { default as Image } from './src/Image';
import { default as ImageList } from './src/ImageList';
import { withInstall, withNoopInstall } from '@aurora/utils';
import type { HImageAction } from './src/composables/useProps';
export const HImage = withInstall(Image, {
  ImageList,
});

export const HImageList = withNoopInstall(ImageList);
export default HImage;

export type { HImageAction };
