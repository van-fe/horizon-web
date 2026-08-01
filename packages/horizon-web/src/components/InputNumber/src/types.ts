import type { Decimal } from 'decimal.js';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { InputNumberEmits } from './composables/useEmits';

export type InputNumberEmit = HorizonWebSetupContext<InputNumberEmits>['emit'];
export type InputNumberValue = Decimal.Value | null | undefined;
export type InputNumberUserInput = number | string | null;
export type InputNumberStepDirection = 'down' | 'up';
