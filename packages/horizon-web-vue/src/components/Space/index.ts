import { withInstall, withNoopInstall } from '@aurora/utils';
import { default as Space } from './src/Space';
import { default as SpaceItem } from './src/SpaceItem';

export const HSpace = withInstall(Space, { SpaceItem });
export const HSpaceItem = withNoopInstall(SpaceItem);
export default HSpace;

export type { SpaceProps as HSpaceProps } from './src/composables/useProps';
