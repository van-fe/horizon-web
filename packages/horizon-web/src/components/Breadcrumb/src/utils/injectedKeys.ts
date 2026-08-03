import type { InjectionKey } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { BreadcrumbItemProps, BreadcrumbProps } from '../composables/useProps';
import type { BreadcrumbSlots } from '../composables/useSlots';

export const HBreadcrumbProps = Symbol(
  generatorInjectedKeyName('breadcrumb', 'props'),
) as InjectionKey<BreadcrumbProps>;

export const HBreadcrumbSlots = Symbol(
  generatorInjectedKeyName('breadcrumb', 'slots'),
) as InjectionKey<HorizonWebSetupContext<{}, BreadcrumbSlots>['slots']>;

export const HBreadcrumbItemClickInjectKey = Symbol(
  generatorInjectedKeyName('breadcrumb', 'item-click'),
) as InjectionKey<(props: BreadcrumbItemProps, evt: MouseEvent) => void>;
