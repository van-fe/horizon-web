import Dropdown from './src/Dropdown';
import DropdownGroup from './src/DropdownGroup';
import DropdownItem from './src/DropdownItem';
import DropdownMenu from './src/DropdownMenu';
import DropdownSubmenu from './src/DropdownSubmenu';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HDropdown = withInstall(Dropdown, {
  DropdownMenu,
  DropdownGroup,
  DropdownItem,
  DropdownSubmenu,
});

export const HDropdownMenu = withNoopInstall(DropdownMenu);
export const HDropdownGroup = withNoopInstall(DropdownGroup);
export const HDropdownItem = withNoopInstall(DropdownItem);
export const HDropdownSubmenu = withNoopInstall(DropdownSubmenu);

export default HDropdown;
