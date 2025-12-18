import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { InjectionKey } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';

export const NTreeSelectPropsInjectedKey = Symbol(
  generatorInjectedKeyName('treeSelect', 'props'),
) as InjectionKey<TreeSelectProps>;
