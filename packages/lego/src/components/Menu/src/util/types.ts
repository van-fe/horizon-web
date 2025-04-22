import type { MenuItemProps, SubMenuProps } from '../composables/useProps';
import type { MenuItemSlots, SubMenuSlots } from '../composables/useSlots';
import type { LegoSetupContext } from '@nio-fe/shared';
import type { MenuItemEmits, SubMenuEmits } from '../composables/useEmits';

export interface NMenuTreeData<Type extends 'subMenu' | 'menuItem' = 'menuItem'> {
  uuid: string;
  type: Type;
  props: Type extends 'subMenu' ? SubMenuProps : MenuItemProps;
  emits: Type extends 'subMenu'
    ? LegoSetupContext<SubMenuEmits>['emit']
    : LegoSetupContext<MenuItemEmits>['emit'];
  slots: Type extends 'subMenu'
    ? LegoSetupContext<{}, SubMenuSlots>['slots']
    : LegoSetupContext<{}, MenuItemSlots>['slots'];
  children: Type extends 'subMenu' ? Map<string, NMenuTreeData> : null;
  level: number;
  scrollTo: () => void;
}

export interface NMenuTreePickedValuesData<Type extends 'subMenu' | 'menuItem' = 'menuItem'> {
  uuid: string;
  type: Type;
  props: Type extends 'subMenu' ? SubMenuProps : MenuItemProps;
  emits: Type extends 'subMenu'
    ? LegoSetupContext<SubMenuEmits>['emit']
    : LegoSetupContext<MenuItemEmits>['emit'];
  slots: Type extends 'subMenu'
    ? LegoSetupContext<{}, SubMenuSlots>['slots']
    : LegoSetupContext<{}, MenuItemSlots>['slots'];
  children: NMenuTreePickedValuesData<'subMenu' | 'menuItem'>[];
  scrollTo: () => void;
}
