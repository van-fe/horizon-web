import { default as Popover } from './src/Popover';
import { default as PopContent } from './src/PopContent';
import { withInstall } from '@aurora/utils';

export const HPopover = withInstall(Popover);
export const HPopContent = withInstall(PopContent);

export default HPopover;
