import type { LegoSetupContext } from '@nio-fe/shared';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { AutoCompleteProps, ModelValueType } from '../composables/useProps';
import type { AutoCompleteEmits } from '../composables/useEmits';
import type { AutoCompleteSlots } from '../composables/useSlots';
import type { NAutoCompleteOption, NAutoCompleteOptionWithUuid } from './typed';

export const NAutoCompletePropsInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'props'),
) as InjectionKey<AutoCompleteProps>;

export const NAutoCompleteEmitsInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'emits'),
) as InjectionKey<LegoSetupContext<AutoCompleteEmits>['emit']>;

export const NAutoCompleteSlotsInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'slots'),
) as InjectionKey<LegoSetupContext<{}, AutoCompleteSlots>['slots']>;

export const NAutoCompletePopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const NAutoCompletePickOptionInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'picker-option'),
) as InjectionKey<(value: NAutoCompleteOption['label'] | NAutoCompleteOption['value']) => void>;

export const NAutoCompleteVisibleOptionsInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'visible-options'),
) as InjectionKey<ComputedRef<NAutoCompleteOptionWithUuid[]>>;

export const NAutoCompleteFocusedOptionValueInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'focused-option-value'),
) as InjectionKey<Ref<NAutoCompleteOption['label'] | NAutoCompleteOption['value']>>;

export const NAutoCompleteVirtualScrollListIsScrollingInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'virtual-scroll-list-is-scrolling'),
) as InjectionKey<Ref<boolean>>;

export const NAutoCompleteModelValueInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'model-value'),
) as InjectionKey<Ref<ModelValueType>>;

export const NAutoCompleteMouseOverOptionInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'mouse-over-option'),
) as InjectionKey<(value: NAutoCompleteOption['label']) => void>;
