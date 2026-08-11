import type { HorizonWebSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';
import type { TreeSelectEmits } from '../composables/useEmits';
import type { TreeSelectSlots } from '../composables/useSlots';

export const HTreeSelectPropsInjectKey = Symbol(
  generatorInjectedKeyName('treeSelect', 'props'),
) as InjectionKey<TreeSelectProps>;

export const HTreeSelectEmitsInjectKey = Symbol(
  generatorInjectedKeyName('treeSelect', 'emits'),
) as InjectionKey<HorizonWebSetupContext<TreeSelectEmits>['emit']>;

export const HTreeSelectSlotsInjectKey = Symbol(
  generatorInjectedKeyName('treeSelect', 'slots'),
) as InjectionKey<HorizonWebSetupContext<{}, TreeSelectSlots>['slots']>;

export const HTreeSelectPopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('treeSelect', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const HTreeSelectInputStringInjectKey = Symbol(
  generatorInjectedKeyName('treeSelect', 'input-string'),
) as InjectionKey<ComputedRef<string>>;
