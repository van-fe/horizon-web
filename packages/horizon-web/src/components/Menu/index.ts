import { default as Menu } from './src/Menu';
import { default as MenuItem } from './src/MenuItem';
import { default as SubMenu } from './src/SubMenu';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const NMenu = withInstall(Menu, {
  MenuItem,
  SubMenu,
});
export const NMenuItem = withNoopInstall(MenuItem);
export const NSubMenu = withNoopInstall(SubMenu);

export default NMenu;
