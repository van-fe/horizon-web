import { default as Collapse } from './src/Collapse';
import { default as CollapseItem } from './src/CollapseItem';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HCollapse = withInstall(Collapse, { CollapseItem });
export const HCollapseItem = withNoopInstall(CollapseItem);
export default HCollapse;
