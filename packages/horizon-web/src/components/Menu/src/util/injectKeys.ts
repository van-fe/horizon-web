import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { MenuProps } from '../composables/useProps';
import type { MenuEmits } from '../composables/useEmits';
import type { HMenuTreeData } from './types';

export const HMenuRefInjectKey = Symbol(generatorInjectedKeyName('menu', 'ref')) as InjectionKey<
  Ref<HTMLElement | null>
>;

export const HMenuPropsInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'props'),
) as InjectionKey<MenuProps>;

export const HMenuEmitInjectKey = Symbol(generatorInjectedKeyName('menu', 'emit')) as InjectionKey<
  HorizonWebSetupContext<MenuEmits>['emit']
>;

export const HMenuAppendChildInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'append-child'),
) as InjectionKey<
  <Type extends 'subMenu' | 'menuItem' = 'menuItem'>(child: HMenuTreeData<Type>) => void
>;

export const HMenuRemoveChildInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'remove-child'),
) as InjectionKey<(uuid: string) => void>;

export const HMenuExpandedMenuInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'expanded-menu'),
) as InjectionKey<Ref<Set<string>>>;

export const HMenuAddExpandMenuInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'add-expand-menu'),
) as InjectionKey<(uuid: string) => void>;

export const HMenuRemoveExpandMenuInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'remove-expand-menu'),
) as InjectionKey<(uuid: string) => void>;

export const HMenuActivatedMenusInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'activated-menus'),
) as InjectionKey<ComputedRef<HMenuTreeData<'subMenu' | 'menuItem'>[]>>;

export const HMenuSetActivatedMenuInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'set-activated-menu'),
) as InjectionKey<(uuid: string) => void>;

export const HMenuMenuTreeInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'tree'),
) as InjectionKey<Ref<Map<string, HMenuTreeData<'subMenu' | 'menuItem'>>>>;

export const HMenuTreeLevelInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'tree-level'),
) as InjectionKey<number>;

export const HMenuParentHasIconAmountInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'parent-has-icon-amount'),
) as InjectionKey<ComputedRef<number>>;

export const HMenuIsCollapsedInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'is-collapsed'),
) as InjectionKey<Ref<boolean>>;

export const HMenuScrollTopTopInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'scroll-to-top'),
) as InjectionKey<(top: number) => void>;

export const HMenuActiveTopMenuUuidInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'active-top-menu-uuid'),
) as InjectionKey<Ref<string>>;

export const HMenuSwitchFullViewMenuVisibleInjectKey = Symbol(
  generatorInjectedKeyName('menu', 'switch-full-view-menu-visible'),
) as InjectionKey<() => void>;
