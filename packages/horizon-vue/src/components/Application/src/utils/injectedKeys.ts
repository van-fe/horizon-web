import type { InjectionKey, Ref } from 'vue';
import type { ApplicationShowTimeZone, ApplicationSize } from '@aurora/core';
import { generatorInjectedKeyName } from '@aurora/utils';

export const GlobalSizeInjectedKey = Symbol.for(
  generatorInjectedKeyName('global', 'size'),
) as InjectionKey<Ref<ApplicationSize>>;

export const HApplicationShowTimeZoneInjectedKey = Symbol.for(
  generatorInjectedKeyName('application', 'time-zone'),
) as InjectionKey<Ref<ApplicationShowTimeZone>>;
