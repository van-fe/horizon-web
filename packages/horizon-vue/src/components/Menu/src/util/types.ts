import type { MenuItemProps, SubMenuProps } from '../composables/useProps';
import type { MenuItemSlots, SubMenuSlots } from '../composables/useSlots';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { MenuItemEmits, SubMenuEmits } from '../composables/useEmits';

export interface HMenuTreeData<Type extends 'subMenu' | 'menuItem' = 'menuItem'> {
  uuid: string;
  type: Type;
  props: Type extends 'subMenu' ? SubMenuProps : MenuItemProps;
  emits: Type extends 'subMenu'
    ? HorizonWebSetupContext<SubMenuEmits>['emit']
    : HorizonWebSetupContext<MenuItemEmits>['emit'];
  slots: Type extends 'subMenu'
    ? HorizonWebSetupContext<{}, SubMenuSlots>['slots']
    : HorizonWebSetupContext<{}, MenuItemSlots>['slots'];
  children: Type extends 'subMenu' ? Map<string, HMenuTreeData> : null;
  level: number;
  scrollTo: () => void;
}

export interface HMenuTreePickedValuesData<Type extends 'subMenu' | 'menuItem' = 'menuItem'> {
  uuid: string;
  type: Type;
  props: Type extends 'subMenu' ? SubMenuProps : MenuItemProps;
  emits: Type extends 'subMenu'
    ? HorizonWebSetupContext<SubMenuEmits>['emit']
    : HorizonWebSetupContext<MenuItemEmits>['emit'];
  slots: Type extends 'subMenu'
    ? HorizonWebSetupContext<{}, SubMenuSlots>['slots']
    : HorizonWebSetupContext<{}, MenuItemSlots>['slots'];
  children: HMenuTreePickedValuesData<'subMenu' | 'menuItem'>[];
  scrollTo: () => void;
}
