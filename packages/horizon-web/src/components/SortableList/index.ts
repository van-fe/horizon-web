import { default as SortableList } from './src/SortableList';
import { withInstall } from '@aurora/utils';

export type {
  HSortableListItemDisabledGetter,
  HSortableListItemKey,
  HSortableListItemKeyGetter,
  SortableListProps,
} from './src/composables/useProps';
export type {
  HSortableListSortContext,
  HSortableListSortTrigger,
} from './src/composables/useEmits';

export const HSortableList = withInstall(SortableList);
export default HSortableList;
