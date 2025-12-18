import { default as Anchor } from './src/Anchor';
import { default as AnchorLink } from './src/AnchorLink';
import { withInstall } from '@nio-fe/shared';

export const NAnchor = withInstall(Anchor);
export const NAnchorLink = withInstall(AnchorLink);

export default NAnchor;
