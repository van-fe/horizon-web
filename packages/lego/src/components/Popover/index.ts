import { default as Popover } from './src/Popover';
import { default as PopContent } from './src/PopContent';
import { withInstall } from '@nio-fe/shared';

export const NPopover = withInstall(Popover);
export const NPopContent = withInstall(PopContent);

export default NPopover;
