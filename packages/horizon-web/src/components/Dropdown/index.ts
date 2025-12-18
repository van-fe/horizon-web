import Dropdown from './src/Dropdown';
import DropdownGroup from './src/DropdownGroup';
import DropdownItem from './src/DropdownItem';
import DropdownMenu from './src/DropdownMenu';
import DropdownSubmenu from './src/DropdownSubmenu';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const NDropdown = withInstall(Dropdown, {
  DropdownMenu,
  DropdownGroup,
  DropdownItem,
  DropdownSubmenu,
});

export const NDropdownMenu = withNoopInstall(DropdownMenu);
export const NDropdownGroup = withNoopInstall(DropdownGroup);
export const NDropdownItem = withNoopInstall(DropdownItem);
export const NDropdownSubmenu = withNoopInstall(DropdownSubmenu);

export default NDropdown;
