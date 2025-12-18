import type { InjectionKey, SetupContext } from 'vue';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { ControlsProps } from '../composables/useProps';
import type { ControlsEmits } from '../composables/useEmits';

export const NControlsPropsInjectKey = Symbol(
  generatorInjectedKeyName('controls', 'props'),
) as InjectionKey<ControlsProps>;

export const NControlsEmitInjectKey = Symbol(
  generatorInjectedKeyName('controls', 'emit'),
) as InjectionKey<SetupContext<ControlsEmits>['emit']>;
