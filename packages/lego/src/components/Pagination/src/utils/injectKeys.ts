import type { InjectionKey, SetupContext } from 'vue';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { PaginationProps } from '../composables/useProps';
import type { PaginationEmits } from '../composables/useEmits';
import type { PaginationSlots } from '../composables/useSlots';

export const NPaginationPropsInjectKey = Symbol(
  generatorInjectedKeyName('pagination', 'props'),
) as InjectionKey<PaginationProps>;

export const NPaginationEmitInjectKey = Symbol(
  generatorInjectedKeyName('pagination', 'emit'),
) as InjectionKey<SetupContext<PaginationEmits>['emit']>;

export const NPaginationSlotsInjectKey = Symbol(
  generatorInjectedKeyName('pagination', 'slots'),
) as InjectionKey<Partial<SetupContext<{}, PaginationSlots>['slots']>>;
