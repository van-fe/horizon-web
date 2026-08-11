import { default as List } from './src/List';
import { default as ListItem } from './src/ListItem';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HList = withInstall(List, { ListItem });
export const HListItem = withNoopInstall(ListItem);
export default HList;
