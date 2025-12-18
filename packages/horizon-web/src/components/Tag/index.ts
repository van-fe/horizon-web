import Tag from './src/Tag';
import TagGroup from './src/TagGroup';
import { withInstall } from '@aurora/utils';

export const NTagGroup = withInstall(TagGroup);
export const NTag = withInstall(Tag);

export default NTag;
