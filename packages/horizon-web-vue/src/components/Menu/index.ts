import { default as Menu } from './src/Menu';
import { default as MenuItem } from './src/MenuItem';
import { default as SubMenu } from './src/SubMenu';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HMenu = withInstall(Menu, {
  MenuItem,
  SubMenu,
});
export const HMenuItem = withNoopInstall(MenuItem);
export const HSubMenu = withNoopInstall(SubMenu);

export default HMenu;
