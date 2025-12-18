import type { DropdownItemProps, DropdownSubmenuProps } from '../composables/useProps';
import type { LegoSetupContext } from '@aurora/shared';
import type { DropdownItemEmits, DropdownSubmenuEmits } from '../composables/useEmits';
import type { DropdownItemSlots, DropdownSubmenuSlots } from '../composables/useSlots';

export interface NDropdownTreeData {
  uuid: string;
  type: 'submenu' | 'item';
  props: DropdownSubmenuProps | DropdownItemProps;
  emits:
    | LegoSetupContext<DropdownItemEmits>['emit']
    | LegoSetupContext<DropdownSubmenuEmits>['emit'];
  slots:
    | LegoSetupContext<{}, DropdownSubmenuSlots>['slots']
    | LegoSetupContext<{}, DropdownItemSlots>['slots'];
  children: Map<string, NDropdownTreeData> | null;
}
