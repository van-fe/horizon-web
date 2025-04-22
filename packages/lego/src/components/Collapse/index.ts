import { default as Collapse } from './src/Collapse';
import { default as CollapseItem } from './src/CollapseItem';
import { withInstall, withNoopInstall } from '@nio-fe/shared';

export const NCollapse = withInstall(Collapse, { CollapseItem });
export const NCollapseItem = withNoopInstall(CollapseItem);
export default NCollapse;
