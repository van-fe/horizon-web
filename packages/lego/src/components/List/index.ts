import { default as List } from './src/List';
import { default as ListItem } from './src/ListItem';
import { withInstall, withNoopInstall } from '@nio-fe/shared';

export const NList = withInstall(List, { ListItem });
export const NListItem = withNoopInstall(ListItem);
export default NList;
