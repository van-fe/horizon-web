import { default as Controls } from './src/Controls';
import { default as Control } from './src/Control';
import { withInstall, withNoopInstall } from '@nio-fe/shared';

export const NControls = withInstall(Controls, {
  Control,
});

export const NControl = withNoopInstall(Control);

export default NControls;
