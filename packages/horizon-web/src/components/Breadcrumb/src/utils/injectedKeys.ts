import type { InjectionKey } from 'vue';
import type { LegoSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { BreadcrumbItemProps, BreadcrumbProps } from '../composables/useProps';
import type { BreadcrumbSlots } from '../composables/useSlots';

export const NBreadcrumbProps = Symbol(
  generatorInjectedKeyName('breadcrumb', 'props'),
) as InjectionKey<BreadcrumbProps>;

export const NBreadcrumbSlots = Symbol(
  generatorInjectedKeyName('breadcrumb', 'slots'),
) as InjectionKey<LegoSetupContext<{}, BreadcrumbSlots>['slots']>;

export const NBreadcrumbItemClickInjectKey = Symbol(
  generatorInjectedKeyName('breadcrumb', 'item-click'),
) as InjectionKey<(props: BreadcrumbItemProps, evt: MouseEvent) => void>;
