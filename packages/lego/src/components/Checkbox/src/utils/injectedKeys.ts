import type { InjectionKey } from 'vue';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { CheckboxGroupPropsProvideType } from '../utils/types';

export const NCheckboxGroupInjectedKey = Symbol.for(
  generatorInjectedKeyName('checkbox-group', 'props'),
) as InjectionKey<CheckboxGroupPropsProvideType>;
