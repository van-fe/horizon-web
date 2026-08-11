import { generatorInjectedKeyName } from '@aurora/utils';
import type { InjectionKey } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';

export const HTreeSelectPropsInjectedKey = Symbol(
  generatorInjectedKeyName('treeSelect', 'props'),
) as InjectionKey<TreeSelectProps>;
