import type { InjectionKey } from 'vue';
import type { VirtualScrollerContext } from './types';
import { generatorInjectedKeyName } from '@aurora/utils';

export const VirtualScrollerInjectKey = Symbol(
  generatorInjectedKeyName('virtual-scroller', 'share'),
) as InjectionKey<VirtualScrollerContext>;
