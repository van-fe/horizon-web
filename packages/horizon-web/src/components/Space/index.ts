import { withInstall, withNoopInstall } from '@aurora/shared';
import { default as Space } from './src/Space';
import { default as SpaceItem } from './src/SpaceItem';

export const NSpace = withInstall(Space, { SpaceItem });
export const NSpaceItem = withNoopInstall(SpaceItem);
export default NSpace;

export type { SpaceProps as NSpaceProps } from './src/composables/useProps';
