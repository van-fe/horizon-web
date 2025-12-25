import { default as Steps } from './src/Steps';
import { default as Step } from './src/Step';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HSteps = withInstall(Steps, { Step });
export const HStep = withNoopInstall(Step);
export default HSteps;
