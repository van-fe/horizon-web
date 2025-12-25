import { default as Panels } from './src/Panels';
import { default as Panel } from './src/Panel';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HPanels = withInstall(Panels, {
  Panel,
});
export const HPanel = withNoopInstall(Panel);

export default HPanels;
