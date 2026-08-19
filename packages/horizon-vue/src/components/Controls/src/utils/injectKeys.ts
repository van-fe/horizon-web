import type { InjectionKey, SetupContext } from 'vue';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { ControlsProps } from '../composables/useProps';
import type { ControlsEmits } from '../composables/useEmits';

export const HControlsPropsInjectKey = Symbol(
  generatorInjectedKeyName('controls', 'props'),
) as InjectionKey<ControlsProps>;

export const HControlsEmitInjectKey = Symbol(
  generatorInjectedKeyName('controls', 'emit'),
) as InjectionKey<SetupContext<ControlsEmits>['emit']>;
