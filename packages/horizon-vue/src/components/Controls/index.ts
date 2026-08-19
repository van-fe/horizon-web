import { default as Controls } from './src/Controls';
import { default as Control } from './src/Control';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HControls = withInstall(Controls, {
  Control,
});

export const HControl = withNoopInstall(Control);

export default HControls;
