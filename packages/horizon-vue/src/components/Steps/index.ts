import { default as Steps } from './src/Steps';
import { default as Step } from './src/Step';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HSteps = withInstall(Steps, { Step });
export const HStep = withNoopInstall(Step);
export default HSteps;

export type { StepProps, StepsProps } from './src/composables/useProps';
export type { StepEmits, StepsEmits } from './src/composables/useEmits';
export type { StepSlots, StepsSlots } from './src/composables/useSlots';
export type { StepsExposes } from './src/composables/useExposes';
