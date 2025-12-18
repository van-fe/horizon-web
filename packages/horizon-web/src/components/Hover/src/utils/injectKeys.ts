import type { InjectionKey } from 'vue';
import { generatorInjectedKeyName } from '@aurora/shared';

export const NHoverSwitchVisibleInjectKey = Symbol(
  generatorInjectedKeyName('hover', 'switch visible'),
) as InjectionKey<(visible: boolean) => void>;
