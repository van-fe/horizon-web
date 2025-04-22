import type { LegoSetupContext } from '@nio-fe/shared';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';
import type { TreeSelectEmits } from '../composables/useEmits';
import type { TreeSelectSlots } from '../composables/useSlots';

export const NTreeSelectPropsInjectKey = Symbol(
  generatorInjectedKeyName('treeSelect', 'props'),
) as InjectionKey<TreeSelectProps>;

export const NTreeSelectEmitsInjectKey = Symbol(
  generatorInjectedKeyName('treeSelect', 'emits'),
) as InjectionKey<LegoSetupContext<TreeSelectEmits>['emit']>;

export const NTreeSelectSlotsInjectKey = Symbol(
  generatorInjectedKeyName('treeSelect', 'slots'),
) as InjectionKey<LegoSetupContext<{}, TreeSelectSlots>['slots']>;

export const NTreeSelectPopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('treeSelect', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const NTreeSelectInputStringInjectKey = Symbol(
  generatorInjectedKeyName('treeSelect', 'input-string'),
) as InjectionKey<ComputedRef<string>>;
