import type { InjectionKey, UnwrapNestedRefs } from 'vue';
import { generatorInjectedKeyName } from '@aurora/shared';
import type { RadioGroupPropsProvideType } from '../composables/useProps';

export const NRadioGroupInjectedKey = Symbol.for(
  generatorInjectedKeyName('radio-group', 'props'),
) as InjectionKey<UnwrapNestedRefs<RadioGroupPropsProvideType>>;
