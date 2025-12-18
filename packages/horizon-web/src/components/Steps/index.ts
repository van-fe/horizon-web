import { default as Steps } from './src/Steps';
import { default as Step } from './src/Step';
import { withInstall, withNoopInstall } from '@aurora/shared';

export const NSteps = withInstall(Steps, { Step });
export const NStep = withNoopInstall(Step);
export default NSteps;
