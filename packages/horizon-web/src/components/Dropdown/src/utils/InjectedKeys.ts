import type { ComputedRef, InjectionKey, Ref, UnwrapNestedRefs } from 'vue';
import { generatorInjectedKeyName } from '@aurora/shared';
import type { DropdownItemProps, DropdownProps } from '../composables/useProps';
import type { NDropdownTreeData } from './types';

export const NDropdownPropsInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'props'),
) as InjectionKey<DropdownProps>;

export const NDropdownSizeInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'size'),
) as InjectionKey<ComputedRef<Exclude<DropdownProps['size'], undefined>>>;

export const NDropdownCommandFnInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'command-fn'),
) as InjectionKey<(commandParam: DropdownItemProps['command']) => void>;

export const NDropdownTreeLevelInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'tree-level'),
) as InjectionKey<number>;

export const NDropdownTreeLevelsInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'tree-levels'),
) as InjectionKey<Ref<number>>;

export const NDropdownTreeInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'tree'),
) as InjectionKey<UnwrapNestedRefs<Map<string, NDropdownTreeData>>>;

export const NDropdownAppendChildInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'append-child'),
) as InjectionKey<(child: NDropdownTreeData) => void>;

export const NDropdownRemoveChildInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'remove-child'),
) as InjectionKey<(uuid: string) => void>;

export const NDropdownActivatedChildInjectKey = Symbol(
  generatorInjectedKeyName('dropdown', 'set-active-child'),
) as InjectionKey<Ref<string | undefined>>;
