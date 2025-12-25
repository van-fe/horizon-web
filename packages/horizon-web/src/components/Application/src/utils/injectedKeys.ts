import type { InjectionKey, Ref } from 'vue';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { ApplicationProps } from '../composables/useProps';

export const GlobalSizeInjectedKey = Symbol(
  generatorInjectedKeyName('global', 'size'),
) as InjectionKey<Ref<'small' | 'medium' | 'large'>>;

export const HApplicationCompatibilityInjectedKey = Symbol(
  generatorInjectedKeyName('application', 'compatibility'),
) as InjectionKey<Ref<string | undefined>>;

export const HApplicationShowTimeZoneInjectedKey = Symbol.for(
  generatorInjectedKeyName('application', 'time-zone'),
) as InjectionKey<Ref<ApplicationProps['showTimeZone']>>;
