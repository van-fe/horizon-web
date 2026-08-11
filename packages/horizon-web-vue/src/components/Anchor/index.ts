import { default as Anchor } from './src/Anchor';
import { default as AnchorLink } from './src/AnchorLink';
import { withInstall } from '@aurora/utils';

export const HAnchor = withInstall(Anchor);
export const HAnchorLink = withInstall(AnchorLink);

export default HAnchor;
