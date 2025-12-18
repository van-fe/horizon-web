import type { InjectionKey } from 'vue';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { CheckboxGroupPropsProvideType } from './types';

export const NCheckboxGroupInjectedKey = Symbol.for(
  generatorInjectedKeyName('checkbox-group', 'props'),
) as InjectionKey<CheckboxGroupPropsProvideType>;
