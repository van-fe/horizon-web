import { default as Anchor } from './src/Anchor';
import { default as AnchorLink } from './src/AnchorLink';
import { withInstall } from '@aurora/utils';

export const NAnchor = withInstall(Anchor);
export const NAnchorLink = withInstall(AnchorLink);

export default NAnchor;
