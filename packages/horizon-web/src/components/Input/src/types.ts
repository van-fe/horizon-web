import type { HorizonWebSetupContext } from '@aurora/utils';
import type { InputEmits } from './composables/useEmits';

export type InputEmit = HorizonWebSetupContext<InputEmits>['emit'];
