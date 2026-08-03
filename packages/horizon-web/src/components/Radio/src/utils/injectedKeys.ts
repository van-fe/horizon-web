import type { InjectionKey, UnwrapNestedRefs } from 'vue';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { RadioGroupPropsProvideType } from '../composables/useProps';

export const HRadioGroupInjectedKey = Symbol.for(
  generatorInjectedKeyName('radio-group', 'props'),
) as InjectionKey<UnwrapNestedRefs<RadioGroupPropsProvideType>>;
