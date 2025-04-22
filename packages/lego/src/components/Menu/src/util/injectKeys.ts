import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { LegoSetupContext } from '@nio-fe/shared';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { MenuProps } from '../composables/useProps';
import type { MenuEmits } from '../composables/useEmits';
import type { NMenuTreeData } from './types';

export const NMenuRefInjectKey = Symbol(generatorInjectedKeyName('menu', 'ref')) as InjectionKey<
  Ref<HTMLElement | null>
>;

export const NMenuPropsInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'props'),
) as InjectionKey<MenuProps>;

export const NMenuEmitInjectKey = Symbol(generatorInjectedKeyName('menu', 'emit')) as InjectionKey<
  LegoSetupContext<MenuEmits>['emit']
>;

export const NMenuAppendChildInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'append-child'),
) as InjectionKey<
  <Type extends 'subMenu' | 'menuItem' = 'menuItem'>(child: NMenuTreeData<Type>) => void
>;

export const NMenuRemoveChildInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'remove-child'),
) as InjectionKey<(uuid: string) => void>;

export const NMenuExpandedMenuInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'expanded-menu'),
) as InjectionKey<Ref<Set<string>>>;

export const NMenuAddExpandMenuInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'add-expand-menu'),
) as InjectionKey<(uuid: string) => void>;

export const NMenuRemoveExpandMenuInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'remove-expand-menu'),
) as InjectionKey<(uuid: string) => void>;

export const NMenuActivatedMenusInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'activated-menus'),
) as InjectionKey<ComputedRef<NMenuTreeData[]>>;

export const NMenuSetActivatedMenuInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'set-activated-menu'),
) as InjectionKey<(uuid: string) => void>;

export const NMenuMenuTreeInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'tree'),
) as InjectionKey<Ref<Map<string, NMenuTreeData>>>;

export const NMenuTreeLevelInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'tree-level'),
) as InjectionKey<number>;

export const NMenuParentHasIconAmountInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'parent-has-icon-amount'),
) as InjectionKey<ComputedRef<number>>;

export const NMenuIsCollapsedInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'is-collapsed'),
) as InjectionKey<Ref<boolean>>;

export const NMenuScrollTopTopInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'scroll-to-top'),
) as InjectionKey<(top: number) => void>;

export const NMenuActiveTopMenuUuidInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'active-top-menu-uuid'),
) as InjectionKey<Ref<string>>;

export const NMenuSwitchFullViewMenuVisibleInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'switch-full-view-menu-visible'),
) as InjectionKey<() => void>;
