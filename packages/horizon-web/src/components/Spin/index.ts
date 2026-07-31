import { withInstall } from '@aurora/utils';
import Spin from './src/Spin';

export const HSpin = withInstall(Spin);
export default HSpin;

export type { SpinProps as HSpinProps } from './src/composables/useProps';
export type { SpinSlots as HSpinSlots } from './src/composables/useSlots';
