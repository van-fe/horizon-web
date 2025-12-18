import type { InjectionKey, Ref } from 'vue';
import { generatorInjectedKeyName } from '@aurora/shared';
import type { ApplicationProps } from '../composables/useProps';

export const GlobalSizeInjectedKey = Symbol(
  generatorInjectedKeyName('global', 'size'),
) as InjectionKey<Ref<'small' | 'medium' | 'large'>>;

export const NApplicationCompatibilityInjectedKey = Symbol(
  generatorInjectedKeyName('application', 'compatibility'),
) as InjectionKey<Ref<string | undefined>>;

export const NApplicationShowTimeZoneInjectedKey = Symbol.for(
  generatorInjectedKeyName('application', 'time-zone'),
) as InjectionKey<Ref<ApplicationProps['showTimeZone']>>;
