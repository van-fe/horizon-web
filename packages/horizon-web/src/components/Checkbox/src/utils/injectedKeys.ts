import type { InjectionKey } from 'vue';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { CheckboxGroupPropsProvideType } from './types';

export const HCheckboxGroupInjectedKey = Symbol.for(
  generatorInjectedKeyName('checkbox-group', 'props'),
) as InjectionKey<CheckboxGroupPropsProvideType>;
