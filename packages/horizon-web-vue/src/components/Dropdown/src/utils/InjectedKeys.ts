import type { ComputedRef, InjectionKey, Ref, UnwrapNestedRefs } from 'vue';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { DropdownItemProps, DropdownProps } from '../composables/useProps';
import type { HDropdownTreeData } from './types';

export const HDropdownPropsInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'props'),
) as InjectionKey<DropdownProps>;

export const HDropdownSizeInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'size'),
) as InjectionKey<ComputedRef<Exclude<DropdownProps['size'], undefined>>>;

export const HDropdownCommandFnInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'command-fn'),
) as InjectionKey<(commandParam: DropdownItemProps['command']) => void>;

export const HDropdownTreeLevelInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'tree-level'),
) as InjectionKey<number>;

export const HDropdownTreeLevelsInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'tree-levels'),
) as InjectionKey<Ref<number>>;

export const HDropdownTreeInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'tree'),
) as InjectionKey<UnwrapNestedRefs<Map<string, HDropdownTreeData>>>;

export const HDropdownAppendChildInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'append-child'),
) as InjectionKey<(child: HDropdownTreeData) => void>;

export const HDropdownRemoveChildInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'remove-child'),
) as InjectionKey<(uuid: string) => void>;

export const HDropdownActivatedChildInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'set-active-child'),
) as InjectionKey<Ref<string | undefined>>;
