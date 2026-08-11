import type { InjectionKey } from 'vue';
import { generatorInjectedKeyName } from '@aurora/utils';

export const HHoverSwitchVisibleInjectKey = Symbol(
  generatorInjectedKeyName('hover', 'switch visible'),
) as InjectionKey<(visible: boolean) => void>;
