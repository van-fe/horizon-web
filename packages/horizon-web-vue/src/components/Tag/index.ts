import Tag from './src/Tag';
import TagGroup from './src/TagGroup';
import { withInstall } from '@aurora/utils';

export const HTagGroup = withInstall(TagGroup);
export const HTag = withInstall(Tag);

export default HTag;
