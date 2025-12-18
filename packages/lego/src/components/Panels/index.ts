import { default as Panels } from './src/Panels';
import { default as Panel } from './src/Panel';
import { withInstall, withNoopInstall } from '@nio-fe/shared';

export const NPanels = withInstall(Panels, {
  Panel,
});
export const NPanel = withNoopInstall(Panel);

export default NPanels;
