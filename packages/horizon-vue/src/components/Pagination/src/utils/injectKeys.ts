import type { InjectionKey, SetupContext } from 'vue';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { PaginationProps } from '../composables/useProps';
import type { PaginationEmits } from '../composables/useEmits';
import type { PaginationSlots } from '../composables/useSlots';

export const HPaginationPropsInjectKey = Symbol(
  generatorInjectedKeyName('pagination', 'props'),
) as InjectionKey<PaginationProps>;

export const HPaginationEmitInjectKey = Symbol(
  generatorInjectedKeyName('pagination', 'emit'),
) as InjectionKey<SetupContext<PaginationEmits>['emit']>;

export const HPaginationSlotsInjectKey = Symbol(
  generatorInjectedKeyName('pagination', 'slots'),
) as InjectionKey<Partial<SetupContext<{}, PaginationSlots>['slots']>>;
