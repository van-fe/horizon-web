import { default as List } from './src/List';
import { default as ListItem } from './src/ListItem';
import { withInstall, withNoopInstall } from '@aurora/shared';

export const NList = withInstall(List, { ListItem });
export const NListItem = withNoopInstall(ListItem);
export default NList;
