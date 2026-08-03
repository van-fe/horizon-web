import type { DropdownItemProps, DropdownSubmenuProps } from '../composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { DropdownItemEmits, DropdownSubmenuEmits } from '../composables/useEmits';
import type { DropdownItemSlots, DropdownSubmenuSlots } from '../composables/useSlots';

export interface HDropdownTreeData {
  uuid: string;
  type: 'submenu' | 'item';
  props: DropdownSubmenuProps | DropdownItemProps;
  emits:
    | HorizonWebSetupContext<DropdownItemEmits>['emit']
    | HorizonWebSetupContext<DropdownSubmenuEmits>['emit'];
  slots:
    | HorizonWebSetupContext<{}, DropdownSubmenuSlots>['slots']
    | HorizonWebSetupContext<{}, DropdownItemSlots>['slots'];
  children: Map<string, HDropdownTreeData> | null;
}
