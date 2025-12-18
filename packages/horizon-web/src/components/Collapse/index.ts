import { default as Collapse } from './src/Collapse';
import { default as CollapseItem } from './src/CollapseItem';
import { withInstall, withNoopInstall } from '@aurora/shared';

export const NCollapse = withInstall(Collapse, { CollapseItem });
export const NCollapseItem = withNoopInstall(CollapseItem);
export default NCollapse;
